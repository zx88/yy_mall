<template>
	<view>
		<tab-control :tab-title="tabs" @handleTabsTitle="showListSort">
			<view slot="right" class="tabs_right" @click="isList = !isList">
				<u-icon v-show="!isList" name="grid"></u-icon>
				<u-icon v-show="isList" name="list-dot"></u-icon>
			</view>
		</tab-control>
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
			<goods-list :goods-list="goodsList" :is-list="isList"></goods-list>
			<u-loadmore v-if="totalPage > 1" :status="loadMore" margin-bottom="25" />
		</scroll-view>
		<view v-else class="cart_empty"><u-empty text="暂时没有数据" mode="favor"></u-empty></view>
		<!-- 返回顶部 -->
		<view v-show="isBackTop" class="BackTop" @click="handleBackTop"><u-icon name="arrow-upward"></u-icon></view>
	</view>
</template>

<script>
import TabControl from '../../components/content/TabControl.vue';
import GoodsList from '../../components/content/GoodsList.vue';
export default {
	components: {
		TabControl,
		GoodsList
	},
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
			isList: true,
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
.tabs_right {
	width: 80rpx;
	line-height: 80rpx;
	text-align: center;
	box-shadow: -10rpx 0 0 0 #f1f1f1;
	font-size: 55rpx;
	color: #8a8a8a;
}
.goods_list {
	height: calc(100vh - var(--window-top) - 92rpx);
}
.cart_empty {
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
