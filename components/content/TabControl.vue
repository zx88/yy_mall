<template>
	<view class="tabs">
		<view class="tabs_title">
			<view v-for="item in tabTitle" :key="item.id" class="title_item" :class="{ active: item.isActive }" @click="handleItemTap(item.id)">
				{{ item.value }}
				<view class="" v-if="item.isSort">
					<view class="top_triangle" :class="item.isActive && item.isSort == 'top' ? 'top_active' : ''"></view>
					<view class="buttom_triangle" :class="item.isActive && item.isSort == 'bottom' ? 'buttom_active' : ''"></view>
				</view>
				<view v-show="item.isActive" class="border"></view>
			</view>

			<view class="right"><slot name="right"></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			isList: true
		};
	},
	props: {
		tabTitle: Array
	},
	mounted() {},
	methods: {
		handleItemTap(index) {
			this.$emit('handleTabsTitle', index);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	border-bottom: 2rpx solid #eeeeee;
}
.tabs_title {
	display: flex;
	align-items: center;
	background-color: #fff;
	height: 90rpx;
	.active {
		color: $themeColor;
		// border-bottom: 5rpx solid ;
	}
	.title_item {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 15rpx 0;
		.border {
			background-color: $themeColor;
			height: 4rpx;
			width: 50rpx;
			position: absolute;
			bottom: -2rpx;
		}
		.top_triangle {
			width: 0;
			height: 0;
			margin: 5rpx;
			border-top: 8rpx solid transparent;
			border-right: 8rpx solid transparent;
			border-bottom: 8rpx solid #8a8a8a;
			border-left: 8rpx solid transparent;
		}
		.top_active {
			border-bottom: 8rpx solid $themeColor;
		}
		.buttom_triangle {
			width: 0;
			height: 0;
			margin: 5rpx;
			border-top: 8rpx solid #8a8a8a;
			border-right: 8rpx solid transparent;
			border-bottom: 8rpx solid transparent;
			border-left: 8rpx solid transparent;
		}
		.buttom_active {
			border-top: 8rpx solid $themeColor;
		}
	}
}
</style>
