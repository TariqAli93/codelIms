# 📘 دليل استخدام SASS في مشروع CodeLIMS

## 🎯 نظرة عامة

تم دمج SASS بشكل احترافي مع Vuetify لتوفير نظام تصميم مرن وقابل للتوسع. يتيح هذا النظام تخصيص كامل للثيمات واستخدام متغيرات وdوال مساعدة قوية.

## 📁 هيكل المجلدات

```
src/styles/
├── abstracts/              # المتغيرات والدوال (لا ينتج CSS)
│   ├── _variables.scss    # جميع المتغيرات المخصصة
│   ├── _mixins.scss       # Mixins قابلة لإعادة الاستخدام
│   ├── _functions.scss    # دوال SASS مساعدة
│   └── _index.scss        # فهرس Abstracts
│
├── base/                   # الأنماط الأساسية
│   ├── _reset.scss        # إعادة تعيين وتطبيع الأنماط
│   ├── _typography.scss   # أنماط الطباعة
│   ├── _utilities.scss    # فئات الأدوات المساعدة
│   └── _index.scss        # فهرس Base
│
├── components/             # مكونات قابلة لإعادة الاستخدام
│   ├── _card.scss         # أنماط البطاقات المخصصة
│   ├── _button.scss       # أنماط الأزرار المخصصة
│   ├── _table.scss        # أنماط الجداول
│   ├── _form.scss         # أنماط النماذج
│   └── _index.scss        # فهرس Components
│
├── layouts/                # تخطيطات الصفحات
│   ├── _main.scss         # التخطيط الرئيسي
│   ├── _auth.scss         # تخطيط المصادقة
│   └── _index.scss        # فهرس Layouts
│
├── _vuetify-overrides.scss # تخصيص مكونات Vuetify
└── main.scss               # نقطة الدخول الرئيسية
```

## 🎨 استخدام المتغيرات

### 1. الألوان

```scss
// في ملف المكون
<style lang="scss" scoped>
.my-component {
  background-color: $primary-color;
  color: $text-primary-light;
  border-color: $success-color;
}

// مع الثيمات
.my-card {
  @include light-theme {
    background: $surface-light;
  }

  @include dark-theme {
    background: $surface-dark;
  }
}
</style>
```

### 2. المسافات

```scss
.container {
  padding: $spacing-4; // 16px
  margin-bottom: $spacing-6; // 24px
  gap: $spacing-2; // 8px
}

// أو استخدم الدالة
.box {
  padding: spacing(3); // 24px (8px * 3)
}
```

### 3. الطباعة

```scss
.title {
  @include heading-2; // H2 جاهز
  font-family: $font-family-base;
}

.subtitle {
  font-size: $font-size-lg;
  font-weight: $font-weight-medium;
  line-height: $line-height-normal;
}
```

## 🔧 استخدام Mixins

### 1. Responsive Design

```scss
.sidebar {
  width: 260px;

  @include mobile {
    width: 100%;
    display: none;
  }

  @include tablet {
    width: 200px;
  }

  @include desktop {
    width: 260px;
  }
}

// أو استخدم respond-to
.header {
  @include respond-to('md') {
    font-size: 2rem;
  }

  @include respond-to('lg') {
    font-size: 2.5rem;
  }
}
```

### 2. Flexbox

```scss
.center-content {
  @include flex-center; // محاذاة في الوسط
}

.header {
  @include flex-between; // space-between
}

.column-layout {
  @include flex-column-center;
}
```

### 3. Elevation (الظلال)

```scss
.card {
  @include elevation-2; // ظل متوسط

  &:hover {
    @include elevation-4; // ظل أكبر
  }
}
```

### 4. Card Styling

```scss
.product-card {
  @include card; // نمط البطاقة الأساسي
  @include card-hover; // تأثير الرفع عند التمرير
}
```

### 5. Transitions

```scss
.button {
  @include transition(background-color, transform, box-shadow);

  &:hover {
    transform: translateY(-2px);
  }
}

// سريع أو بطيء
.modal {
  @include transition-slow(opacity, transform);
}
```

### 6. RTL Support

```scss
.button-group {
  @include margin-start($spacing-4); // يتكيف مع RTL/LTR
  @include padding-end($spacing-2);
}

.menu {
  @include rtl {
    text-align: right;
  }

  @include ltr {
    text-align: left;
  }
}
```

### 7. Custom Scrollbar

```scss
.content-area {
  @include custom-scrollbar(
    $width: 10px,
    $track-color: transparent,
    $thumb-color: rgba(0, 0, 0, 0.3)
  );
}
```

