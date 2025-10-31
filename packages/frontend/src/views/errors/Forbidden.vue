<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="text-center pa-8" elevation="8">
          <v-icon icon="mdi-cancel" size="120" color="error" class="mb-6" />

          <h1 class="text-h2 font-weight-bold mb-4">403</h1>

          <h2 class="text-h5 mb-3">Access Forbidden</h2>

          <p class="text-body-1 text-medium-emphasis mb-6">
            You don't have permission to access this resource. Please contact your administrator if
            you believe this is an error.
          </p>

          <v-divider class="my-6" />

          <div class="d-flex flex-column flex-sm-row gap-3 justify-center">
            <v-btn color="primary" variant="flat" prepend-icon="mdi-arrow-left" @click="goBack">
              Go Back
            </v-btn>

            <v-btn color="primary" variant="outlined" prepend-icon="mdi-home" @click="goHome">
              Go to Dashboard
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}

.gap-3 {
  gap: 12px;
}
</style>
