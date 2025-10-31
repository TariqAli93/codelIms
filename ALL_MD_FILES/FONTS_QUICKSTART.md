# 🚀 دليل البدء السريع - نظام الخطوط

## ⚡ البدء السريع (5 دقائق)

### 1. الوصول للصفحة التوضيحية

```bash
# تأكد من تشغيل السيرفر
cd packages/frontend
pnpm dev

# افتح المتصفح على
http://localhost:5173/fonts-demo
```

### 2. استخدام سريع في المكونات

```vue
<template>
  <!-- نص عربي -->
  <div class="font-arabic" dir="rtl">مرحباً بك في CodeLIMS</div>

  <!-- نص إنجليزي -->
  <div class="font-english">Welcome to CodeLIMS</div>
</template>
```

## 🎯 الفئات الأكثر استخداماً

### عائلات الخطوط

```html
<div class="font-arabic">نص عربي</div>
<div class="font-english">English text</div>
<div class="font-sans">Mixed content</div>
```

### أوزان الخطوط

```html
<div class="font-light">خفيف</div>
<div class="font-regular">عادي</div>
<div class="font-bold">عريض</div>
```

### أحجام الخطوط

```html
<div class="text-sm">صغير</div>
<div class="text-base">أساسي</div>
<div class="text-2xl">كبير</div>
```

## 📋 أمثلة شائعة

### بطاقة عميل

```vue
<v-card>
  <v-card-title class="font-arabic font-bold" dir="rtl">
    معلومات العميل
  </v-card-title>
  <v-card-text>
    <div class="font-arabic" dir="rtl">
      الاسم: أحمد محمد
    </div>
    <div class="font-english text-sm">
      ID: 12345
    </div>
  </v-card-text>
</v-card>
```

### نموذج إدخال

```vue
<v-text-field label="الاسم" class="font-arabic" dir="rtl" />
```

### جدول بيانات

```vue
<v-data-table>
  <template v-slot:item.name="{ item }">
    <span class="font-arabic">{{ item.name }}</span>
  </template>
</v-data-table>
```

## 🔍 التحقق من التحميل

```vue
<script setup>
import { useFontLoading } from '@/plugins/fontLoader';

const { fontsLoaded } = useFontLoading();
</script>

<template>
  <v-chip :color="fontsLoaded ? 'success' : 'warning'">
    {{ fontsLoaded ? 'محملة' : 'جاري التحميل...' }}
  </v-chip>
</template>
```

## 📱 الاستجابة للشاشات

الأحجام تتكيف تلقائياً:

- **موبايل**: 14px base
- **تابلت**: 15px base
- **سطح المكتب**: 16px base
- **شاشات كبيرة**: 18px base

## 🎨 متغيرات CSS

```css
.my-element {
  font-family: var(--font-arabic);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}
```

## ⚡ نصائح الأداء

1. **استخدم الفئات الجاهزة**: أسرع من CSS مخصص
2. **تجنب التحميل المتكرر**: الخطوط محفوظة لمدة 7 أيام
3. **استخدم font-display: swap**: يحدث تلقائياً

## 🔧 حل المشاكل السريع

### الخطوط لا تظهر؟

```javascript
// في Browser Console
document.documentElement.classList.contains('fonts-loaded'); // يجب أن يكون true
```

### إعادة تحميل الخطوط؟

```javascript
// في Browser Console
localStorage.removeItem('fonts-loaded');
location.reload();
```

## 📚 للمزيد

راجع الدليل الكامل: [FONTS_GUIDE.md](./FONTS_GUIDE.md)

---

**سريع • بسيط • فعال** 🚀
