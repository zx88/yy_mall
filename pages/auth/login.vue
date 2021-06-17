<template>
	<view>
		<view class="wrapper">
			<view class="left_top_sign">LOGIN</view>
			<view class="welcome">欢迎回来！</view>
			<!-- 			<view v-show="isLoginMode === 'phone'" class="input-content">
				<u-form :model="loginForm" ref="loginForm" label-width="0">
					<u-form-item prop="phone">
						<u-input placeholder="请输入手机号" v-model="loginForm.phone" />
					</u-form-item>
					<u-form-item prop="verify">
						<u-input placeholder="请输入验证码" v-model="loginForm.verify" />
						<u-button plain size="medium" slot="right" type="success" @click="getCode">发送验证码</u-button>
					</u-form-item>
				</u-form>
				<u-button
					:custom-style="{ marginTop: '40rpx', height: '90rpx' }"
					ripple
					shape="circle"
					type="error"
					@click="submit"
				>
					登录
				</u-button>
			</view> -->
			<view v-show="isLoginMode === 'user'" class="input-content">
				<u-form :model="userLoginForm" ref="userLoginForm" label-width="45rpx">
					<u-form-item prop="username" :leftIconStyle="{ color: '#c0c4cc' }" leftIcon="account">
						<u-input maxlength="20" placeholder="请输入用户名" v-model="userLoginForm.username" />
					</u-form-item>
					<u-form-item prop="pwd" :leftIconStyle="{ color: '#c0c4cc' }" leftIcon="lock">
						<u-input maxlength="16" type="password" placeholder="请输入密码" v-model="userLoginForm.pwd" />
						<view slot="right" class="find_pwd"><text @click="navTo('find_pwd')">忘记密码</text></view>
					</u-form-item>
				</u-form>
				<view class="btn">
					<u-button :custom-style="{ width: '250rpx' }" ripple type="error" plain @click="navTo('register?type=user')">注册</u-button>
					<u-button :custom-style="{ width: '250rpx' }" ripple type="error" @click="userLogin">登录</u-button>
				</view>
			</view>
			<view v-show="isLoginMode === 'email'" class="input-content">
				<u-form :model="emailLoginForm" ref="emailLoginForm" label-width="40">
					<u-form-item prop="email" :leftIconStyle="{ color: '#c0c4cc' }" leftIcon="email">
						<u-input placeholder="请输入邮箱" v-model="emailLoginForm.email" />
					</u-form-item>
					<u-form-item prop="pwd" :leftIconStyle="{ color: '#c0c4cc' }" leftIcon="lock">
						<u-input maxlength="16" type="password" placeholder="请输入密码" v-model="emailLoginForm.pwd" />
						<view slot="right" class="find_pwd"><text @click="navTo('find_pwd')">忘记密码</text></view>
					</u-form-item>
				</u-form>
				<view class="btn">
					<u-button :custom-style="{ width: '250rpx' }" ripple type="error" plain @click="navTo('register?type=email')">注册</u-button>
					<u-button :custom-style="{ width: '250rpx' }" ripple type="error" @click="emailLogin">登录</u-button>
				</view>
			</view>
		</view>
		<view class="other-wrapper">
			<u-divider>其他登录</u-divider>
			<view class="list">
				<!-- #ifdef MP-WEIXIN -->
				<view class="item" @click="mpWxGetUserInfo">
					<image class="icon" src="/static/icon/login-wx.png"></image>
					<text>微信登录</text>
				</view>
				<view v-if="isLoginMode === 'user'" class="item" @click="isLoginMode = 'email'">
					<image class="icon" src="/static/icon/login-email.png"></image>
					<text>邮箱登录</text>
				</view>
				<view v-if="isLoginMode === 'email'" class="item" @click="isLoginMode = 'user'">
					<image class="icon" src="/static/icon/login-user.png"></image>
					<text>账户登录</text>
				</view>
				<!-- #endif -->

				<!-- #ifdef APP-PLUS -->
				<!-- 				<view class="item" style="width: 180rpx;" @click="loginByApple">
					<image class="icon" src="/static/icon/apple.png"></image>
					<text>Apple登录</text>
				</view> -->
				<view class="item" @click="loginByWxApp">
					<image class="icon" src="/static/icon/login-wx.png"></image>
					<text>微信登录</text>
				</view>
				<view class="item">
					<image class="icon" src="/static/icon/login-phone.png"></image>
					<text>一键登录</text>
				</view>
				<view v-if="isLoginMode === 'user'" class="item" @click="isLoginMode = 'email'">
					<image class="icon" src="/static/icon/login-email.png"></image>
					<text>邮箱登录</text>
				</view>
				<view v-if="isLoginMode === 'email'" class="item" @click="isLoginMode = 'user'">
					<image class="icon" src="/static/icon/login-user.png"></image>
					<text>账户登录</text>
				</view>
				<!-- #endif -->

				<!-- #ifdef H5 -->
				<view v-if="isLoginMode === 'user'" class="item" @click="isLoginMode = 'email'">
					<image class="icon" src="/static/icon/login-email.png"></image>
					<text>邮箱登录</text>
				</view>
				<view v-if="isLoginMode === 'email'" class="item" @click="isLoginMode = 'user'">
					<image class="icon" src="/static/icon/login-user.png"></image>
					<text>账户登录</text>
				</view>
				<!-- #endif -->
			</view>
		</view>
		<view class="agreement">
			<u-checkbox @change="handleAgreement" activeColor="#e93b3d" label-disabled label-size="24rpx" v-model="isAgreement" shape="circle">
				请认真阅读并同意
				<text class="tit" @click="navToAgreementDetail(1)">《用户服务协议》</text>
				<text class="tit" @click="navToAgreementDetail(2)">《隐私权政策》</text>
			</u-checkbox>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		// 验证邮箱规则
		var checkEmail = (rule, value, cb) => {
			const regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
			if (regEmail.test(value)) {
				return cb();
			}
			cb(new Error('请输入合法邮箱'));
		};
		// 验证手机号规则
		// var checkMobile = (rule, value, cb) => {
		// 	const regMobile = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
		// 	if (regMobile.test(value)) {
		// 		return cb();
		// 	}
		// 	cb(new Error('请输入合法手机号'));
		// };
		return {
			// 账号密码登录
			userLoginForm: {
				username: 'admin',
				pwd: '123456',
				deviceId: '1',
				deviceName: '1'
			},
			userLoginRules: {
				username: [{ required: true, message: '请输入用户名', trigger: ['change', 'blur'] }],
				pwd: [
					{ required: true, message: '请输入密码', trigger: ['change', 'blur'] },
					{ min: 6, message: '密码不能少于6位数', trigger: 'change' }
				]
			},
			// 邮箱登录
			emailLoginForm: {
				email: '',
				pwd: '',
				deviceId: '1',
				deviceName: '1'
			},
			emailLoginRules: {
				email: [
					{ required: true, message: '请输入邮箱', trigger: ['change', 'blur'] },
					{ validator: checkEmail, trigger: ['change', 'blur'] }
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: ['change', 'blur'] },
					{ min: 6, message: '密码不能少于6位数', trigger: 'change' }
				]
			},
			// 表单显示形式
			isLoginMode: 'user',
			// 隐私协议
			isAgreement: false
		};
	},
	onLoad(options) {
		// 注册后输入框显示刚才注册账号
		// if (options.email) {
		// 	(this.isLoginMode = 'email'), (this.emailLoginForm.email = options.email);
		// } else {
		// 	(this.isLoginMode = 'user'), (this.userLoginForm.username = options.username);
		// }
	},
	onReady() {
		// 获取缓存中用户协议是否勾选
		let isAgreement = uni.getStorageSync('isAgreement');
		if (isAgreement) {
			this.isAgreement = isAgreement;
		}

		// 验证规则
		this.$refs.userLoginForm.setRules(this.userLoginRules);
		this.$refs.emailLoginForm.setRules(this.emailLoginRules);
	},
	methods: {
		// 用户名/密码登录/zxapi/user/username/login
		userLogin() {
			this.$refs.userLoginForm.validate(async valid => {
				let query = this.userLoginForm;
				if (!valid) return;
				if (!this.isAgreement) return this.$util.msg('请阅读并同意用户服务及隐私协议');
				const res = await this.$request({ method: 'post', url: '/user/username/login', data: query });
				if (res.code !== 0) return this.$util.msg(res.msg);
				const token = res.data.token;
				this.loginSuccessCallBack(token);
			});
		},
		// 邮箱登录/{domain}/user/email/login
		emailLogin() {
			this.$refs.emailLoginForm.validate(async valid => {
				let query = this.emailLoginForm;
				// 表单验证
				if (!valid) return;
				// 隐私协议勾选验证
				if (!this.isAgreement) return this.$util.msg('请阅读并同意用户服务及隐私协议');
				const res = await this.$request({ method: 'post', url: '/user/email/login', data: query });
				if (res.code !== 0) return this.$util.msg(res.msg);
				const token = res.data.token;
				this.loginSuccessCallBack(token);
			});
		},
		// 小程序微信登录
		async mpWxGetUserInfo() {
			if (!this.isAgreement) return this.$util.msg('请阅读并同意用户服务及隐私协议');
			// 1 获取用户信息
			const [, { encryptedData, rawData, iv, signature, userInfo }] = await uni.getUserProfile({
				desc: '用于完善会员资料' // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			});
			// 2 获取小程序登录成功后的code
			const [, { code }] = await uni.login({ provider: 'weixin' });
			const loginParams = { code };
			// 3 发送请求 获取用户的token
			const res = await this.$request({ method: 'post', url: '/user/wxapp/login', data: { code } });
			if (res.code !== 0) return this.$util.msg(res.msg);
			const token = res.data.token;
			this.loginSuccessCallBack(token);
		},
		// 登录成功提示和跳转
		loginSuccessCallBack(data) {
			this.$util.msg('登陆成功');
			this.$store.commit('setToken', data);
			setTimeout(() => {
				uni.switchTab({
					url: '../mine/index'
				});
			}, 1000);
		},
		// 点击同意协议按钮
		handleAgreement(e) {
			uni.setStorageSync('isAgreement', e.value);
		},
		//打开用户协议
		navToAgreementDetail(type) {
			uni.navigateTo({
				url: `agreement?type=${type}`
			});
		}
	}
};
</script>

<style>
page {
	background: #fff;
}
</style>
<style scoped lang="scss">
.wrapper {
	position: relative;
	z-index: 100;
	padding-top: 10vh;
	overflow: hidden;
	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 50rpx;
		color: #555;
	}
	.input-content {
		padding: 0 50rpx;
		.find_pwd {
			text {
				color: #40a2ff;
				padding-left: 20rpx;
				border-left: 1rpx solid #dcdcdc;
			}
		}
		.btn {
			padding-top: 50rpx;
			display: flex;
			justify-content: space-around;
		}
	}
}
.left_top_sign {
	font-size: 120rpx;
	color: #efefef;
	position: relative;
	left: -12rpx;
}
/* 其他登录方式 */
.other-wrapper {
	position: absolute;
	bottom: 10vh;
	width: 100%;
	.list {
		display: flex;
		justify-content: center;
		.item {
			margin: 30rpx 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon {
				width: 70rpx;
				height: 70rpx;
				margin: 0 24rpx 16rpx;
			}
		}
	}
}
.agreement {
	position: absolute;
	bottom: 6vh;
	width: 100vw;
	text-align: center;
	.tit {
		color: #40a2ff;
		font-size: 24rpx;
	}
}
</style>
