<template>
  <div>
    <v-autocomplete
      v-model="internalValue"
      :items="options"
      :loading="loading"
      :label="label"
      item-title="name"
      item-value="id"
      clearable
      hide-no-data
      @update:search="onSearch"
    >
      <template #no-data>
        <div class="pa-4 text-center">
          <p>لا يوجد {{ entityLabel }} بهذا الاسم.</p>
          <v-btn v-if="searchTerm" color="primary" size="small" @click="openDialog">
            إنشاء {{ entityLabel }} جديد: "{{ searchTerm }}"
          </v-btn>
        </div>
      </template>
    </v-autocomplete>

    <!-- ======= Create Dialog ======= -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h6"> إضافة {{ entityLabel }} جديد </v-card-title>

        <v-card-text>
          <v-form ref="formRef" @submit.prevent="handleCreate">
            <v-text-field
              v-model="formData.name"
              label="الاسم"
              :rules="[(v) => !!v || 'الاسم مطلوب']"
              required
            ></v-text-field>

            <v-text-field v-model="formData.phone" label="رقم الهاتف" type="tel"></v-text-field>

            <v-text-field
              v-model="formData.email"
              label="البريد الإلكتروني"
              type="email"
            ></v-text-field>

            <v-textarea v-model="formData.notes" label="ملاحظات" rows="2" auto-grow></v-textarea>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">إلغاء</v-btn>
          <v-btn color="primary" :loading="creating" @click="handleCreate">
            <v-icon class="ml-2">mdi-check</v-icon> حفظ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  label: { type: String, required: true },
  entity: { type: String, default: 'customer' },
  modelValue: { type: Object, default: null },
  searchFn: { type: Function, required: true }, // async (query) => []
  createFn: { type: Function, required: true }, // async (data) => {id, name}
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);
const searchTerm = ref('');
const loading = ref(false);
const creating = ref(false);
const options = ref([]);
const dialog = ref(false);
const formData = ref({ name: '', phone: '', email: '', notes: '' });
const formRef = ref(null);

const entityLabel = computed(() =>
  props.entity === 'customer' ? 'عميل' : props.entity === 'supplier' ? 'مورد' : 'عنصر'
);

watch(internalValue, (val) => emit('update:modelValue', val));

const onSearch = async (val) => {
  searchTerm.value = val;
  if (!val) return;
  loading.value = true;
  try {
    const res = await props.searchFn(val);
    options.value = res || [];
  } catch (err) {
    console.error('Search error:', err);
  } finally {
    loading.value = false;
  }
};

const openDialog = () => {
  formData.value.name = searchTerm.value || '';
  dialog.value = true;
};

const handleCreate = async () => {
  const isValid = await formRef.value?.validate();
  if (!isValid) return;
  creating.value = true;
  try {
    const newEntity = await props.createFn(formData.value);
    options.value.push(newEntity);
    internalValue.value = newEntity;
    dialog.value = false;
  } catch (err) {
    console.error('Create error:', err);
  } finally {
    creating.value = false;
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.pa-4 {
  padding: 16px;
}
</style>
