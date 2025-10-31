// Import Vuetify styles (will be processed by SASS)
import '@/styles/main.scss';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { ar } from 'vuetify/locale';
import '@mdi/font/css/materialdesignicons.css';
import { md3 } from 'vuetify/blueprints';

const lightTheme = {
  dark: false,
  colors: {
    primary: '#1976D2',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#F5F5F5',
    surface: '#FFFFFF',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#2196F3',
    secondary: '#616161',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    background: '#121212',
    surface: '#1E1E1E',
  },
};

export default createVuetify({
  components,
  directives,
  blueprint: md3,
  locale: {
    locale: 'ar',
    fallback: 'ar',
    messages: { ar },
    rtl: { ar: true },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
});
