import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import axios from 'axios'
import { setHeaderToken } from './utils/auth'
import router from './router/index.js';




axios.defaults.baseURL = 'http://laravue.test/api'
const token = localStorage.getItem('token');
if(token){
    setHeaderToken(token);
}
store.dispatch('get_user', token)




// vue.prototype.$axios = axios

const aplikasi = createApp(App);
aplikasi.use(router);
aplikasi.use(store, axios);
aplikasi.use(VeeValidatePlugin,);
aplikasi.mount('app');
