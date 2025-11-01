<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">
      {{ isEdit ? 'تعديل منتج' : 'منتج جديد' }}
    </h1>

    <v-card>
      <v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.name"
                label="اسم المنتج"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="formData.sku" label="رمز المنتج"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="formData.categoryId"
                :items="categories"
                item-title="name"
                item-value="id"
                label="التصنيف"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="formData.barcode"
                label="قراءة الباركود"
                prepend-inner-icon="mdi-barcode-scan"
                autofocus
                clearable
                class="mb-4"
                @keyup.enter="handleBarcodeScan"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.costPrice"
                label="سعر التكلفة"
                type="number"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model.number="formData.sellingPrice"
                label="سعر البيع"
                type="number"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="formData.currency"
                :items="['USD', 'IQD']"
                label="العملة"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="formData.stock"
                label="المخزون"
                type="number"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model.number="formData.minStock"
                label="الحد الأدنى للمخزون"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-select
                v-model="formData.status"
                :items="statusOptions"
                label="الحالة"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="formData.description" label="الوصف" rows="3"></v-textarea>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex gap-2">
            <v-btn type="submit" color="primary" :loading="loading">حفظ</v-btn>
            <v-btn @click="$router.back()">إلغاء</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useCategoryStore } from '@/stores/category';

const router = useRouter();
const route = useRoute();
const productStore = useProductStore();
const categoryStore = useCategoryStore();

const form = ref(null);
const loading = ref(false);
const categories = ref([]);
const formData = ref({
  name: '',
  sku: '',
  barcode: '',
  categoryId: null,
  description: '',
  costPrice: 0,
  sellingPrice: 0,
  currency: 'USD',
  stock: 0,
  minStock: 0,
  status: 'available',
});

const statusOptions = [
  { title: 'متاح', value: 'available' },
  { title: 'نفذ', value: 'out_of_stock' },
  { title: 'متوقف', value: 'discontinued' },
];

const isEdit = computed(() => !!route.params.id);

const rules = {
  required: (v) => !!v || 'هذا الحقل مطلوب',
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    if (isEdit.value) {
      await productStore.updateProduct(route.params.id, formData.value);
    } else {
      await productStore.createProduct(formData.value);
    }
    router.push({ name: 'Products' });
  } catch (error) {
    console.error('Error saving product:', error);
  } finally {
    loading.value = false;
  }
};

const handleBarcodeScan = () => {
  const code = formData.value?.barcode?.trim();
  if (!code) return;
};

onMounted(async () => {
  const response = await categoryStore.fetchCategories();
  categories.value = response.data;

  if (isEdit.value) {
    loading.value = true;
    try {
      await productStore.fetchProduct(route.params.id);
      formData.value = { ...productStore.currentProduct };
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      loading.value = false;
    }
  }
});
</script>
