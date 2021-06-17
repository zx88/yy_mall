<template>
	<view>
		<Tabs :tabs="tabs" @handleTabsTitle="showListSort" @handleTabsRight="showListStyle">
			<scroll-view
				v-if="collectList.length"
				class="goods_list"
				scroll-y="true"
				lower-threshold="30"
				refresher-enabled="true"
				:refresher-triggered="triggered"
				:scroll-top="scrollTop"
				@scroll="pageScroll"
				@scrolltolower="scrolltolower"
				@refresherrefresh="refresherrefresh"
			>
				<view v-if="tabs[0].isActive" :class="isListStyle ? 'first_tab_list' : 'first_tab_img'">
					<view class="goods_item_box" v-for="item in collectList" :key="item.id">
						<u-card class="card" margin="10rpx" padding="20" :show-foot="false" :show-head="false">
							<navigator :url="`../goods_detail/index?id=${item.goodsId}`" slot="body" class="goods_item">
								<!-- 左侧 图片容器 -->
								<view class="goods_img_wrap">
									<image :src="item.pic ? item.pic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
								</view>
								<!-- 右侧 商品容器 -->
								<view class="goods_info_wrap">
									<view class="goods_name">{{ item.goodsName }}</view>
									<view class="goods_num">日期: {{ item.dateAdd }}</view>
								</view>
							</navigator>
						</u-card>
					</view>
				</view>
				<view v-else-if="tabs[1].isActive">店铺收藏</view>
				<u-loadmore v-if="totalPages > 1" :status="loadMore" margin-bottom="25" />
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
					value: '商品收藏',
					isActive: true
				},
				{
					id: 1,
					value: '店铺收藏',
					isActive: false
				}
			],
			// 显示模式大图/列表
			isListStyle: false,
			// 列表数据
			collectList: [],
			// 接口请求参数
			queryParams: {
				page: 1,
				pageSize: 10,
				type: 0
			},
			// 总页数
			totalPages: 1,
			// 顶部距离
			scrollTop: 0,
			// 返回顶部按钮显示/关闭
			isBackTop: false,
			// 下拉刷新显示/关闭
			triggered: false,
			loadMore: 'loading'
		};
	},
	onLoad(options) {
		// 判断显示店铺/商品?
		let index = options.index;
		if (index == 1) {
			this.tabs.forEach((v, i) => (i == index ? (v.isActive = true) : (v.isActive = false)));
		}
		this.getCollectList();
	},
	components: {
		Tabs
	},
	methods: {
		// 获取商品收藏列表
		async getCollectList() {
			const queryParams = this.queryParams;
			const res = await this.$request({ method: 'post', url: '/shop/goods/fav/list', data: queryParams }, { login: true });
			if (res.code === 700) return;
			if (res.code === 0) {
				this.collectList = [...this.collectList, ...res.data];
				this.triggered = false;
			}
		},

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
			this.collectList = [];
			this.queryParams.page = 1;
			// this.loadMore = 'loading';
			if (this.triggered) return;
			this.triggered = true; //下拉加载，先让其变true再变false才能关闭
			this.getCollectList();
		},
		showListStyle(e) {
			this.isListStyle = !this.isListStyle;
		},
		showListSort(index) {
			console.log(index);
			this.tabs.forEach((v, i) => (i === index ? (v.isActive = true) : (v.isActive = false)));
		},
		// 触底加载更多
		scrolltolower() {
			console.log('加载更多');
		}
	}
};
</script>

<style lang="scss" scoped>
.cart_empty {
	height: calc(100vh - var(--window-top) - 90rpx);
}
.goods_list {
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
			border-radius: 10rpx;
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
				-webkit-line-clamp: 2;
			}
			.goods_num {
				font-size: 28rpx;
				color: #8f8f8f;
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
			}
			.goods_num {
				font-size: 25rpx;
				color: #8f8f8f;
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
