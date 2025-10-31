# 🎨 نظام SASS المتكامل - دليل البدء السريع

## ✅ ما تم إنجازه

تم دمج نظام SASS احترافي ومتكامل مع Vuetify في مشروع CodeLIMS يتضمن:

### 📦 المكونات الأساسية

1. **متغيرات شاملة** (`_variables.scss`)
   - 200+ متغير للألوان والخطوط والمسافات
   - دعم الثيمات الفاتحة والداكنة
   - متغيرات مخصصة للتطبيق

2. **Mixins قوية** (`_mixins.scss`)
   - 15+ mixin للتصميم المتجاوب
   - Flexbox و Grid helpers
   - دعم RTL/LTR
   - تأثيرات وانتقالات جاهزة

3. **Functions مساعدة** (`_functions.scss`)
   - دوال الألوان والمسافات
   - حسابات Grid
   - تحويلات القياسات

4. **أنماط أساسية** (`base/`)
   - Reset & Normalize
   - Typography utilities
   - 100+ utility class

5. **مكونات جاهزة** (`components/`)
   - Cards, Buttons, Tables, Forms
   - أنماط مخصصة قابلة لإعادة الاستخدام

6. **تخطيطات** (`layouts/`)
   - Main Layout
   - Auth Layout
   - نظام Grid responsive

## 🚀 كيفية الاستخدام

### 1. في ملفات Vue Components

```vue
<template>
  <div class="my-component">
    <h2>عنوان</h2>
    <p>محتوى</p>
  </div>
</template>

<style lang="scss" scoped>
// المتغيرات متاحة تلقائياً - لا حاجة للاستيراد!
.my-component {
  padding: $spacing-4;
  background: $primary-color;
  border-radius: $border-radius-md;
  @include elevation-2;

  @include mobile {
    padding: $spacing-2;
  }
}
</style>
```

### 2. استخدام الفئات المساعدة

```vue
<template>
  <!-- فئات جاهزة بدون كتابة CSS -->
  <div class="d-flex justify-between align-center gap-4 p-6 rounded-lg shadow-md">
    <span class="text-lg font-bold">نص</span>
    <button class="custom-btn custom-btn--primary">زر</button>
  </div>
</template>
```

### 3. استخدام Mixins

```scss
.card {
  @include card; // نمط البطاقة
  @include card-hover; // تأثير الرفع
  @include flex-center; // محاذاة في الوسط
  @include transition(all); // انتقال سلس
}
```

### 4. التصميم المتجاوب

```scss
.sidebar {
  width: 260px;

  @include mobile {
    width: 100%;
  }

  @include tablet {
    width: 200px;
  }
}
```

## 📁 الهيكل النهائي

```
src/styles/
├── abstracts/
│   ├── _variables.scss     ✅ 200+ متغير
│   ├── _mixins.scss        ✅ 15+ mixin
│   ├── _functions.scss     ✅ دوال مساعدة
│   └── _index.scss
├── base/
│   ├── _reset.scss         ✅ Reset & Normalize
│   ├── _typography.scss    ✅ أنماط الطباعة
│   ├── _utilities.scss     ✅ 100+ utility class
│   └── _index.scss
├── components/
│   ├── _card.scss          ✅ أنماط البطاقات
│   ├── _button.scss        ✅ أنماط الأزرار
│   ├── _table.scss         ✅ أنماط الجداول
│   ├── _form.scss          ✅ أنماط النماذج
│   └── _index.scss
├── layouts/
│   ├── _main.scss          ✅ التخطيط الرئيسي
│   ├── _auth.scss          ✅ تخطيط المصادقة
│   └── _index.scss
├── _vuetify-overrides.scss ✅ تخصيص Vuetify
└── main.scss               ✅ نقطة الدخول

📄 SASS_GUIDE.md            ✅ دليل شامل 60+ صفحة
📄 SassDemo.vue             ✅ صفحة عرض توضيحية
```

## 🎯 الميزات الرئيسية

### ✨ المتغيرات المتاحة

```scss
// الألوان
$primary-color, $secondary-color, $success-color
$error-color, $warning-color, $info-color

// المسافات (4px - 96px)
$spacing-1 إلى $spacing-24

// الخطوط
$font-size-xs إلى $font-size-5xl
$font-weight-thin إلى $font-weight-black

// Border Radius
$border-radius-sm إلى $border-radius-2xl

// Shadows
$shadow-sm إلى $shadow-2xl

// Breakpoints
$breakpoint-xs, sm, md, lg, xl, xxl
```

