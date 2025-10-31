# 🎨 نظام الخطوط الاحترافي - Professional Typography System

## 📋 نظرة عامة

نظام خطوط احترافي متعدد اللغات مصمم خصيصاً لمشروع CodeLIMS، يدعم اللغتين العربية والإنجليزية مع تحسينات الأداء وتجربة المستخدم.

## ✨ المميزات الرئيسية

### 1. دعم متعدد اللغات

- ✅ **الإنجليزية**: خط Roboto احترافي وواضح
- ✅ **العربية**: خطوط Cairo و Tajawal مصممة خصيصاً للعربية
- ✅ **دعم RTL/LTR**: تبديل تلقائي للاتجاه
- ✅ **خطوط احتياطية**: System fonts كبديل سريع

### 2. تحسينات الأداء

- ⚡ **Progressive Loading**: تحميل الخطوط الحرجة أولاً
- 💾 **Smart Caching**: حفظ حالة التحميل في localStorage
- 🔄 **Font Loading API**: كشف تحميل الخطوط تلقائياً
- 📦 **Display Swap**: عرض نص بديل أثناء التحميل

### 3. تصميم متجاوب

- 📱 **Mobile First**: أحجام خطوط متكيفة
- 💻 **Desktop Optimized**: تحسينات للشاشات الكبيرة
- 🎯 **Breakpoints**: متوافق مع Vuetify breakpoints
- 🌓 **Dark Mode**: تعديلات للوضع الداكن

## 📁 هيكل الملفات

```
src/
├── styles/
│   └── fonts.css              # ملف CSS الرئيسي للخطوط
├── plugins/
│   └── fontLoader.js          # Plugin لإدارة تحميل الخطوط
├── assets/
│   └── fonts/                 # مجلد الخطوط المحلية (مستقبلاً)
│       ├── README.md
│       ├── roboto/
│       ├── cairo/
│       └── tajawal/
└── views/
    └── FontsDemo.vue          # صفحة توضيحية للخطوط
```

## 🚀 التثبيت والإعداد

### 1. الملفات المطلوبة

جميع الملفات تم إنشاؤها تلقائياً:

- ✅ `src/styles/fonts.css`
- ✅ `src/plugins/fontLoader.js`
- ✅ `src/views/FontsDemo.vue`
- ✅ `src/assets/fonts/README.md`

### 2. التفعيل في التطبيق

تم إضافة النظام في `src/main.js`:

```javascript
import fontLoader from './plugins/fontLoader';
import './styles/fonts.css';

app.use(fontLoader);
```

### 3. الوصول للصفحة التوضيحية

افتح المتصفح على: `http://localhost:5173/fonts-demo`

## 💡 الاستخدام

### 1. استخدام الخطوط في المكونات

#### Vue Components

```vue
<template>
  <!-- نص عربي -->
  <div class="font-arabic" dir="rtl">نص عربي بخط Cairo</div>

  <!-- نص إنجليزي -->
  <div class="font-english">English text with Roboto</div>

  <!-- نص مختلط -->
  <div class="font-sans">Mixed content - محتوى مختلط</div>
</template>
```

#### استخدام أوزان الخطوط

```vue
<template>
  <h1 class="font-arabic font-bold" dir="rtl">عنوان عريض</h1>
  <p class="font-arabic font-regular" dir="rtl">نص عادي</p>
  <span class="font-arabic font-light" dir="rtl">نص خفيف</span>
</template>
```

#### استخدام أحجام الخطوط

```vue
<template>
  <div class="text-xs">نص صغير جداً</div>
  <div class="text-base">نص أساسي</div>
  <div class="text-2xl">نص كبير جداً</div>
</template>
```

### 2. استخدام متغيرات CSS

```css
/* في ملف CSS الخاص بك */
.my-element {
  font-family: var(--font-arabic);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-relaxed);
}
```

### 3. استخدام Composable للتحقق من التحميل

```vue
<script setup>
import { useFontLoading } from '@/plugins/fontLoader';

const { fontsLoaded, fontsLoading } = useFontLoading();
</script>

<template>
  <div v-if="fontsLoaded">الخطوط محملة بنجاح!</div>
  <div v-else>جاري تحميل الخطوط...</div>
</template>
```

## 🎯 الخطوط المستخدمة

### Roboto (للغة الإنجليزية)

- **الاستخدام**: نصوص إنجليزية، أرقام، واجهات متعددة اللغات
- **الأوزان**: 100, 300, 400, 500, 700, 900
- **الأنماط**: normal, italic
- **المصدر**: Google Fonts
- **الترخيص**: Apache License 2.0

