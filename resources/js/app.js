import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import store from './store';
import VeeValidatePlugin from './includes/validation';

const aplikasi = createApp(App);
aplikasi.use(store);
aplikasi.use(VeeValidatePlugin);
aplikasi.mount('app');