### 🎨 Mixins الأساسية

```scss
// Responsive
@include mobile { }
@include tablet { }
@include desktop { }
@include respond-to('lg') { }

// Flexbox
@include flex-center;
@include flex-between;
@include flex-column-center;

// Card
@include card;
@include card-hover;

// Elevation
@include elevation-1; إلى @include elevation-5;

// Typography
@include heading-1; إلى @include heading-6;
@include text-truncate;
@include text-truncate-lines(3);

// Transitions
@include transition(property...);
@include transition-fast(property...);

// RTL/LTR
@include rtl { }
@include ltr { }
@include margin-start($value);
@include padding-end($value);

// Theme
@include light-theme { }
@include dark-theme { }
```

### 🧰 Utility Classes

```html
<!-- Spacing -->
<div class="p-4 m-2 px-6 my-8"></div>

<!-- Flexbox -->
<div class="d-flex justify-between align-center gap-4"></div>

<!-- Typography -->
<h1 class="text-2xl font-bold mb-4"></h1>
<p class="text-base leading-relaxed text-truncate"></p>

<!-- Border & Shadow -->
<div class="rounded-lg shadow-md"></div>

<!-- Display -->
<div class="d-none d-md-block"></div>
```

## 📖 الوثائق الكاملة

اقرأ الدليل الشامل في: **[SASS_GUIDE.md](./SASS_GUIDE.md)**

يحتوي على:

- ✅ شرح تفصيلي لكل متغير ومixin
- ✅ 20+ مثال عملي
- ✅ أفضل الممارسات
- ✅ نصائح الأداء
- ✅ مراجع ومصادر

## 🎬 صفحة العرض التوضيحي

تم إنشاء صفحة `SassDemo.vue` تحتوي على:

- عرض للبطاقات بأنماط مختلفة
- أزرار مخصصة
- أمثلة على المسافات
- Typography examples
- Grid متجاوب
- رسوم متحركة
- نماذج مخصصة

## ⚙️ إعدادات Vite

تم تحديث `vite.config.js` لدعم SASS:

```javascript
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@use "@/styles/abstracts" as *;`,
      api: 'modern-compiler',
    },
  },
}
```

هذا يجعل جميع المتغيرات والmixins متاحة تلقائياً في كل مكون!

## 🎨 تخصيص Vuetify

تم تعديل `vuetify.js` لاستيراد SASS:

```javascript
import '@/styles/main.scss'; // بدلاً من 'vuetify/styles'
```

جميع مكونات Vuetify الآن تستخدم المتغيرات المخصصة!

## 🔥 التشغيل

```bash
# التأكد من تثبيت SASS
cd packages/frontend
pnpm install

# تشغيل المشروع
pnpm dev
```

سيتم تجميع ملفات SASS تلقائياً!

## 💡 نصائح سريعة

1. **لا تستورد abstracts يدوياً** - متاح تلقائياً في كل مكون
2. **استخدم `lang="scss"`** في style blocks
3. **استخدم `scoped`** لتجنب التضارب
4. **استخدم المتغيرات** بدلاً من القيم المباشرة
5. **استخدم Mixins** للأنماط المتكررة
6. **استخدم Utility Classes** للتصميم السريع

## ✅ اختبار النظام

جرب الأمثلة التالية:

```vue
<!-- مثال 1: بطاقة بسيطة -->
<template>
  <div class="my-card">
    <h3>عنوان</h3>
    <p>محتوى</p>
  </div>
</template>

<style lang="scss" scoped>
.my-card {
  @include card;
  @include card-hover;
  padding: $spacing-4;
}
</style>
```

```vue
<!-- مثال 2: استخدام utility classes -->
<template>
  <div class="d-flex gap-4 p-6 rounded-lg shadow-md">
    <span class="text-lg font-bold">نص</span>
  </div>
</template>
```

## 🎉 النتيجة

الآن لديك:

- ✅ نظام SASS احترافي ومنظم
- ✅ 200+ متغير جاهز للاستخدام
- ✅ 15+ mixin قوي
- ✅ 100+ utility class
- ✅ تكامل كامل مع Vuetify
- ✅ دعم RTL/LTR
- ✅ دعم الثيمات الفاتحة والداكنة
- ✅ تصميم متجاوب
- ✅ رسوم متحركة جاهزة
- ✅ وثائق شاملة

**ابدأ ببناء واجهات احترافية الآن!** 🚀