### Cairo (خط عربي رئيسي)

- **الاستخدام**: النصوص العربية الأساسية
- **الأوزان**: 200, 300, 400, 500, 600, 700, 800, 900, 1000
- **المميزات**: واضح، احترافي، مناسب للشاشات
- **المصدر**: Google Fonts
- **الترخيص**: SIL Open Font License

### Tajawal (خط عربي بديل)

- **الاستخدام**: نصوص عربية بديلة، تنوع في التصميم
- **الأوزان**: 200, 300, 400, 500, 700, 800, 900
- **المميزات**: أنيق، عصري، مريح للعين
- **المصدر**: Google Fonts
- **الترخيص**: SIL Open Font License

## 📊 الفئات المساعدة (Utility Classes)

### عائلات الخطوط

```css
.font-sans      /* Roboto, Cairo, Tajawal, sans-serif */
.font-arabic    /* Cairo, Tajawal, sans-serif */
.font-english   /* Roboto, sans-serif */
```

### أوزان الخطوط

```css
.font-thin          /* 100 */
.font-light         /* 300 */
.font-regular       /* 400 */
.font-medium        /* 500 */
.font-semibold      /* 600 */
.font-bold          /* 700 */
.font-extrabold     /* 800 */
.font-black         /* 900 */
```

### أحجام الخطوط

```css
.text-xs    /* 12px */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.text-xl    /* 20px */
.text-2xl   /* 24px */
.text-3xl   /* 30px */
.text-4xl   /* 36px */
.text-5xl   /* 48px */
.text-6xl   /* 60px */
```

### تباعد الأسطر

```css
.leading-tight      /* 1.25 */
.leading-normal     /* 1.5 */
.leading-relaxed    /* 1.75 */
.leading-loose      /* 2 */
```

### تباعد الأحرف

```css
.tracking-tight     /* -0.025em */
.tracking-normal    /* 0 */
.tracking-wide      /* 0.025em */
.tracking-wider     /* 0.05em */
.tracking-widest    /* 0.1em */
```

### الاتجاهات

```css
.rtl            /* اتجاه من اليمين لليسار */
.ltr            /* اتجاه من اليسار لليمين */
.text-start     /* محاذاة البداية */
.text-end       /* محاذاة النهاية */
.text-center    /* محاذاة المنتصف */
```

## 🎨 أمثلة عملية

### مثال 1: بطاقة مختلطة اللغات

```vue
<template>
  <v-card>
    <v-card-title class="font-arabic" dir="rtl"> بطاقة العميل </v-card-title>
    <v-card-subtitle class="font-english"> Customer Card </v-card-subtitle>
    <v-card-text>
      <div class="font-arabic" dir="rtl">الاسم: أحمد محمد</div>
      <div class="font-english">Email: ahmed@example.com</div>
    </v-card-text>
  </v-card>
</template>
```

### مثال 2: نموذج مع خطوط مخصصة

```vue
<template>
  <v-form>
    <v-text-field label="الاسم الكامل" class="font-arabic" dir="rtl" />
    <v-text-field label="Email Address" class="font-english" />
  </v-form>
</template>
```

### مثال 3: جدول بيانات متعدد اللغات

```vue
<template>
  <v-data-table :headers="headers" :items="items">
    <template v-slot:item.nameAr="{ item }">
      <span class="font-arabic">{{ item.nameAr }}</span>
    </template>
    <template v-slot:item.nameEn="{ item }">
      <span class="font-english">{{ item.nameEn }}</span>
    </template>
  </v-data-table>
</template>
```

## ⚡ تحسين الأداء

### 1. استراتيجية التحميل

```javascript
// الخطوط الحرجة (تحمل أولاً)
- Roboto Regular (400)
- Cairo Regular (400)

// الخطوط الإضافية (تحمل في الخلفية)
- باقي الأوزان والأنماط
```

### 2. التخزين المؤقت

```javascript
// حفظ حالة التحميل
localStorage: {
  'fonts-loaded': 'true',
  'fonts-loaded-timestamp': '1234567890'
}

// مدة الصلاحية: 7 أيام
```

### 3. Font Display Strategy

```css
@font-face {
  font-display: swap; /* عرض نص بديل فوراً */
}
```

## 🔧 تخصيص إضافي

### إضافة وزن خط جديد

```javascript
// في fontLoader.js
const FONTS_TO_LOAD = [
  {
    family: 'Cairo',
    weights: [300, 400, 500, 600, 700, 800, 900], // أضف الوزن هنا
    styles: ['normal'],
    lang: 'ar',
  },
];
```

