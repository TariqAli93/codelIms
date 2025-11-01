<template>
  <div>
    <h1 class="text-h4 font-weight-bold mb-6">بيع جديد</h1>

    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col cols="12" md="6">
              <!-- =======  العميل ======= -->
              <v-combobox
                v-model="saleData.customerId"
                :items="customers"
                item-title="name"
                item-value="id"
                label="العميل"
                clearable
              >
                <template #append>
                  <v-btn
                    icon="mdi-plus"
                    size="small"
                    color="primary"
                    variant="flat"
                    @click="openCustomerDialog"
                  ></v-btn>
                </template>
              </v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="saleData.currency"
                :items="['USD', 'IQD']"
                label="العملة"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <h3 class="text-h6 mb-4">المنتجات</h3>

          <v-text-field
            v-model="scannedBarcode"
            label="قراءة الباركود"
            prepend-inner-icon="mdi-barcode-scan"
            autofocus
            clearable
            class="mb-4"
            @keyup.enter="handleBarcodeScan"
          />

          <div v-for="(item, index) in saleData.items" :key="index" class="mb-4">
            <v-row>
              <v-col cols="12" md="5">
                <v-select
                  v-model="item.productId"
                  :items="products"
                  item-title="name"
                  item-value="id"
                  label="المنتج"
                  @update:model-value="selectProduct(item, $event)"
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model.number="item.quantity"
                  label="الكمية"
                  type="number"
                  :rules="[rules.required]"
                  min="1"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  v-model.number="item.unitPrice"
                  label="السعر"
                  type="number"
                  :rules="[rules.required]"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  :model-value="item.quantity * item.unitPrice"
                  label="المجموع"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="1" class="d-flex align-center">
                <v-btn
                  icon="mdi-delete"
                  color="error"
                  variant="text"
                  @click="removeItem(index)"
                ></v-btn>
              </v-col>
            </v-row>
          </div>

          <v-btn color="primary" prepend-icon="mdi-plus" @click="addItem" class="mb-4">
            إضافة منتج
          </v-btn>

          <v-divider class="my-4"></v-divider>

          <v-row>
            <v-col cols="12" :md="saleData.paymentType === 'installment' ? 3 : 4">
              <v-text-field
                v-model.number="saleData.discount"
                label="الخصم"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col cols="12" :md="saleData.paymentType === 'installment' ? 3 : 4">
              <v-select
                v-model="saleData.paymentType"
                :items="paymentTypes"
                label="نوع الدفع"
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="12" :md="saleData.paymentType === 'installment' ? 3 : 4">
              <v-text-field
                v-model.number="saleData.paidAmount"
                label="المبلغ المدفوع"
                type="number"
              ></v-text-field>
            </v-col>
            <v-col v-if="saleData.paymentType === 'installment'" cols="12" md="3">
              <v-text-field
                v-model.number="saleData.installmentCount"
                label="عدد الأقساط"
                type="number"
                min="1"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>

            <v-col v-if="saleData.paymentType === 'installment'" cols="12" md="3">
              <!-- الفائدة الثابتة على قيمة المنتج بمعنى في حال دفع اقساط يتم تحميل المبلغ قيمة ماليه إضافية على اجمالي المبلغ يعني لو المنتج ب 1000 يصير بالاقساط ب 1200 -->
              <v-text-field
                :model-value="
                  saleData.interestRate ? ((total * saleData.interestRate) / 100).toFixed(2) : 0
                "
                label="قيمة الفائدة"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-card variant="outlined" class="pa-4 mb-4">
            <h3 class="text-h6 mb-2">الملخص</h3>
            <div class="d-flex justify-space-between mb-1">
              <span>المجموع الفرعي:</span>
              <span class="font-weight-bold">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="d-flex justify-space-between mb-1">
              <span>الخصم:</span>
              <span class="font-weight-bold">{{ formatCurrency(saleData.discount || 0) }}</span>
            </div>
            <v-divider class="my-2"></v-divider>
            <div class="d-flex justify-space-between">
              <span class="text-h6">الإجمالي:</span>
              <span class="text-h6 font-weight-bold">{{ formatCurrency(total) }}</span>
            </div>
          </v-card>

          <div class="d-flex gap-2">
            <v-btn type="button" color="primary" :loading="loading" @click="handleSubmit">
              حفظ البيع
            </v-btn>
            <v-btn @click="$router.back()">إلغاء</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- Quick Add Customer Dialog -->
    <v-dialog v-model="customerDialog" max-width="500">
      <v-card>
        <v-card-title class="bg-secondary text-white">إضافة عميل جديد</v-card-title>
        <v-card-text>
          <v-form ref="customerForm">
            <v-text-field
              v-model="newCustomer.name"
              label="اسم العميل"
              :rules="[rules.required]"
            ></v-text-field>
            <v-text-field
              v-model="newCustomer.phone"
              label="رقم الهاتف"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea v-model="newCustomer.address" label="العنوان" rows="2"></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="primary"
            variant="elevated"
            :loading="customerLoading"
            @click="handleAddCustomer"
          >
            حفظ
          </v-btn>
          <v-spacer />
          <v-btn @click="customerDialog = false">إلغاء</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useSaleStore } from '@/stores/sale';
import { useProductStore } from '@/stores/product';
import { useCustomerStore } from '@/stores/customer';
import { useNotificationStore } from '@/stores/notification';

const router = useRouter();
const saleStore = useSaleStore();
const productStore = useProductStore();
const customerStore = useCustomerStore();
const notificationStore = useNotificationStore();

const form = ref(null);
const customerForm = ref(null);
const loading = ref(false);
const customerLoading = ref(false);
const customerDialog = ref(false);
const products = ref([]);
const customers = ref([]);

