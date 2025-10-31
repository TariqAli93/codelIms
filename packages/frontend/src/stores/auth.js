import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import { useNotificationStore } from '@/stores/notification';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    isFirstRun: false,
  }),

  getters: {
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || null,
    hasPermission: (state) => (permission) => {
      const perms = state.user?.permissions;
      if (!Array.isArray(perms)) return false;

      const list = Array.isArray(permission) ? permission : [permission];

      return list.some((perm) => {
        if (perms.includes(perm)) return true;

        // دعم manage:<resource>
        const [action, resource] = perm.split(':');
        if (perms.includes(`manage:${resource}`)) return true;

        // دعم manage:* (سوبر أدمن)
        if (perms.includes('manage:*')) return true;

        return false;
      });
    },

    hasAnyPermission:
      (state) =>
      (permissions = []) => {
        if (!Array.isArray(state.user?.permissions)) return false;
        return permissions.some((perm) => state.user.permissions.includes(perm));
      },

    hasAllPermissions:
      (state) =>
      (permissions = []) => {
        if (!Array.isArray(state.user?.permissions)) return false;
        return permissions.every((perm) => state.user.permissions.includes(perm));
      },
  },

  actions: {
    async login(credentials) {
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post('/auth/login', credentials);

        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        notificationStore.success('تم تسجيل الدخول بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تسجيل الدخول');
        throw error;
      }
    },

    async checkAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;

        // Verify token is still valid
        try {
          await api.get('/auth/profile');
        } catch {
          this.logout();
        }
      }
    },

    async getProfile() {
      const notificationStore = useNotificationStore();
      try {
        const response = await api.get('/auth/profile');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تحميل بيانات المستخدم');
        throw error;
      }
    },

    logout() {
      const notificationStore = useNotificationStore();
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      notificationStore.info('تم تسجيل الخروج بنجاح');
    },

    async register(userData) {
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post('/auth/register', userData);
        notificationStore.success('تم تسجيل المستخدم بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تسجيل المستخدم');
        throw error;
      }
    },

    async createFirstUser(userData) {
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post('/auth/create-first-user', userData);
        notificationStore.success('تم إنشاء المستخدم الأول بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل إنشاء المستخدم الأول');
        throw error;
      }
    },

    async fetchInitialSetupInfo() {
      const notificationStore = useNotificationStore();
      try {
        const response = await api.get('/auth/initial-setup-info');
        this.isFirstRun = response.data.isFirstRun;
        return response.data;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل جلب معلومات الإعداد الأولي');
        throw error;
      }
    },
  },
});