### 8. Text Utilities

```scss
.long-text {
  @include text-truncate; // قص مع ...
}

.description {
  @include text-truncate-lines(3); // قص بعد 3 أسطر
}
```

## 🎭 استخدام Functions

### 1. Color Functions

```scss
.button {
  background: $primary-color;

  &:hover {
    background: lighten-color($primary-color, 10%);
  }

  &:active {
    background: darken-color($primary-color, 10%);
  }
}

// إضافة شفافية
.overlay {
  background: rgba-color($primary-color, 0.5);
}
```

### 2. Spacing Functions

```scss
.container {
  padding: spacing(4); // 32px
  margin: px-to-rem(20px); // 1.25rem
}
```

### 3. Grid Functions

```scss
.column {
  width: grid-width(4, 12); // 33.33% مع gutter
}
```

### 4. Theme Functions

```scss
.card {
  background: theme-color('surface', 'light');

  @include dark-theme {
    background: theme-color('surface', 'dark');
  }
}
```

## 🎨 فئات الأدوات المساعدة

### Spacing

```vue
<template>
  <div class="p-4 m-2 px-6 my-8">
    <!-- padding: 16px, margin: 8px, padding-x: 24px, margin-y: 32px -->
  </div>
</template>
```

### Flexbox

```vue
<template>
  <div class="d-flex justify-between align-center gap-4">
    <!-- flex container with space-between and gap -->
  </div>
</template>
```

### Typography

```vue
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">عنوان</h1>
    <p class="text-base font-normal leading-relaxed text-truncate">نص</p>
  </div>
</template>
```

### Border Radius

```vue
<template>
  <div class="rounded-lg shadow-md">
    <!-- border-radius: 16px, elevation-3 -->
  </div>
</template>
```

## 📝 استخدام في مكونات Vue

### مثال 1: مكون بسيط

```vue
<template>
  <div class="custom-card">
    <h2 class="card-title">عنوان</h2>
    <p class="card-content">محتوى</p>
  </div>
</template>

<style lang="scss" scoped>
.custom-card {
  @include card;
  @include card-hover;
  padding: $spacing-4;

  @include mobile {
    padding: $spacing-2;
  }
}

.card-title {
  @include heading-3;
  color: $primary-color;
  margin-bottom: $spacing-3;
}

.card-content {
  font-size: $font-size-base;
  line-height: $line-height-relaxed;
}
</style>
```

### مثال 2: مكون متقدم

```vue
<template>
  <div class="product-list">
    <div v-for="product in products" :key="product.id" class="product-card">
      <img :src="product.image" class="product-image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <button class="product-btn">إضافة</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  @include grid-responsive(1, 2, 4);
  gap: $spacing-4;

  @include desktop {
    gap: $spacing-6;
  }
}

.product-card {
  @include card;
  @include card-hover;
  @include flex-column;
  gap: $spacing-3;

  @include light-theme {
    background: $card-light;
  }

  @include dark-theme {
    background: $card-dark;
  }
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: $border-radius-md;
}

.product-name {
  @include heading-4;
  @include text-truncate;
}

.product-price {
  color: $success-color;
  font-weight: $font-weight-bold;
  font-size: $font-size-xl;
}

.product-btn {
  @include button-base;
  background: $primary-color;
  color: white;
  width: 100%;

  &:hover {
    background: lighten-color($primary-color, 10%);
  }
}
</style>
```

### مثال 3: نماذج

```vue
<template>
  <form class="custom-form">
    <div class="form-group">
      <label>الاسم</label>
      <input type="text" class="custom-input" />
      <span class="form-group__error" v-if="errors.name">{{ errors.name }}</span>
    </div>

    <div class="form-group">
      <label>الوصف</label>
      <textarea class="custom-textarea"></textarea>
    </div>

    <button type="submit" class="custom-btn custom-btn--primary custom-btn--block">حفظ</button>
  </form>
</template>

<style lang="scss" scoped>
.custom-form {
  max-width: 600px;
  margin: 0 auto;
  padding: $spacing-6;

  @include mobile {
    padding: $spacing-4;
  }
}

// سيتم استخدام الأنماط من _form.scss
</style>
```

## 🎯 تخصيص مكونات Vuetify

جميع مكونات Vuetify يمكن تخصيصها في `_vuetify-overrides.scss`:

```scss
// مثال: تخصيص v-btn
.v-btn {
  text-transform: none !important; // إلغاء uppercase
  border-radius: $border-radius-lg !important;
}

// مثال: تخصيص v-card
.v-card {
  &.hover-lift {
    @include transition(transform, box-shadow);

    &:hover {
      transform: translateY(-4px);
      @include elevation-4;
    }
  }
}
```

