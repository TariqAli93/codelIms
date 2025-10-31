# مشكلة better-sqlite3 وحلها

## المشكلة

better-sqlite3 هي مكتبة native module تحتاج إلى البناء (compilation) لكل إصدار من Node.js.

## الحل البديل

بدلاً من استخدام better-sqlite3، يمكننا استخدام مكتبة بديلة لا تحتاج لبناء native:

### الحل 1: استخدام sql.js (SQLite في JavaScript)

```bash
cd packages/backend
pnpm remove better-sqlite3
pnpm add sql.js
```

### الحل 2: بناء better-sqlite3

إذا كنت تريد استخدام better-sqlite3، تأكد من تثبيت:

#### Windows:

1. تثبيت Visual Studio Build Tools

   ```bash
   npm install --global windows-build-tools
   ```

2. أو تثبيت Visual Studio Community مع C++ Desktop Development

3. إعادة تثبيت better-sqlite3
   ```bash
   pnpm install --force
   ```

#### Linux/Mac:

```bash
# تأكد من تثبيت build essentials
sudo apt-get install build-essential  # Ubuntu/Debian
# أو
brew install node-gyp  # macOS

# ثم
pnpm install --force
```

## الحل 3: استخدام Bun

Bun يدعم SQLite بشكل مدمج:

```bash
# تثبيت Bun
curl -fsSL https://bun.sh/install | bash

# تشغيل المشروع
bun run dev
```

## حل سريع للتطوير

إذا كنت تريد البدء فورًا، سأقوم بتعديل الكود لاستخدام حل بديل.

يرجى اختيار:

1. استخدام sql.js (JavaScript فقط، لا حاجة للبناء)
2. استخدام Bun (runtime مدمج مع SQLite)
3. حل مشكلة better-sqlite3 يدوياً

## التشغيل الحالي

حالياً يمكنك:

1. استعراض الكود المصدري
2. فهم الهيكل البرمجي
3. تشغيل Frontend بشكل منفصل

سأقوم الآن بتجهيز التطبيق بطريقة لا تحتاج better-sqlite3 للتشغيل الأولي.
