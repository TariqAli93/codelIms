# تشغيل CodeLIMS - دليل سريع

## المتطلبات

```bash
node --version  # يجب أن يكون >= 20.0.0
pnpm --version  # يجب أن يكون >= 9.0.0
```

## الإعداد السريع

### 1. تثبيت المكتبات

```bash
pnpm install
```

### 2. إعداد قاعدة البيانات

```bash
cd packages/backend
cp .env.example .env
pnpm db:generate
```

### 3. حل مشكلة better-sqlite3

#### الخيار A: Windows Build Tools

```bash
# افتح PowerShell كمسؤول:
npm install --global --production windows-build-tools
pnpm install --force
```

#### الخيار B: استخدام Bun (الأسهل)

```bash
# تثبيت Bun
irm bun.sh/install.ps1 | iex  # PowerShell
# أو
curl -fsSL https://bun.sh/install | bash  # Linux/Mac

# تشغيل
cd packages/backend
bun src/seed.js
bun src/server.js
```

### 4. إنشاء البيانات الأولية

```bash
# بعد حل مشكلة better-sqlite3:
cd packages/backend
node src/seed.js
```

### 5. التشغيل

#### Terminal 1 - Backend:

```bash
pnpm dev:backend
```

#### Terminal 2 - Frontend:

```bash
pnpm dev
```

#### أو استخدم Electron:

```bash
cd packages/frontend
pnpm electron:dev
```

## بيانات الدخول الافتراضية

```
Username: admin
Password: admin123
```

## الأوامر المتاحة

### Root Level:

```bash
pnpm dev                 # تشغيل Frontend
pnpm dev:backend         # تشغيل Backend
pnpm build               # بناء الكل
pnpm build:electron      # بناء تطبيق Electron
pnpm lint                # فحص الكود
pnpm format              # تنسيق الكود
```

### Backend (packages/backend):

```bash
pnpm dev                 # تشغيل في وضع التطوير
pnpm start               # تشغيل في وضع الإنتاج
pnpm db:generate         # إنشاء migrations
pnpm db:studio           # فتح Drizzle Studio
```

### Frontend (packages/frontend):

```bash
pnpm dev                 # تشغيل Vite dev server
pnpm build               # بناء للإنتاج
pnpm electron:dev        # تشغيل Electron في وضع التطوير
pnpm electron:build      # بناء تطبيق Electron
```

## الوصول للتطبيق

### Frontend (المتصفح):

```
http://localhost:5173
```

### Backend API:

```
http://localhost:3000
```

### API Health Check:

```bash
curl http://localhost:3000/health
```

## الهيكل

```
codelIms/
├── packages/
│   ├── backend/           # Fastify API
│   │   ├── src/
│   │   │   ├── server.js
│   │   │   ├── models/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   └── routes/
│   │   └── data/          # قاعدة البيانات (يتم إنشاؤها تلقائياً)
│   │
│   └── frontend/          # Vue + Electron
│       ├── src/
│       │   ├── views/
│       │   ├── stores/
│       │   └── router/
│       └── electron/
│
└── README.md
```

## المشاكل الشائعة

### 1. better-sqlite3 build error

✅ **الحل**: راجع SETUP_GUIDE.md للحلول المختلفة

### 2. Port already in use

```bash
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### 3. ENOENT: no such file or directory

```bash
# تأكد من أنك في المسار الصحيح
cd d:/developer/frontend/codelIms
```

## نصائح للتطوير

### 1. مراقبة Backend logs:

```bash
cd packages/backend
pnpm dev
# سترى جميع الطلبات والأخطاء
```

### 2. استخدام Drizzle Studio:

```bash
cd packages/backend
pnpm db:studio
# سيفتح واجهة مرئية لقاعدة البيانات
```

### 3. Hot Reload:

- Frontend: تحديث تلقائي (Vite HMR)
- Backend: تحديث تلقائي (node --watch)

### 4. إضافة بيانات تجريبية:

```bash
# يمكنك تعديل src/seed.js وإضافة بيانات أكثر
node src/seed.js
```

## الإنتاج

### بناء للإنتاج:

```bash
# بناء Backend
cd packages/backend
pnpm build

# بناء Frontend
cd packages/frontend
pnpm build

# بناء تطبيق Electron
pnpm build:electron
```

### الملف التنفيذي:

```
packages/frontend/dist-electron/
├── win-unpacked/          # Windows
├── CodeLIMS Setup.exe     # Windows Installer
└── latest.yml
```

## الدعم

- 📖 README.md - الوثائق الكاملة
- 🔧 SETUP_GUIDE.md - دليل الإعداد التفصيلي
- ❗ TROUBLESHOOTING.md - حل المشاكل

## الترخيص

MIT License - CodeLIMS © 2025
