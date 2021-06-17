<template>
	<Loading v-if="!goodsSkuList.length"></Loading>
	<view v-else>
		<!-- 货物图片轮播 -->
		<view class="detail_swiper">
			<swiper indicator-active-color="#EA4200" indicator-dots autoplay :interval="3000" :duration="1000" circular>
				<swiper-item v-for="(item, index) in goodsDetail.pics2" :key="index" @click="handlePrevewImage(item)">
					<view class="swiper-item"><image :src="item" mode="widthFix"></image></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 货物标题价格 -->
		<view class="goods_describe_box">
			<view class="goods_name">{{ goodsDetail.basicInfo.name }}{{ goodsDetail.basicInfo.name }}</view>
			<view class="goods_price">
				<text>￥{{ goodsDetail.basicInfo.minPrice }}</text>
				<text class="goods_price_old">￥{{ goodsDetail.basicInfo.originalPrice }}</text>
				<view class="goods_price_tag">免运费</view>
			</view>
			<view class="goods_other">
				<view class="goods_sales">销量:{{ goodsDetail.basicInfo.numberSells }}</view>
				<view class="goods_stock">库存:{{ goodsDetail.basicInfo.stores }}</view>
				<view class="goods_text">浏览量:{{ goodsDetail.basicInfo.views }}</view>
			</view>
			<u-cell-group>
				<u-cell-item title="购买类型" :value="skuDetail.propertyChildNames" @click="isAttrPopup = true"></u-cell-item>
				<u-cell-item title="优惠卷" value="领取优惠卷" :value-style="{ color: '#e93b3d' }"></u-cell-item>
				<u-cell-item title="服务" value="七天无理由退货,假一赔十!" :arrow="false"></u-cell-item>
				<u-cell-item
					bg-color="rgba(234, 66, 0, 0.1)"
					icon="share"
					title="发给好友看看吧!"
					value="立即分享"
					:value-style="{ color: '#e93b3d' }"
					hover-class="none"
					class="goods_share"
				>
					<button open-type="share" slot="right-icon"></button>
				</u-cell-item>
			</u-cell-group>
		</view>
		<!-- 货物图文详情 -->
		<view class="goods_info">
			<u-divider height="90" border-color="#545454" color="#545454">图文详情</u-divider>
			<!-- 富文本 -->
			<u-parse :html="goodsDetail.content"></u-parse>
			<!-- <rich-text :nodes="goodsDetail.goods_introduce"></rich-text> -->
		</view>

		<!-- 提交订单 -->
		<view class="navigation">
			<view class="left">
				<view class="item">
					<u-icon name="server-fill" :size="40"></u-icon>
					<view class="text u-line-1">客服</view>
				</view>
				<navigator class="item car" url="../cart/index" open-type="switchTab">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40"></u-icon>
					<view class="text u-line-1">购物车</view>
				</navigator>
				<view class="item" @click="handleCollect">
					<u-icon v-show="!isCollect" name="heart" :size="40"></u-icon>
					<u-icon v-show="isCollect" color="#e93b3d" name="heart-fill" :size="40"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="handleCartAdd">加入购物车</view>
				<view class="buy btn u-line-1" @click="isAttrPopup = true">立即购买</view>
			</view>
		</view>
		<u-popup v-model="isAttrPopup" closeable border-radius="10" mode="bottom" @close="query.number = 1">
			<view class="popup_attr">
				<view class="goods_des">
					<view class="goods_des_img"><image :src="goodsDetail.basicInfo.pic" mode="widthFix"></image></view>
					<view class="goods_des_txt">
						<view class="goods_pic">￥{{ skuDetail.price }}</view>
						<view class="goods_stk">库存: {{ skuDetail.stores }}</view>
						<view class="goods_atr">规格: {{ skuDetail.propertyChildNames }}</view>
					</view>
				</view>
				<view class="goods_attr" v-for="(item, index) in goodsProperties" :key="index">
					<view class="title">{{ item.name }}</view>
					<view class="option">
						<text
							:class="{ active: isActive[index] && isActive[index] === item2.id }"
							@click="handleAttr(index, item.id, item2.id)"
							v-for="(item2, index2) in item.childsCurGoods"
							:key="index2"
						>
							{{ item2.name }}
						</text>
					</view>
				</view>
				<view class="goods_num">
					<text>数量</text>
					<u-number-box v-model="query.number"></u-number-box>
				</view>
				<view class="goods_btn">
					<view class="cart_btn" @click="handleCartAdd">加入购物车</view>
					<view class="buy_btn" @click="handlePay">立即购买</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsDetail: {},
			goodsProperties: [], //规格
			goodsSkuList: [], //库存清单
			isCollect: false, //是否收藏
			isAttrPopup: false,
			query: {
				goodsId: 0,
				number: 1,
				sku: []
			},
			isActive: [],
			skuDetail: {}, //当前选中规格对象
			skuArr: [], //当前选中规格数组
			propertyChildIds: ''
		};
	},
	onLoad(options) {
		this.query.goodsId = options.id;
		this.getGoodsDetail(options.id);
	},
	computed: {
		// 购物车数量
		cartCount() {
			return this.$store.state.cartCount;
		},
		// 登录状态
		hasLogin() {
			return this.$store.getters.hasLogin;
		}
	},
	async onReady() {
		// 登录状态检查货物是否收藏
		if (this.hasLogin) {
			const res = await this.$request({ method: 'post', url: '/shop/goods/fav/check', data: { goodsId: this.query.goodsId, type: 0 } });
			if (res.code === 0) return (this.isCollect = true);
		}
	},
	methods: {
		// 点击预览大图
		handlePrevewImage(e) {
			// 1 先构造要预览的图片数组
			const urls = this.goodsDetail.pics2;
			// 2 接收传递过来的图片url
			const current = e;
			uni.previewImage({
				current,
				urls
			});
		},
		// 点击 加入购物车
		async handleCartAdd() {
			this.$store.commit('setUpdateCart', true);
			let query = this.query;
			const res = await this.$request({ method: 'post', url: '/shopping-cart/add', data: query }, { login: true });
			// if (res.code === 10000) return;
			if (res.code === 0) {
				this.$util.msg('加入购物车成功', { icon: 'success' });
				this.$store.commit('setCartCount', res.data.number); //更新购物车数量
			}
		},
		// 收藏
		async handleCollect() {
			if (this.isCollect == false) {
				const res = await this.$request(
					{ method: 'post', url: '/shop/goods/fav/add', data: { goodsId: this.query.goodsId, type: 0 } },
					{ login: true }
				);
				if (res.code === 10000) return;
				this.isCollect = true;
				this.$store.dispatch('getCollectCount'); //更新收藏数量
			} else {
				const res = await this.$request(
					{ method: 'post', url: '/shop/goods/fav/delete', data: { goodsId: this.query.goodsId, type: 0 } },
					{ login: true }
				);
				if (res.code === 10000) return;
				this.isCollect = false;
				this.$store.dispatch('getCollectCount'); //更新收藏数量
			}
		},
		handleAttr(i, oid, vid) {
			this.isActive[i] = vid;
			this.$forceUpdate(); //强制重新渲染
			this.skuArr[i] = { optionId: oid, optionValueId: vid };
			// 转字符串
			this.query.sku = JSON.stringify(this.skuArr);
			this.getStuDetail();
		},
		async getGoodsDetail(id) {
			const res = await this.$request({ url: '/shop/goods/detail?id=' + id });
			if (res.code !== 0) return this.$util.msg('获取数据失败');
			this.goodsDetail = res.data;
			// 规格种类
			this.goodsProperties = this.goodsDetail.properties;
			// 规格列表
			this.goodsSkuList = this.goodsDetail.skuList;
			// 首次进入默认选择第一个规格
			this.goodsProperties.forEach((v, i) => {
				this.skuArr[i] = { optionId: v.id, optionValueId: v.childsCurGoods[0].id };
				this.isActive.push(v.childsCurGoods[0].id);
			});
			// 转字符串
			this.query.sku = JSON.stringify(this.skuArr);
			this.getStuDetail();
		},
		//获取选中规格对象
		getStuDetail() {
			let stu = this.skuArr;
			let propertyChildIds = '';
			stu.forEach((v, i) => {
				for (let i in v) {
					propertyChildIds += v[i];
					if (i == 'optionId') {
						propertyChildIds += ':';
					}
				}
				propertyChildIds += ',';
			});
			this.propertyChildIds = propertyChildIds;
			let skuDetail = this.goodsSkuList.filter(v => v.propertyChildIds == propertyChildIds);
			this.skuDetail = skuDetail[0];
		},
		// 点击立即购买
		handlePay() {
			let orderGoods = [
				{
					goodsId: this.query.goodsId,
					number: this.query.number,
					propertyChildIds: this.propertyChildIds,
					pic: this.goodsDetail.basicInfo.pic,
					name: this.goodsDetail.basicInfo.name,
					price: this.goodsDetail.basicInfo.minPrice,
					propertyName: this.skuDetail.propertyChildNames
				}
			];
			// let propertyChildIds = this.propertyChildIds
			// const goodsJsonStr = JSON.stringify(goods);
			uni.setStorageSync('orderGoods', orderGoods);
			this.navTo('/pages/pay/index?type=1', { login: true });
		}
	}
};
</script>