// ✅ متغير للباركود
const scannedBarcode = ref('');

const paymentTypes = [
  { title: 'نقدي', value: 'cash' },
  { title: 'تقسيط', value: 'installment' },
];

const saleData = ref({
  customerId: null,
  currency: 'IQD',
  exchangeRate: 1,
  items: [],
  discount: 0,
  paymentType: 'cash',
  paidAmount: 0,
  installmentCount: 3,
  interestRate: paymentTypes.find((type) => type.value === 'installment') ? 25 : 0,
});

const newCustomer = ref({
  name: '',
  phone: '',
  address: '',
});

const rules = {
  required: (v) => !!v || v === 0 || 'هذا الحقل مطلوب',
};

// 💰 الحسابات
const subtotal = computed(() =>
  saleData.value.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
);
const total = computed(() => subtotal.value - (saleData.value.discount || 0));

const formatCurrency = (amount) => {
  const currency = saleData.value.currency || 'IQD';
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'IQD' ? 0 : 2,
    maximumFractionDigits: currency === 'IQD' ? 0 : 2,
  };
  try {
    return new Intl.NumberFormat('ar-IQ', options).format(amount || 0);
  } catch {
    return `${amount || 0} ${currency}`;
  }
};

// اضبط المبلغ المدفوع تلقائياً ليطابق الإجمالي عند الدفع النقدي
watch(
  () => [saleData.value.items, saleData.value.discount, saleData.value.paymentType],
  () => {
    if (saleData.value.paymentType === 'cash') {
      saleData.value.paidAmount = Math.max(0, total.value);
    }
  },
  { deep: true, immediate: true }
);

const addItem = () => {
  saleData.value.items.push({
    productId: null,
    productName: '',
    quantity: 1,
    unitPrice: 0,
  });
};

// 🗑️ حذف منتج
const removeItem = (index) => {
  saleData.value.items.splice(index, 1);
};

// 🔹 عند اختيار منتج من القائمة
const selectProduct = (item, productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    item.productName = product.name;
    item.unitPrice = product.sellingPrice;
  }
};

// ✅ عند قراءة الباركود (من الهاتف أو الماسح)
const handleBarcodeScan = () => {
  const code = scannedBarcode.value?.trim();
  if (!code) return;

  const product = products.value.find((p) => p.barcode === code);
  if (!product) {
    notificationStore.error('❌ لم يتم العثور على منتج بهذا الباركود');
    scannedBarcode.value = '';
    return;
  }

  const existing = saleData.value.items.find((i) => i.productId === product.id);
  if (existing) {
    existing.quantity += 1;
    notificationStore.info(`🔁 تمت زيادة الكمية: ${product.name}`);
  } else {
    saleData.value.items.push({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPrice: product.sellingPrice,
    });
    notificationStore.success(`✅ تمت إضافة المنتج: ${product.name}`);
  }

  scannedBarcode.value = '';
};

// 🧾 حفظ البيع
const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  if (!saleData.value.items.length) {
    notificationStore.error('❌ يجب إضافة منتج واحد على الأقل للبيع');
    return;
  }

  if (saleData.value.paidAmount > total.value) {
    notificationStore.error('❌ المبلغ المدفوع لا يمكن أن يكون أكبر من الإجمالي');
    return;
  }

  if (saleData.value.paymentType === 'installment' && saleData.value.installmentCount < 1) {
    notificationStore.error('❌ يجب تحديد عدد صحيح للأقساط');
    return;
  }

  if (saleData.value.paymentType === 'mixed' && saleData.value.paidAmount <= 0) {
    notificationStore.error('❌ يجب إدخال مبلغ مدفوع صالح للدفع المختلط');
    return;
  }

  if (saleData.value.paymentType === 'mixed' && saleData.value.paidAmount >= total.value) {
    notificationStore.error('❌ المبلغ المدفوع يجب أن يكون أقل من الإجمالي للدفع المختلط');
    return;
  }

  // if item quantity is more than available stock
  for (const item of saleData.value.items) {
    const product = products.value.find((p) => p.id === item.productId);
    if (product && item.quantity > product.stock) {
      notificationStore.error(`❌ الكمية المطلوبة للمنتج "${product.name}" تتجاوز المخزون المتاح`);
      return;
    }
  }
  loading.value = true;

  try {
    await saleStore.createSale(saleData.value);
    notificationStore.success('تم حفظ البيع بنجاح ✅');
    router.push({ name: 'Sales' });
  } catch {
    notificationStore.error('حدث خطأ أثناء حفظ البيع ❌');
  } finally {
    loading.value = false;
  }
};

// 👤 إضافة عميل جديد
const openCustomerDialog = () => {
  customerDialog.value = true;
  newCustomer.value = { name: '', phone: '', address: '' };
};

const handleAddCustomer = async () => {
  const { valid } = await customerForm.value.validate();
  if (!valid) return;

  customerLoading.value = true;
  try {
    const response = await customerStore.createCustomer(newCustomer.value);
    customers.value.push(response.data);
    saleData.value.customerId = response.data.id;
    customerDialog.value = false;
    notificationStore.success('تم إضافة العميل بنجاح ✅');
  } catch {
    notificationStore.error('حدث خطأ أثناء إضافة العميل ❌');
  } finally {
    customerLoading.value = false;
  }
};

onMounted(async () => {
  const [productsRes, customersRes] = await Promise.all([
    productStore.fetchProducts({ limit: 1000 }),
    customerStore.fetchCustomers({ limit: 1000 }),
  ]);
  products.value = productsRes.data;
  customers.value = customersRes.data;
});
</script>
