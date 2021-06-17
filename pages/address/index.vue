<template>
	<view>
		<view v-if="addressList.length > 0" class="main-wrap">
			<view class="item" v-for="(item, index) in addressList" :key="index">
				<u-card @click="chooseAddress(item)" margin="20rpx" padding="20" :show-head="false">
					<view slot="body">
						<view>
							<text class="name">{{ item.linkMan }}</text>
							<text class="mobile">{{ item.mobile }}</text>
							<u-tag v-if="item.isDefault" size="mini" text="默认" type="success" />
						</view>
						<text class="content">{{ item.provinceStr }} {{ item.areaStr }}{{ item.address }}</text>
					</view>
					<view class="btn" slot="foot">
						<u-icon @click="showDelModal(item.id)" label="删除" name="trash"></u-icon>
						<u-icon :customStyle="{ marginLeft: '20rpx' }" @click="editAddr(item)" label="编辑" name="edit-pen"></u-icon>
					</view>
				</u-card>
			</view>
			<view class="bot-btn-wrap"><u-button type="error" @click="navTo('manage')">新增收货地址</u-button></view>
		</view>
		<view v-else class="cart_empty">
			<u-empty text="暂时没有数据" mode="address"></u-empty>
			<view class="bot-btn-wrap"><u-button type="error" @click="navTo('manage')">新增收货地址</u-button></view>
		</view>

		<!-- 退出登录确认框 -->
		<u-modal v-model="showDelAddress" @confirm="delAddress" :show-cancel-button="true" content="您确定要删除该地址吗?"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			addressList: [],
			query: {
				page: 1,
				pageSize: 50
			},

			// 显示删除地址模态
			showDelAddress: false,
			delAddressId: 0,
			// 支付界面进入
			isPay: false
		};
	},
	onLoad(options) {
		if(options.pay){
			this.isPay = !!options.pay;
		}
		console.log(this.isPay);
	},
	onShow() {
		this.getAddressList();
	},
	methods: {
		// 收货地址/zxapi/user/shipping-address/list/v2
		async getAddressList() {
			const res = await this.$request({ method: 'post', url: '/user/shipping-address/list/v2', data: this.query });
			console.log(res);
			if (res.code === 700) return;
			if (res.code === 0) {
				this.addressList = res.data.result;
			}
			// this.list = res.data;
		},
		//选择地址
		chooseAddress(item) {
			if (!this.isPay) {
				return;
			}
			this.navTo(`../pay/index?address=${JSON.stringify(item)}`);
		},

		// 删除地址
		async delAddress() {
			let id = this.delAddressId;
			const res = await this.$request({ method: 'post', url: '/user/shipping-address/delete', data: { id } });
			if (res.code === 0) {
				this.$util.msg('删除成功', { icon: 'success' });
				this.addressList = this.addressList.filter(v => v.id !== id);
			}
		},
		//编辑地址
		editAddr(item) {
			this.navTo(`manage?data=${JSON.stringify(item)}`);
		},
		// 删除/{domain}/user/shipping-address/delete
		showDelModal(id) {
			this.delAddressId = id;
			this.showDelAddress = true;
		}
	}
};
</script>

<style scoped lang="scss">
.main-wrap {
	margin-bottom: 120rpx;
}
.cart_empty {
	height: calc(100vh - var(--window-top) - 90rpx);
}
.item {
	.name,.mobile {
		margin-right: 20rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}
	.mobile{
		color: #777;
	}
	.content {
		font-size: 26rpx;
		color: #999;
		line-height: 1.44;
	}
	.btn {
		display: flex;
		justify-content: flex-end;
	}
}
.bot-btn-wrap {
	position: fixed;
	left: 0;
	bottom: 30rpx;
	z-index: 90;
	width: 100%;
	padding: 0 50rpx;
}
</style>
