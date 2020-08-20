import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/reset.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

axios.defaults.baseURL = 'http://localhost:3000'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
