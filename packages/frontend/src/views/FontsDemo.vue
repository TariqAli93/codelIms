<template>
  <div class="fonts-demo">
    <!-- Header Section -->
    <section class="demo-header">
      <v-container>
        <div class="text-center mb-8">
          <h1 class="display-1 font-weight-bold mb-4">🎨 نظام الخطوط الاحترافي</h1>
          <p class="text-h6 text-medium-emphasis">Professional Multilingual Typography System</p>
          <v-chip :color="fontsLoaded ? 'success' : 'warning'" class="mt-4" variant="elevated">
            <v-icon start>
              {{ fontsLoaded ? 'mdi-check-circle' : 'mdi-loading mdi-spin' }}
            </v-icon>
            {{ fontsLoaded ? 'الخطوط محملة بنجاح' : 'جاري تحميل الخطوط...' }}
          </v-chip>
        </div>
      </v-container>
    </section>

    <!-- Font Families Section -->
    <section class="demo-section">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">📚 عائلات الخطوط</h2>

        <v-row>
          <!-- Roboto Font -->
          <v-col cols="12" md="4">
            <v-card class="font-card" elevation="2">
              <v-card-title class="font-english"> Roboto </v-card-title>
              <v-card-subtitle>للغة الإنجليزية والواجهات متعددة اللغات</v-card-subtitle>
              <v-card-text>
                <div class="font-english mb-2" style="font-size: 24px">
                  The quick brown fox jumps over the lazy dog
                </div>
                <div class="font-english" style="font-size: 14px">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                  abcdefghijklmnopqrstuvwxyz<br />
                  0123456789
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Cairo Font -->
          <v-col cols="12" md="4">
            <v-card class="font-card" elevation="2">
              <v-card-title class="font-arabic"> Cairo - القاهرة </v-card-title>
              <v-card-subtitle>خط عربي احترافي وواضح</v-card-subtitle>
              <v-card-text>
                <div class="font-arabic mb-2" style="font-size: 24px" dir="rtl">
                  الخط العربي فن وإبداع
                </div>
                <div class="font-arabic" style="font-size: 14px" dir="rtl">
                  أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي<br />
                  ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Tajawal Font -->
          <v-col cols="12" md="4">
            <v-card class="font-card" elevation="2">
              <v-card-title class="font-arabic" style="font-family: 'Tajawal', sans-serif">
                Tajawal - تجول
              </v-card-title>
              <v-card-subtitle>خط عربي بديل أنيق</v-card-subtitle>
              <v-card-text>
                <div
                  class="font-arabic mb-2"
                  style="font-size: 24px; font-family: 'Tajawal', sans-serif"
                  dir="rtl"
                >
                  تصميم عصري ومريح للعين
                </div>
                <div
                  class="font-arabic"
                  style="font-size: 14px; font-family: 'Tajawal', sans-serif"
                  dir="rtl"
                >
                  أ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن هـ و ي<br />
                  ٠ ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Font Weights Section -->
    <section class="demo-section bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">⚖️ أوزان الخطوط</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>English Weights - Roboto</v-card-title>
              <v-card-text>
                <div v-for="weight in weights" :key="weight.value" class="mb-3">
                  <div class="font-english" :style="{ fontWeight: weight.value, fontSize: '20px' }">
                    {{ weight.name }} ({{ weight.value }}) - The quick brown fox
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="font-arabic">أوزان الخطوط العربية - Cairo</v-card-title>
              <v-card-text>
                <div v-for="weight in weights" :key="weight.value" class="mb-3">
                  <div
                    class="font-arabic"
                    :style="{ fontWeight: weight.value, fontSize: '20px' }"
                    dir="rtl"
                  >
                    {{ weight.nameAr }} ({{ weight.value }}) - الخط العربي فن وإبداع
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Font Sizes Section -->
    <section class="demo-section">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">📏 أحجام الخطوط</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>Font Sizes - English</v-card-title>
              <v-card-text>
                <div v-for="size in sizes" :key="size.class" class="mb-3">
                  <div class="font-english" :class="size.class">
                    {{ size.name }} - Typography matters
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="font-arabic">أحجام الخطوط - عربي</v-card-title>
              <v-card-text>
                <div v-for="size in sizes" :key="size.class" class="mb-3">
                  <div class="font-arabic" :class="size.class" dir="rtl">
                    {{ size.nameAr }} - الخط العربي جميل
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Headings Section -->
    <section class="demo-section bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">📰 العناوين (Headings)</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>English Headings</v-card-title>
              <v-card-text>
                <h1 class="font-english mb-3">Heading 1 - Main Title</h1>
                <h2 class="font-english mb-3">Heading 2 - Section Title</h2>
                <h3 class="font-english mb-3">Heading 3 - Subsection</h3>
                <h4 class="font-english mb-3">Heading 4 - Subtitle</h4>
                <h5 class="font-english mb-3">Heading 5 - Small Title</h5>
                <h6 class="font-english mb-3">Heading 6 - Tiny Title</h6>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="font-arabic">العناوين العربية</v-card-title>
              <v-card-text dir="rtl">
                <h1 class="font-arabic mb-3">عنوان 1 - العنوان الرئيسي</h1>
                <h2 class="font-arabic mb-3">عنوان 2 - عنوان القسم</h2>
                <h3 class="font-arabic mb-3">عنوان 3 - عنوان فرعي</h3>
                <h4 class="font-arabic mb-3">عنوان 4 - عنوان ثانوي</h4>
                <h5 class="font-arabic mb-3">عنوان 5 - عنوان صغير</h5>
                <h6 class="font-arabic mb-3">عنوان 6 - عنوان دقيق</h6>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Paragraphs Section -->
    <section class="demo-section">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">📝 الفقرات (Paragraphs)</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>English Paragraph</v-card-title>
              <v-card-text>
                <p class="font-english mb-4">
                  Typography is the art and technique of arranging type to make written language
                  legible, readable, and appealing when displayed. The arrangement of type involves
                  selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing,
                  and adjusting the space between pairs of letters.
                </p>
                <p class="font-english">
                  Good typography enhances the user experience and makes content more accessible. It
                  guides the reader's eye through the content and establishes visual hierarchy.
                </p>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="font-arabic">الفقرة العربية</v-card-title>
              <v-card-text dir="rtl">
                <p class="font-arabic mb-4">
                  الخط العربي هو فن وتصميم الكتابة في مختلف اللغات التي تستعمل الحروف العربية. تتميز
                  الكتابة العربية بكونها متصلة مما يجعلها قابلة لاكتساب أشكال هندسية مختلفة من خلال
                  المد والرجع والاستدارة والتزوية والتشابك والتداخل والتركيب.
                </p>
                <p class="font-arabic">
                  يعتبر الخط العربي من أهم الفنون الإسلامية، حيث يجمع بين الجمال والوظيفة. الخط
                  الجيد يعزز تجربة القراءة ويجعل المحتوى أكثر وضوحاً وجاذبية.
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Line Height Section -->
    <section class="demo-section bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">📐 تباعد الأسطر (Line Height)</h2>

        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title>Line Height Examples</v-card-title>
              <v-card-text>
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">Tight (1.25)</v-chip>
                  <p class="font-english leading-tight">
                    This paragraph has tight line spacing. It's useful for headings and short text
                    blocks where space is limited.
                  </p>
                </div>
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">Normal (1.5)</v-chip>
                  <p class="font-english leading-normal">
                    This paragraph has normal line spacing. It's the default and works well for most
                    body text content.
                  </p>
                </div>
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">Relaxed (1.75)</v-chip>
                  <p class="font-english leading-relaxed">
                    This paragraph has relaxed line spacing. It improves readability for longer text
                    blocks.
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="font-arabic">أمثلة على تباعد الأسطر</v-card-title>
              <v-card-text dir="rtl">
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">ضيق (1.25)</v-chip>
                  <p class="font-arabic leading-tight">
                    هذه الفقرة لها تباعد أسطر ضيق. مفيدة للعناوين والنصوص القصيرة حيث المساحة
                    محدودة.
                  </p>
                </div>
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">عادي (1.5)</v-chip>
                  <p class="font-arabic leading-normal">
                    هذه الفقرة لها تباعد أسطر عادي. وهو الافتراضي ويعمل بشكل جيد لمعظم محتوى النص
                    الأساسي.
                  </p>
                </div>
                <div class="mb-4">
                  <v-chip size="small" color="primary" class="mb-2">مريح (1.75)</v-chip>
                  <p class="font-arabic leading-relaxed">
                    هذه الفقرة لها تباعد أسطر مريح. يحسن قابلية القراءة للنصوص الطويلة.
                  </p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Mixed Content Section -->
    <section class="demo-section">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">🌐 محتوى مختلط (Mixed Content)</h2>

        <v-card elevation="2">
          <v-card-text>
            <div class="mixed-content">
              <h3 class="font-arabic mb-4" dir="rtl">نظام CodeLIMS - CodeLIMS System</h3>

              <p class="font-arabic mb-3" dir="rtl">
                نظام CodeLIMS هو تطبيق سطح مكتب شامل للمحاسبة ونقاط البيع وإدارة الأقساط.
              </p>

              <p class="font-english mb-4">
                CodeLIMS is a comprehensive desktop application for accounting, point of sale, and
                installment management.
              </p>

              <v-divider class="my-4" />

              <h4 class="font-arabic mb-3" dir="rtl">المميزات الرئيسية:</h4>
              <ul class="font-arabic mb-4" dir="rtl">
                <li>دعم متعدد العملات (USD, IQD)</li>
                <li>نظام RBAC مع الأدوار والصلاحيات</li>
                <li>إدارة العملاء والمنتجات والمخزون</li>
                <li>المبيعات النقدية والتقسيط</li>
                <li>تقارير وتحليلات متقدمة</li>
              </ul>

              <h4 class="font-english mb-3">Key Features:</h4>
              <ul class="font-english">
                <li>Multi-currency support (USD, IQD)</li>
                <li>RBAC system with roles and permissions</li>
                <li>Customer, product, and inventory management</li>
                <li>Cash and installment sales</li>
                <li>Advanced reporting and analytics</li>
              </ul>
            </div>
          </v-card-text>
        </v-card>
      </v-container>
    </section>

    <!-- Performance Info -->
    <section class="demo-section bg-grey-lighten-4">
      <v-container>
        <h2 class="text-h4 font-weight-bold mb-6">⚡ معلومات الأداء</h2>

        <v-row>
          <v-col cols="12" md="4">
            <v-card elevation="2" color="primary" dark>
              <v-card-text class="text-center">
                <v-icon size="48" class="mb-2">mdi-speedometer</v-icon>
                <div class="text-h4 font-weight-bold">{{ loadTime }}ms</div>
                <div class="text-body-2">وقت التحميل</div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="2" color="success" dark>
              <v-card-text class="text-center">
                <v-icon size="48" class="mb-2">mdi-format-font</v-icon>
                <div class="text-h4 font-weight-bold">3</div>
                <div class="text-body-2">عائلات الخطوط</div>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card elevation="2" color="info" dark>
              <v-card-text class="text-center">
                <v-icon size="48" class="mb-2">mdi-weight</v-icon>
                <div class="text-h4 font-weight-bold">7+</div>
                <div class="text-body-2">أوزان الخطوط</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fontsLoaded = ref(false);
