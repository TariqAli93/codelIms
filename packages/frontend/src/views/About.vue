<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">الإعدادات</h1>

    <v-card class="mb-4">
      <v-card-title>معلومات النظام</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title>اسم النظام</v-list-item-title>
            <v-list-item-subtitle>CodeLIMS</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>الإصدار</v-list-item-title>
            <v-list-item-subtitle>1.0.0</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>تاريخ الإصدار</v-list-item-title>
            <v-list-item-subtitle>2025</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-title>الحساب الشخصي</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title>الاسم الكامل</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.fullName }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>اسم المستخدم</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.username }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>الدور</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.role }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useCurrencyStore } from '@/stores/currency';

const authStore = useAuthStore();
const currencyStore = useCurrencyStore();

const exchangeRate = ref(currencyStore.iqd ? currencyStore.iqd.exchangeRate : 1310);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  try {
    await currencyStore.fetchCurrencies();

    // Get IQD exchange rate
    const iqd = currencyStore.iqd;
    if (iqd) {
      exchangeRate.value = iqd.exchangeRate;
    }
  } finally {
    loading.value = false;
  }
});

const updateExchangeRate = async () => {
  loading.value = true;
  try {
    await currencyStore.updateExchangeRate('IQD', exchangeRate.value);
  } finally {
    loading.value = false;
  }
};
</script>
