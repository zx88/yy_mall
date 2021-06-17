<script>
	export default {
		methods:{
			//登录状态
			async initLogin(){
				const token = uni.getStorageSync('token');
				if(token){
					this.$store.commit('setToken', token);
				}
			},
		},
		onLaunch: function() {
			this.initLogin();
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import "common/css/common.css";
</style>
