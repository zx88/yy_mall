<template>
	<view>
		<!-- 搜索框 -->
		<view class="search_row">
			<u-search placeholder="请输入搜索关键字" v-model="inpValue" @change="handleChange" @custom="handleInput"></u-search>
		</view>
		<!-- 搜索历史 -->
		<view class="search_history" v-if="!searchList.length && historyList.length">
			<view class="history_title">
				<u-icon name="clock" label="最近搜索"></u-icon>
				<u-icon name="trash" @click="isDelHistory = true"></u-icon>
			</view>
			<view class="history_list">
				<text v-for="(item, index) in historyList" :key="index" @click="handleHistoryBtn(item)">{{ item }}</text>
			</view>
		</view>
		<!-- 热门搜索 -->
		<view class="hot_search" v-if="!searchList.length">
			<view class="hot_title"><u-icon name="heart" label="热门搜索"></u-icon></view>
			<view class="hot_list"><text v-for="(item, index) in 8" :key="index">龙泉宝剑</text></view>
		</view>
		<!-- 搜索内容 -->
		<view class="search_content">
			<navigator url="" class="search_item" v-for="item in searchList" :key="item.goods_id">{{ item.goods_name }}</navigator>
		</view>

		<!-- 删除历史确认框 -->
		<u-modal v-model="isDelHistory" @confirm="handleDeleteHistory" :show-cancel-button="true" content="确认删除历史搜索记录?"></u-modal>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchList: [],
			historyList: [],
			inpValue: '',
			isDelHistory: false
		};
	},
	onLoad() {
		this.historyList = uni.getStorageSync('searchHistory');
	},
	methods: {
		async handleChange(e) {
			// 1 获取输入框的值
			const value = e;
			// 2 检测合法性
			if (!value.trim()) {
				// 值不合法
				this.searchList = [];
				return;
			}
			// 发送请求获取搜索建议 数据
		},
		// 点击搜索按钮
		handleInput(e) {
			const value = e;
			if (!value.trim()) return uni.showToast({ icon: 'none', title: '请先输入关键字' });
			let clonehistoryList = [...this.historyList];
			clonehistoryList.unshift(value);
			uni.setStorage({
				key: 'searchHistory',
				data: [...new Set(clonehistoryList)]
			});
			this.historyList = uni.getStorageSync('searchHistory').slice(0, 20);
			this.getsearchList(value);
		},
		// 确认删除历史搜索记录
		handleDeleteHistory() {
			uni.setStorage({
				key: 'searchHistory',
				data: []
			});
			this.historyList = [];
		},
		// 点击历史搜索记录
		handleHistoryBtn(e) {
			this.inpValue = e;
			this.getsearchList(e);
		},
		// 获取搜索列表
		async getsearchList(val) {
			const res = await this.$requests({ url: '/goods/qsearch', data: { query: val } });
			if (res.meta.status !== 200 || res.message.length === 0) return uni.showToast({ icon: 'none', title: '没有搜索到数据!' });
			this.searchList = res.message;
		}
	}
};
</script>

<style lang="scss" scoped>
.search_row {
	padding: 0 30rpx;
}
.search_history {
	.history_title {
		font-size: 36rpx;
		font-weight: bold;
		padding: 20rpx 20rpx 0 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.history_list {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;
		text {
			border: 1rpx #b4b5b6 solid;
			padding: 10rpx 20rpx;
			background: white;
			border-radius: 20rpx;
			margin: 10rpx;
		}
	}
}
.hot_search {
	.hot_title {
		font-size: 36rpx;
		font-weight: bold;
		padding: 20rpx 20rpx 0 20rpx;
		display: flex;
	}
	.hot_list {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;
		text {
			border: 1rpx #b4b5b6 solid;
			margin: 10rpx;
			padding: 10rpx 20rpx;
			background: white;
			border-radius: 20rpx;
		}
	}
}
.search_content {
	padding: 20rpx;
	.search_item {
		background-color: #fff;
		font-size: 28rpx;
		padding: 20rpx;
		border-bottom: 1rpx solid #ccc;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
