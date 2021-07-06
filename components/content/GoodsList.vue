<template>
	<view>
		<view :class="isList ? 'first_tab_list' : 'first_tab_img'">
			<view class="goods_item_box" v-for="(item, index) in goodsList" :key="index">
				<u-card class="" margin="10rpx" padding="20" :show-foot="false" :show-head="false">
					<navigator
						:url="item.goodsId ? `../goods_detail/index?id=${item.goodsId}` : `../goods_detail/index?id=${item.id}`"
						slot="body"
						class="goods_item"
					>
						<!-- 左侧 图片容器 -->
						<view class="goods_img_wrap">
							<u-lazy-load
								:image="item.pic ? item.pic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"
							></u-lazy-load>
							<!-- <image :src="item.pic ? item.pic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image> -->
						</view>
						<!-- 右侧 商品容器 -->
						<view class="goods_info_wrap">
							<view class="goods_name">{{ item.name || item.goodsName }}</view>
							<view v-if="item.minPrice" class="goods_num">销量: {{ item.numberOrders }}</view>
							<view v-else class="goods_num">日期: {{ item.dateAdd || item.dateVisit }}</view>
							<view v-if="item.minPrice" class="goods_price">
								￥{{ item.minPrice }}
								<text class="old_price">￥{{ item.originalPrice }}</text>
							</view>
						</view>
					</navigator>
				</u-card>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		goodsList: Array,
		isList: Boolean
	}
};
</script>

<style lang="scss" scoped>
.first_tab_list {
	padding: 0 10rpx;
	.goods_item_box {
		width: 100%;
		.goods_item {
			display: flex;
			// .goods_img_wrap {
			// 	// flex: 2;
			// 	width: 180rpx;
			// 	height: 180rpx;
			// 	// overflow: hidden;
			// 	border-radius: 8rpx;
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// 	image {
			// 		width: 100%;
			// 		height: 100%;
			// 	}
			// }
			.goods_img_wrap {
				flex: 2;
				overflow: hidden;
				border-radius: 5rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.goods_info_wrap {
				flex: 5;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding-left: 20rpx;
				.goods_name {
					font-size: 32rpx;
					color: #000;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.goods_num {
					color: #8f8f8f;
				}
				.goods_price {
					color: $themeColor;
					font-size: 34rpx;
					font-weight: 600;
					.old_price {
						font-size: 26rpx;
						margin-left: 10rpx;
						text-decoration: line-through;
						color: #8f8f8f;
						font-weight: normal;
					}
				}
			}
		}
	}
}
.first_tab_img {
	display: flex;
	flex-wrap: wrap;
	padding: 0 10rpx;
	.goods_item_box {
		width: 50%;
		.goods_item {
			// height: 450rpx;
			display: flex;
			flex-direction: column;
			.goods_img_wrap {
				// height: 300rpx;
				overflow: hidden;
				border-radius: 8rpx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.goods_info_wrap {
				display: flex;
				flex-direction: column;
				.goods_name {
					margin-top: 10rpx;
					font-size: 32rpx;
					color: #000;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}
				.goods_num {
					font-size: 25rpx;
					color: #8f8f8f;
				}
				.goods_price {
					color: $themeColor;
					font-size: 34rpx;
					font-weight: 600;
					.old_price {
						font-size: 26rpx;
						margin-left: 10rpx;
						text-decoration: line-through;
						color: #8f8f8f;
						font-weight: normal;
					}
				}
			}
		}
	}
}
</style>
