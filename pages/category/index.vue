<template>
	<view>
		<Search></Search>
		<view class="cates_container">
			<!-- 左侧菜单 -->
			<scroll-view scroll-y class="left_menu">
				<view
					:class="index === currentIndex ? 'menu_item active' : 'menu_item'"
					v-for="(item, index) in leftMenuList"
					:key="index"
					@click="handleLeftMenu(index)"
				>
					{{ item }}
				</view>
			</scroll-view>
			<!-- 右侧商品内容 -->
			<scroll-view :scroll-top="scrollTop" scroll-y class="right_content">
				<view class="goods_group" v-for="(item, index) in rightContent" :key="index">
					<view class="goods_title">
						<text class="title">{{ item.name }}</text>
					</view>
					<view class="goods_list">
						<navigator v-for="(item2, index2) in item.children" :key="index2" :url="`/pages/goods_list/index?id=${item2.id}`">
							<image mode="widthFix" :src="item2.icon"></image>
							<view class="goods_name">{{ item2.name }}</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import Search from '../../components/Search.vue';
export default {
	data() {
		return {
			// 左侧的菜单数据
			leftMenuList: [],
			// 右侧的商品数据
			rightContent: [],
			// 被点击的左侧的菜单
			currentIndex: 0,
			// 右侧内容的滚动条距离顶部的距离
			scrollTop: 0,
			old: {
				scrollTop: -1
			},
			// 接口的返回数据
			Cates: []
		};
	},
	components: {
		Search
	},
	onLoad(options) {
		if (options.id) {
			let index = this.leftMenuList.filter((v, i) => {
				if (v.id == options.id) {
					return i;
				}
			});
			console.log(index);
		}
		// 获取本地存储中的数据
		const Cates = uni.getStorageSync('cates');
		if (!Cates || Date.now() - Cates.time > 1000 * 300) {
			// 不存在 或者 超时  发送请求获取数据
			this.getCates();
		} else {
			// 可以使用旧的数据
			this.Cates = Cates.data;
			this.leftMenuList = this.Cates.map(v => v.name);
			this.rightContent = this.Cates[0].children;
		}
	},
	methods: {
		// 获取分类数据
		async getCates() {
			const res = await this.$request({ url: '/shop/goods/category/all' });
			if (res.code !== 0) return this.$util.msg('获取数据失败');
			// 把接口的数据存入到本地存储中
			let Cates = this.toTree(res.data);
			this.Cates = Cates;
			uni.setStorageSync('cates', { time: Date.now(), data: this.Cates });
			this.leftMenuList = this.Cates.map(v => v.name);
			this.rightContent = this.Cates[0].children;
		},
		toTree(data) {
			var arr = [...data];
			// 查找一级
			var tree = arr.filter(v => v.pid == 0);
			tree.map(v => {
				// 查找二级
				v.children = arr.filter(({ pid }) => pid == v.id);
				if (v.children.length == 0) delete v.children;
				else {
					v.children.map(item => {
						// 查找三级
						item.children = arr.filter(({ pid }) => pid == item.id);
						if (item.children.length == 0) delete item.children;
						return item;
					});
				}
				return v;
			});

			return tree;
		},
		// 点击左侧导航
		handleLeftMenu(index) {
			this.currentIndex = index;
			this.rightContent = this.Cates[index].children || [];
			// 重置右边回到顶部
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cates_container {
	/* less中使用calc的时候要注意 */
	border-top: 1rpx solid #e7e7e7;
	height: calc(100vh - var(--window-top) - var(--window-bottom) - 80rpx);
	display: flex;
	.left_menu {
		/* 子项 高度 100% flex */
		flex: 2;
		// background-color: aqua;
		.menu_item {
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
		}
		.active {
			color: $themeColor;
			border-left: 5rpx solid $themeColor;
			font-size: 32rpx;
			font-weight: bold;
		}
	}
	.right_content {
		/* 子项 高度 100% flex */
		flex: 5;
		// background-color: pink;
		.goods_group {
			.goods_title {
				height: 70rpx;
				font-weight: bold;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.goods_list {
				display: flex;
				flex-wrap: wrap;
				navigator {
					padding-bottom: 30rpx;
					width: 33.33%;
					text-align: center;
					image {
						width: 50%;
					}
				}
			}
		}
	}
}
</style>
