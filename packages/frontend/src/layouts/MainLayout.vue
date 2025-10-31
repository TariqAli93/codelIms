<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app permanent>
      <v-list-item class="pa-4">
        <v-list-item-title class="text-h6 font-weight-bold primary--text">
          CodeLIMS
        </v-list-item-title>
        <v-list-item-subtitle>نظام إدارة المبيعات</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          v-for="item in filteredMenu"
          :key="item.title"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :exact="item.to === '/'"
          :disabled="item.disabled"
          rounded="xl"
          class="ma-2"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="0" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ currentPageTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>

      <v-menu>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>{{ authStore.user?.fullName }}</v-list-item-title>
            <v-list-item-subtitle>{{ authStore.user?.role }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item prepend-icon="mdi-logout" @click="handleLogout">
            <v-list-item-title>تسجيل خروج</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTheme } from 'vuetify';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const theme = useTheme();
const authStore = useAuthStore();

const drawer = ref(true);
const isDark = computed(() => theme.global.current.value.dark);

const menuItems = [
  { title: 'الرئيسية', icon: 'mdi-view-dashboard', to: '/', permission: null },
  { title: 'المبيعات', icon: 'mdi-cash-register', to: '/sales', permission: 'read:sales' },
  { title: 'العملاء', icon: 'mdi-account-group', to: '/customers', permission: 'read:customers' },
  { title: 'المنتجات', icon: 'mdi-package-variant', to: '/products', permission: 'read:products' },
  { title: 'التصنيفات', icon: 'mdi-shape', to: '/categories', permission: 'read:categories' },
  { title: 'المستخدمون', icon: 'mdi-account', to: '/users', permission: 'read:users' },
  { title: 'الأدوار', icon: 'mdi-shield-account', to: '/roles', permission: 'read:roles' },
  {
    title: 'الصلاحيات',
    icon: 'mdi-shield-key',
    to: '/permissions',
    permission: 'read:permissions',
  },
  { title: 'التقارير', icon: 'mdi-chart-box', to: '/reports', permission: 'read:reports' },
  { title: 'حول', icon: 'mdi-information', to: '/about', permission: null },
];

// 🔹 فلترة القائمة حسب صلاحيات المستخدم
const filteredMenu = computed(() => {
  return menuItems.filter((item) => {
    if (!item.permission) return true; // لا تحتاج صلاحية
    return authStore.hasPermission(item.permission);
  });
});

const currentPageTitle = computed(() => {
  const item = menuItems.find((item) => item.to === route.path);
  return item?.title || 'CodeLIMS';
});

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? 'light' : 'dark';
};

const handleLogout = () => {
  authStore.logout();
  router.push({ name: 'Login' });
};
</script>
