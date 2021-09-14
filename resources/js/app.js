import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import axios from 'axios'


// vue.prototype.$axios = axios

const aplikasi = createApp(App);
aplikasi.use(store, axios);
aplikasi.use(VeeValidatePlugin);
aplikasi.mount('app');
