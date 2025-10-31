<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="container-custom">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          🎨 عرض توضيحي لـ Tailwind CSS
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          مجموعة شاملة من المكونات والأنماط المبنية باستخدام Tailwind CSS
        </p>
      </div>

      <!-- Buttons Section -->
      <section class="mb-12 card card-hover">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔘 الأزرار</h2>
        <div class="flex flex-wrap gap-4">
          <button class="btn-primary">زر أساسي</button>
          <button class="btn-secondary">زر ثانوي</button>
          <button class="btn-outline">زر محدد</button>
          <button
            class="bg-success hover:bg-success-dark text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            زر نجاح
          </button>
          <button
            class="bg-error hover:bg-error-dark text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            زر خطأ
          </button>
          <button
            class="bg-warning hover:bg-warning-dark text-white font-medium py-2 px-4 rounded transition-colors duration-200"
          >
            زر تحذير
          </button>
        </div>
      </section>

      <!-- Cards Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">📦 البطاقات</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="card card-hover">
            <div class="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">سريع</h3>
            <p class="text-gray-600 dark:text-gray-300">بناء واجهات سريعة ومتجاوبة</p>
          </div>

          <div class="card card-hover gradient-primary text-white">
            <div class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">مرن</h3>
            <p class="text-white/90">تخصيص كامل لجميع العناصر</p>
          </div>

          <div class="card card-hover glass border-2 border-primary">
            <div class="flex items-center justify-center w-12 h-12 bg-success rounded-lg mb-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">محترف</h3>
            <p class="text-gray-600 dark:text-gray-300">تصميم احترافي جاهز للإنتاج</p>
          </div>
        </div>
      </section>

      <!-- Badges Section -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">🏷️ الشارات</h2>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-success">مكتمل</span>
          <span class="badge badge-error">خطأ</span>
          <span class="badge badge-warning">تحذير</span>
          <span class="badge badge-info">معلومات</span>
          <span class="badge bg-primary-light text-primary-dark">أساسي</span>
          <span class="badge bg-secondary-light text-secondary-dark">ثانوي</span>
        </div>
      </section>

      <!-- Forms Section -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">📋 النماذج</h2>
        <form class="space-y-4 max-w-2xl">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >الاسم الكامل</label
            >
            <input type="text" class="input-field" placeholder="أدخل اسمك الكامل" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >البريد الإلكتروني</label
            >
            <input type="email" class="input-field" placeholder="email@example.com" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >الرسالة</label
            >
            <textarea
              class="input-field resize-none"
              rows="4"
              placeholder="اكتب رسالتك هنا..."
            ></textarea>
          </div>

          <div class="flex gap-3">
            <button type="submit" class="btn-primary flex-1">إرسال</button>
            <button type="reset" class="btn-outline flex-1">إعادة تعيين</button>
          </div>
        </form>
      </section>

      <!-- Grid Section -->
      <section class="mb-12">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">📊 الشبكة المتجاوبة</h2>
        <div class="grid-auto-fit">
          <div
            v-for="i in 6"
            :key="i"
            class="card card-hover flex-center h-32 bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-2xl"
          >
            {{ i }}
          </div>
        </div>
      </section>

      <!-- Typography Section -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">📝 الطباعة</h2>
        <div class="space-y-4">
          <h1 class="text-5xl font-bold text-gray-900 dark:text-white">عنوان H1</h1>
          <h2 class="text-4xl font-semibold text-gray-800 dark:text-gray-100">عنوان H2</h2>
          <h3 class="text-3xl font-semibold text-gray-800 dark:text-gray-100">عنوان H3</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            هذا نص توضيحي يوضح كيفية استخدام أنماط الطباعة في Tailwind CSS. يمكنك بسهولة تخصيص الحجم
            والوزن واللون والمسافات.
          </p>
          <p class="text-base text-gray-600 dark:text-gray-300">
            نص عادي بحجم base مع تباعد طبيعي وألوان متناسقة.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 italic">
            نص صغير مائل للملاحظات والتفاصيل الثانوية.
          </p>
        </div>
      </section>

      <!-- Flexbox & Alignment -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">🔄 Flexbox & المحاذاة</h2>
        <div class="space-y-4">
          <div class="flex-center p-4 bg-primary-light rounded-lg">
            <span class="text-primary-dark font-semibold">محاذاة في المنتصف</span>
          </div>
          <div class="flex-between p-4 bg-success-light rounded-lg">
            <span class="text-success-dark font-semibold">عنصر 1</span>
            <span class="text-success-dark font-semibold">عنصر 2</span>
          </div>
          <div class="flex flex-wrap gap-2 p-4 bg-warning-light rounded-lg">
            <span
              v-for="i in 8"
              :key="i"
              class="px-3 py-1 bg-warning text-white rounded-full text-sm"
            >
              عنصر {{ i }}
            </span>
          </div>
        </div>
      </section>

      <!-- Animations -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">✨ الرسوم المتحركة</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg animate-slide-in-right"
          >
            <p class="font-semibold">انزلاق من اليمين</p>
          </div>
          <div
            class="p-6 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg animate-slide-in-left"
          >
            <p class="font-semibold">انزلاق من اليسار</p>
          </div>
          <div
            class="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg animate-fade-in"
          >
            <p class="font-semibold">ظهور تدريجي</p>
          </div>
        </div>
      </section>

      <!-- Responsive Design -->
      <section class="mb-12 card">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">📱 التصميم المتجاوب</h2>
        <div class="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">
          <p
            class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-center"
          >
            هذا النص يتكيف مع حجم الشاشة
          </p>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="bg-white/20 p-3 rounded text-center">1 Col</div>
            <div class="bg-white/20 p-3 rounded text-center">2 Cols (sm+)</div>
            <div class="bg-white/20 p-3 rounded text-center">3 Cols (md+)</div>
            <div class="bg-white/20 p-3 rounded text-center">4 Cols (lg+)</div>
          </div>
        </div>
      </section>

      <!-- Dark Mode Toggle -->
      <section class="mb-12 card text-center">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">🌓 الوضع الداكن</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          جميع المكونات تدعم الوضع الداكن تلقائياً
        </p>
        <button class="btn-primary" @click="toggleDarkMode">
          {{ isDark ? '☀️ وضع فاتح' : '🌙 وضع داكن' }}
        </button>
      </section>

      <!-- Footer -->
      <div class="text-center py-8 border-t border-gray-200 dark:border-gray-700">
        <p class="text-gray-600 dark:text-gray-400">
          تم البناء باستخدام ❤️ مع Tailwind CSS + Vue 3 + Vuetify
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle('dark');
};

onMounted(() => {
  // Check for saved dark mode preference
  isDark.value = document.documentElement.classList.contains('dark');
});
</script>

<style scoped>
/* Additional component-specific styles if needed */
</style>
