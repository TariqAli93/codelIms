<template>
  <v-app>
    <router-view />
    <AppSnackbar />
    <CreateFirstUser />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import AppSnackbar from '@/components/AppSnackbar.vue';
import CreateFirstUser from '@/components/CreateFirstUser.vue';

const authStore = useAuthStore();

onMounted(async () => {
  // Check if user is logged in
  await authStore.checkAuth();
});
</script>

<style>
@import 'tailwindcss';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
