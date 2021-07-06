<template>
	<view class="">
		<view class="navbar" :style="[navbarStyle]" :class="{ 'navbar-fixed': isFixed, 'border-bottom': borderBottom }">
			<!-- 状态栏 -->
			<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>
			<!-- navbar内容 -->
			<view class="navbar-inner" :style="[navbarInnerStyle]">
				<!-- 标题 -->
				<view class="navbar-content-title" v-if="title" :style="[titleStyle]">
					<view
						class="title"
						:style="{
							color: titleColor,
							fontSize: titleSize + 'rpx',
							fontWeight: titleBold ? 'bold' : 'normal'
						}"
					>
						{{ title }}
					</view>
				</view>
				<!-- 返回按钮 -->
				<view class="back-wrap" v-if="isBack" @tap="goBack">
					<view class="back-icon" :style="{borderColor:backIconColor}"></view>
					<view class="" v-if="backText" :style="[backTextStyle]">{{ backText }}</view>
				</view>

				<view class="slot-content"><slot></slot></view>
			</view>
		</view>
		<!-- 解决fixed定位后导航栏塌陷的问题 -->
		<view
			class="u-navbar-placeholder"
			v-if="isFixed"
			:style="{ width: '100%', height: statusBarHeight + Number(height) + 'px' }"
		></view>
	</view>
</template>

<script>
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// 如果是小程序，获取右上角胶囊的尺寸信息，避免导航栏右侧内容与胶囊重叠(支付宝小程序非本API，尚未兼容)
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif
/**
 * navbar 自定义导航栏
 * @property {String Number} height 导航栏高度(不包括状态栏高度在内，内部自动加上)，注意这里的单位是px（默认44）
 * @property {String} back-icon-color 左边返回图标的颜色（默认#606266）
 * @property {String} back-icon-name 左边返回图标的名称，只能为uView自带的图标（默认arrow-left）
 * @property {String Number} back-icon-size 左边返回图标的大小，单位rpx（默认30）
 * @property {String} back-text 返回图标右边的辅助提示文字
 * @property {Object} back-text-style 返回图标右边的辅助提示文字的样式，对象形式（默认{ color: '#606266' }）
 * @property {String} title 导航栏标题，如设置为空字符，将会隐藏标题占位区域
 * @property {String Number} title-width 导航栏标题的最大宽度，内容超出会以省略号隐藏，单位rpx（默认250）
 * @property {String} title-color 标题的颜色（默认#606266）
 * @property {String Number} title-size 导航栏标题字体大小，单位rpx（默认32）
 * @property {Function} custom-back 自定义返回逻辑方法
 * @property {String Number} z-index 固定在顶部时的z-index值（默认980）
 * @property {Boolean} is-back 是否显示导航栏左边返回图标和辅助文字（默认true）
 * @property {Object} background 导航栏背景设置，见官网说明（默认{ background: '#ffffff' }）
 * @property {Boolean} is-fixed 导航栏是否固定在顶部（默认true）
 * @property {Boolean} border-bottom 导航栏底部是否显示下边框，如定义了较深的背景颜色，可取消此值（默认false）
 * @example <navbar back-text="返回" title="剑未配妥，出门已是江湖"></navbar>
 */
export default {
	name: 'navbar',
	props: {
		// 导航栏高度，单位px
		height: {
			type: [String, Number],
			default: '44'
		},
		// 返回箭头的颜色
		backIconColor: {
			type: String,
			default: '#606266'
		},
		// 返回的文字提示
		backText: {
			type: String,
			default: ''
		},
		// 返回的文字的 样式
		backTextStyle: {
			type: Object,
			default() {
				return {
					color: '#606266',
					fontSize: '34rpx'
				};
			}
		},
		// 导航栏标题
		title: {
			type: String,
			default: ''
		},
		// 标题的宽度，如果需要自定义右侧内容，且右侧内容很多时，可能需要减少这个宽度，单位rpx
		titleWidth: {
			type: [String, Number],
			default: '250'
		},
		// 标题的颜色
		titleColor: {
			type: String,
			default: '#606266'
		},
		// 标题字体是否加粗
		titleBold: {
			type: Boolean,
			default: false
		},
		// 标题的字体大小
		titleSize: {
			type: [String, Number],
			default: 36
		},
		isBack: {
			type: [Boolean, String],
			default: true
		},
		// 对象形式，因为用户可能定义一个纯色，或者线性渐变的颜色
		background: {
			type: Object,
			default() {
				return {
					background: '#ffffff'
				};
			}
		},
		// 导航栏是否固定在顶部
		isFixed: {
			type: Boolean,
			default: true
		},
		// 是否显示导航栏的下边框
		borderBottom: {
			type: Boolean,
			default: false
		},
		zIndex: {
			type: [String, Number],
			default: ''
		},
		// 自定义返回逻辑
		customBack: {
			type: Function,
			default: null
		}
	},
	data() {
		return {
			menuButtonInfo: menuButtonInfo,
			statusBarHeight: systemInfo.statusBarHeight //状态栏高度
		};
	},
	computed: {
		// 导航栏内部盒子的样式
		navbarInnerStyle() {
			let style = {};
			// 导航栏宽度，如果在小程序下，导航栏宽度为胶囊的左边到屏幕左边的距离
			style.height = this.height + 'px';
			// 如果是各家小程序，导航栏内部的宽度需要减少右边胶囊的宽度
			// #ifdef MP
			let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
			style.marginRight = rightButtonWidth + 'px';
			// #endif
			return style;
		},
		// 整个导航栏的样式
		navbarStyle() {
			let style = {};
			style.zIndex = this.zIndex ? this.zIndex : 980;
			// 合并用户传递的背景色对象
			Object.assign(style, this.background);
			return style;
		},
		// 导航中间的标题的样式
		titleStyle() {
			let style = {};
			style.left = (systemInfo.windowWidth - uni.upx2px(this.titleWidth)) / 2 + 'px';
			style.width = uni.upx2px(this.titleWidth) + 'px';
			return style;
		},
	},
	created() {
	},
	methods: {
		goBack() {
			// 如果自定义了点击返回按钮的函数，则执行，否则执行返回逻辑
			if (typeof this.customBack === 'function') {
				// 在微信，支付宝等环境(H5正常)，会导致父组件定义的customBack()函数体中的this变成子组件的this
				// 通过bind()方法，绑定父组件的this，让this.customBack()的this为父组件的上下文
				this.customBack.bind(this.$u.$parent.call(this))();
			} else {
				uni.navigateBack();
			}
		}
	}
};
</script>

<style scoped lang="scss">
.navbar {
	width: 100%;
}
.navbar-fixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	z-index: 990;
}
.status-bar {
	width: 100%;
}
.navbar-inner {
	display: flex;
	justify-content: space-between;
	position: relative;
	align-items: center;
	.back-wrap {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 14rpx 14rpx 14rpx 34rpx;
	}
	.slot-content {
		flex: 1;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.navbar-content-title {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 0;
		height: 100%;
		overflow: hidden;
		text-align: center;
		.title {
			line-height: 60rpx;
			font-size: 32rpx;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
}
.back-icon {
	height: 25rpx;
	width: 25rpx;
	border-width: 0 0 5rpx 5rpx;
	border-color: #000000;
	border-style: solid;
	transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
	-webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
}
.border-bottom{
	border-bottom: 1rpx solid #fff;
}
</style>