const loadTime = ref(0);

const weights = [
  { name: 'Light', nameAr: 'خفيف', value: 300 },
  { name: 'Regular', nameAr: 'عادي', value: 400 },
  { name: 'Medium', nameAr: 'متوسط', value: 500 },
  { name: 'Semibold', nameAr: 'شبه عريض', value: 600 },
  { name: 'Bold', nameAr: 'عريض', value: 700 },
  { name: 'Extrabold', nameAr: 'عريض جداً', value: 800 },
];

const sizes = [
  { name: 'Extra Small', nameAr: 'صغير جداً', class: 'text-xs' },
  { name: 'Small', nameAr: 'صغير', class: 'text-sm' },
  { name: 'Base', nameAr: 'أساسي', class: 'text-base' },
  { name: 'Large', nameAr: 'كبير', class: 'text-lg' },
  { name: 'Extra Large', nameAr: 'كبير جداً', class: 'text-xl' },
  { name: '2X Large', nameAr: 'كبير 2x', class: 'text-2xl' },
];

onMounted(() => {
  const startTime = performance.now();

  // Check if fonts are loaded
  if ('fonts' in document) {
    document.fonts.ready.then(() => {
      fontsLoaded.value = true;
      loadTime.value = Math.round(performance.now() - startTime);
    });
  } else {
    // Fallback for browsers without Font Loading API
    setTimeout(() => {
      fontsLoaded.value = true;
      loadTime.value = Math.round(performance.now() - startTime);
    }, 500);
  }
});
</script>

<style scoped>
.fonts-demo {
  min-height: 100vh;
  background: #f5f5f5;
}

.demo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
}

.demo-section {
  padding: 4rem 0;
}

.font-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.font-card:hover {
  transform: translateY(-4px);
}

.mixed-content ul {
  padding-right: 2rem;
  padding-left: 2rem;
}

.mixed-content li {
  margin-bottom: 0.5rem;
}
</style>
