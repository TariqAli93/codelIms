import db from '../db.js';
import { customers } from '../models/index.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';
import { eq, like, or, desc, count } from 'drizzle-orm';

export class CustomerService {
  async create(customerData, userId) {
    // Check for duplicate phone
    const [existing] = await db
      .select()
      .from(customers)
      .where(eq(customers.phone, customerData.phone))
      .limit(1);

    if (existing) {
      throw new ConflictError('Customer with this phone number already exists');
    }

    const [newCustomer] = await db
      .insert(customers)
      .values({
        ...customerData,
        createdBy: userId,
      })
      .returning();

    return newCustomer;
  }

  async getAll(filters = {}) {
    const { page = 1, limit = 10, search } = filters;
    const offset = (page - 1) * limit;

    let query = db.select().from(customers);

    if (search) {
      query = query.where(
        or(like(customers.name, `%${search}%`), like(customers.phone, `%${search}%`))
      );
    }

    const results = await query.orderBy(desc(customers.createdAt)).limit(limit).offset(offset);

    const [{ total }] = await db.select({ total: count() }).from(customers);

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
    const [customer] = await db.select().from(customers).where(eq(customers.id, id)).limit(1);

    if (!customer) {
      throw new NotFoundError('Customer');
    }

    return customer;
  }

  async update(id, customerData) {
    const [updated] = await db
      .update(customers)
      .set({
        ...customerData,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(customers.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundError('Customer');
    }

    return updated;
  }

  async delete(id) {
    const [deleted] = await db.delete(customers).where(eq(customers.id, id)).returning();

    if (!deleted) {
      throw new NotFoundError('Customer');
    }

    return { message: 'Customer deleted successfully' };
  }

  async updateDebt(customerId, amount) {
    const customer = await this.getById(customerId);

    const [updated] = await db
      .update(customers)
      .set({
        totalDebt: (customer.totalDebt || 0) + amount,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(customers.id, customerId))
      .returning();

    return updated;
  }
}
