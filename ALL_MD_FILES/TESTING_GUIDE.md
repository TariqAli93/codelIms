# Testing Guide - CodeLIMS Sales System

## Overview

This guide provides comprehensive testing procedures for the sales system, focusing on:

1. Installment Management
2. Sale Status Automation
3. Reports Data Accuracy
4. Inventory Updates
5. Payment Distribution

---

## Pre-Testing Setup

### 1. Start Backend Server

```bash
cd packages/backend
pnpm dev
```

Server should start on http://localhost:3000

### 2. Start Frontend Application

```bash
cd packages/frontend
pnpm dev
```

Application should start on http://localhost:5173

### 3. Login

- Username: `admin`
- Password: `admin123`

---

## Test Suite 1: Installment Management

### Test 1.1: Create Sale with Installments

**Steps:**

1. Navigate to **Sales → New Sale**
2. Select a customer (or use Quick Add Customer)
3. Add products to the sale
4. Set **Payment Type** to "تقسيط" (Installment)
5. Verify **Installment Count** field appears
6. Set installment count to `3`
7. Enter paid amount less than total (e.g., if total is 300, enter 100)
8. Click **Save Sale**

**Expected Results:**

- ✅ Sale created successfully with status "pending"
- ✅ 3 installments created in database
- ✅ Each installment has:
  - `dueAmount` = (totalAmount - paidAmount) / installmentCount
  - `paidAmount` = 0
  - `remainingAmount` = dueAmount
  - `status` = "pending"
  - `dueDate` = current date + (installmentNumber) months
- ✅ First installment due date: current date + 1 month
- ✅ Second installment due date: current date + 2 months
- ✅ Third installment due date: current date + 3 months

**Verify in Backend:**

```bash
# Check database directly
sqlite3 packages/backend/data/codelims.db
SELECT * FROM installments WHERE sale_id = <sale_id>;
```

---

### Test 1.2: Mixed Payment Type

**Steps:**

1. Create new sale with payment type "مختلط" (Mixed)
2. Set installment count to `4`
3. Pay 50% of total upfront
4. Save sale

**Expected Results:**

- ✅ 4 installments created
- ✅ Remaining 50% distributed across 4 installments
- ✅ Monthly due dates calculated correctly

---

## Test Suite 2: Payment Distribution

### Test 2.1: Partial Payment

**Steps:**

1. Find a sale with installments (from Test 1.1)
2. Navigate to **Sales → View Sales**
3. Click on the sale to view details
4. Make a payment less than first installment amount
5. Verify payment distribution

**Backend API Test:**

```bash
# Make payment via API
curl -X POST http://localhost:3000/api/sales/1/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "amount": 50,
    "currency": "USD",
    "paymentMethod": "cash",
    "notes": "Test partial payment"
  }'
```

**Expected Results:**

- ✅ Payment recorded in `payments` table
- ✅ First installment `paidAmount` increased by 50
- ✅ First installment `remainingAmount` decreased by 50
- ✅ First installment status still "pending" (if not fully paid)
- ✅ Sale `paidAmount` increased by 50
- ✅ Sale `remainingAmount` decreased by 50
- ✅ Sale status remains "pending"

---

### Test 2.2: Full Installment Payment

**Steps:**

1. Make a payment equal to first installment `remainingAmount`
2. Verify installment marked as paid

**Expected Results:**

- ✅ First installment `remainingAmount` = 0
- ✅ First installment status changed to "paid"
- ✅ First installment `paidDate` set to current date
- ✅ Payment moves to second installment automatically

---

### Test 2.3: Complete Payment

**Steps:**

1. Make payment equal to sale's total `remainingAmount`
2. Verify sale status automation

**Expected Results:**

- ✅ All installments marked as "paid"
- ✅ All installments have `paidDate` set
- ✅ Sale `remainingAmount` = 0
- ✅ **Sale status automatically changed to "completed"**
- ✅ Customer debt updated correctly

---

## Test Suite 3: Inventory Management

### Test 3.1: Stock Validation

**Steps:**

1. Check product stock: Go to **Products**, note stock quantity
2. Create sale with quantity greater than available stock
3. Attempt to save

**Expected Results:**

