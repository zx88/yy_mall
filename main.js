import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {
	request,
	requests
} from "@/common/js/request.js"
import {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date,
	navTo
} from '@/common/js/util.js'

// 加载动画
import Loading from 'components/Loading.vue'

//引入uviewui
import uView from "uview-ui";
Vue.use(uView);

//vuex
Vue.prototype.$store = store;
//工具
Vue.prototype.$util = {
	msg,
	isLogin,
	debounce,
	throttle,
	prePage,
	date
}
Vue.prototype.navTo = navTo
// 封装请求
Vue.prototype.$request = request
Vue.prototype.$requests = requests

// 加载动画组件
Vue.component('Loading', Loading)



Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
