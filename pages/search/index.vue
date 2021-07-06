<template>
	<view>
		<!-- 搜索框 -->
		<view class="search_row">
			<u-search
				placeholder="请输入搜索关键字"
				border-color="#e93b3d"
				:show-action="false"
				v-model="inpValue"
				@change="handleChange"
				@custom="handleInput"
			></u-search>
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
			<view class="hot_list">
				<text @click="handleHistoryBtn(hotxt)" v-for="hotxt in hotList" :key="hotxt">{{ hotxt }}</text>
			</view>
		</view>
		<!-- 搜索内容 -->
		<view class="search_content">
			<navigator :url="`../goods_detail/index?id=${item.id}`" class="search_item" v-for="item in searchList" :key="item.id">
				{{ item.name }}
			</navigator>
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
			hotList: ['南极人', '小米', '三星', '外套', '男士', '伞'],
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
			// 防抖搜索
			this.$util.debounce(()=>{
				this.getsearchList(value);
			},500)
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
		// 获取搜索列表/{domain}/shop/goods/list/v2
		async getsearchList(val) {
			const res = await this.$request({ url: '/shop/goods/list/v2', method: 'post', data: { k: val } });
			if (res.code !== 0) return this.$util.msg('没有搜索到结果!');
			this.searchList = res.data.result;
			let clonehistoryList = [...this.historyList];
			clonehistoryList.unshift(val);
			uni.setStorage({
				key: 'searchHistory',
				data: [...new Set(clonehistoryList)]
			});
			this.historyList = uni.getStorageSync('searchHistory').slice(0, 20);
		}
	}
};
</script>

<style lang="scss" scoped>
.search_row {
	padding: 20rpx;
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
