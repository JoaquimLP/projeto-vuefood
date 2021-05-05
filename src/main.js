require ('./bootstrap')
require('./plugins/index')
import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster';
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

//Vue.config.productionTip = false



const app = createApp(App)

app.use(router)
app.use(Toaster)
app.use(store)

app.mount('#app')
store.dispatch('getMe')
