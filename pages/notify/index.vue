<template>
	<view>
		<u-card class="card" titleColor="#000" title="赠送积分通知" margin="20rpx" padding="30" :show-foot="false">
			<navigator :url="`#`" slot="body" class="notify_item">
				<!-- 图片容器 -->
				<view class="notify_img_wrap">
					<image :src="'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fyouimg1.c-ctrip.com%2Ftarget%2Ftg%2F035%2F063%2F726%2F3ea4031f045945e1843ae5156749d64c.jpg&refer=http%3A%2F%2Fyouimg1.c-ctrip.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625918475&t=d5e768f5a0d997a0cd0621de1ebd38b1'"></image>
				</view>
				<!-- 文章容器 -->
				<view class="notify_info_wrap">
					<view class="notify_name">通知通知通知通知通知通知通知通知通知通知通知通知通知通知</view>
					<view class="notify_num">日期: 2021-06-8</view>
				</view>
			</navigator>
		</u-card>
	</view>
</template>

<script>
   export default {
		data() {
			return {

			}
		},
		mounted() {},
		methods: {},

	}
</script>

<style lang='scss' scoped>
.notify_item{
	.notify_num{
		text-align: right;
	}
}
</style>