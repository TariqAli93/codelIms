# 🚀 Quick Start - Sales System Testing

## Run the Application

### Terminal 1 - Backend:

```bash
cd packages/backend
pnpm dev
```

**Expected**: Server running on http://localhost:3000

### Terminal 2 - Frontend:

```bash
cd packages/frontend
pnpm dev
```

**Expected**: App running on http://localhost:5173

---

## Quick Test (5 minutes)

### 1. Login

- Open: http://localhost:5173
- Username: `admin`
- Password: `admin123`

### 2. Create Sale with Installments

1. Navigate to **Sales → New Sale**
2. Select/Create customer
3. Add products
4. Set **Payment Type** to "تقسيط"
5. Set **Installment Count** to `3`
6. Enter partial payment (e.g., if total is 300, pay 100)
7. Click **Save**

**✅ Expected**: Sale created with 3 installments

### 3. Verify Installments

1. Go to **Sales → View Sales**
2. Click on the sale you just created
3. Check installments section

**✅ Expected**:

- 3 installments visible
- Each with due date (monthly intervals)
- Status: "pending"

### 4. Make Payment

1. Click "Add Payment" button
2. Enter amount (e.g., 100)
3. Submit

**✅ Expected**:

- Payment recorded
- Installments updated
- Remaining amount decreased

### 5. Complete Payment

1. Add remaining amount as payment
2. Check sale status

**✅ Expected**:

- Sale status automatically changes to "completed"
- All installments marked as "paid"

### 6. Check Reports

1. Navigate to **Reports**
2. View the 8 metrics

**✅ Expected**:

- All 8 cards show data
- Numbers match your sales

---

## API Test (Automated)

### Windows:

```powershell
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

### Linux/Mac:

```bash
bash test-api.sh
```

**✅ Expected**: All tests pass with green checkmarks

---

## Key Features to Test

### ✅ Installment Creation

- [ ] Installments auto-created
- [ ] Due dates are monthly (1, 2, 3 months)
- [ ] Amount divided equally

### ✅ Payment Distribution

- [ ] Payments fill installments sequentially
- [ ] First installment paid first
- [ ] Status updates to "paid" when complete

### ✅ Status Automation

- [ ] Sale starts as "pending"
- [ ] Auto-changes to "completed" when fully paid
- [ ] No manual status change needed

### ✅ Inventory Management

- [ ] Stock decreases on sale
- [ ] Cannot sell if stock insufficient
- [ ] Stock restored on cancellation

### ✅ Reports

- [ ] 8 metrics displayed
- [ ] Data accurate
- [ ] Filters work (date, currency)

---

## Common Issues

### Backend not starting?

```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Kill process if needed
taskkill /PID <PID> /F
```

### Frontend not starting?

```bash
# Clear cache
cd packages/frontend
rm -rf node_modules/.vite
pnpm dev
```

### Database issues?

```bash
# Reset database (development only!)
cd packages/backend
rm data/codelims.db
node src/seed.js
```

---

## Full Testing Guide

For comprehensive testing:
👉 See `TESTING_GUIDE.md`

For implementation details:
👉 See `SALES_ENHANCEMENTS.md`

---

## Success Indicators

✅ **Backend**:

- Console shows "Server listening at http://localhost:3000"
- No errors in logs

✅ **Frontend**:

- Browser opens at http://localhost:5173
- No console errors
- Login page appears

✅ **Sales System**:

- Installments created automatically
- Payments distribute correctly
- Status updates automatically
- Inventory manages correctly
- Reports show accurate data

---

## Need Help?

1. Check `TROUBLESHOOTING.md`
2. Review backend logs
3. Check browser console
4. Verify database with SQL queries

---

**Happy Testing! 🎉**
