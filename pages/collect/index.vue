<template>
	<view>
		<tab-control :tab-title="tabs" @handleTabsTitle="showListSort"></tab-control>
		<scroll-view
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
			<goods-list v-if="tabs[0].isActive" :goods-list="collectList" :is-list="false"></goods-list>
			<empty v-if="tabs[0].isActive && !collectList.length" :text="'暂时没有数据'" :icon="'favor'"></empty>
			<goods-list v-if="tabs[1].isActive" :is-list="false"></goods-list>
			<empty v-if="tabs[1].isActive && !false" :text="'暂时没有数据'" :icon="'favor'"></empty>
			<u-loadmore v-if="totalPages > 1" :status="loadMore" margin-bottom="25" />
		</scroll-view>

		<!-- <view  class="cart_empty"><u-empty text="暂时没有数据" mode="favor"></u-empty></view> -->
		<!-- 返回顶部 -->
		<view v-show="isBackTop" class="BackTop" @click="handleBackTop"><u-icon name="arrow-upward"></u-icon></view>
	</view>
</template>

<script>
import TabControl from '../../components/content/TabControl.vue';
import GoodsList from '../../components/content/GoodsList.vue';
import Empty from '../../components/content/Empty.vue';
export default {
	components: {
		TabControl,
		GoodsList,
		Empty
	},
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
			console.log(this.collectList);
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
.goods_list {
	height: calc(100vh - var(--window-top) - 92rpx);
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
