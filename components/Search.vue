<template>
	<view class="search_box">
		<navigator url="/pages/search/index">
			<u-icon name="search"></u-icon>
			输入关键字搜索
		</navigator>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {}
};
</script>

<style lang="scss" scoped>
	.search_box {
		height: 80rpx;
		// flex: 1;
		padding: 10rpx;
		navigator {
			height: 100%;
			line-height: 60rpx;
			text-align: center;
			background-color: #f2f2f2;
			border-radius: 40rpx;
			color: #666;
		}
	}
</style>
