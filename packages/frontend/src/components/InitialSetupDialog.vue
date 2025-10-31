<template>
  <v-dialog v-model="dialog" max-width="700" persistent>
    <v-card class="initial-setup-card" elevation="24">
      <!-- Header -->
      <v-card-title class="pa-6 bg-gradient-to-r from-primary to-primary-darken-1 text-white">
        <div class="text-center w-full">
          <v-icon size="64" class="mb-4">mdi-party-popper</v-icon>
          <h2 class="text-h4 font-weight-bold mb-2">🎉 مرحباً بك في نظام CodeLIMS 🎉</h2>
          <p class="text-body-1 opacity-90">تم إنشاء حساب المدير الافتراضي بنجاح!</p>
        </div>
      </v-card-title>

      <v-divider />

      <!-- Body -->
      <v-card-text class="pa-8">
        <!-- بيانات الدخول -->
        <div class="mb-8">
          <div class="d-flex align-center mb-4">
            <v-icon color="primary" class="me-2">mdi-information-outline</v-icon>
            <h3 class="text-h6 font-weight-bold">📋 بيانات الدخول</h3>
          </div>

          <v-list class="bg-grey-lighten-4 rounded-lg pa-4" density="comfortable">
            <v-list-item class="mb-2">
              <template #prepend>
                <v-icon color="primary">mdi-account</v-icon>
              </template>
              <v-list-item-title class="font-weight-bold">اسم المستخدم</v-list-item-title>
              <v-list-item-subtitle class="text-h6 mt-1">
                <span class="font-mono bg-white px-3 py-1 rounded">{{ setupInfo.username }}</span>
                <v-btn
                  icon="mdi-content-copy"
                  size="small"
                  variant="text"
                  class="ms-2"
                  @click="copyToClipboard(setupInfo.username, 'اسم المستخدم')"
                />
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item class="mb-2">
              <template #prepend>
                <v-icon color="warning">mdi-key-variant</v-icon>
              </template>
              <v-list-item-title class="font-weight-bold">كلمة المرور</v-list-item-title>
              <v-list-item-subtitle class="text-h6 mt-1">
                <span class="font-mono bg-white px-3 py-1 rounded">{{ setupInfo.password }}</span>
                <v-btn
                  icon="mdi-content-copy"
                  size="small"
                  variant="text"
                  class="ms-2"
                  @click="copyToClipboard(setupInfo.password, 'كلمة المرور')"
                />
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
              <template #prepend>
                <v-icon color="success">mdi-account-check</v-icon>
              </template>
              <v-list-item-title class="font-weight-bold">الاسم الكامل</v-list-item-title>
              <v-list-item-subtitle class="text-h6 mt-1">{{
                setupInfo.fullName
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <!-- معلومات إضافية -->
        <v-alert type="success" variant="tonal" density="comfortable" class="mb-0">
          <v-alert-title class="text-subtitle-1 font-weight-bold mb-2">
            <v-icon class="me-2">mdi-check-circle</v-icon>
            النظام جاهز للاستخدام
          </v-alert-title>
          <div class="text-body-2">
            يمكنك الآن تسجيل الدخول باستخدام البيانات أعلاه والبدء في استخدام نظام CodeLIMS.
          </div>
        </v-alert>
      </v-card-text>

      <v-divider />

      <!-- Footer -->
      <v-card-actions class="pa-6">
        <v-spacer />
        <v-btn
          color="primary"
          size="large"
          variant="elevated"
          prepend-icon="mdi-login"
          @click="closeDialog"
        >
          فهمت، الآن سأسجل دخولي
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNotificationStore } from '@/stores/notification';
import api from '@/plugins/axios';

const dialog = ref(true);
const setupInfo = ref({
  username: 'admin',
  password: '',
  fullName: '',
  isFirstRun: false,
});

const notificationStore = useNotificationStore();

// نسخ إلى الحافظة
const copyToClipboard = async (text, label) => {
  try {
    await navigator.clipboard.writeText(text);
    notificationStore.success(`تم نسخ ${label} بنجاح`);
  } catch {
    notificationStore.error('فشل النسخ إلى الحافظة');
  }
};

// إغلاق النافذة
const closeDialog = () => {
  dialog.value = false;
};

// التحقق من حالة الإعداد الأولي
const checkInitialSetup = async () => {
  try {
    const response = await api.get('/initial-setup-info');

    if (response.data.isFirstRun) {
      setupInfo.value = response.data;
      dialog.value = true;
    }
  } catch {
    // تجاهل الأخطاء - ربما الـ API غير متاح
  }
};

onMounted(() => {
  // تأخير بسيط لضمان تحميل الصفحة
  setTimeout(() => {
    checkInitialSetup();
  }, 500);
});

// Export للاستخدام من الخارج
defineExpose({
  checkInitialSetup,
});
</script>
<style scoped>
.initial-setup-card {
  border-radius: 16px !important;
  overflow: hidden;
}

.font-mono {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
  color: #1976d2;
}

.bg-gradient-to-r {
  background: linear-gradient(to right, var(--v-theme-primary), var(--v-theme-primary-darken-1));
}

:deep(.v-list-item__prepend) {
  margin-inline-end: 16px !important;
}

:deep(.v-alert) {
  border-radius: 12px !important;
}
</style>
