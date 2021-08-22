import store from './store'
import { createApp } from 'vue'

window.Vue = require('vue').default;
import Hello from './components/Hello.vue';

const app = new Vue({
    el: '#app',
    components: {
        Hello,
    }
});

app.use(store);
