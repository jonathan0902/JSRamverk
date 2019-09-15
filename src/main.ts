import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal';
import { ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);

Vue.use(VModal);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
