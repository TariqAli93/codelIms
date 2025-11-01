import { defineStore } from 'pinia';
import api from '@/plugins/axios';
import { useNotificationStore } from '@/stores/notification';

export const useSaleStore = defineStore('sale', {
  state: () => ({
    sales: [],
    currentSale: null,
    loading: false,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
  }),

  actions: {
    async fetchSales(params = {}) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.get('/sales', { params });
        this.sales = response.data;
        this.pagination = response.meta;
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تحميل المبيعات');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchSale(id) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.get(`/sales/${id}`);
        this.currentSale = response.data;
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تحميل بيانات المبيعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createSale(saleData) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post('/sales', saleData);
        this.sales.unshift(response.data);
        notificationStore.success('تم إضافة المبيعة بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل إضافة المبيعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cancelSale(id) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post(`/sales/${id}/cancel`);
        const index = this.sales.findIndex((s) => s.id === id);
        if (index !== -1) {
          this.sales[index].status = 'cancelled';
        }
        notificationStore.success('تم إلغاء المبيعة بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل إلغاء المبيعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async getSalesReport(queryParams = {}) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.get('/sales/report', { params: queryParams });

        return response.data;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل تحميل تقرير المبيعات');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async addPayment(paymentData) {
      if (!this.currentSale) {
        throw new Error('No current sale selected');
      }

      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post(`/sales/${this.currentSale.id}/payment`, paymentData);
        // Update the current sale with the new payment
        this.currentSale = response.data;
        notificationStore.success('تم إضافة الدفعة بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل إضافة الدفعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async removePaymentFromCurrentSale(paymentId) {
      if (!this.currentSale) {
        throw new Error('No current sale selected');
      }

      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        await api.delete(`/sales/${this.currentSale.id}/payments/${paymentId}`);
        // Update the current sale by removing the payment
        this.currentSale.payments = this.currentSale.payments.filter((p) => p.id !== paymentId);
        notificationStore.success('تم حذف الدفعة بنجاح');
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل حذف الدفعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteSale(id) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        await api.delete(`/sales/${id}`);
        this.sales = this.sales.filter((s) => s.id !== id);
        notificationStore.success('تم حذف المبيعة بنجاح');
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل حذف المبيعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async restoreSale(id) {
      this.loading = true;
      const notificationStore = useNotificationStore();
      try {
        const response = await api.post(`/sales/${id}/restore`);
        const index = this.sales.findIndex((s) => s.id === id);
        if (index !== -1) {
          this.sales[index].status = 'completed';
        }
        notificationStore.success('تم استعادة المبيعة بنجاح');
        return response;
      } catch (error) {
        notificationStore.error(error.response?.data?.message || 'فشل استعادة المبيعة');
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
