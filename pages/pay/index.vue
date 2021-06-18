<template>
	<view>
		<view class="main_wrap">
			<u-card :show-foot="false" :show-head="false" margin="0 20rpx" padding="20">
				<view slot="body" class="addr_sec" @click="navTo('../address/index?pay=true', { login: true })">
					<view v-if="!address.id" class="addr_empty">
						<u-icon size="34" color="#e93b3d" name="map-fill"></u-icon>
						<text>请选择收货地址</text>
					</view>
					<view v-else class="addr_wrap">
						<u-icon size="34" color="#e93b3d" name="map-fill"></u-icon>
						<view class="column">
							<view class="addr">{{ address.provinceStr }} {{ address.areaStr }}{{ address.address }}</view>
							<view class="name">{{ address.linkMan }} {{ address.mobile }}</view>
						</view>
					</view>
					<u-icon size="34" color="#999" name="arrow-right"></u-icon>
					<image class="bg_line" src="/static/icon/addr-line.png"></image>
				</view>
			</u-card>

			<u-card :show-foot="false" :show-head="false" margin="0 20rpx" padding="0">
				<view slot="body" class="goods_sec">
					<view class="cart_item" v-for="(item, index) in orderGoods" :key="index">
						<!-- 商品图片 -->
						<navigator class="cart_img_wrap"><image mode="widthFix" :src="item.pic"></image></navigator>
						<!-- 商品信息 -->
						<view class="cart_info_wrap">
							<view class="goods_name">{{ item.name }}</view>
							<view class="goods_attr">
								<text>{{ item.propertyChildNames }}</text>
								<!-- 								<text v-for="(item2, index2) in item.sku" :key="index2">
									{{ item2.optionName }}{{ item2.optionValueName }}
								</text> -->
							</view>
							<view class="goods_price_wrap">
								<view class="goods_price">￥ {{ item.price }} x {{ item.number }}</view>
							</view>
						</view>
					</view>
				</view>
			</u-card>

			<u-card :show-foot="false" :show-head="false" margin="0 20rpx" padding="20">
				<view slot="body" class="price_sec">
					<view class="cell">
						<text>商品金额</text>
						<text>￥{{ totalPrice }}</text>
					</view>
					<view class="cell">
						<text class="tit fill">订单满减</text>
						<text class="price">{{ 0 }}</text>
					</view>
					<view class="cell">
						<text class="tit fill">优惠卷</text>
						<text class="price">暂无可用</text>
					</view>
					<view class="cell">
						<text class="tit fill">配送费</text>
						<text class="price">0</text>
					</view>
					<view class="total">
						<text class="price">{{ totalPrice }}</text>
					</view>
				</view>
			</u-card>

			<u-card :show-foot="false" title="订单备注：" margin="20rpx" padding="20">
				<view slot="body" class="remarks">
					<textarea
						class="input"
						auto-height
						v-model="remarks"
						placeholder="选填，合理需求我们会尽量满足 .."
						placeholder-style="color: #999"
					/>
				</view>
			</u-card>

			<view class="footer_tool">
				<!-- 总价格 -->
				<view class="total_price">
					实付款 :
					<text class="total_price_text">￥{{ totalPrice }}</text>
				</view>
				<view class="pay_btn"><u-button ripple type="error" shape="circle" @click="createOrder">提交订单</u-button></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			address: {},
			orderGoods: [],
			remarks: '', //备注
			totalPrice: 0, //总价
			isInto: 0 //下单方式,购物车/直接购买
		};
	},
	onLoad(options) {
		// 获取购买列表
		this.orderGoods = JSON.parse(options.orderGoods);
		if (this.orderGoods[0].type) {
			this.isInto = 1;
		}
		this.setPrice(this.orderGoods);
		// 收货地址
		this.getDefaultaddress();
	},
	methods: {
		// 计算总价
		setPrice(goods) {
			// 计算 总价格
			let totalPrice = 0;
			goods.forEach(v => {
				totalPrice += v.number * v.price;
			});
			this.totalPrice = totalPrice;
		},
		// 默认收货地址
		async getDefaultaddress() {
			const res = await this.$request({ url: '/user/shipping-address/default/v2' });
			if (res.code !== 0) return;
			this.address = res.data.info;
		},
		// 收货地址页面调用方法修改地址
		updeatAddress(data) {
			this.address = data;
		},
		// 前往支付页面
		async createOrder() {
			const orderGoods = this.orderGoods.map(({ goodsId, number, propertyChildIds }) => {
				return { goodsId, number, propertyChildIds };
			});
			const goodsJsonStr = JSON.stringify(orderGoods);
			const res = await this.$request({ method: 'post', url: '/order/create', data: { ...this.address, goodsJsonStr, peisongType: 'kd' } });
			if (res.code !== 0) return;
			//清空购物车/{domain}/shopping-cart/empty
			if (!this.isInto) {
				var res2 = await this.$request({ method: 'post', url: '/shopping-cart/empty' });
				//需要更新购物车
				this.$store.commit('setUpdateCart', true);
			}
			this.$util.msg('订单创建成功,无支付接口');
			// 更新订单数量
			this.$store.dispatch('getOrderCount');
		}
	}
};
</script>

<style lang="scss" scoped>
.main_wrap {
	padding-bottom: 100rpx;
}
.addr_sec {
	display: flex;
	justify-content: space-between;
	// padding: 20rpx;
	border-radius: 10rpx;
	position: relative;
	// overflow: hidden;
	.addr_empty {
		margin: 15rpx 20rpx;
		font-size: 32rpx;
		color: #666;
	}
	.addr_wrap {
		display: flex;
	}
	.addr {
		padding-left: 10rpx;
		font-size: 30rpx;
		color: #333;
		line-height: 45rpx;
		font-weight: 700;
	}
	.name {
		padding-left: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
	.bg_line {
		position: absolute;
		left: 0;
		bottom: -21rpx;
		width: 100%;
		height: 4rpx;
	}
}

.cart_item {
	display: flex;
	padding: 20rpx;
	.cart_img_wrap {
		// flex: 2;
		width: 160rpx;
		margin-right: 20rpx;
		display: flex;
		align-items: center;
		border-radius: 10rpx;
		overflow: hidden;
	}
	.cart_info_wrap {
		flex: 1;
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.goods_name {
			font-size: 32rpx;
			// line-height: 40rpx;
			display: -webkit-box;
			overflow: hidden;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 1;
		}
		.goods_attr {
			color: #a5a5a5;
			text {
				font-size: 24rpx;
			}
		}
		.goods_price_wrap {
			display: flex;
			justify-content: space-between;
			.goods_price {
				color: #000;
				font-size: 30rpx;
			}
		}
	}
}

.price_sec {
	.cell {
		display: flex;
		justify-content: space-between;
		height: 68rpx;
		font-size: 26rpx;
		text:nth-child(2) {
			font-weight: bold;
		}
	}
	.total {
		display: flex;
		justify-content: flex-end;
		font-size: 32rpx;
		font-weight: bold;
		.price:before {
			content: '小计：';
			font-weight: normal;
		}
	}
}

.remarks {
	.input {
		min-height: 140rpx;
		font-size: 28rpx;
		color: #333;
	}
}

.footer_tool {
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 10;
	width: 100%;
	height: 110rpx;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	border-top: 1rpx solid #f3f3f3;
	.total_price {
		flex: 1;
		display: flex;
		align-items: center;
		padding-left: 25rpx;
		.total_price_text {
			color: $themeColor;
			font-size: 36rpx;
			font-weight: 600;
		}
	}
	.pay_btn {
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		width: 250rpx;
	}
}
</style>
