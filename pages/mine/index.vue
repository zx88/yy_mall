<template>
	<view>
		<!-- 		<u-navbar
			:is-back="false"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(90deg, rgb(254, 8, 90), rgb(246, 36, 28))' }"
		></u-navbar> -->
		<view class="user_wrap">
			<view class="user_wrap_box">
				<navigator :url="hasLogin ? '../set/userinfo' : '../auth/login'">
					<image class="avatar" :src="userInfo.avatarUrl || '/static/icon/default-avatar.png'"></image>
				</navigator>

				<view class="user_name" v-if="hasLogin">
					<text class="name">{{ userInfo.username }}</text>
					<!-- <text class="group">普通会员</text> -->
				</view>
				<navigator v-else class="login_btn" url="../auth/login">登录/注册</navigator>
			</view>
			<view v-if="userInfo.avatarUrl" class="bgi" :style="{ backgroundImage: `url(${userInfo.avatarUrl || '/static/bg/user.jpg'})` }"></view>
			<view v-if="!userInfo.avatarUrl" class="bgc"></view>
		</view>
		<!-- 收藏区域 -->
		<u-card :show-foot="false" :show-head="false" margin="0 20rpx" padding="0">
			<view slot="body" class="collect_wrap">
				<view class="item" @click="navTo('../collect/index?index=0', { login: true })">
					<text class="num">{{ collectCount || 0 }}</text>
					<text>商品收藏</text>
				</view>
				<view class="item" @click="navTo('../collect/index?index=1', { login: true })">
					<text class="num">{{ 0 }}</text>
					<text>店铺收藏</text>
				</view>
				<!--  hover-class="hover-gray" :hover-stay-time="50" -->
				<view class="item" @click="navTo('../history/index', { login: true })">
					<text class="num">{{ historyConut || 0 }}</text>
					<text>我的足迹</text>
				</view>
			</view>
		</u-card>
		<!-- 我的订单 -->
		<u-card :show-foot="false" :show-head="false" margin="20rpx" padding="0">
			<view slot="body" class="order_wrap">
				<view class="o_header" @click="navTo('../order/index?current=0', { login: true })">
					<text class="tit">我的订单</text>
					<u-icon size="24" color="#999" label-color="#999" name="arrow-right" label="查看全部" label-pos="left"></u-icon>
				</view>
				<view class="o_list">
					<view @click="navTo('../order/index?current=1', { login: true })" class="item">
						<u-icon size="60" name="rmb-circle" label="待付款" label-pos="bottom" margin-top="25"></u-icon>
						<u-badge bgColor="#e93b3d" :offset="[25, 30]" :count="orderCount.count_id_no_pay || 0"></u-badge>
					</view>
					<view @click="navTo('../order/index?current=2', { login: true })" class="item">
						<u-icon size="60" name="clock" label="待发货" label-pos="bottom" margin-top="25"></u-icon>
						<u-badge bgColor="#e93b3d" :offset="[25, 30]" :count="orderCount.count_id_no_transfer || 0"></u-badge>
					</view>
					<view @click="navTo('../order/index?current=3', { login: true })" class="item">
						<u-icon size="60" name="gift" label="待收货" label-pos="bottom" margin-top="25"></u-icon>
						<u-badge bgColor="#e93b3d" :offset="[25, 30]" :count="orderCount.count_id_no_confirm || 0"></u-badge>
					</view>
					<view @click="navTo('../order/index?current=4', { login: true })" class="item">
						<u-icon size="60" name="more-circle" label="待评价" label-pos="bottom" margin-top="25"></u-icon>
						<u-badge bgColor="#e93b3d" :offset="[25, 30]" :count="orderCount.count_id_no_reputation || 0"></u-badge>
					</view>
					<view class="item">
						<u-icon size="60" name="coupon" label="退换/售后" label-pos="bottom" margin-top="25"></u-icon>
						<u-badge bgColor="#e93b3d" :offset="[25, 30]" count="0"></u-badge>
					</view>
				</view>
			</view>
		</u-card>
		<u-card :show-foot="false" :show-head="false" margin="20rpx" padding="0">
			<view slot="body" class="">
				<u-cell-group>
					<u-cell-item
						v-for="(item, index) in cellList"
						:key="item.title"
						:iconStyle="item.iconStyle"
						:titleStyle="{ marginLeft: '10rpx', fontSize: '30rpx' }"
						iconSize="40"
						:icon="item.icon"
						:title="item.title"
						:value="item.value"
						:index="index"
						@click="handleCell"
					></u-cell-item>
					<u-cell-item
						:iconStyle="{ color: '#ee883b' }"
						:titleStyle="{ marginLeft: '10rpx', fontSize: '30rpx' }"
						iconSize="40"
						icon="chat-fill"
						title="联系客服"
						value="即时解答疑虑"
						:index="5"
					>
						<!-- #ifdef MP-WEIXIN -->
						<button
							slot="right-icon"
							open-type="contact"
							style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"
						></button>
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
						<button
							@click="handleCell"
							slot="right-icon"
							open-type="contact"
							style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;opacity: 0;"
						></button>
						<!-- #endif -->
					</u-cell-item>
				</u-cell-group>
			</view>
		</u-card>
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
	data() {
		return {
			cellList: [
				{ title: '我的钱包', value: '进入我的钱包', iconStyle: { color: '#ff536f' }, icon: 'red-packet-fill' },
				{ title: '我的收藏', value: '查看收藏商品', iconStyle: { color: '#aa55ff' }, icon: 'star-fill' },
				{ title: '地址管理', value: '管理我的地址', iconStyle: { color: '#5fcda2' }, icon: 'map-fill' },
				{ title: '意见反馈', value: '期待您的建议', iconStyle: { color: '#55aaff' }, icon: 'email-fill' },
				{ title: '设置', value: '进入设置', iconStyle: { color: '#a5a5a5' }, icon: 'setting-fill' }
			],
			historyConut: 0
		};
	},
	computed: {
		...mapState(['userInfo', 'orderCount', 'collectCount']),
		...mapGetters(['hasLogin'])
	},
	onShow() {
		// 浏览足迹
		this.historyConut = uni.getStorageSync('historyCount');
	},
	onLoad() {},
	methods: {
		handleCell(e) {
			if (e === 0) {
				this.navTo('../money/index', { login: true });
			} else if (e === 1) {
				this.navTo('../collect/index', { login: true });
			} else if (e === 2) {
				this.navTo('../address/index', { login: true });
			} else if (e === 3) {
				uni.navigateTo({ url: 'feedback' });
			} else if (e === 4) {
				this.navTo('../set/index', { login: true });
			} else {
				this.navTo('contact', { login: true });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.user_wrap {
	// width: 100%;
	// height: 100%;
	// background: 0 40%;
	// filter: blur(40rpx);
	// background-size: cover;
	// position: absolute;
	// left: 0;
	// top: 0;
	// border-top: 0.5rpx solid #ccc;
	position: relative;
	// overflow: hidden;
	.bgi {
		width: 100%;
		height: 150%;
		filter: blur(40rpx);
		background-size: cover;
		position: absolute;
		left: 0;
		top: 0;
	}
	.bgc {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		background-image: linear-gradient(360deg, rgb(254, 8, 90), rgb(233, 59, 61));
	}
	.user_wrap_box {
		display: flex;
		align-items: center;
		padding: 60rpx;
		position: relative;
		z-index: 10;
		.login_btn {
			font-size: 36rpx;
			color: #fff;
		}
		.avatar {
			width: 130rpx;
			height: 130rpx;
			border-radius: 100px;
			margin-right: 24rpx;
			border: 2rpx solid #aa55ff;
			background-color: #fff;
		}
		.user_name {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.name {
				font-size: 40rpx;
				color: #fff;
				padding-left: 5rpx;
			}
		}
	}
}
.collect_wrap {
	display: flex;
	justify-content: space-around;
	margin: 30rpx 0;
	.item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.num {
		font-size: 32rpx;
		color: #333;
		font-weight: 700;
		margin-bottom: 10rpx;
	}
}
.order_wrap {
	margin: 30rpx 20rpx;
	.o_header {
		display: flex;
		.tit {
			flex: 1;
			font-size: 32rpx;
			color: #333;
			font-weight: 700;
		}
	}
	.o_list {
		display: flex;
		justify-content: space-between;
	}
	.item {
		// margin: 30rpx;
		width: 160rpx;
		position: relative;
		padding-top: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