- ✅ Error message: "منتج X ليس لديه مخزون كافي"
- ✅ Sale not created
- ✅ Stock unchanged

---

### Test 3.2: Stock Decrement on Sale

**Steps:**

1. Note product stock before sale (e.g., 100 units)
2. Create sale with 10 units of product
3. Check product stock after sale

**Expected Results:**

- ✅ Product stock decreased by 10 (now 90 units)
- ✅ Stock value is **actual number**, not SQL expression

**Verify:**

```bash
sqlite3 packages/backend/data/codelims.db
SELECT name, stock FROM products WHERE id = <product_id>;
```

---

### Test 3.3: Stock Restoration on Cancellation

**Steps:**

1. Note stock before cancellation (e.g., 90 units)
2. Cancel the sale from Test 3.2
3. Check stock after cancellation

**Expected Results:**

- ✅ Product stock restored to original value (100 units)
- ✅ Sale status changed to "cancelled"
- ✅ All pending installments status changed to "cancelled"
- ✅ Customer debt adjusted correctly

---

## Test Suite 4: Reports Accuracy

### Test 4.1: Basic Metrics

**Steps:**

1. Navigate to **Reports**
2. Select date range covering test sales
3. Select currency (USD or IQD)
4. Click "عرض التقرير"

**Expected Results:**
All 8 cards display correct data:

- ✅ **عدد المبيعات** (Sales Count): Total number of sales
- ✅ **إجمالي المبيعات** (Total Sales): Sum of all sale totals
- ✅ **إجمالي المدفوع** (Total Paid): Sum of all paidAmount
- ✅ **إجمالي المتبقي** (Total Remaining): Sum of all remainingAmount
- ✅ **متوسط المبيعات** (Average Sale): totalSales / salesCount
- ✅ **مبيعات نقدية** (Cash Sales): Count of paymentType = 'cash'
- ✅ **مبيعات التقسيط** (Installment Sales): Count of paymentType = 'installment'
- ✅ **الأقساط المتأخرة** (Overdue Installments): Count where dueDate < today AND status = 'pending'

---

### Test 4.2: Currency Filter

**Steps:**

1. Create sales in both USD and IQD
2. Filter reports by USD
3. Filter reports by IQD

**Expected Results:**

- ✅ Reports show only sales in selected currency
- ✅ Amounts formatted correctly ($ for USD, IQD for IQD)

---

### Test 4.3: Date Range Filter

**Steps:**

1. Create sales on different dates
2. Set specific date range (e.g., last 7 days)
3. View report

**Expected Results:**

- ✅ Only sales within date range included
- ✅ Metrics calculated correctly for filtered data

---

## Test Suite 5: Sale Status Automation

### Test 5.1: Status Transition (Pending → Completed)

**Steps:**

1. Create sale with status "pending" (paid less than total)
2. Make payments until `remainingAmount` = 0
3. Check sale status

**Expected Results:**

- ✅ Sale status **automatically** changes to "completed"
- ✅ No manual status change needed
- ✅ All installments marked as "paid"

---

### Test 5.2: Cancelled Sale Status

**Steps:**

1. Create sale
2. Cancel sale
3. Check status

**Expected Results:**

- ✅ Sale status changed to "cancelled"
- ✅ Cannot make payments on cancelled sale
- ✅ Inventory restored

---

## Test Suite 6: Integration Tests

### Test 6.1: End-to-End Sale Workflow

**Complete Workflow:**

1. **Create Customer**
   - Use Quick Add Customer in sales form
   - Name: "Test Customer"
   - Phone: "07XX XXX XXXX"

2. **Create Sale**
   - Add 2 products
   - Total: 500 USD
   - Payment Type: Installment
   - Installment Count: 5
   - Paid Amount: 100 USD
   - Expected: 400 USD remaining in 5 installments of 80 USD each

3. **Verify Installments**
   - 5 installments created
   - Each dueAmount = 80 USD
   - Due dates: Month 1, 2, 3, 4, 5

4. **Make First Payment**
   - Amount: 80 USD
   - First installment fully paid
   - Sale status still "pending"

5. **Make Second Payment**
   - Amount: 160 USD (pays 2 installments)
   - Installments 2 and 3 marked as paid
   - Sale status still "pending"

