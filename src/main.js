require ('./bootstrap')
require('./plugins/index')
import { createApp } from 'vue'
import Vue from 'vue'
import Toaster from '@meforma/vue-toaster';
import App from './App.vue'
import router from './router'
import store from './store'
import { VueStars } from "vue-stars"

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


//Vue.config.productionTip = false

const app = createApp(App)

app.use(router)
app.use(Toaster)
app.use(store)
app.component("vue-stars", VueStars)


app.config.globalProperties.$filters = {
  /* formatPrice(price){
    console.log(price);
    return price.toLocaleString('pt-br', {maximumFractionDigits: 2})
  }, */

  formatPrice(value) {
    if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
    });
    return formatter.format(value);
  },

  formatDate (currentDate) {
    let date = new Date(currentDate),
      day = (date.getDate() + 1).toString(),
      dayF = (day.length == 1) ? '0' + day : day,
      month = (date.getMonth() + 1).toString(),
      monthF = (day.length == 1) ? '0' + month : month,
      yearF = date.getFullYear()

    return dayF + "/" + monthF + "/" + yearF

  }

}

app.mount('#app')
store.dispatch('getMe')