<style lang="scss" scoped>
.detail_swiper {
	swiper {
		height: 100vw;
		text-align: center;
	}
}

.goods_describe_box {
	border-top: 2rpx solid #dedede;
	border-bottom: 2rpx solid #dedede;
	background-color: #fff;
	// padding: 20rpx;
	.goods_name {
		background-color: #ffffff;
		color: #000;
		font-weight: bold;
		font-size: 30rpx;
		padding: 0 20rpx;
		margin-top: 15rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.goods_price {
		background-color: #fff;
		padding: 15rpx;
		font-size: 45rpx;
		font-weight: 600;
		color: $themeColor;
		position: relative;
		.goods_price_old {
			font-size: 30rpx;
			margin-left: 10rpx;
			text-decoration: line-through;
			color: #8f8f8f;
			font-weight: normal;
		}
		.goods_price_tag {
			position: absolute;
			top: 25rpx;
			right: 25rpx;
			background-color: $themeColor;
			color: #fff;
			font-size: 20rpx;
			padding: 5rpx 20rpx;
			border-radius: 8rpx;
		}
	}
	.goods_other {
		background-color: #fff;
		color: #b8b8b8;
		display: flex;
		align-items: center;
		padding: 20rpx 45rpx;
		justify-content: space-between;
	}
	.goods_share {
		position: relative;
		button {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
		}
	}
}

.goods_info {
	margin-bottom: 100rpx;
	.goods_info_title {
		font-size: 32rpx;
		color: $themeColor;
		font-weight: 600;
		padding: 20rpx;
	}
}

.navigation {
	position: fixed;
	bottom: 0;
	width: 100%;
	height: 100rpx;
	display: flex;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 15rpx 0;
	z-index: 10;
	.left {
		display: flex;
		justify-content: space-around;
		flex: 2;
		font-size: 20rpx;
		.item {
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		flex: 3;
		display: flex;
		justify-content: space-around;
		font-size: 28rpx;
		.btn {
			line-height: 66rpx;
			padding: 0 40rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}
		.cart {
			background-color: #ff7900;
		}
		.buy {
			background-color: #ed3f14;
		}
	}
}
.popup_attr {
	margin: 20rpx 30rpx;
	.goods_des {
		display: flex;
		.goods_des_img {
			flex: 2;
		}
		.goods_des_txt {
			flex: 5;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 20rpx 15rpx;
			.goods_pic {
				// margin-top: 15rpx;
				font-size: 45rpx;
				font-weight: 600;
				color: $themeColor;
			}
			.goods_stk {
				color: #b8b8b8;
			}
		}
	}
	.goods_attr {
		.title {
			font-size: 30rpx;
			font-weight: bold;
			color: #000000;
		}
		.option {
			padding: 20rpx 0;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			text {
				padding: 10rpx 30rpx;
				border: 1rpx solid #d1d1d1;
				border-radius: 35rpx;
			}
			.active {
				border: 1rpx solid #ffdbe1;
				color: #ff536f;
				background-color: #fffafb;
			}
		}
	}
	.goods_num {
		padding: 30rpx 0;
		font-size: 30rpx;
		font-weight: bold;
		color: #000000;
		display: flex;
		justify-content: space-between;
	}
	.goods_btn {
		display: flex;
		justify-content: center;
		font-size: 34rpx;
		.cart_btn {
			width: 45%;
			line-height: 80rpx;
			text-align: center;
			border-top-left-radius: 45rpx;
			border-bottom-left-radius: 45rpx;
			color: #ffffff;
			background-color: #ff7900;
		}
		.buy_btn {
			width: 45%;
			line-height: 80rpx;
			text-align: center;
			border-top-right-radius: 45rpx;
			border-bottom-right-radius: 45rpx;
			color: #ffffff;
			background-color: #ed3f14;
		}
	}
}
</style>
