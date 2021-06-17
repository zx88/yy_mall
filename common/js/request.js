// 同时发送异步代码的次数
// let ajaxTimes = 0;
import {
	msg,
	isLogin
} from './util.js'
import store from '@/store'


/**
 * $request接口请求
 * @param {Boolean} data 请求参数
 * @param {Boolean} ext 附加参数
 * @param {Boolean} ext.showLoading 是否显示loading状态，默认不显示
 * @param {Boolean} ext.login 未登录拦截
 */
export const request = (params = {}, ext = {}) => {
	// ajaxTimes++;
	// uni.showLoading({
	// 	title: '加载中...'
	// });
	if (ext.login && !isLogin()) {
		return {code: 10000};
	}
	params.data = {
		...params.data,
		token: store.state.token
	}
	const baseUrl = "https://api.it120.cc/zxapi";
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: baseUrl + params.url,
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success(res) {
				const code = res.data.code;
				//token无效
				// console.log(res);
				if (code == 2000) {
					msg("登录信息已过期,请重新登录!");
					store.commit('logout');
					reject(res.data.msg);
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/home/index'
						})
					}, 1200)
					return;
				}
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
				// ajaxTimes--;
				// if (ajaxTimes === 0) {
				// 	//  关闭正在等待的图标
				// uni.hideLoading();
				// }
			}
		})
	})
}


export const requests = (params) => {
	const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
	return new Promise((resolve, reject) => {
		uni.request({
			...params,
			url: baseUrl + params.url,
			success(res) {
				resolve(res.data)
			},
			fail(err) {
				reject(err)
			},
			complete() {
			}
		})
	})
}
