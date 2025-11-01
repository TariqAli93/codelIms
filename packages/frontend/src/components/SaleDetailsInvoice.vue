<template>
  <div class="print-container">
    <!-- ===== HEADER ===== -->
    <header class="invoice-header">
      <div>
        <h4>فاتورة بيع</h4>
        <p>
          رقم الفاتورة: <strong>{{ props.sale.invoiceNumber }}</strong>
        </p>
        <p>التاريخ: {{ toYmd(props.sale.createdAt) }}</p>

        <div class="status-chip" :class="props.sale.status">
          {{ getStatusText(props.sale.status) }}
        </div>
      </div>

      <div>
        <h4>اسم الشركة</h4>
        <p>العنوان: شارع المثال، المدينة، البلد</p>
        <p>الهاتف: +964 123 456 7890</p>
        <p>البريد الإلكتروني: example@example.com</p>
      </div>
    </header>

    <hr class="divider" />

    <!-- ===== CUSTOMER & PAYMENT INFO ===== -->
    <section class="info-section">
      <div>
        <h5>معلومات العميل</h5>
        <p><strong>الاسم:</strong> {{ props.sale.customerName }}</p>
        <p><strong>الهاتف:</strong> {{ props.sale.customerPhone || 'غير متوفر' }}</p>
      </div>
      <div>
        <h5>معلومات الدفع</h5>
        <p><strong>نوع الدفع:</strong> {{ getPaymentTypeText(props.sale.paymentType) }}</p>
        <p><strong>العملة:</strong> {{ props.sale.currency }}</p>
        <p>
          <strong>المدفوع:</strong>
          <span class="success">{{ formatCurrency(props.sale.paidAmount) }}</span>
        </p>
        <p>
          <strong>المتبقي:</strong>
          <span :class="props.sale.remainingAmount > 0 ? 'error' : 'success'">
            {{ formatCurrency(props.sale.remainingAmount) }}
          </span>
        </p>
      </div>
      <div>
        <h5>الإجمالي</h5>
        <p class="total">{{ formatCurrency(props.sale.total) }}</p>
      </div>
    </section>

    <hr class="divider" />

    <!-- ===== PRODUCTS ===== -->
    <section class="table-section">
      <h5>تفاصيل المنتجات</h5>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>المنتج</th>
            <th>الكمية</th>
            <th>سعر الوحدة</th>
            <th>المجموع</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in props.sale.items" :key="item.id">
            <td>{{ i + 1 }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatCurrency(item.unitPrice) }}</td>
            <td>{{ formatCurrency(item.subtotal) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ===== INSTALLMENTS ===== -->
    <section v-if="props.sale.installments?.length" class="table-section">
      <h5>جدول الأقساط</h5>
      <table>
        <thead>
          <tr>
            <th>رقم القسط</th>
            <th>المستحق</th>
            <th>المدفوع</th>
            <th>المتبقي</th>
            <th>الاستحقاق</th>
            <th>الدفع</th>
            <th>الحالة</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="inst in props.sale.installments" :key="inst.id">
            <td>{{ inst.installmentNumber }}</td>
            <td>{{ formatCurrency(inst.dueAmount) }}</td>
            <td class="success">{{ formatCurrency(inst.paidAmount) }}</td>
            <td :class="inst.remainingAmount > 0 ? 'error' : 'success'">
              {{ formatCurrency(inst.remainingAmount) }}
            </td>
            <td>{{ toYmd(inst.dueDate) }}</td>
            <td>{{ inst.paidDate ? toYmd(inst.paidDate) : '-' }}</td>
            <td>{{ getInstallmentStatusLabel(inst) }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ===== PAYMENTS ===== -->
    <section v-if="props.sale.payments?.length" class="table-section">
      <h5>سجل الدفعات</h5>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>المبلغ</th>
            <th>طريقة الدفع</th>
            <th>التاريخ</th>
            <th>ملاحظات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in props.sale.payments" :key="p.id">
            <td>{{ i + 1 }}</td>
            <td class="success">{{ formatCurrency(p.amount) }}</td>
            <td>{{ getPaymentMethodText(p.paymentMethod) }}</td>
            <td>{{ toYmd(p.createdAt) }}</td>
            <td>{{ p.notes || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ===== FOOTER ===== -->
    <footer class="invoice-footer">
      <p>تم إنشاء هذه الفاتورة إلكترونيًا بواسطة النظام</p>
    </footer>
  </div>
</template>

<script setup>
const props = defineProps({
  sale: {
    type: Object || null,
    required: true,
  },
});

const formatCurrency = (val) => `${parseFloat(val).toLocaleString()} IQD`;
const toYmd = (d) => new Date(d).toISOString().split('T')[0];

const getStatusText = (s) =>
  ({
    completed: 'مكتمل',
    pending: 'غير مكتمل',
    cancelled: 'ملغي',
  })[s] || s;

const getPaymentTypeText = (t) => ({ cash: 'نقدي', installment: 'تقسيط' })[t] || t;

const getPaymentMethodText = (m) =>
  ({ cash: 'نقدي', card: 'بطاقة', bank_transfer: 'تحويل بنكي' })[m] || m;

const getInstallmentStatusLabel = (i) =>
  i.status === 'paid' ? 'مدفوع' : new Date(i.dueDate) < new Date() ? 'متأخر' : 'قيد الانتظار';
</script>

<style scoped>
.print-container {
  direction: rtl;
  font-family: 'Cairo', sans-serif;
  color: #222;
  padding: 32px;
  background: #fff;
  max-width: 900px;
  margin: 0 auto;
}
.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.invoice-header h4 {
  margin: 0;
  color: #1565c0;
}
.status-chip {
  padding: 5px;
  border-radius: 8px;
  font-weight: 600;
  color: #fff;
  text-align: start;
}
.status-chip.pending {
  color: #ffb300;
}
.status-chip.completed {
  color: #43a047;
}
.status-chip.cancelled {
  color: #e53935;
}
.info-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
}
.info-section div {
  flex: 1;
  min-width: 250px;
}
.table-section {
  margin-top: 32px;
}
.table-section table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}
.table-section th,
.table-section td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
  font-size: 14px;
}
.table-section th {
  background: #f5f5f5;
  font-weight: 600;
}
.total {
  font-size: 20px;
  font-weight: bold;
  color: #1565c0;
}
.success {
  color: #2e7d32;
}
.error {
  color: #c62828;
}
.divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
}
.invoice-footer {
  text-align: center;
  font-size: 13px;
  color: #666;
  margin-top: 40px;
}
@media print {
  body {
    background: #fff !important;
  }
  .print-container {
    box-shadow: none !important;
    margin: 0;
    padding: 16mm;
  }
  .no-print {
    display: none !important;
  }
}
</style>
