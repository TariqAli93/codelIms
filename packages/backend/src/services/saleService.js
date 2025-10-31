import db, { saveDatabase } from '../db.js';
import { sales, saleItems, products, customers, payments, installments } from '../models/index.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import { generateInvoiceNumber, calculateSaleTotals } from '../utils/helpers.js';
import { eq, desc, and, or, gte, lte, count, sql, inArray } from 'drizzle-orm';
import { CurrencyConversionService } from './currencyConversionService.js';

export class SaleService {
  async create(saleData, userId) {
    // Calculate totals
    const totals = calculateSaleTotals(saleData.items, saleData.discount || 0, saleData.tax || 0);

    // Generate invoice number
    const invoiceNumber = generateInvoiceNumber();

    // Calculate remaining amount
    const paidAmount = saleData.paidAmount || 0;
    const remainingAmount = totals.total - paidAmount;

    // Default exchange rate (1 for USD, you can adjust based on currency)
    const exchangeRate = saleData.exchangeRate || (saleData.currency === 'USD' ? 1 : 1500);

    // Create sale
    const [newSale] = await db
      .insert(sales)
      .values({
        invoiceNumber,
        customerId: saleData.customerId,
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        total: totals.total,
        currency: saleData.currency,
        exchangeRate,
        paymentType: saleData.paymentType,
        paidAmount,
        remainingAmount,
        status: remainingAmount <= 0 ? 'completed' : 'pending',
        notes: saleData.notes,
        createdBy: userId,
      })
      .returning();

    // Create sale items and update stock
    for (const item of saleData.items) {
      // Check if product has enough stock
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (!product) {
        throw new NotFoundError(`Product with ID ${item.productId}`);
      }

      if (product.stock < item.quantity) {
        throw new ValidationError(
          `Insufficient stock for product: ${product.name}. Available: ${product.stock}, Required: ${item.quantity}`
        );
      }

      await db.insert(saleItems).values({
        saleId: newSale.id,
        productId: item.productId,
        productName: item.productName || product.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount || 0,
        subtotal: item.quantity * item.unitPrice - (item.discount || 0),
      });

      // Update product stock using correct SQL
      await db
        .update(products)
        .set({
          stock: product.stock - item.quantity,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(products.id, item.productId));
    }

    // Create initial payment if any
    if (paidAmount > 0) {
      await db.insert(payments).values({
        saleId: newSale.id,
        customerId: saleData.customerId,
        amount: paidAmount,
        currency: saleData.currency,
        exchangeRate,
        paymentMethod: saleData.paymentMethod || 'cash',
        createdBy: userId,
      });
    }

    // Create installments if payment type is installment or mixed
    if (
      (saleData.paymentType === 'installment' || saleData.paymentType === 'mixed') &&
      remainingAmount > 0
    ) {
      const installmentCount = saleData.installmentCount || 3;
      const installmentAmount = remainingAmount / installmentCount;
      const startDate = new Date();

      for (let i = 0; i < installmentCount; i++) {
        const dueDate = new Date(startDate);
        dueDate.setMonth(dueDate.getMonth() + i + 1);

        await db.insert(installments).values({
          saleId: newSale.id,
          customerId: saleData.customerId,
          installmentNumber: i + 1,
          dueAmount: parseFloat(installmentAmount.toFixed(2)),
          paidAmount: 0,
          remainingAmount: parseFloat(installmentAmount.toFixed(2)),
          currency: saleData.currency,
          dueDate: dueDate.toISOString().split('T')[0],
          status: 'pending',
        });
      }
    }

    // Update customer debt if applicable
    if (saleData.customerId && remainingAmount > 0) {
      await db
        .update(customers)
        .set({
          totalDebt: customers.totalDebt + remainingAmount,
          totalPurchases: customers.totalPurchases + totals.total,
        })
        .where(eq(customers.id, saleData.customerId));
    }

    // Save database to persist changes
    saveDatabase();

    return await this.getById(newSale.id);
  }

  async getAll(filters = {}) {
    const { page = 1, limit = 10, status, startDate, endDate } = filters;
    const offset = (page - 1) * limit;

    let query = db
      .select({
        id: sales.id,
        invoiceNumber: sales.invoiceNumber,
        total: sales.total,
        currency: sales.currency,
        paymentType: sales.paymentType,
        paidAmount: sales.paidAmount,
        remainingAmount: sales.remainingAmount,
        status: sales.status,
        createdAt: sales.createdAt,
        customer: customers.name,
      })
      .from(sales)
      .leftJoin(customers, eq(sales.customerId, customers.id));

    const conditions = [];

    if (status) {
      conditions.push(eq(sales.status, status));
    }

    if (startDate) {
      conditions.push(gte(sales.createdAt, startDate));
    }

    if (endDate) {
      conditions.push(lte(sales.createdAt, endDate));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query.orderBy(desc(sales.createdAt)).limit(limit).offset(offset);

    const [{ total }] = await db
      .select({ total: count() })
      .from(sales)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      data: results,
      meta: {
        total: total || 0,
        page,
        limit,
        totalPages: Math.ceil((total || 0) / limit),
      },
    };
  }

  async getById(id) {
    const [sale] = await db
      .select({
        id: sales.id,
        invoiceNumber: sales.invoiceNumber,
        customerId: sales.customerId,
        customerName: customers.name,
        subtotal: sales.subtotal,
        discount: sales.discount,
        tax: sales.tax,
        total: sales.total,
        currency: sales.currency,
        exchangeRate: sales.exchangeRate,
        paymentType: sales.paymentType,
        paidAmount: sales.paidAmount,
        remainingAmount: sales.remainingAmount,
        status: sales.status,
        notes: sales.notes,
        createdAt: sales.createdAt,
      })
      .from(sales)
      .leftJoin(customers, eq(sales.customerId, customers.id))
      .where(eq(sales.id, id))
      .limit(1);

    if (!sale) {
      throw new NotFoundError('Sale');
    }

    // Get sale items
    const items = await db.select().from(saleItems).where(eq(saleItems.saleId, id));

    // Get payments
    const salePayments = await db.select().from(payments).where(eq(payments.saleId, id));

    // Get installments
    const saleInstallments = await db
      .select()
      .from(installments)
      .where(eq(installments.saleId, id));

    return {
      ...sale,
      items,
      payments: salePayments,
      installments: saleInstallments,
    };
  }

  async addPayment(saleId, paymentData, userId) {
    const sale = await this.getById(saleId);

    if (sale.status === 'cancelled') {
      throw new ValidationError('Cannot add payment to cancelled sale');
    }

    if (sale.remainingAmount <= 0) {
      throw new ValidationError('Sale is already fully paid');
    }

    // Validate payment amount
    if (!paymentData.amount || paymentData.amount <= 0) {
      throw new ValidationError('Payment amount must be greater than zero');
    }

    const paymentAmount = Math.min(paymentData.amount, sale.remainingAmount);

    // Create payment record
    await db.insert(payments).values({
      saleId,
      customerId: sale.customerId,
      amount: paymentAmount,
      currency: paymentData.currency || sale.currency,
      exchangeRate: paymentData.exchangeRate || sale.exchangeRate,
      paymentMethod: paymentData.paymentMethod || 'cash',
      notes: paymentData.notes,
      createdBy: userId,
    });

    // Update sale amounts
    const newPaidAmount = sale.paidAmount + paymentAmount;
    const newRemainingAmount = sale.remainingAmount - paymentAmount;
    const newStatus = newRemainingAmount <= 0 ? 'completed' : 'pending';

    await db
      .update(sales)
      .set({
        paidAmount: newPaidAmount,
        remainingAmount: newRemainingAmount,
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sales.id, saleId));

    // Update customer debt
    if (sale.customerId) {
      await db
        .update(customers)
        .set({
          totalDebt: customers.totalDebt - paymentAmount,
        })
        .where(eq(customers.id, sale.customerId));
    }

    // Update installments if applicable
    if (sale.installments && sale.installments.length > 0) {
      let remainingPayment = paymentAmount;

      for (const installment of sale.installments) {
        if (remainingPayment <= 0) break;
        if (installment.status === 'paid') continue;

        const installmentPayment = Math.min(remainingPayment, installment.remainingAmount);
        const newInstallmentPaid = installment.paidAmount + installmentPayment;
        const newInstallmentRemaining = installment.remainingAmount - installmentPayment;
        const installmentStatus = newInstallmentRemaining <= 0 ? 'paid' : 'pending';

        await db
          .update(installments)
          .set({
            paidAmount: newInstallmentPaid,
            remainingAmount: newInstallmentRemaining,
            status: installmentStatus,
            paidDate: installmentStatus === 'paid' ? new Date().toISOString().split('T')[0] : null,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(installments.id, installment.id));

        remainingPayment -= installmentPayment;
      }
    }

    // Save database
    saveDatabase();

    return await this.getById(saleId);
  }

  async cancel(id, _userId) {
    const sale = await this.getById(id);

    if (sale.status === 'cancelled') {
      throw new ValidationError('Sale is already cancelled');
    }

    // Restore product stock correctly
    for (const item of sale.items) {
      const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, item.productId))
        .limit(1);

      if (product) {
        await db
          .update(products)
          .set({
            stock: product.stock + item.quantity,
            updatedAt: new Date().toISOString(),
          })
          .where(eq(products.id, item.productId));
      }
    }

    // Update customer debt
    if (sale.customerId && sale.remainingAmount > 0) {
      const [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.id, sale.customerId))
        .limit(1);

      if (customer) {
        await db
          .update(customers)
          .set({
            totalDebt: Math.max(0, customer.totalDebt - sale.remainingAmount),
            totalPurchases: Math.max(0, customer.totalPurchases - sale.total),
            updatedAt: new Date().toISOString(),
          })
          .where(eq(customers.id, sale.customerId));
      }
    }

