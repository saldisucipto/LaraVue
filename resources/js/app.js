import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import store from './store';

const aplikasi = createApp(App);
aplikasi.use(store);
aplikasi.mount('app');
