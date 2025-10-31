import bcrypt from 'bcryptjs';

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if match
 */
export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Generate unique invoice number
 * @returns {string} Invoice number
 */
export function generateInvoiceNumber() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `INV-${timestamp}-${random}`;
}

/**
 * Calculate exchange rate conversion
 * @param {number} amount - Amount to convert
 * @param {number} rate - Exchange rate
 * @returns {number} Converted amount
 */
export function convertCurrency(amount, rate) {
  return parseFloat((amount * rate).toFixed(2));
}

/**
 * Format currency display
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = 'USD') {
  const symbols = {
    USD: '$',
    IQD: 'IQD',
  };

  return `${symbols[currency] || currency} ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Calculate sale totals with discount and tax
 * @param {Array} items - Sale items
 * @param {number} discount - Discount percentage or amount
 * @param {number} tax - Tax percentage
 * @returns {object} Calculated totals
 */
export function calculateSaleTotals(items, discount = 0, tax = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const discountAmount = discount;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * tax) / 100;
  const total = subtotalAfterDiscount + taxAmount;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discountAmount.toFixed(2)),
    tax: parseFloat(taxAmount.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
  };
}

/**
 * Validate required fields
 * @param {object} data - Data to validate
 * @param {Array<string>} requiredFields - Required field names
 * @throws {Error} If validation fails
 */
export function validateRequiredFields(data, requiredFields) {
  const missing = requiredFields.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
}

/**
 * Sanitize string input
 * @param {string} input - Input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Generate pagination metadata
 * @param {number} total - Total items
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {object} Pagination metadata
 */
export function getPaginationMeta(total, page, limit) {
  const totalPages = Math.ceil(total / limit);
  return {
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}
