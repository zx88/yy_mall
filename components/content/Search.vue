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
		width: 100%;
		navigator {
			height:30px;
			line-height: 30px;
			text-align: center;
			background-color: #f2f2f2;
			border-radius: 20px;
			color: #666;
			font-size: 15px;
		}
	}
</style>
