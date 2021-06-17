<template>
	<view class="content">
		<u-card padding="20" margin="20rpx 0" title="类型选择">
			<view slot="body">
				<u-radio-group active-color="#e93b3d" v-model="typeValue">
					<u-radio v-for="(item, index) in typeList" :key="index" :name="item.name" :disabled="item.disabled">
						{{ item.name }}
					</u-radio>
				</u-radio-group>
			</view>
		</u-card>
		<u-card padding="20" margin="20rpx 0" title="问题/建议描述">
			<view slot="body">
				<u-input
					:maxlength="250"
					placeholder="任何功能的使用问题和体验建议,都期待您的反馈,我们会尽快优化提升."
					v-model="contentValue"
					type="textarea"
					:height="150"
					:auto-height="true"
				/>
			</view>
		</u-card>
		<u-card padding="20" margin="20rpx 0" title="添加图片(选填)">
			<view slot="body"><u-upload ref="uUpload" action="" :auto-upload="false"></u-upload></view>
		</u-card>
		<u-card padding="20" margin="20rpx 0" title="联系方式(选填)">
			<view slot="body"><u-input placeholder="留下您的联系方式,方便沟通" v-model="contactValue" /></view>
		</u-card>
		<view class="btn"><u-button ripple shape="circle" type="error" @click="submit">提交</u-button></view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			typeList: [
				{
					name: '优化建议',
					disabled: false
				},
				{
					name: '功能异常',
					disabled: false
				}
			], //反馈类型列表
			typeValue: '优化建议', //反馈类型
			contentValue: '', // 描述
			contactValue: '' //联系方式
		};
	},
	methods: {
		// 提交
		async submit() {
			// this.$refs.uUpload.upload();
			const { typeValue, contentValue, contactValue } = this;
			let files = this.$refs.uUpload.lists;
			// 通过filter，筛选出上传进度为100的文件(因为某些上传失败的文件，进度值不为100，这个是可选的操作)
			// files = this.$refs.uUpload.lists.filter(val => {
			// 	return val.progress == 100;
			// });
			if (!contentValue) return this.$refs.uToast.show({ title: '请输入您的问题或建议' });
			this.$refs.uUpload.upload();
			const data = {
				typeValue,
				contentValue,
				images: this.$refs.uUpload.lists.map(item => item.url),
				contactValue
			};
			const res = await this.$request('feedback', data);
			console.log(res);
			this.$refs.uToast.show({ title: '提交成功' });
			if (res.status === 200 || true) {
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	overflow: hidden;
}
.btn {
	margin: 20rpx;
}
</style>
