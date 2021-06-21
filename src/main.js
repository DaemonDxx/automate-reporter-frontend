import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';
import Vuelidate from "vuelidate";
import {errorHandler} from "./utils/errors/ErrorHandler";

Vue.config.productionTip = false
Vue.use(Notifications);
Vue.use(Vuelidate);

export const VueApp = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Object.defineProperty(VueApp, 'handleError', {
  value: errorHandler
})
