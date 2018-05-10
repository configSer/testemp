// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import store from './vuex/store'

Vue.use(Vuex)
Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;
//挂载swiper
import VueAwesomeSwiper from 'vue-awesome-swiper';
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.base.css';



Vue.use(YDUI);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});

