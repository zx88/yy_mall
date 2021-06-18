<template>
	<!-- <Loading v-if="!goodsSkuList.length"></Loading> -->
	<view>
		<!-- 货物图片轮播 -->
		<view class="detail_swiper">
			<swiper indicator-active-color="#ff0000" indicator-color="#d8d8d8" indicator-dots autoplay :interval="3000" :duration="1000" circular>
				<swiper-item v-for="item in goodsImgList" :key="item.id" @click="handlePrevewImage(item.pic)">
					<view class="swiper-item"><image :src="item.pic" mode="widthFix"></image></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 货物描述 -->
		<view class="goods_describe_box">
			<view class="goods_name">{{ goodsInfo.name }}{{ goodsInfo.name }}</view>
			<view class="goods_price">
				<text>￥{{ goodsInfo.minPrice }}</text>
				<text class="goods_price_old">￥{{ goodsInfo.originalPrice }}</text>
				<view class="goods_price_tag">免运费</view>
			</view>
			<view class="goods_other">
				<view class="goods_sales">销量:{{ goodsInfo.numberOrders }}</view>
				<view class="goods_stock">库存:{{ goodsInfo.stores }}</view>
				<view class="goods_text">浏览量:{{ goodsInfo.views }}</view>
			</view>
			<u-cell-group>
				<u-cell-item title="购买类型" :value="skuDetail.propertyChildNames || ''" @click="isAttrPopup = true"></u-cell-item>
				<u-cell-item title="优惠卷" value="领取优惠卷" :value-style="{ color: '#e93b3d' }"></u-cell-item>
				<u-cell-item title="服务" value="七天无理由退货,假一赔十!" :arrow="false"></u-cell-item>
				<u-cell-item
					bg-color="rgba(255, 85, 127, 0.1)"
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
			<u-parse :html="goodsContent"></u-parse>
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
			<view v-if="goodsSkuList.length" class="popup_attr">
				<view class="goods_des">
					<view class="goods_des_img"><image :src="goodsInfo.pic" mode="widthFix"></image></view>
					<view class="goods_des_txt">
						<view class="goods_pic">￥{{ skuDetail.price }}</view>
						<view class="goods_stk">库存: {{ skuDetail.stores }}</view>
						<view class="goods_atr">规格: {{ skuDetail.propertyChildNames }}</view>
					</view>
				</view>
				<view class="goods_attr" v-for="(item, index) in goodsProperties" :key="item.id">
					<view class="title">{{ item.name }}</view>
					<view class="option">
						<text
							v-for="(item2, index2) in item.childsCurGoods"
							:key="item2.id"
							:class="{ active: isActive[index] === item2.id }"
							@click="handleAttr(index, item.id, item2.id)"
						>
							{{ item2.name }}
						</text>
					</view>
				</view>
				<view class="goods_num">
					<text>数量</text>
					<u-number-box :min="1" v-model="query.number"></u-number-box>
				</view>
				<view class="goods_btn">
					<view class="cart_btn" @click="handleCartAdd">加入购物车</view>
					<view class="buy_btn" @click="handlePay">立即购买</view>
				</view>
			</view>
			<view v-else class="popup_attr">
				<view class="goods_des">
					<view class="goods_des_img"><image :src="goodsInfo.pic" mode="widthFix"></image></view>
					<view class="goods_des_txt">
						<view class="goods_pic">￥{{ goodsInfo.minPrice }}</view>
						<view class="goods_stk">库存: {{ goodsInfo.stores }}</view>
					</view>
				</view>
				<view class="goods_num">
					<text>数量</text>
					<u-number-box :min="1" v-model="query.number"></u-number-box>
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
			goodsDetail: {}, //物品数据对象
			goodsImgList: [], //轮播图列表
			goodsInfo: {}, //货物信息
			goodsContent: '', //详细描述
			goodsProperties: [], //每种规格的数组
			goodsSkuList: [], //全部规格组合列表
			isCollect: false, //是否收藏
			isAttrPopup: false, //弹出规格选择
			query: {
				goodsId: 0,
				number: 1,
				sku: []
			}, //加入购物车表单
			isActive: [], //选中的规格id
			skuDetail: {}, //选中规格对象
			skuArr: [] //当前选中规格数组
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
		// 获取商品数据
		async getGoodsDetail(id) {
			const res = await this.$request({ url: '/shop/goods/detail?id=' + id });
			if (res.code !== 0) return this.$util.msg('获取数据失败');
			let { basicInfo, pics, properties, skuList, content } = res.data;
			this.goodsImgList = pics;
			this.goodsInfo = basicInfo;
			this.goodsContent = content;
			if (skuList) {
				this.goodsProperties = properties;
				this.goodsSkuList = skuList;
				// 首次进入默认选中第一个规格
				this.goodsProperties.forEach((v, i) => {
					this.skuArr[i] = { optionId: v.id, optionValueId: v.childsCurGoods[0].id };
					this.isActive.push(v.childsCurGoods[0].id);
				});
				this.query.sku = JSON.stringify(this.skuArr);
				this.getStuDetail();
			}
		},
		// 点击预览大图
		handlePrevewImage(e) {
			// 1 先构造要预览的图片数组
			const urls = this.goodsImgList.map(v => v.pic);
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
		// 点击规格
		handleAttr(i, oid, vid) {
			this.$set(this.isActive, i, vid);
			this.$set(this.skuArr, i, { optionId: oid, optionValueId: vid });
			this.query.sku = JSON.stringify(this.skuArr); // 加入购物车规格字符串
			this.getStuDetail();
		},
		//获取选中规格数据
		getStuDetail() {
			let sku = this.skuArr;
			let propertyChildIds = '';
			sku.forEach((v, i) => {
				for (let i in v) {
					propertyChildIds += v[i];
					if (i == 'optionId') {
						propertyChildIds += ':';
					}
				}
				propertyChildIds += ',';
			});
			let skuDetail = this.goodsSkuList.filter(v => v.propertyChildIds == propertyChildIds);
			this.skuDetail = skuDetail[0];
		},
		// 点击结算,前往提交订单界面
		handlePay() {
			var orderGoods = [
				{
					...this.skuDetail,
					number: this.query.number,
					pic: this.goodsInfo.pic,
					name: this.goodsInfo.name,
					type: 1
				}
			];
			if (this.goodsSkuList.length === 0) {
				var orderGoods = [
					{
						price: this.goodsInfo.minPrice,
						number: this.query.number,
						pic: this.goodsInfo.pic,
						name: this.goodsInfo.name,
						goodsId: this.goodsInfo.id,
						type: 1
					}
				];
			}
			const orderGoodsStr = JSON.stringify(orderGoods);
			this.navTo(`/pages/pay/index?orderGoods=${orderGoodsStr}`, { login: true });
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
			justify-content: space-around;
			padding: 10rpx 15rpx;
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
			padding: 10rpx 0;
			display: flex;
			flex-wrap: wrap;
			text {
				margin: 15rpx;
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
		font-size: 30rpx;
		font-weight: bold;
		color: #000000;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40rpx 0;
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
