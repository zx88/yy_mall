<template>
	<view>
		<Tabs :tabs="tabs" @handleTabsTitle="showListSort" @handleTabsRight="showListStyle">
			<scroll-view
				v-if="goodsList.length"
				class="goods_list"
				scroll-y="true"
				:lower-threshold="30"
				refresher-enabled
				:refresher-triggered="triggered"
				:scroll-top="scrollTop"
				@scroll="pageScroll"
				@scrolltolower="scrolltolower"
				@refresherrefresh="refresherrefresh"
			>
				<view>
					<view :class="isListStyle ? 'first_tab_list' : 'first_tab_img'">
						<view class="goods_item_box" v-for="(item, index) in goodsList" :key="index">
							<u-card class="card" margin="10rpx" padding="20" :show-foot="false" :show-head="false">
								<navigator :url="`../goods_detail/index?id=${item.id}`" slot="body" class="goods_item">
									<!-- 左侧 图片容器 -->
									<view class="goods_img_wrap">
										<image
											:src="item.pic ? item.pic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"
										></image>
									</view>
									<!-- 右侧 商品容器 -->
									<view class="goods_info_wrap">
										<view class="goods_name">{{ item.name }}</view>
										<view class="goods_num">销量: {{ item.numberOrders }}</view>
										<view class="goods_price">
											￥{{ item.minPrice }}
											<text class="old_price">￥{{ item.originalPrice }}</text>
										</view>
									</view>
								</navigator>
							</u-card>
						</view>
					</view>
				</view>
				<u-loadmore v-if="totalPage > 1" :status="loadMore" margin-bottom="25" />
			</scroll-view>
			<view v-else class="cart_empty"><u-empty text="暂时没有数据" mode="favor"></u-empty></view>
			<!-- 返回顶部 -->
			<view v-show="isBackTop" class="BackTop" @click="handleBackTop"><u-icon name="arrow-upward"></u-icon></view>
		</Tabs>
	</view>
</template>

<script>
import Tabs from '@/components/Tabs.vue';
export default {
	data() {
		return {
			// 顶部排序选择
			tabs: [
				{
					id: 0,
					value: '综合排序',
					isActive: true
				},
				{
					id: 1,
					value: '销量',
					isActive: false,
					isSort: 'top'
				},
				{
					id: 2,
					value: '价格',
					isActive: false,
					isSort: 'top'
				},
				{
					id: 3,
					value: '时间',
					isActive: false,
					isSort: 'top'
				}
			],
			// 显示模式大图/列表
			isListStyle: true,
			// 列表数据
			goodsList: [],
			// 接口请求参数
			QueryParams: {
				categoryId: '',
				page: 1,
				pageSize: 10,
				orderBy: 'nameUp',
				k: ''
			},
			// 总页数
			totalPage: 1,
			// 顶部距离
			scrollTop: 0,
			// 返回顶部按钮显示/关闭
			isBackTop: false,
			// 下拉刷新显示/关闭
			triggered: false,
			loadMore: 'loading'
		};
	},
	components: {
		Tabs: Tabs
	},
	onLoad(options) {
		this.QueryParams.categoryId = options.id || '';
		this.QueryParams.k = options.k || '';
		this.getGoodsList();
	},
	methods: {
		// 点击回到顶部
		handleBackTop() {
			this.scrollTop = -1;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		},
		// 监测距离顶部距离,显示回到顶部按钮
		pageScroll(e) {
			if (e.detail.scrollTop > 90) {
				this.isBackTop = true;
			} else {
				this.isBackTop = false;
			}
		},
		// 下拉刷新
		refresherrefresh() {
			this.goodsList = [];
			this.QueryParams.page = 1;
			// this.loadMore = 'loading';
			if (this.triggered) return;
			this.triggered = true; //下拉加载，先让其变true再变false才能关闭
			this.getGoodsList();
		},
		// 触底加载更多
		scrolltolower() {
			//  1 判断还有没有下一页数据
			if (this.QueryParams.page >= this.totalPage) {
				this.loadMore = 'nomore';
			} else {
				this.QueryParams.page++;
				this.getGoodsList();
			}
		},
		// 获取列表
		async getGoodsList() {
			this.loadMore = 'loading';
			const res = await this.$request({ method: 'post', url: '/shop/goods/list/v2', data: this.QueryParams });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.totalPage = res.data.totalPage;
			this.goodsList = [...this.goodsList, ...res.data.result];
			// 关闭下拉刷新的窗口
			this.triggered = false;
		},
		// 切换列表或大图显示
		showListStyle(e) {
			this.isListStyle = e;
		},
		// 选择排序方式
		showListSort(index) {
			this.tabs.forEach((v, i) => (i === index ? (v.isActive = true) : (v.isActive = false)));
			let isSort = this.tabs[index].isSort;
			if (index == 0) {
				this.QueryParams.orderBy = 'nameUp';
				this.goodsList = [];
				this.QueryParams.page = 1;
				this.getGoodsList();
			} else if (index == 1) {
				if (isSort == 'top') {
					this.tabs[index].isSort = 'bottom';
					this.QueryParams.orderBy = 'ordersDown';
				} else {
					this.tabs[index].isSort = 'top';
					this.QueryParams.orderBy = 'ordersUp';
				}
				this.goodsList = [];
				this.QueryParams.page = 1;
				this.getGoodsList();
			} else if (index == 2) {
				if (isSort == 'top') {
					this.tabs[index].isSort = 'bottom';
					this.QueryParams.orderBy = 'priceDown';
				} else {
					this.tabs[index].isSort = 'top';
					this.QueryParams.orderBy = 'priceUp';
				}
				this.goodsList = [];
				this.QueryParams.page = 1;
				this.getGoodsList();
			} else if (index == 3) {
				if (isSort == 'top') {
					this.tabs[index].isSort = 'bottom';
					this.QueryParams.orderBy = 'addedUp';
				} else {
					this.tabs[index].isSort = 'top';
					this.QueryParams.orderBy = 'addedDown';
				}
				this.goodsList = [];
				this.QueryParams.page = 1;
				this.getGoodsList();
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.goods_list {
	height: calc(100vh - var(--window-top) - 90rpx);
}
.cart_empty {
	height: calc(100vh - var(--window-top) - 90rpx);
}
.first_tab_list {
	padding: 0 10rpx;
	.goods_item {
		display: flex;
		.goods_img_wrap {
			// flex: 2;
			width: 180rpx;
			height: 180rpx;
			overflow: hidden;
			border-radius: 15rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.goods_info_wrap {
			flex: 1;
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
				-webkit-line-clamp: 1;
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
				height: 300rpx;
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
					display: none;
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
.BackTop {
	position: fixed;
	right: 50rpx;
	bottom: 50rpx;
	width: 80rpx;
	line-height: 80rpx;
	border-radius: 50%;
	font-size: 45rpx;
	color: #a6a6a6;
	text-align: center;
	background-color: rgba(135, 135, 135, 0.2);
}
</style>