### إضافة متغير CSS جديد

```css
/* في fonts.css */
:root {
  --font-custom: 'YourFont', sans-serif;
  --font-size-custom: 1.75rem;
}
```

### إضافة فئة مساعدة جديدة

```css
/* في fonts.css */
.font-custom {
  font-family: var(--font-custom) !important;
}
```

## 📱 الاستجابة للشاشات

```css
/* موبايل (< 600px) */
html {
  font-size: 14px;
}

/* تابلت (601px - 960px) */
html {
  font-size: 15px;
}

/* سطح المكتب (961px - 1919px) */
html {
  font-size: 16px;
}

/* شاشات كبيرة (>= 1920px) */
html {
  font-size: 18px;
}
```

## 🌓 الوضع الداكن

```css
/* تعديلات تلقائية للوضع الداكن */
@media (prefers-color-scheme: dark) {
  html,
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: var(--font-weight-semibold);
  }
}
```

## 🖨️ أنماط الطباعة

```css
@media print {
  html,
  body {
    font-size: 12pt;
    font-family: var(--font-sans);
  }
}
```

## ♿ إمكانية الوصول

### تقليل الحركة

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
  }
}
```

### تحسين التباين

```css
@media (prefers-contrast: high) {
  body {
    font-weight: var(--font-weight-medium);
  }
}
```

## 🧪 الاختبار

### 1. اختبار التحميل

```javascript
// في المتصفح Console
document.fonts.ready.then(() => {
  console.log('All fonts loaded successfully!');
});
```

### 2. اختبار الخطوط

افتح: `http://localhost:5173/fonts-demo`

### 3. اختبار الأداء

```javascript
// في Developer Tools
Performance Tab → Record → Check font loading time
```

## 📈 مراقبة الأداء

```javascript
// متوسط وقت التحميل
Critical Fonts: ~100-200ms
All Fonts: ~300-500ms

// الحجم الإجمالي
~150KB (مضغوط)
```

## 🔍 استكشاف الأخطاء

### المشكلة: الخطوط لا تظهر

**الحل:**

```javascript
// تحقق من التحميل
console.log(document.documentElement.classList.contains('fonts-loaded'));

// إعادة تحميل يدوياً
app.config.globalProperties.$reloadFonts();
```

### المشكلة: بطء في التحميل

**الحل:**

```javascript
// امسح الكاش
localStorage.removeItem('fonts-loaded');
localStorage.removeItem('fonts-loaded-timestamp');

// أعد تحميل الصفحة
location.reload();
```

### المشكلة: الخط العربي غير واضح

**الحل:**

```css
/* أضف تحسينات إضافية */
.font-arabic {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

## 🔄 التحديثات المستقبلية

### Phase 1 (الحالي) ✅

- ✅ إعداد نظام الخطوط الأساسي
- ✅ دعم اللغتين العربية والإنجليزية
- ✅ تحسينات الأداء
- ✅ صفحة توضيحية شاملة

### Phase 2 (مستقبلي)

- ⬜ استخدام خطوط محلية (Local Fonts)
- ⬜ دعم Variable Fonts
- ⬜ تحسين التخزين المؤقت
- ⬜ إضافة لغات إضافية

### Phase 3 (مستقبلي)

- ⬜ نظام تخصيص الخطوط من الإعدادات
- ⬜ دعم خطوط المستخدم المخصصة
- ⬜ تحليلات استخدام الخطوط

## 📚 موارد إضافية

### مقالات مفيدة

- [Web Font Best Practices](https://web.dev/font-best-practices/)
- [Font Loading Strategies](https://www.zachleat.com/web/comprehensive-webfonts/)
- [Arabic Typography Guidelines](https://www.arabictype.com/)

### أدوات مفيدة

- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel](https://www.fontsquirrel.com/)
- [Glyphhanger](https://github.com/zachleat/glyphhanger)

## 🤝 المساهمة

لتحسين نظام الخطوط:

1. افتح issue لمناقشة التغيير
2. اختبر التغييرات على جميع المتصفحات
3. تأكد من عدم تأثير الأداء سلباً
4. وثق التغييرات في هذا الملف

## 📄 الترخيص

جميع الخطوط المستخدمة مفتوحة المصدر:

- Roboto: Apache License 2.0
- Cairo: SIL Open Font License
- Tajawal: SIL Open Font License

---

**تم البناء بـ ❤️ لمشروع CodeLIMS**

آخر تحديث: أكتوبر 2025
