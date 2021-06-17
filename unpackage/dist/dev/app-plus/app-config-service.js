
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/home/index","pages/category/index","pages/cart/index","pages/mine/index","pages/search/index","pages/notify/index","pages/goods_list/index","pages/goods_detail/index","pages/pay/index","pages/auth/login","pages/auth/register","pages/auth/find_pwd","pages/set/userinfo","pages/auth/agreement","pages/mine/feedback","pages/order/index","pages/address/index","pages/address/manage","pages/collect/index","pages/set/index","pages/history/index","pages/money/index","pages/mine/contact"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"遇易购物","navigationBarBackgroundColor":"#e93b3d","backgroundColor":"#fff"},"tabBar":{"color":"#8a8a8a","selectedColor":"#e93b3d","backgroundColor":"#fff","position":"bottom","borderStyle":"black","list":[{"pagePath":"pages/home/index","text":"首页","iconPath":"./static/tabbar/home.png","selectedIconPath":"./static/tabbar/home-o.png"},{"pagePath":"pages/category/index","text":"分类","iconPath":"./static/tabbar/category.png","selectedIconPath":"./static/tabbar/category-o.png"},{"pagePath":"pages/cart/index","text":"购物车","iconPath":"./static/tabbar/cart.png","selectedIconPath":"./static/tabbar/cart-o.png"},{"pagePath":"pages/mine/index","text":"我的","iconPath":"./static/tabbar/mine.png","selectedIconPath":"./static/tabbar/mine-o.png"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"yy_mall","compilerVersion":"3.1.13","entryPagePath":"pages/home/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/home/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationStyle":"custom"}},{"path":"/pages/category/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类"}},{"path":"/pages/cart/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom"}},{"path":"/pages/search/index","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/notify/index","meta":{},"window":{"navigationBarTitleText":"通知"}},{"path":"/pages/goods_list/index","meta":{},"window":{"navigationBarTitleText":"商品列表"}},{"path":"/pages/goods_detail/index","meta":{},"window":{"navigationBarTitleText":"商品详情"}},{"path":"/pages/pay/index","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/auth/login","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/auth/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/auth/find_pwd","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/set/userinfo","meta":{},"window":{"navigationBarTitleText":"个人资料"}},{"path":"/pages/auth/agreement","meta":{},"window":{"navigationBarTitleText":"协议"}},{"path":"/pages/mine/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/order/index","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/address/index","meta":{},"window":{"navigationBarTitleText":"收货地址"}},{"path":"/pages/address/manage","meta":{},"window":{"navigationBarTitleText":"地址管理"}},{"path":"/pages/collect/index","meta":{},"window":{"navigationBarTitleText":"我的收藏"}},{"path":"/pages/set/index","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/history/index","meta":{},"window":{"navigationBarTitleText":"我的足迹"}},{"path":"/pages/money/index","meta":{},"window":{"navigationBarTitleText":"我的钱包"}},{"path":"/pages/mine/contact","meta":{},"window":{"navigationBarTitleText":"客服"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});