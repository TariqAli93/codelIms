import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vuetify from './plugins/vuetify';
import router from './router';
import fontLoader from './plugins/fontLoader';
import App from './App.vue';
import '@/styles/main.scss';

// استيراد نظام الخطوط
import './styles/fonts.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(fontLoader); // تفعيل نظام تحميل الخطوط الذكي

app.mount('#app');
