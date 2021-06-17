<template>
	<view>
		<u-card :show-foot="false" :show-head="false" margin="20rpx" padding="0">
			<view slot="body" class="set_wrap">
				<u-cell-group>
					<u-cell-item
						:titleStyle="{ fontSize: '30rpx' }"
						title="个人资料"
						:index="0"
						@click="navTo('../set/userinfo', { login: true })"
					></u-cell-item>
					<u-cell-item :titleStyle="{ fontSize: '30rpx' }" title="支付密码设置" :index="1" @click="handleCell"></u-cell-item>
				</u-cell-group>
			</view>
		</u-card>

		<u-button :custom-style="{ margin: '10px', color: '#e93b3d' }" @click="showLogout = true">退出登录</u-button>
		<!-- 退出登录确认框 -->
		<u-modal v-model="showLogout" @confirm="Logout" :show-cancel-button="true" content="您确定要退出登录吗?"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showLogout: false
		};
	},
	mounted() {},
	methods: {
		async Logout() {
			// this.$refs.confirmBtn.loading = true;
			const res = await this.$request({ url: '/user/loginout' });
			if (res.code !== 0) return this.$util.msg(res.msg);
			// this.$refs.confirmBtn.loading = false;
			this.$util.msg('您已退出登录');
			this.$store.commit('logout');
			setTimeout(() => {
				uni.navigateBack();
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped></style>
