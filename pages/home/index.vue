<template>
	<view>
		<!-- 导航栏 -->
		<u-navbar :is-back="false" :border-bottom="false" :background="{ backgroundColor: '#8b8dff' }">
			<view class="navbar_box">
				<view class="nav_notify">
					<navigator url="/pages/notify/index"><u-icon name="chat"></u-icon></navigator>
				</view>
				<view class="nav_search">
					<navigator url="/pages/search/index">
						<u-icon name="search"></u-icon>
						输入关键字搜索
					</navigator>
				</view>
			</view>
		</u-navbar>
		<Loading v-if="!swiperList.length"></Loading>
		<view v-else class="home_content">
			<view class="top_box">
				<!-- 轮播 -->
				<u-swiper
					bg-color="rgba(234, 66, 0, 0)"
					:list="swiperList"
					:effect3d="true"
					mode="round"
					name="picUrl"
					@click="handleSwiper"
				></u-swiper>
				<!-- 分类导航 -->
				<u-card :show-foot="false" :show-head="false" margin="20rpx" padding="10">
					<scroll-view class="cate" slot="body" scroll-x="true">
						<!--内容区域-->
						<navigator v-for="item in catesList[0]" :key="item.name" open-type="switchTab" :url="`../category/index`">
							<image mode="widthFix" :src="item.icon"></image>
							<text>{{ item.name }}</text>
						</navigator>
						<view></view>
						<navigator v-for="item2 in catesList[1]" :key="item2.name" open-type="switchTab" :url="`../category/index`">
							<image mode="widthFix" :src="item2.icon"></image>
							<text>{{ item2.name }}</text>
						</navigator>
					</scroll-view>
				</u-card>
			</view>
			<!-- 推荐 -->
			<u-card :show-foot="false" :show-head="false" margin="20rpx" padding="10">
				<view slot="body" class="index_floor">
					<view class="floor_group" v-for="(item, index) in floorList" :key="index">
						<view class="floor_title"><image mode="widthFix" :src="item.floor_title.image_src"></image></view>
						<view class="floor_list">
							<navigator
								v-for="(item2, index2) in item.product_list"
								:key="index2"
								:url="'/pages/goods_list/index?query=' + item2.navigator_url"
							>
								<image :mode="index2 === 0 ? 'widthFix' : 'scaleToFill'" :src="item2.image_src"></image>
							</navigator>
						</view>
					</view>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 轮播图数组
			swiperList: [],
			catesList: [],
			floorList: []
		};
	},
	mounted() {
		this.getSwiperList();
		this.getCateList();
		this.getFloorList();
	},
	methods: {
		// 获取轮播
		async getSwiperList() {
			const res = await this.$request({ url: '/banner/list' });
			if (res.code !== 0) return this.$util.msg('获取轮播失败');
			this.swiperList = res.data;
		},
		// 点击轮播跳转
		handleSwiper(index) {
			if (index === 0) {
				uni.navigateTo({
					url: `../goods_list/index?cid=${862}`
				});
				return;
			} else if (index === 1) {
				uni.navigateTo({
					url: `../goods_list/index?cid=${12}`
				});
				return;
			} else {
				uni.navigateTo({
					url: `../goods_list/index?cid=${200}`
				});
				return;
			}
		},
		// 获取分类导航
		async getCateList() {
			const res = await this.$request({ url: '/shop/goods/category/all' });
			var catesList = res.data.filter(v => v.pid == 0);
			if (res.code !== 0) return this.$util.msg('获取导航数据失败');
			let toplist = [];
			let bottomlist = [];
			catesList.forEach((v, i) => {
				if (i % 2 == 0) {
					toplist.push(v);
				} else {
					bottomlist.push(v);
				}
			});
			this.catesList[0] = toplist.slice(0, 9);
			this.catesList[1] = bottomlist.slice(0, 9);
		},
		// 获取楼层数据
		async getFloorList() {
			const res = await this.$requests({ url: '/home/floordata' });
			if (res.meta.status !== 200) return this.$util.msg('获取商品列表失败');
			this.floorList = res.message;
			//提取汉字
			this.floorList.forEach((v, i) => {
				v.product_list.forEach((v2, i2) => {
					v2.navigator_url = v2.navigator_url.replace(/[^\u4e00-\u9fa5]/gi, '');
				});
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.navbar_box {
	display: flex;
	align-items: center;
	flex: 1;
	padding: 0 15rpx;
	.nav_notify {
		font-size: 55rpx;
		width: 80rpx;
		text-align: center;
	}
	.nav_search {
		height: 80rpx;
		flex: 1;
		padding: 10rpx;
		navigator {
			height: 100%;
			line-height: 60rpx;
			text-align: center;
			background-color: #f1f1f1;
			border-radius: 40rpx;
			color: #666;
		}
	}
}
.top_box {
	padding-top: 20rpx;
	background-image: linear-gradient(180deg, rgb(139, 141, 255), rgb(245, 245, 245));
	.cate {
		white-space: nowrap;
		height: 280rpx;
		navigator {
			display: inline-block;
			text-align: center;
			width: 139rpx;
			height: 140rpx;
			font-size: 26rpx;
			// padding: 10rpx 15rpx;
			image {
				width: 110rpx;
			}
			text {
				display: block;
				text-align: center;
			}
		}
	}
}
.index_floor {
	.floor_group {
		.floor_title {
			padding: 10rpx 0;
			image {
				width: 100%;
			}
		}
		.floor_list {
			// 清除浮动
			overflow: hidden;
			navigator {
				float: left;
				width: 33.33%;
				border-radius: 10rpx;
				overflow: hidden;
				/* 后四个超链接 */
				&:nth-last-child(-n + 4) {
					/* 原图的宽高 232 *386 */
					// 232 / 386 = 33.33vw / height
					// 第一张图片的高度 height:33.33vw * 386 /  232
					height: calc((33.33vw - 20rpx) * 386 / 232 / 2);
					border-left: 10rpx solid #fff;
				}
				/* 2 3 两个超链接 */
				&:nth-child(2),
				&:nth-child(3) {
					border-bottom: 10rpx solid #fff;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
