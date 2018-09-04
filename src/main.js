// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

//引入elementui组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/main.css'
import './assets/css/modal.css'
import 'vue-paginator-simple/dist/vue-paginator-simple.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
