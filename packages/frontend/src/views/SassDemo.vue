<template>
  <div class="sass-demo">
    <v-container>
      <h1 class="text-h2 font-bold text-center mb-8">🎨 عرض توضيحي لنظام SASS</h1>

      <!-- Cards Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">📦 مثال على البطاقات</h2>
        <div class="cards-grid">
          <div class="custom-card custom-card--hover">
            <div class="custom-card__header">
              <h3>بطاقة مع تأثير رفع</h3>
            </div>
            <div class="custom-card__body">
              <p>هذه البطاقة تستخدم @include card-hover</p>
            </div>
          </div>

          <div class="custom-card custom-card--outlined">
            <div class="custom-card__body">
              <h3>بطاقة محددة</h3>
              <p>تستخدم النمط outlined</p>
            </div>
          </div>

          <div class="custom-card custom-card--flat">
            <div class="custom-card__body">
              <h3>بطاقة مسطحة</h3>
              <p>بدون ظلال</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Buttons Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">🔘 مثال على الأزرار المخصصة</h2>
        <div class="buttons-demo">
          <button class="custom-btn custom-btn--primary">زر أساسي</button>
          <button class="custom-btn custom-btn--secondary">زر ثانوي</button>
          <button class="custom-btn custom-btn--success">زر نجاح</button>
          <button class="custom-btn custom-btn--error">زر خطأ</button>
          <button class="custom-btn custom-btn--outlined custom-btn--primary">زر محدد</button>
          <button class="custom-btn custom-btn--text custom-btn--primary">زر نصي</button>
        </div>
      </section>

      <!-- Spacing Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">📏 مثال على المسافات</h2>
        <div class="spacing-demo">
          <div class="box p-2">p-2 (8px)</div>
          <div class="box p-4">p-4 (16px)</div>
          <div class="box p-6">p-6 (24px)</div>
          <div class="box p-8">p-8 (32px)</div>
        </div>
      </section>

      <!-- Typography Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">📝 مثال على الطباعة</h2>
        <div class="typography-demo">
          <h1 class="text-h1">عنوان H1</h1>
          <h2 class="text-h2">عنوان H2</h2>
          <h3 class="text-h3">عنوان H3</h3>
          <p class="text-base">نص عادي بحجم base</p>
          <p class="text-sm font-light">نص صغير خفيف</p>
          <p class="text-lg font-bold">نص كبير عريض</p>
          <p class="text-base text-truncate" style="max-width: 300px">
            هذا نص طويل جداً سيتم قصه باستخدام text-truncate عند الوصول للحد الأقصى
          </p>
        </div>
      </section>

      <!-- Grid Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">📊 مثال على الشبكة المتجاوبة</h2>
        <div class="grid-demo">
          <div class="grid-item">1</div>
          <div class="grid-item">2</div>
          <div class="grid-item">3</div>
          <div class="grid-item">4</div>
          <div class="grid-item">5</div>
          <div class="grid-item">6</div>
        </div>
      </section>

      <!-- Animations Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">✨ مثال على الرسوم المتحركة</h2>
        <div class="animations-demo">
          <div class="animated-box fade-in">Fade In</div>
          <div class="animated-box slide-in-right">Slide Right</div>
          <div class="animated-box bounce">Bounce</div>
          <div class="animated-box pulse">Pulse</div>
        </div>
      </section>

      <!-- Form Example -->
      <section class="demo-section">
        <h2 class="text-h4 mb-4">📋 مثال على النماذج</h2>
        <form class="form-demo">
          <div class="form-group">
            <label>الاسم الكامل</label>
            <input type="text" class="custom-input" placeholder="أدخل اسمك" />
          </div>

          <div class="form-group">
            <label>الوصف</label>
            <textarea class="custom-textarea" rows="4" placeholder="اكتب وصفاً"></textarea>
          </div>

          <div class="form-group">
            <label>الدولة</label>
            <select class="custom-select">
              <option>اختر الدولة</option>
              <option>العراق</option>
              <option>السعودية</option>
              <option>الإمارات</option>
            </select>
          </div>

          <button type="submit" class="custom-btn custom-btn--primary custom-btn--block">
            إرسال
          </button>
        </form>
      </section>
    </v-container>
  </div>
</template>

<script setup>
// No script needed for this demo
</script>

<style lang="scss" scoped>
.sass-demo {
  padding: $spacing-6 0;
  min-height: 100vh;
}

.demo-section {
  margin-bottom: $spacing-12;
  padding: $spacing-6;
  background: var(--v-theme-surface);
  border-radius: $border-radius-lg;
  @include elevation-2;
}

// Cards Grid
.cards-grid {
  @include grid-responsive(1, 2, 3);
  gap: $spacing-4;
}

// Buttons Demo
.buttons-demo {
  @include flex-wrap;
  gap: $spacing-3;
}

// Spacing Demo
.spacing-demo {
  @include flex-wrap;
  gap: $spacing-4;

  .box {
    background: $primary-color;
    color: white;
    border-radius: $border-radius-base;
    @include flex-center;
    min-width: 150px;
    min-height: 80px;
    font-weight: $font-weight-medium;
  }
}

// Typography Demo
.typography-demo {
  > * {
    margin-bottom: $spacing-3;
  }
}

// Grid Demo
.grid-demo {
  @include grid-responsive(2, 3, 4);
  gap: $spacing-4;

  .grid-item {
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    color: white;
    padding: $spacing-6;
    border-radius: $border-radius-md;
    @include flex-center;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    @include elevation-2;
    @include transition(transform, box-shadow);

    &:hover {
      transform: scale(1.05);
      @include elevation-4;
    }
  }
}

// Animations Demo
.animations-demo {
  @include grid-responsive(2, 2, 4);
  gap: $spacing-4;

  .animated-box {
    background: $success-color;
    color: white;
    padding: $spacing-6;
    border-radius: $border-radius-md;
    @include flex-center;
    font-weight: $font-weight-bold;
    min-height: 100px;
  }
}

// Form Demo
.form-demo {
  max-width: 600px;
  margin: 0 auto;
}
</style>
