import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import router from '@/router';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const notificationStore = useNotificationStore();

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push({ name: 'Login' });
      notificationStore.error('انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى');
      return Promise.reject(error.response?.data || error.message);
    }

    // Handle 429 Rate Limit
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || 40;
      notificationStore.warning(`تم تجاوز حد الطلبات. حاول مرة أخرى بعد ${retryAfter} ثانية`, 6000);
      return Promise.reject(error.response?.data || error.message);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      notificationStore.error('ليس لديك صلاحية للوصول إلى هذا المورد');
      return Promise.reject(error.response?.data || error.message);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      notificationStore.error('المورد المطلوب غير موجود');
      return Promise.reject(error.response?.data || error.message);
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      notificationStore.error('خطأ في الخادم. يرجى المحاولة لاحقاً');
      return Promise.reject(error.response?.data || error.message);
    }

    // Handle Network Error
    if (error.message === 'Network Error') {
      notificationStore.error('فشل الاتصال بالخادم. تحقق من اتصال الإنترنت');
      return Promise.reject(error);
    }

    // Handle Timeout
    if (error.code === 'ECONNABORTED') {
      notificationStore.error('انتهت مهلة الطلب. يرجى المحاولة مرة أخرى');
      return Promise.reject(error);
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