## 📊 الرسوم المتحركة

### استخدام الرسوم المتحركة المدمجة

```vue
<template>
  <div class="fade-in">محتوى يظهر تدريجياً</div>
  <div class="slide-in-right">محتوى ينزلق من اليمين</div>
  <div class="bounce">محتوى يقفز</div>
</template>
```

### إنشاء رسوم متحركة مخصصة

```scss
<style lang="scss" scoped>
.custom-animation {
  animation: customSlide $transition-duration-base $animation-smooth;
}

@keyframes customSlide {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
```

## 🎨 أفضل الممارسات

### 1. استخدم المتغيرات دائماً

❌ **خطأ:**

```scss
.button {
  padding: 16px;
  background: #1976d2;
  border-radius: 8px;
}
```

✅ **صحيح:**

```scss
.button {
  padding: $spacing-4;
  background: $primary-color;
  border-radius: $border-radius-base;
}
```

### 2. استخدم Mixins للأنماط المتكررة

❌ **خطأ:**

```scss
.card1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.card2 {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

✅ **صحيح:**

```scss
.card1,
.card2 {
  @include flex-center;
}
```

### 3. استخدم الفئات المساعدة للتصميم السريع

❌ **خطأ:**

```scss
<style lang="scss" scoped>
.simple-box {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
}
</style>
```

✅ **صحيح:**

```vue
<div class="d-flex gap-4 p-4 rounded">
  <!-- استخدم الفئات المساعدة -->
</div>
```

### 4. نظم الأنماط بشكل منطقي

✅ **صحيح:**

```scss
.component {
  // 1. Positioning
  position: relative;
  z-index: 1;

  // 2. Box Model
  display: flex;
  width: 100%;
  padding: $spacing-4;

  // 3. Typography
  font-size: $font-size-base;
  color: $text-primary-light;

  // 4. Visual
  background: $surface-light;
  border-radius: $border-radius-md;

  // 5. Misc
  @include transition(all);
}
```

## 🚀 نصائح الأداء

1. **استخدم `@use` بدلاً من `@import`** - تم تطبيقه في جميع الملفات
2. **لا تستورد `abstracts` في كل ملف** - تم إعداده في `vite.config.js`
3. **استخدم `scoped` للأنماط المحلية** - يمنع التضارب
4. **قلل استخدام `!important`** - فقط عند الضرورة

## 📚 المراجع والموارد

- [SASS Documentation](https://sass-lang.com/documentation)
- [Vuetify Customization](https://vuetifyjs.com/en/features/sass-variables/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🎓 أمثلة عملية

### Dashboard Card

```vue
<template>
  <div class="dashboard-card">
    <div class="dashboard-card__header">
      <v-icon :icon="icon" class="dashboard-card__icon" />
      <h3 class="dashboard-card__title">{{ title }}</h3>
    </div>
    <div class="dashboard-card__body">
      <span class="dashboard-card__value">{{ value }}</span>
      <span class="dashboard-card__label">{{ label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-card {
  @include card;
  @include card-hover;
  @include flex-column;
  gap: $spacing-4;
  min-height: 150px;

  &__header {
    @include flex-between;
  }

  &__icon {
    font-size: $font-size-3xl;
    color: $primary-color;
  }

  &__title {
    @include heading-5;
    color: $text-secondary-light;

    @include dark-theme {
      color: $text-secondary-dark;
    }
  }

  &__body {
    @include flex-column;
    gap: $spacing-2;
  }

  &__value {
    @include heading-2;
    color: $primary-color;
  }

  &__label {
    font-size: $font-size-sm;
    color: $text-secondary-light;

    @include dark-theme {
      color: $text-secondary-dark;
    }
  }
}
</style>
```

---

## ✅ خلاصة

تم إعداد نظام SASS احترافي ومتكامل يوفر:

- ✅ متغيرات شاملة لجميع عناصر التصميم
- ✅ Mixins قوية للتصميم المتجاوب والأنماط المتكررة
- ✅ Functions مساعدة للحسابات والألوان
- ✅ فئات أدوات جاهزة للاستخدام السريع
- ✅ تكامل كامل مع Vuetify
- ✅ دعم RTL/LTR
- ✅ دعم الثيمات الفاتحة والداكنة
- ✅ رسوم متحركة جاهزة
- ✅ نظام شبكة مرن

**الآن يمكنك بناء واجهات احترافية ومتناسقة بسهولة!** 🎉
