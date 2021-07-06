<template>
	<view class="cart_empty"><u-empty :text="text" :mode="icon"></u-empty></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		text: String,
		icon: String,
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
.cart_empty {
	height: calc(100vh - var(--window-top) - 92rpx);
}
</style>
