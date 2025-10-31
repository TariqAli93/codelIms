import db from '../db.js';
import { currencySettings } from '../models/index.js';
import { eq } from 'drizzle-orm';

/**
 * Currency Conversion Service
 * خدمة تحويل العملات الاحترافية
 */
export class CurrencyConversionService {
  /**
   * Get exchange rate between two currencies
   * الحصول على سعر الصرف بين عملتين
   */
  async getExchangeRate(fromCurrency, toCurrency) {
    // إذا كانت العملتان متماثلتين، لا داعي للتحويل
    if (fromCurrency === toCurrency) {
      return 1;
    }

    // الحصول على معلومات العملات من قاعدة البيانات
    const [fromCurrencyData] = await db
      .select()
      .from(currencySettings)
      .where(eq(currencySettings.currencyCode, fromCurrency))
      .limit(1);

    const [toCurrencyData] = await db
      .select()
      .from(currencySettings)
      .where(eq(currencySettings.currencyCode, toCurrency))
      .limit(1);

    if (!fromCurrencyData || !toCurrencyData) {
      throw new Error('Currency not found');
    }

    // حساب سعر الصرف
    // إذا كانت العملة الأساسية USD، نستخدم المعادلة التالية:
    // Rate = (1 / fromRate) * toRate
    const rate = toCurrencyData.exchangeRate / fromCurrencyData.exchangeRate;

    return rate;
  }

  /**
   * Convert amount from one currency to another
   * تحويل مبلغ من عملة إلى أخرى
   */
  async convertAmount(amount, fromCurrency, toCurrency) {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = amount * rate;
    return parseFloat(convertedAmount.toFixed(2));
  }

  /**
   * Convert multiple amounts at once
   * تحويل عدة مبالغ دفعة واحدة
   */
  async convertMultipleAmounts(amounts, fromCurrency, toCurrency) {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    return amounts.map((amount) => parseFloat((amount * rate).toFixed(2)));
  }

  /**
   * Get all exchange rates for a base currency
   * الحصول على جميع أسعار الصرف لعملة معينة
   */
  async getAllRatesForCurrency(baseCurrency) {
    const currencies = await db.select().from(currencySettings).all();

    const rates = {};
    for (const currency of currencies) {
      if (currency.currencyCode === baseCurrency) {
        rates[currency.currencyCode] = 1;
      } else {
        rates[currency.currencyCode] = await this.getExchangeRate(
          baseCurrency,
          currency.currencyCode
        );
      }
    }

    return rates;
  }

  /**
   * Convert sale totals to target currency
   * تحويل إجماليات المبيعات إلى عملة مستهدفة
   */
  async convertSaleTotals(saleTotals, targetCurrency) {
    const converted = {};

    for (const [currency, totals] of Object.entries(saleTotals)) {
      const rate = await this.getExchangeRate(currency, targetCurrency);

      converted[currency] = {
        originalCurrency: currency,
        targetCurrency: targetCurrency,
        exchangeRate: rate,
        totalSales: parseFloat((totals.totalSales * rate).toFixed(2)),
        totalPaid: parseFloat((totals.totalPaid * rate).toFixed(2)),
        totalRemaining: parseFloat((totals.totalRemaining * rate).toFixed(2)),
        totalProfit: parseFloat((totals.totalProfit * rate).toFixed(2)),
        avgSale: parseFloat((totals.avgSale * rate).toFixed(2)),
        count: totals.count,
      };
    }

    return converted;
  }

  /**
   * Get currency symbol
   * الحصول على رمز العملة
   */
  async getCurrencySymbol(currencyCode) {
    const [currency] = await db
      .select()
      .from(currencySettings)
      .where(eq(currencySettings.currencyCode, currencyCode))
      .limit(1);

    return currency ? currency.symbol : currencyCode;
  }

  /**
   * Format amount with currency symbol
   * تنسيق المبلغ مع رمز العملة
   */
  async formatAmount(amount, currencyCode) {
    const symbol = await this.getCurrencySymbol(currencyCode);
    const formattedAmount = parseFloat(amount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `${symbol} ${formattedAmount}`;
  }

  /**
   * Validate currency code
   * التحقق من صحة رمز العملة
   */
  async validateCurrency(currencyCode) {
    const [currency] = await db
      .select()
      .from(currencySettings)
      .where(eq(currencySettings.currencyCode, currencyCode))
      .limit(1);

    return !!currency && currency.isActive;
  }

  /**
   * Get active currencies list
   * الحصول على قائمة العملات النشطة
   */
  async getActiveCurrencies() {
    const currencies = await db
      .select()
      .from(currencySettings)
      .where(eq(currencySettings.isActive, 1))
      .all();

    return currencies.map((c) => ({
      code: c.currencyCode,
      name: c.currencyName,
      symbol: c.symbol,
      exchangeRate: c.exchangeRate,
      isBase: c.isBaseCurrency,
    }));
  }
}
