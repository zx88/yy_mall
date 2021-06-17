<template>
	<view>
		<!-- 添加收货地址表单 -->
		<view class="input_content">
			<u-form :model="query" :label-width="140" ref="uForm">
				<u-form-item label="收货人"><u-input placeholder="请输入姓名" v-model="query.linkMan" /></u-form-item>
				<u-form-item label="联系方式"><u-input type="number" placeholder="请输入手机号" v-model="query.mobile" /></u-form-item>
				<u-form-item label="选择地区">
					<text @click="showSelectCity(0)">{{ !query.provinceStr ? '请选择' : query.provinceStr }}/</text>
					<text @click="showSelectCity(1)">{{ !query.cityStr ? '请选择' : query.cityStr }}/</text>
					<text @click="showSelectCity(2)">{{ !query.areaStr ? '请选择' : query.areaStr }}</text>
				</u-form-item>
				<u-form-item label="详细地址">
					<u-input v-model="query.address" />
					<u-icon slot="right" name="map-fill" @click="getLocation"></u-icon>
				</u-form-item>
				<u-form-item :label-width="300" label="设置为默认地址">
					<u-switch active-color="#e93b3d" slot="right" v-model="query.isDefault"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<u-button type="error" :custom-style="{ margin: '15px' }" @click="submit">提交</u-button>
		<!-- 城市选择器 -->
		<u-select @confirm="selectCity" v-model="showSelect" label-name="name" value-name="id" :list="selectCityList"></u-select>
	</view>
</template>

<script>
import QQMapWX from '../../common/js/qqmap-wx-jssdk.min.js';
import { checkStr } from '../../common/js/util.js';
export default {
	data() {
		return {
			query: {
				address: '', //	详细地址
				cityId: 0, //所属城市编码
				cityStr: '',
				linkMan: '',
				mobile: '',
				provinceId: 0, //所属省份编码
				provinceStr: '',
				districtId: 0, //所属区县编码
				areaStr: '',
				isDefault: false
			},
			showSelect: false,
			selectCityList: [],
			selectIndex: 1
		};
	},
	onLoad(options) {
		if (options.data) {
			this.query = JSON.parse(options.data);
		}
		// this.getCityList();
	},
	methods: {
		//获取详细定位
		getLocation() {
			uni.chooseLocation({
				success: res => {
					this.query.address = res.address + res.name;
				}
			});
			// let qqmapsdk = new QQMapWX({
			// 	key: 'EKABZ-INLKF-SVGJO-J5P5K-6HZOO-6SBPN'
			// });
			// uni.getLocation({
			// 	type: 'gcj02',
			// 	success: res => {
			// 		uni.showLoading({
			// 			title: '定位中',
			// 			mask: true
			// 		});
			// 		qqmapsdk.reverseGeocoder({
			// 			location: {
			// 				latitude: res.latitude,
			// 				longitude: res.longitude
			// 			},
			// 			success: res => {
			// 				if (res.status === 0) {
			// 					uni.hideLoading();
			// 					this.query.address = res.result.address;
			// 				}
			// 			}
			// 		});
			// 	},
			// 	fail: () => {
			// 		this.$util.msg('定位失败,请手动输入');
			// 	}
			// });
		},
		// 显示城市选择器/common/region/v2/province
		async showSelectCity(index) {
			if (index === 0) {
				const { data } = await this.getCity();
				this.selectCityList = data;
				this.showSelect = true;
				this.selectIndex = index;
			} else if (index === 1 && this.query.provinceId) {
				const { data } = await this.getSubCity(this.query.provinceId);
				this.selectCityList = data;
				this.showSelect = true;
				this.selectIndex = index;
				return;
			} else if (index === 2 && this.query.cityId) {
				const { data } = await this.getSubCity(this.query.cityId);
				this.selectCityList = data;
				this.showSelect = true;
				this.selectIndex = index;
				return;
			} else {
				this.$util.msg('请先选择上级城市');
			}
		},
		//select选择城市
		selectCity(e) {
			if (this.selectIndex === 0) {
				this.query.provinceId = e[0].value;
				this.query.provinceStr = e[0].label;
				this.query.cityStr = '';
				this.query.areaStr = '';
			}
			if (this.selectIndex === 1) {
				this.query.cityId = e[0].value;
				this.query.cityStr = e[0].label;
			}
			if (this.selectIndex === 2) {
				this.query.districtId = e[0].value;
				this.query.areaStr = e[0].label;
			}
		},
		// 获取省级城市
		getCity(id) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: 'https://api.it120.cc/common/region/v2/province',
					success: res => {
						resolve(res.data);
					}
				});
			});
		},
		// 获取下级城市
		getSubCity(id) {
			return new Promise((resolve, reject) => {
				uni.request({
					url: 'https://api.it120.cc/common/region/v2/child',
					data: { pid: id },
					success: res => {
						resolve(res.data);
					}
				});
			});
		},
		// 提交添加收货地址POST/{domain}/user/shipping-address/add  /{domain}/user/shipping-address/update
		async submit() {
			const query = this.query;
			if (!query.linkMan) {
				this.$util.msg('请输入收货人姓名');
				return;
			}
			if (!checkStr(query.mobile, 'mobile')) {
				this.$util.msg('请输入正确的手机号码');
				return;
			}
			if (!query.provinceId || !query.cityId || !query.districtId) {
				this.$util.msg('请选择地区');
				return;
			}
			if (!query.address) {
				this.$util.msg('请输入收货地址');
				return;
			}
			if(!this.query.id){
				var res = await this.$request({ method: 'post', url: '/user/shipping-address/add', data: query });
			}else{
				var res = await this.$request({ method: 'post', url: '/user/shipping-address/update', data: query });
			}
			// const operation = data._id ? 'update' : 'add';
			// const res = await this.$request('address', operation, data);
			// this.$util.msg(res.msg);
			if (res.code === 0) {
				this.$util.msg('修改成功', { icon: 'sucess' });
				setTimeout(() => {
					uni.navigateBack();
				}, 1000);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.input_content {
	padding: 0 30rpx;
}
</style>
