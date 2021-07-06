<template>
	<view>
		<!-- 自定义导航栏 -->
		<nav-bar :isBack="false" :background="{ background: '#8b8dff' }">
			<view class="navbar_wrap">
				<view class="nav_notify">
					<navigator url="/pages/notify/index"><u-icon name="chat"></u-icon></navigator>
				</view>
				<view class="nav_search"><search></search></view>
			</view>
		</nav-bar>
		<view class="container u-skeleton">
			<view class="top_box">
				<!-- 轮播图 -->
				<view class="swiper u-skeleton-fillet">
					<u-swiper bg-color="rgba(0, 0, 0, 0)" :list="swiperList" :effect3d="true" mode="round" name="picUrl" @click="handleSwiper"></u-swiper>
				</view>
				<!-- 分类导航 -->
				<scroll-view :show-scrollbar="false" class="menu_wrap" scroll-x="true">
					<navigator v-for="item in catesList[0] || 10" :key="item.name" open-type="switchTab" :url="`../category/index`">
						<image class="u-skeleton-circle" :src="item.icon"></image>
						<view class="txt u-skeleton-fillet">{{ item.name || '...' }}</view>
					</navigator>
					<view></view>
					<navigator v-for="item2 in catesList[1] || 10" :key="item2.name" open-type="switchTab" :url="`../category/index`">
						<image class="u-skeleton-circle" :src="item2.icon"></image>
						<view class="txt u-skeleton-fillet">{{ item2.name || '...' }}</view>
					</navigator>
				</scroll-view>
			</view>
			<!-- 推荐 -->
			<view class="floor_wrap">
				<view id="floor" class="floor_header_box" :style="{ top: statusBarHeight + 44 + 'px' }">
					<view class="floor_header u-skeleton-fillet" @click="navTo(`/pages/goods_list/index?isHot=1`)">
						<u-icon
							size="40rpx"
							color="#e93b3d"
							:custom-style="{ fontWeight: '800' }"
							label-size="32rpx"
							label-color="#000"
							label="热门推荐"
							name="integral"
						></u-icon>
						<u-icon name="arrow-right" size="32rpx"></u-icon>
					</view>
				</view>
				<goods-list :goods-list="floorList"></goods-list>
			</view>
			<u-loadmore v-if="totalPage > 1" :status="loadMore" margin-bottom="25" />
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
import NavBar from '@/components/common/navbar/Navbar.vue';
import Search from '../../components/content/Search.vue';
import GoodsList from '../../components/content/GoodsList.vue';

// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
export default {
	components: {
		Search,
		GoodsList,
		NavBar
	},
	data() {
		return {
			// 轮播图列表
			swiperList: [],
			// 导航栏列表
			catesList: [],
			//热门推荐列表
			floorList: [],
			// 热门推荐请求参数
			QueryParams: {
				page: 1,
				pageSize: 4,
				orderBy: 'nameUp',
				recommendStatus: '1'
			},
			// 总页数
			totalPage: 1,
			// 底部加载状态
			loadMore: 'loading',

			message: '',
			show: false,

			statusBarHeight: systemInfo.statusBarHeight, //状态栏高度
			isHotFixed: false, //固定热门推荐标题
			hotScroll: 0 //滚动距离
		};
	},
	computed: {
		// 是否显示骨架屏
		loading() {
			return !this.swiperList.length > 0 && !this.catesList.length > 0;
			// return true;
		}
		// fixed() {
		// 	return this.isHotFixed
		// 		? { position: 'fixed', zIndex: '9', left: 0, top: this.statusBarHeight + 44 + 'px', width: '100%', height: '80rpx' }
		// 		: '';
		// }
	},
	onLoad() {
		this.getSwiperList();
		this.getCateList();
		this.getFloorList();
	},
	onReady() {
		// let stop = 0;
		// const query = uni.createSelectorQuery();
		// query
		// 	.select('#floor')
		// 	.boundingClientRect(data => {
		// 		stop = data.top;
		// 		this.hotScroll = stop - this.statusBarHeight - 44;
		// 	})
		// 	.exec();
		// uni
		// 	.createIntersectionObserver(this)
		// 	.relativeTo('.navbar_wrap', { bottom: 0 })
		// 	.observe('.floor_header_box', res => {
		// 		this.isHotFixed = true;
		// 		console.log(res);
		// 	});
	},
	onReachBottom() {
		if (this.QueryParams.page >= this.totalPage) {
			this.loadMore = 'nomore';
		} else {
			this.loadMore = 'loading';
			this.QueryParams.page++;
			this.getFloorList();
		}
	},
	// 滚动吸顶,有延迟
	// onPageScroll(e) {
	// var scrollTop = e.scrollTop;
	// var isSatisfy = scrollTop >= this.hotScroll;
	// console.log(isSatisfy);
	// // 只有处于吸顶的临界值才会不相等
	// if (this.isHotFixed == isSatisfy) {
	// 	return;
	// } else {
	// 	this.isHotFixed = isSatisfy;
	// }
	// },
	methods: {
		// 获取轮播
		async getSwiperList() {
			const res = await this.$request({ url: '/banner/list' });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.swiperList = res.data;
		},
		// 点击轮播图
		handleSwiper(index) {
			if (index === 0) {
				uni.navigateTo({
					url: `../goods_list/index?id=${233412}`
				});
				return;
			} else if (index === 1) {
				uni.navigateTo({
					url: `../goods_list/index?id=${235850}`
				});
				return;
			} else {
				uni.navigateTo({
					url: `../goods_list/index?id=${235850}`
				});
				return;
			}
		},
		// 获取分类导航
		async getCateList() {
			const res = await this.$request({ url: '/shop/goods/category/all' });
			if (res.code !== 0) return this.$util.msg(res.msg);
			var catesList = res.data.filter(v => v.pid == 0);
			let toplist = [];
			let bottomlist = [];
			catesList.forEach((v, i) => {
				if (i % 2 == 0) {
					toplist.push(v);
				} else {
					bottomlist.push(v);
				}
			});
			this.$set(this.catesList, 0, toplist.slice(0, 9));
			this.$set(this.catesList, 1, bottomlist.slice(0, 9));
		},
		// 获取推荐列表
		async getFloorList() {
			const res = await this.$request({ method: 'post', url: '/shop/goods/list/v2', data: this.QueryParams });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.totalPage = res.data.totalPage;
			this.floorList = [...this.floorList, ...res.data.result];
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar_wrap {
	display: flex;
	align-items: center;
	flex: 1;
	.nav_notify {
		font-size: 28px;
		flex: 1;
		text-align: center;
	}
	.nav_search {
		flex: 5;
		padding-right: 15rpx;
	}
}
.top_box {
	background-image: linear-gradient(180deg, rgb(139, 141, 255), rgb(245, 245, 245));
	padding-top: 10rpx;
	.menu_wrap {
		white-space: nowrap;
		height: 300rpx;
		navigator {
			display: inline-block;
			text-align: center;
			width: 20%;
			height: 50%;
			font-size: 26rpx;
			padding: 10rpx 15rpx;
			image {
				width: 110rpx;
				height: 90rpx;
			}
		}
	}
}
.floor_wrap {
	.floor_header_box {
		width: 100%;
		height: 80rpx;
		z-index: 10;
		position: sticky;
	}
	.floor_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #ffffff;
	}
}
</style>
