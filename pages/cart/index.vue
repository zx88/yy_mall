<template>
	<view>
		<view v-if="hasLogin && cartList.length" class="cart_main">
			<!-- 购物车列表 -->
			<u-swipe-action v-for="item in cartList" :key="item.key" @click="conDelGoods(item.key)" :options="delGoodsBtn">
				<view class="cart_item">
					<!-- 复选框 -->
					<view class="cart_chk_wrap">
						<u-checkbox
							active-color="#e93b3d"
							v-model="item.selected"
							shape="circle"
							@change="handeItemChange(item.key, $event)"
						></u-checkbox>
					</view>
					<!-- 商品图片 -->
					<navigator :url="`../goods_detail/index?id=${item.goodsId}`" class="cart_img_wrap">
						<image mode="widthFix" :src="item.pic"></image>
					</navigator>
					<!-- 商品信息 -->
					<view class="cart_info_wrap">
						<view class="goods_name">{{ item.name }}</view>
						<view class="goods_attr">
							<text v-for="(item2, index2) in item.sku" :key="index2">{{ item2.optionName }}:{{ item2.optionValueName }},</text>
						</view>
						<view class="goods_price_wrap">
							<view class="goods_price">￥{{ item.price }}</view>
							<view class="cart_num_tool">
								<u-number-box
									:min="1"
									v-model="item.number"
									@minus="handleItemNumEdit(item.key, $event)"
									@plus="handleItemNumEdit(item.key, $event)"
								></u-number-box>
							</view>
						</view>
					</view>
				</view>
			</u-swipe-action>
			<!-- 底部工具栏 -->
			<view class="footer_tool">
				<!-- 全选 -->
				<view class="all_chk_wrap">
					<u-checkbox size="40" active-color="#e93b3d" v-model="allChecked" shape="circle" @change="handleItemAllCheck">全选</u-checkbox>
				</view>
				<!-- 总价格 -->
				<view class="total_price_wrap">
					<view class="total_price">
						合计:
						<text class="total_price_text">￥{{ totalPrice }}</text>
					</view>
					<view>包含运费</view>
				</view>
				<!-- 结算 -->
				<view class="order_pay_wrap">
					<u-button ripple type="error" shape="circle" @click="handlePay">去结算({{ cartList.length }})</u-button>
				</view>
			</view>
		</view>
		<view v-else class="cart_empty">
			<u-empty iconSize="200" text="别忘了买点什么犒劳一下自己哦!" mode="car">
				<view slot="bottom">
					<u-button type="error" @click="onCartBtnClick" ripple class="btn" size="medium" shape="circle">
						{{ hasLogin ? '随便逛逛' : '去登录' }}
					</u-button>
				</view>
			</u-empty>
		</view>
	</view>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			// 购物车商品列表
			cartList: [],
			// 全选
			allChecked: false,
			// 总价
			totalPrice: 0,
			// 总数
			totalNum: 0,
			// 滑动列表显示删除按钮样式
			delGoodsBtn: [{ text: '删除', style: { backgroundColor: '#fa3534' } }]
		};
	},
	computed: {
		// 登录状态
		hasLogin() {
			return !!this.$store.getters.hasLogin;
		},
		// 是否更新购物车
		...mapGetters(['getUpdateCart'])
	},
	onShow() {
		// 是否更新购物车
		if (this.getUpdateCart && this.hasLogin) {
			this.getCartList();
		}
	},
	methods: {
		// 点击判断 进入登录/去逛逛
		onCartBtnClick() {
			if (this.hasLogin) {
				uni.switchTab({ url: '/pages/home/index' });
			} else {
				this.navTo('/pages/auth/login');
			}
		},
		// 获取购物车
		async getCartList() {
			const res = await this.$request({ url: '/shopping-cart/info' });
			let cartList = [];
			let number = 0;
			if (res.code === 0) {
				cartList = res.data.items;
				number = res.data.number;
			}
			this.$store.commit('setCartCount', number); //更新购物车数量
			this.$store.commit('setUpdateCart', false);
			this.setCart(cartList);
		},
		// 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
		setCart(cart) {
			let allChecked = true;
			// 计算 总价格 总数量
			let totalPrice = 0;
			let totalNum = 0;
			cart.forEach(v => {
				if (v.selected) {
					totalPrice += v.number * v.price;
					totalNum += v.number;
				} else {
					allChecked = false;
				}
			});
			// 判断数组是否为空
			allChecked = cart.length != 0 ? allChecked : false;
			this.cartList = cart;
			this.totalPrice = totalPrice;
			this.totalNum = totalNum;
			this.allChecked = allChecked;
		},
		// 选中/取消购物车商品
		async handeItemChange(key, e) {
			let selected = e.value;
			const res = await this.$request({ method: 'post', url: '/shopping-cart/select', data: { selected, key } });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.cartList = res.data.items;
			this.$store.commit('setCartCount', res.data.number); //更新购物车数量
			this.setCart(this.cartList);
		},
		// 加减购物车商品数量
		async handleItemNumEdit(key, e) {
			let number = e.value;
			if (number <= 0) {
				this.delGoodsKey = key;
				return;
			} else {
			}
			const res = await this.$request({ method: 'post', url: '/shopping-cart/modifyNumber', data: { number, key } });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.cartList = res.data.items;
			this.$store.commit('setCartCount', res.data.number); //更新购物车数量
			this.setCart(this.cartList);
		},
		// 删除购物车商品
		async conDelGoods(key) {
			const res = await this.$request({ method: 'post', url: '/shopping-cart/remove', data: { key } });
			this.getCartList();
		},
		// 全选/取消全选
		async handleItemAllCheck() {
			// 1 获取data中的数据
			let { cartList, allChecked } = this;
			// 2 修改值
			allChecked = !allChecked;
			let key = '';
			let selected = allChecked;
			// 3 循环修改cart数组 中的商品选中状态
			cartList.forEach(v => {
				v.selected = allChecked;
				key += v.key + ',';
			});
			const res = await this.$request({ method: 'post', url: '/shopping-cart/select', data: { selected, key } });
			if (res.code !== 0) return this.$util.msg(res.msg);
			this.$store.commit('setCartCount', res.data.number); //更新购物车数量
			this.cartList = res.data.items;
			this.setCart(this.cartList);
		},
		// 点击 结算前往提交订单界面
		handlePay() {
			let { totalNum, cartList } = this;
			//  判断用户有没有选购商品
			if (totalNum === 0) return this.$util.msg('至少选择一个商品');
			// 过滤未选中商品
			cartList = cartList.filter(v => v.selected == true);
			let propertyChildIds = [];
			cartList.forEach((v, i) => {
				v.propertyChildIds = '';
				v.propertyChildNames = '';
				v.sku.forEach((v2, i2) => {
					for (let i3 in v2) {
						if (i3 == 'optionId' || i3 == 'optionValueId') {
							v.propertyChildIds += v2[i3];
							if (i3 == 'optionId') {
								v.propertyChildIds += ':';
							}
						}
						if (i3 == 'optionName' || i3 == 'optionValueName') {
							v.propertyChildNames += v2[i3];
							if (i3 == 'optionName') {
								v.propertyChildNames += ':';
							}
						}
					}
					v.propertyChildIds += ',';
					v.propertyChildNames += ',';
				});
			});
			const orderGoodsStr = JSON.stringify(cartList);
			 // 跳转到 订单页面
			uni.navigateTo({
				url: `/pages/pay/index?orderGoods=${orderGoodsStr}`
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cart_main {
	margin-bottom: 100rpx;
	.cart_item {
		display: flex;
		margin: 20rpx 0;
		.cart_chk_wrap {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			::v-deep .u-checkbox {
				width: 40rpx;
			}
		}
		.cart_img_wrap {
			width: 160rpx;
			margin-right: 25rpx;
			display: flex;
			align-items: center;
			border-radius: 10rpx;
			overflow: hidden;
		}
		.cart_info_wrap {
			width: 450rpx;
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
				-webkit-line-clamp: 2;
			}
			.goods_attr {
				color: #a5a5a5;
				text{
					font-size: 24rpx;
				}
			}
			.goods_price_wrap {
				display: flex;
				justify-content: space-between;
				.goods_price {
					color: $themeColor;
					font-size: 34rpx;
				}
				.cart_num_tool {
					display: flex;
					.num_edit {
						width: 55rpx;
						height: 55rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						border: 1rpx solid #ccc;
					}
					.goods_num {
						width: 55rpx;
						height: 55rpx;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
	.footer_tool {
		position: fixed;
		bottom: calc(var(--window-bottom));
		left: 0;
		z-index: 10;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		display: flex;
		border-top: 1rpx solid #e8e8e8;
		.all_chk_wrap {
			flex: 3;
			padding-left: 15rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.total_price_wrap {
			flex: 5;
			padding-right: 15rpx;
			text-align: right;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.total_price {
				.total_price_text {
					color: $themeColor;
					font-size: 34rpx;
					font-weight: 600;
				}
			}
		}

		.order_pay_wrap {
			// padding: 15rpx;
			flex: 3;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15rpx;
		}
	}
}
.cart_empty {
	height: calc(100vh - var(--window-top) - var(--window-bottom));
}
</style>