6. **Make Final Payment**
   - Amount: 160 USD (remaining)
   - Installments 4 and 5 marked as paid
   - **Sale status automatically changes to "completed"**

7. **Verify Reports**
   - Navigate to Reports
   - Verify sale appears in totals
   - Verify no overdue installments

8. **Check Inventory**
   - Product stocks decreased correctly
   - Stock values are numbers, not expressions

**Expected Final State:**

- ✅ Sale status: "completed"
- ✅ All installments paid
- ✅ Customer debt: 0
- ✅ Inventory updated correctly
- ✅ Reports show accurate data

---

### Test 6.2: Cancellation Workflow

**Steps:**

1. Create sale with installments
2. Make partial payment (1 installment)
3. Cancel sale
4. Verify restoration

**Expected Results:**

- ✅ Inventory fully restored
- ✅ All installments cancelled
- ✅ Sale status: "cancelled"
- ✅ Customer debt adjusted
- ✅ Cannot make further payments

---

## Test Suite 7: Edge Cases

### Test 7.1: Zero Paid Amount

**Steps:**

1. Create sale with paidAmount = 0
2. All amount in installments

**Expected Results:**

- ✅ Sale created with status "pending"
- ✅ All installments have full dueAmount
- ✅ No errors

---

### Test 7.2: Full Cash Payment

**Steps:**

1. Create sale with payment type "نقدي" (Cash)
2. Pay full amount upfront

**Expected Results:**

- ✅ No installments created
- ✅ Sale status immediately "completed"
- ✅ remainingAmount = 0

---

### Test 7.3: Single Installment

**Steps:**

1. Create sale with installmentCount = 1
2. Verify behavior

**Expected Results:**

- ✅ 1 installment created
- ✅ Due date = current date + 1 month
- ✅ Works correctly

---

## Database Verification Queries

### Check Sale Details

```sql
SELECT * FROM sales WHERE id = <sale_id>;
```

### Check Installments

```sql
SELECT
  id,
  installment_number,
  due_amount,
  paid_amount,
  remaining_amount,
  status,
  due_date,
  paid_date
FROM installments
WHERE sale_id = <sale_id>
ORDER BY installment_number;
```

### Check Payments

```sql
SELECT * FROM payments WHERE sale_id = <sale_id>;
```

### Check Product Stock

```sql
SELECT name, stock FROM products WHERE id = <product_id>;
```

### Check Customer Debt

```sql
SELECT name, debt FROM customers WHERE id = <customer_id>;
```

---

## Automated Testing Checklist

After completing manual tests, verify:

- [ ] All installments have correct due dates (monthly intervals)
- [ ] Payments distribute sequentially across installments
- [ ] Sale status automats from "pending" to "completed"
- [ ] Inventory uses actual stock values, not SQL expressions
- [ ] Stock validation prevents overselling
- [ ] Cancellation restores inventory correctly
- [ ] Reports show all 8 metrics accurately
- [ ] Currency filters work correctly
- [ ] Date range filters work correctly
- [ ] Overdue installments counted correctly
- [ ] Database persistence works (saveDatabase() called)
- [ ] No console errors in browser
- [ ] No errors in backend logs

---

## Known Issues to Watch For

1. **Database Persistence**: Verify `saveDatabase()` is called after critical operations
2. **Stock Calculation**: Ensure using `product.stock` not `stock - quantity`
3. **Status Automation**: Check `remainingAmount <= 0` triggers status change
4. **Installment Distribution**: Payments should fill installments sequentially
5. **Date Calculations**: Verify monthly intervals are correct

---

## Success Criteria

All tests pass when:

- ✅ No errors in console or logs
- ✅ All database values are correct
- ✅ UI reflects accurate data
- ✅ Inventory management is accurate
- ✅ Reports show real-time data
- ✅ Status transitions are automatic
- ✅ Installments work as expected

---

## Next Steps After Testing

1. Document any bugs found
2. Create bug reports
3. Implement fixes
4. Re-test affected areas
5. Performance testing (large datasets)
6. User acceptance testing

---

## Support

If you encounter issues during testing:

1. Check backend logs: `packages/backend/logs/`
2. Check browser console for frontend errors
3. Verify database state with SQL queries
4. Check `TROUBLESHOOTING.md` for common issues
