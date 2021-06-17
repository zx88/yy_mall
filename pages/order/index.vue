<template>
	<view>
		<view class="wrap">
			<view class="tabs_box">
				<u-tabs-swiper
					activeColor="#e93b3d"
					ref="uTabs"
					:list="list"
					:current="current"
					@change="tabsChange"
					:is-scroll="false"
					swiperWidth="750"
				></u-tabs-swiper>
			</view>
			<swiper class="swiper_box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper_item" v-for="(res, i) in orderDetail" :key="i">
					<scroll-view v-if="orderDetail[i].orderList.length" scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="page-box">
							<view class="order" v-for="(item, index) in res.orderList" :key="item.id">
								<u-card
									margin="15rpx 20rpx"
									padding="25"
									:title="item.dateAdd"
									:sub-title-color="item.status == -1 ? '' : '#e93b3d'"
									:sub-title="item.statusStr"
								>
									<view slot="body">
										<view class="item" v-for="(item2, index2) in res.goodsMap[item.id]" :key="item2.id">
											<view class="left" @click="navTo('../goods_detail/index?id='+item2.goodsId)"><image :src="item2.pic" mode="aspectFill"></image></view>
											<view class="content">
												<view class="title u-line-2">{{ item2.goodsName }}</view>
												<view class="type">{{ item2.property }}</view>
												<view class="price">
													￥{{ item2.amountSingle }}
													<text>x{{ item2.number }}</text>
												</view>
											</view>
										</view>
										<view class="total">
											共{{ item.goodsNumber }}件商品 合计:
											<text class="total-price">￥{{ item.amount }}</text>
										</view>
										<view v-if="item.status == -1" class="bottom">
											<view class="exchange btn" @click="deleteOrder(item.id, i)">删除订单</view>
										</view>
										<view v-if="item.status == 0" class="bottom">
											<view class="exchange btn" @click="cancelOrder(item.id)">取消订单</view>
											<view class="evaluate btn" @click="pay(item)">立即支付</view>
										</view>
										<view v-if="item.status == 1" class="bottom">
											<view class="exchange btn">联系客服</view>
											<view class="exchange btn" @click="showRefundAction(item)">申请退款</view>
											<view class="exchange btn">自助发货</view>
										</view>
										<view v-if="item.status == 2" class="bottom">
											<view class="exchange btn">查看物流</view>
											<view class="evaluate btn" @click="showConfirmDelivery(item.id, i)">确认收货</view>
										</view>
										<view v-if="item.status == 3" class="bottom"><view class="evaluate btn">立即评价</view></view>
									</view>
								</u-card>
							</view>
							<!-- <u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore> -->
						</view>
					</scroll-view>
					<view v-else style="height: 100%;" class="cart_empty"><u-empty text="暂时没有数据" mode="order"></u-empty></view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 确认收货框 -->
		<u-modal v-model="isConfirmDelivery" @confirm="confirmDelivery" :show-cancel-button="true" content="确认您已收到该商品?"></u-modal>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			list: [
				{
					name: '全部'
				},
				{
					name: '待付款',
					count: 0
				},
				{
					name: '待发货',
					count: 0
				},
				{
					name: '待收货',
					count: 0
				},
				{
					name: '待评价',
					count: 0
				}
			],
			// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			orderDetail: [{ orderList: [] }, { orderList: [] }, { orderList: [] }, { orderList: [] }, { orderList: [] }],
			queryParams: {
				pagenum: 1,
				pagesize: 10,
				status: ''
			},
			// 确认收货提示
			isConfirmDelivery: false,
			confirmDeliveryInfo: {}
		};
	},
	onLoad(options) {
		this.swiperCurrent = options.current;
		this.getOrderList(options.current);
	},
	onReady() {
		this.current = this.swiperCurrent;
		// 更新订单数量
		this.$store.dispatch('getOrderCount');
	},
	computed: {
		...mapState(['userInfo', 'orderCount', 'couponCount']),
		...mapGetters(['hasLogin'])
	},
	watch: {
		orderCount() {
			this.list[4].count = this.orderCount.count_id_no_reputation;
			this.list[3].count = this.orderCount.count_id_no_confirm;
			this.list[2].count = this.orderCount.count_id_no_transfer;
			this.list[1].count = this.orderCount.count_id_no_pay;
		}
	},
	methods: {
		// 获取订单列表
		async getOrderList(index) {
			index = index || 0;
			let status = '';
			if (index == 1) {
				status = 0;
			} else if (index == 2) {
				status = 1;
			} else if (index == 3) {
				status = 2;
			} else if (index == 4) {
				status = 3;
			} else {
				status = '';
			}
			this.queryParams.status = status;
			const queryParams = this.queryParams;
			const res = await this.$request({ method: 'post', url: '/order/list', data: { ...queryParams, status: status } });
			var orderObj = {};
			if (res.code === 0) {
				orderObj = res.data;
				this.$set(this.orderDetail, index, orderObj);
				console.log(this.orderDetail[index]);
				return;
			}
		},
		// 删除订单
		async deleteOrder(id, index) {
			const res = await this.$request({ method: 'post', url: '/order/delete', data: { orderId: id } });
			if (res.code === 0) {
				this.orderDetail[index].orderList = this.orderDetail[index].orderList.filter(item => item.id !== id);
				this.$util.msg('删除成功');
			}
		},
		// 取消订单
		cancelOrder(id) {
			console.log(id);
		},
		// 支付
		pay(item) {
			console.log(item);
		},
		// 确认收货提示框显示
		showConfirmDelivery(id, i) {
			this.isConfirmDelivery = true;
			// let confirmDeliveryInfo
			this.confirmDeliveryInfo = { orderId: id, index: i };
		},
		//点击确认收货提示框中确认按钮
		async confirmDelivery() {
			let orderId = this.confirmDeliveryInfo.orderId;
			let index = this.confirmDeliveryInfo.index;
			const res = await this.$request({ method: 'post', url: '/order/delivery', data: { orderId } });
			if (res.code === 0) {
				// this.orderDetail[index].orderList = this.orderDetail[index].orderList.filter(item => item.id !== orderId)
				this.$util.msg('确认收货成功');
				this.getOrderList(index);
				// 更新订单数量
				this.$store.dispatch('getOrderCount');
			}
		},

		showRefundAction(item) {
			console.log(item);
		},
		// tabs通知swiper切换
		tabsChange(index) {
			this.swiperCurrent = index;
		},
		// swiper-item左右移动，通知tabs的滑块跟随移动
		transition(e) {
			let dx = e.detail.dx;
			this.$refs.uTabs.setDx(dx);
		},
		// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
		// swiper滑动结束，分别设置tabs和swiper的状态
		animationfinish(e) {
			let current = e.detail.current;
			this.$refs.uTabs.setFinishCurrent(current);
			if(this.current !== current){
				this.getOrderList(current);
			}
			this.swiperCurrent = current;
			this.current = current;
		},
		// scroll-view到底部加载更多 
		onreachBottom() {}
	},
	filters: {
		StatusTxt(e) {
			if (e == -1) {
				return '已关闭';
			} else if (e == 0) {
				return '待付款';
			} else if (e == 1) {
				return '待发货';
			} else if (e == 2) {
				return '待收货';
			} else if (e == 3) {
				return '待评价';
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper_box {
	flex: 1;
}
.swiper_item {
	height: 100%;
}
.order {
	.item {
		display: flex;
		margin-bottom: 30rpx;
		.left {
			margin-right: 20rpx;
			image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			flex: 1;
			.title {
				font-size: 30rpx;
				line-height: 40rpx;
			}
			.type {
				font-size: 28rpx;
				color: $u-tips-color;
			}
			.price {
				color: $themeColor;
				text {
					color: $u-tips-color;
					font-size: 24rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.total {
		text-align: right;
		font-size: 26rpx;
		.total-price {
			margin-left: 10rpx;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.bottom {
		display: flex;
		margin-top: 30rpx;
		// padding: 0 10rpx;
		justify-content: flex-end;
		align-items: center;
		.btn {
			margin-left: 20rpx;
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $themeColor;
			border-color: $themeColor;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
</style>
