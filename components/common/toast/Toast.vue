<template>
	<view v-show="isShow">
		<view class="toast">{{ message }}</view>
	</view>
</template>

<script>
export default {
	name: 'Toast',
	data() {
		return {
			message: '',
			time: 2000,
			isShow: false
		};
	},
	mounted() {},
	methods: {
		show(message, time = 1000) {
			this.isShow = true;
			this.message = message;
			setTimeout(() => {
				this.isShow = false;
				this.message = '';
			}, time);
		}
	}
};
</script>

<style lang="scss" scoped>
.toast {
	position: fixed;
	top: 50%;
	left: 50%;
	padding: 15rpx 40rpx;
	color: #fff;
	text-align: center;
	border-radius: 10rpx;
	transform: translate(-50%, -50%);
	background-color: rgba(0, 0, 0, 0.75);
}
</style>
