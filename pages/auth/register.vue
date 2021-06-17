<template>
	<view>
		<view class="wrapper">
			<view v-if="showForm === 'email'" class="input-content">
				<view class="left_top_sign">register</view>
				<view class="welcome">邮箱注册</view>
				<u-form :model="emailRegisterForm" ref="emailRegisterForm" label-width="0">
					<u-form-item prop="email"><u-input placeholder="请输入邮箱" v-model="emailRegisterForm.email" /></u-form-item>
					<u-form-item prop="pwd">
						<u-input maxlength="16" type="password" placeholder="请输入密码" v-model="emailRegisterForm.pwd" />
					</u-form-item>
					<u-form-item prop="conpwd">
						<u-input maxlength="16" type="password" placeholder="确认密码" v-model="emailRegisterForm.conpwd" />
					</u-form-item>
					<u-form-item prop="code">
						<u-input maxlength="4" type="number" placeholder="请输入验证码" v-model="emailRegisterForm.code" />
						<u-button
							:custom-style="{ width: '200rpx' }"
							plain
							size="medium"
							slot="right"
							:disabled="disabled ? true : false"
							@click="getVerify"
						>
							{{ verifyinfo }}
						</u-button>
					</u-form-item>
				</u-form>
				<u-button :custom-style="{ marginTop: '40rpx', height: '90rpx' }" ripple shape="circle" type="error" @click="handleEmailRegister">
					立即注册
				</u-button>
			</view>
			<view v-if="showForm === 'user'" class="input-content">
				<view class="left_top_sign">useregister</view>
				<view class="welcome">用户名注册</view>
				<u-form :model="userRegisterForm" ref="userRegisterForm" label-width="0">
					<u-form-item prop="username">
						<u-input maxlength="12" placeholder="请输入用户名" v-model="userRegisterForm.username" />
					</u-form-item>
					<u-form-item prop="pwd">
						<u-input maxlength="16" type="password" placeholder="请输入密码" v-model="userRegisterForm.pwd" />
					</u-form-item>
					<u-form-item prop="conpwd">
						<u-input maxlength="16" type="password" placeholder="确认密码" v-model="userRegisterForm.conpwd" />
					</u-form-item>
				</u-form>
				<u-button :custom-style="{ marginTop: '40rpx', height: '90rpx' }" ripple shape="circle" type="error" @click="handleUserRegister">
					立即注册
				</u-button>
			</view>
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
			// 邮箱注册表单
			emailRegisterForm: {
				email: '',
				pwd: '',
				conpwd: '',
				code: ''
			},
			emailRegisterRules: {
				email: [
					{ required: true, message: '请输入邮箱', trigger: ['change', 'blur'] },
					{ validator: checkEmail, trigger: ['change', 'blur'] }
				],
				pwd: [{ required: true, message: '请输入密码', trigger: 'change' }, { min: 6, message: '密码不能少于6位数', trigger: 'blur' }],
				conpwd: [{ required: true, message: '请输入确认密码', trigger: 'change' }, { min: 6, message: '密码不能少于6位数', trigger: 'blur' }],
				code: [{ required: true, message: '请输入验证码', trigger: 'change' }, { min: 4, message: '验证码位4位数', trigger: 'blur' }]
			},
			verifyinfo: '发送验证码',
			disabled: false,
			//用户名注册表单
			userRegisterForm: {
				username: '',
				pwd: '',
				conpwd: ''
			},
			userRegisterRules: {
				username: [{ required: true, message: '请输入用户名', trigger: ['change', 'blur'] }],
				pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码不能少于6位数', trigger: 'blur' }],
				conpwd: [{ required: true, message: '请输入确认密码', trigger: 'blur' }, { min: 6, message: '密码不能少于6位数', trigger: 'blur' }]
			},
			showForm: ''
		};
	},
	onLoad(options) {
		this.showForm = options.type;
	},
	onReady() {
		if (this.showForm === 'email') {
			this.$refs.emailRegisterForm.setRules(this.emailRegisterRules);
		} else if (this.showForm === 'user') {
			this.$refs.userRegisterForm.setRules(this.userRegisterRules);
		}
	},
	methods: {
		// 邮箱注册/{domain}/user/email/register
		handleEmailRegister() {
			this.$refs.emailRegisterForm.validate(async valid => {
				let quer = this.emailRegisterForm;
				// 表单验证
				if (!valid) return;
				if (quer.pwd !== quer.conpwd) return this.$util.msg('两次密码输入不一致');
				const res = await this.$request({
					method: 'post',
					url: '/user/email/register',
					data: quer
				});
				if (res.code === 10000) return this.$util.msg('该邮箱已被使用');
				if (res.code === 500) return this.$util.msg('邮箱验证码错误');
				if (res.code === 0) {
					this.registerSuccessCallBack(quer);
				}
			});
		},
		// 获取验证码/{domain}/verification/mail/get
		async getVerify() {
			let mail = this.emailRegisterForm.email;
			if (this.disabled) return;
			const regEmail = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/;
			if (!regEmail.test(mail)) {
				return this.$util.msg('请输入正确邮箱');
			}
			const res = await this.$request({ url: '/verification/mail/get', data: { mail } });
			if (res.code !== 0) return this.$util.msg('验证码发送失败');
			this.$util.msg('验证码发送成功');
			this.countDown();
		},
		//验证码倒计时
		countDown() {
			this.disabled = true;
			var count = 60;
			this.verifyinfo = `(${count})秒后可发送`;
			var timer = setInterval(() => {
				count--;
				this.verifyinfo = `(${count})秒后可发送`;
				if (count == 0) {
					this.disabled = false;
					count = 60;
					this.verifyinfo = '获取验证码';
					clearInterval(timer);
				}
			}, 1000);
		},
		// 用户名注册/{domain}/user/username/register
		handleUserRegister() {
			this.$refs.userRegisterForm.validate(async valid => {
				let quer = this.userRegisterForm;
				// 表单验证
				if (!valid) return;
				if (quer.pwd !== quer.conpwd) return this.$util.msg('两次密码输入不一致');
				const res = await this.$request({
					method: 'post',
					url: '/user/username/register',
					data: quer
				});
				console.log(res);
				if (res.code === 10000) return this.$util.msg('用户名已被使用');
				if (res.code === 0) {
					this.registerSuccessCallBack(quer);
				}
			});
		},
		registerSuccessCallBack(quer) {
			this.$util.msg('注册成功');
			setTimeout(() => {
				if (this.showForm === 'user') {
					uni.navigateTo({
						url: `login?username=${quer.username}`
					});
				} else {
					uni.navigateTo({
						url: `login?email=${quer.email}`
					});
				}
			}, 1000);
		}
	}
};
</script>

<style scoped lang="scss">
.wrapper {
	position: relative;
	z-index: 100;
	.welcome {
		position: absolute;
		left: 50rpx;
		top: 60rpx;
		font-size: 50rpx;
		color: #555;
	}
	.input-content {
		padding: 0 50rpx;
	}

	/* 其他登录方式 */
	.other-wrapper {
		padding-top: 20rpx;
		margin-top: 50rpx;
		.list {
			display: flex;
			justify-content: center;
			.item {
				margin-top: 30rpx;
				.icon {
					width: 80rpx;
					height: 80rpx;
					margin: 0 24rpx 16rpx;
				}
			}
		}
	}
}
.left_top_sign {
	font-size: 120rpx;
	color: #efefef;
	position: relative;
	left: -12rpx;
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
