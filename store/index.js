import Vue from 'vue'
import Vuex from 'vuex'
import {
	request
} from '../common/js/request.js'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: '',
		userInfo: {}, //用户信息
		updateCart: true, // 是否重新加载新的购物车列表
		cartCount: 0, //购物车列表
		orderCount: {}, //订单数量

		collectCount: 0, //商品收藏数
		couponCount: 0, //可用优惠券数量
	},
	getters: {
		// 是否登录
		hasLogin(state) {
			return !!state.token;
		},
		getUpdateCart(state) {
			return state.updateCart
		},
		getCartCount(state) {
			return state.cartCount
		}
	},
	mutations: {
		//更新state数据
		setStateAttr(state, param) {
			if (param instanceof Array) {
				for (let item of param) {
					state[item.key] = item.val;
				}
			} else {
				state[param.key] = param.val;
			}
		},
		//更新token
		setToken(state, data) {
			const token = data;
			state.token = token;
			uni.setStorageSync('token', token);
			this.dispatch('getUserInfo'); //更新用户信息
			this.dispatch('getCartCount'); //更新购物车数量
			this.dispatch('getCollectCount'); //更新收藏数量
			this.dispatch('getOrderCount'); //更新订单数量
		},
		//退出登录
		logout(state) {
			state.token = '';
			uni.removeStorageSync('token');
			uni.removeStorageSync('historyCount'); //浏览历史数
			state.updateCart = true; //重新加载购物车
			state.collectCount = 0; //更新商品收藏数
			state.orderCount = {}, //更新订单数量
				setTimeout(() => {
					state.userInfo = {};
				}, 1000)
		},
		// 是否加载新的购物车列表
		setUpdateCart(state, flag) {
			console.log("改变了购物车的flag" + Boolean(flag));
			state.updateCart = Boolean(flag);
		},
		//后续每次更新购物车数
		setCartCount(state, cartCount) {
			state.cartCount = cartCount;
		}
	},
	actions: {
		//更新用户信息
		async getUserInfo({
			state,
			commit
		}) {
			const token = state.token;
			const res = await request({
				url: `/user/detail?token=${token}`
			});
			if (res.code === 0) {
				const userInfo = res.data.base;
				commit('setStateAttr', {
					key: 'userInfo',
					val: userInfo
				})
			}
		},
		//首次进入更新购物车数
		async getCartCount({
			state,
			commit
		}) {
			let cartCount = 0;
			const res = await request({
				url: '/shopping-cart/info'
			});
			if (res.code === 0) {
				cartCount = res.data.number;
			}
			commit('setStateAttr', {
				key: 'cartCount',
				val: cartCount
			})
		},
		//更新用户订单数量
		async getOrderCount({
			state,
			commit
		}) {
			let orderCount = {};
			const res = await request({
				url: '/order/statistics'
			});
			if (res.code === 0) {
				orderCount = res.data;
			}
			commit('setStateAttr', {
				key: 'orderCount',
				val: orderCount
			})
		},
		// 获取商品收藏列表
		async getCollectCount({
			state,
			commit
		}) {
			let collectCount = 0;
			const res = await request({
				method: 'post',
				url: '/shop/goods/fav/list',
				data: {
					type: 0
				}
			});
			if (res.code === 0) {
				collectCount = res.data.length;
			}
			commit('setStateAttr', {
				key: 'collectCount',
				val: collectCount
			})
		}
	}
})


export default store