    // Cancel all pending installments
    await db
      .update(installments)
      .set({
        status: 'cancelled',
        updatedAt: new Date().toISOString(),
      })
      .where(and(eq(installments.saleId, id), eq(installments.status, 'pending')));

    // Update sale status
    const [updated] = await db
      .update(sales)
      .set({
        status: 'cancelled',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(sales.id, id))
      .returning();

    // Save database
    saveDatabase();

    return updated;
  }

  async getSalesReport(filters = {}) {
    const { startDate, endDate, currency } = filters;
    const currencyService = new CurrencyConversionService();

    const toYmd = (d) => (d ? new Date(d).toISOString().split('T')[0] : null);
    const start = toYmd(startDate);
    const end = toYmd(endDate);

    const createdDate = sql`substr(${sales.createdAt}, 1, 10)`;
    const conds = [
      or(eq(sales.status, 'completed'), eq(sales.status, 'pending')),
      ...(start ? [gte(createdDate, start)] : []),
      ...(end ? [lte(createdDate, end)] : []),
    ];
    if (currency) conds.push(eq(sales.currency, currency));

    // 1️⃣ نجلب المبيعات ضمن الفترة
    const salesData = await db
      .select()
      .from(sales)
      .where(and(...conds))
      .all();
    const saleIds = salesData.map((s) => s.id);

    // 2️⃣ نجلب كل العناصر المرتبطة لتحديد الربح الحقيقي
    let items = [];
    if (saleIds.length) {
      items = await db
        .select({
          saleId: saleItems.saleId,
          quantity: saleItems.quantity,
          unitPrice: saleItems.unitPrice,
          productId: saleItems.productId,
          productCost: products.costPrice,
          currency: sales.currency,
        })
        .from(saleItems)
        .leftJoin(products, eq(saleItems.productId, products.id))
        .leftJoin(sales, eq(saleItems.saleId, sales.id))
        .where(inArray(saleItems.saleId, saleIds))
        .all();
    }

    // 3️⃣ نحسب القيم حسب العملة
    const byCur = {};
    for (const s of salesData) {
      const c = s.currency || 'USD';
      byCur[c] ??= {
        totalSales: 0,
        totalPaid: 0,
        totalRemaining: 0,
        totalProfit: 0,
        count: 0,
        cashSales: 0,
        installmentSales: 0,
        mixedSales: 0,
        completedSales: 0,
        pendingSales: 0,
      };
      const o = byCur[c];
      o.totalSales += s.total ?? 0;
      o.totalPaid += s.paidAmount ?? 0;
      o.totalRemaining += s.remainingAmount ?? 0;
      o.count += 1;
      if (s.paymentType) o[`${s.paymentType}Sales`] += 1;
      o[`${s.status}Sales`] += 1;
    }

    // 4️⃣ نحسب الربح من العناصر (itemProfit = (unitPrice - costPrice) * quantity)
    for (const item of items) {
      const c = item.currency || 'USD';
      const profit = (item.unitPrice - (item.productCost ?? 0)) * item.quantity;
      byCur[c].totalProfit += profit;
    }

    // 5️⃣ نحسب المتوسطات والتقرير النهائي
    const usd = byCur['USD'] ?? {};
    const iqd = byCur['IQD'] ?? {};
    const allCount = Object.values(byCur).reduce((a, d) => a + (d.count || 0), 0);

    return {
      salesUSD: usd.totalSales || 0,
      paidUSD: usd.totalPaid || 0,
      profitUSD: usd.totalProfit || 0,
      avgSaleUSD: usd.count ? (usd.totalSales / usd.count).toFixed(2) : 0,

      salesIQD: iqd.totalSales || 0,
      paidIQD: iqd.totalPaid || 0,
      profitIQD: iqd.totalProfit || 0,
      avgSaleIQD: iqd.count ? (iqd.totalSales / iqd.count).toFixed(2) : 0,

      count: allCount,
      completedSales: (usd.completedSales || 0) + (iqd.completedSales || 0),
      pendingSales: (usd.pendingSales || 0) + (iqd.pendingSales || 0),
      overdueInstallments: (
        await db
          .select()
          .from(installments)
          .where(
            and(
              eq(installments.status, 'pending'),
              lte(installments.dueDate, new Date().toISOString().split('T')[0])
            )
          )
          .all()
      ).length,
    };
  }

  // const response = await api.post(`/sales/${this.currentSale.id}/payments`, paymentData);

  async removePayment(saleId, paymentId, userId) {
    const [payment] = await db.select().from(payments).where(eq(payments.id, paymentId)).limit(1);

    if (!payment) {
      throw new Error('Payment not found');
    }

    // Check if the user is authorized to remove the payment
    if (payment.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await db.delete().from(payments).where(eq(payments.id, paymentId));

    return payment;
  }
}
