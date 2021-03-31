import Vue from 'vue'
import App from './App'
import config from './uni_modules/dnvue-ui/config.js'
import uView from './uview-ui/'
Vue.config.productionTip = false
Vue.prototype.$store = config
Vue.use(uView)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
