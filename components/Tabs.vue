<template>
	<view class="tabs">
		<view class="tabs_title">
			<view v-for="item in tabs" :key="item.id" :class="item.isActive ? 'title_item active' : 'title_item'" @click="handleItemTap(item.id)">
				{{ item.value }}
				<view class="" v-if="item.isSort">
					<view :class="item.isActive && item.isSort == 'top' ? 'top_triangle top_active' : 'top_triangle'"></view>
					<view :class="item.isActive && item.isSort == 'bottom' ? 'buttom_triangle buttom_active' : 'buttom_triangle'"></view>
				</view>
			</view>
			<view class="right_btn" @click="handleRightBtn">
				<u-icon v-show="isList" name="grid"></u-icon>
				<u-icon v-show="!isList" name="list-dot"></u-icon>
			</view>
		</view>

		<view class="tabs_content"><slot></slot></view>
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
		tabs: Array
	},
	mounted() {},
	methods: {
		handleRightBtn() {
			// console.log(this.isList);
			this.isList = !this.isList;
			this.$emit('handleTabsRight', this.isList);
		},
		handleItemTap(index) {
			this.$emit('handleTabsTitle', index);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs_title {
	display: flex;
	align-items: center;
	background-color: #fff;
	height: 90rpx;
	.active {
		color: $themeColor;
		border-bottom: 2rpx solid currentColor;
	}
	.title_item {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 15rpx 0;
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
	.right_btn {
		width: 60rpx;
		text-align: center;
		font-size: 36rpx;
	}
}
</style>
