<template>
  <div>
    <v-card class="mb-4">
      <div class="flex justify-space-between items-center pa-3">
        <div class="text-h6 font-semibold text-primary">إدارة المبيعات</div>
        <v-btn color="primary" prepend-icon="mdi-plus" to="/sales/new"> بيع جديد </v-btn>
      </div>
    </v-card>

    <v-card class="mb-4">
      <div class="flex justify-lg-space-between items-center pa-3 gap-4">
        <v-select
          v-model="filters.status"
          :items="statusOptions"
          label="الحالة"
          clearable
          hide-details
          density="comfortable"
          @update:model-value="handleFilter"
        ></v-select>

        <v-text-field
          v-model="filters.startDate"
          label="من تاريخ"
          type="date"
          hide-details
          density="comfortable"
          @change="handleFilter"
        ></v-text-field>

        <v-text-field
          v-model="filters.endDate"
          label="إلى تاريخ"
          type="date"
          hide-details
          density="comfortable"
          @change="handleFilter"
        ></v-text-field>
      </div>
    </v-card>

    <v-card class="mb-4">
      <v-data-table
        :headers="headers"
        :items="saleStore.sales"
        :loading="saleStore.loading"
        @click:row="viewSale"
        class="cursor-pointer"
      >
        <template v-slot:[`item.total`]="{ item }">
          {{ formatCurrency(item.total, item.currency) }}
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small">
            {{ getStatusText(item.status) }}
          </v-chip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          {{ toYmd(item.createdAt) }}
        </template>

        <template v-slot:[`item.paymentType`]="{ item }">
          {{ getPaymentTypeText(item.paymentType) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSaleStore } from '@/stores/sale';

const router = useRouter();
const saleStore = useSaleStore();

const filters = ref({
  status: null,
  startDate: null,
  endDate: null,
});

const statusOptions = [
  { title: 'مكتمل', value: 'completed' },
  { title: 'قيد الانتظار', value: 'pending' },
  { title: 'ملغي', value: 'cancelled' },
];

const headers = [
  { title: 'رقم الفاتورة', key: 'invoiceNumber' },
  { title: 'العميل', key: 'customer' },
  { title: 'المبلغ الإجمالي', key: 'total' },
  { title: 'نوع الدفع', key: 'paymentType' },
  { title: 'الحالة', key: 'status' },
  { title: 'التاريخ', key: 'createdAt' },
];

const formatCurrency = (amount, currency) => {
  const symbol = currency === 'USD' ? '$' : 'IQD';
  return `${symbol} ${parseFloat(amount).toLocaleString()}`;
};

const toYmd = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getPaymentTypeText = (type) => {
  const types = { cash: 'نقدي', installment: 'تقسيط', mixed: 'مختلط' };
  return types[type] || type;
};

const getStatusColor = (status) => {
  const colors = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'error',
  };
  return colors[status] || 'grey';
};

const getStatusText = (status) => {
  const texts = {
    completed: 'مكتمل',
    pending: 'قيد الانتظار',
    cancelled: 'ملغي',
  };
  return texts[status] || status;
};

const handleFilter = () => {
  saleStore.fetchSales(filters.value);
};

const viewSale = (event, { item }) => {
  router.push({ name: 'SaleDetails', params: { id: item.id } });
};

onMounted(() => {
  saleStore.fetchSales();
});
</script>
