import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import Notifications from 'vue-notification';
import Vuelidate from "vuelidate";

Vue.config.productionTip = false
Vue.use(Notifications);
Vue.use(Vuelidate);

export const VueApp = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
