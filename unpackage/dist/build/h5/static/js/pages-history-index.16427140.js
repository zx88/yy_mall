(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-history-index"],{"1cfa":function(t,e,i){var o=i("bdb7");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var r=i("4f06").default;r("56f6148f",o,!0,{sourceMap:!1,shadowMode:!1})},"1e2c":function(t,e,i){"use strict";i.r(e);var o=i("7767"),r=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);e["default"]=r.a},2391:function(t,e,i){"use strict";var o=i("1cfa"),r=i.n(o);r.a},"33ae":function(t,e,i){"use strict";(function(t){var o=i("4ea4");i("99af"),i("4160"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(i("2909"));i("96cf");var a=o(i("1da1")),n=o(i("8541")),s={data:function(){return{tabs:[{id:0,value:"内部商品",isActive:!0},{id:1,value:"外部商品",isActive:!1}],isListStyle:!1,historyList:[],queryParams:{page:1,pageSize:10,nameLike:""},totalPages:1,scrollTop:0,isBackTop:!1,triggered:!1,loadMore:"loading"}},onLoad:function(t){var e=t.index;1==e&&this.tabs.forEach((function(t,i){return t.isActive=i==e})),this.getHistoryList()},components:{Tabs:n.default},methods:{getHistoryList:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=t.queryParams,e.next=3,t.$request({method:"post",url:"/goods/visitLog",data:i});case 3:if(o=e.sent,700!==o.code){e.next=6;break}return e.abrupt("return");case 6:0===o.code&&(t.historyList=[].concat((0,r.default)(t.historyList),(0,r.default)(o.data.result)),t.triggered=!1,uni.setStorageSync("historyCount",o.data.totalRow));case 7:case"end":return e.stop()}}),e)})))()},handleBackTop:function(){this.scrollTop=-1,this.$nextTick((function(){this.scrollTop=0}))},pageScroll:function(t){t.detail.scrollTop>90?this.isBackTop=!0:this.isBackTop=!1},refresherrefresh:function(){t.log("下拉"),this.historyList=[],this.queryParams.page=1,this.triggered||(this.triggered=!0,this.getHistoryList())},showListStyle:function(t){this.isListStyle=!this.isListStyle},showListSort:function(e){t.log(e),this.tabs.forEach((function(t,i){return t.isActive=i===e}))},scrolltolower:function(){t.log("加载更多")}}};e.default=s}).call(this,i("5a52")["default"])},3921:function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return o}));var o={uIcon:i("09fc").default},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.show?i("v-uni-view",{staticClass:"u-empty",style:{marginTop:t.marginTop+"rpx"}},[i("u-icon",{attrs:{name:t.src?t.src:"empty-"+t.mode,"custom-style":t.iconStyle,label:t.text?t.text:t.icons[t.mode],"label-pos":"bottom","label-color":t.color,"label-size":t.fontSize,size:t.iconSize,color:t.iconColor,"margin-top":"14"}}),i("v-uni-view",{staticClass:"u-slot-wrap"},[t._t("bottom")],2)],1):t._e()},a=[]},"54dd":function(t,e,i){var o=i("73a6");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var r=i("4f06").default;r("37e4d930",o,!0,{sourceMap:!1,shadowMode:!1})},"62d7":function(t,e,i){"use strict";i.r(e);var o=i("842e"),r=i("c4a4");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("f92e");var n,s=i("f0c5"),l=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"5ef8fff0",null,!1,o["a"],n);e["default"]=l.exports},"73a6":function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.goods_list[data-v-5ef8fff0]{height:calc(100vh - var(--window-top) - %?90?%)}.cart_empty[data-v-5ef8fff0]{height:calc(100vh - var(--window-top) - %?90?%)}.first_tab_list[data-v-5ef8fff0]{padding:0 %?10?%}.first_tab_list .goods_item[data-v-5ef8fff0]{display:-webkit-box;display:-webkit-flex;display:flex}.first_tab_list .goods_item .goods_img_wrap[data-v-5ef8fff0]{width:%?180?%;height:%?180?%;overflow:hidden;border-radius:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.first_tab_list .goods_item .goods_img_wrap uni-image[data-v-5ef8fff0]{width:100%;height:100%}.first_tab_list .goods_item .goods_info_wrap[data-v-5ef8fff0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around;padding-left:%?20?%}.first_tab_list .goods_item .goods_info_wrap .goods_name[data-v-5ef8fff0]{font-size:%?32?%;color:#000;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2}.first_tab_list .goods_item .goods_info_wrap .goods_num[data-v-5ef8fff0]{font-size:%?28?%;color:#8f8f8f}.first_tab_img[data-v-5ef8fff0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?10?%}.first_tab_img .goods_item_box[data-v-5ef8fff0]{width:50%}.first_tab_img .goods_item_box .goods_item[data-v-5ef8fff0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.first_tab_img .goods_item_box .goods_item .goods_img_wrap[data-v-5ef8fff0]{height:%?300?%;overflow:hidden;border-radius:%?8?%}.first_tab_img .goods_item_box .goods_item .goods_img_wrap uni-image[data-v-5ef8fff0]{width:100%;height:100%}.first_tab_img .goods_item_box .goods_item .goods_info_wrap[data-v-5ef8fff0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.first_tab_img .goods_item_box .goods_item .goods_info_wrap .goods_name[data-v-5ef8fff0]{margin-top:%?10?%;font-size:%?32?%;color:#000;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;-webkit-line-clamp:2}.first_tab_img .goods_item_box .goods_item .goods_num[data-v-5ef8fff0]{font-size:%?25?%;color:#8f8f8f}.BackTop[data-v-5ef8fff0]{position:fixed;right:%?50?%;bottom:%?50?%;width:%?80?%;line-height:%?80?%;border-radius:50%;font-size:%?45?%;color:#a6a6a6;text-align:center;background-color:hsla(0,0%,52.9%,.2)}',""]),t.exports=e},7767:function(t,e,i){"use strict";i("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"u-empty",props:{src:{type:String,default:""},text:{type:String,default:""},color:{type:String,default:"#c0c4cc"},iconColor:{type:String,default:"#c0c4cc"},iconSize:{type:[String,Number],default:120},fontSize:{type:[String,Number],default:26},mode:{type:String,default:"data"},imgWidth:{type:[String,Number],default:120},imgHeight:{type:[String,Number],default:"auto"},show:{type:Boolean,default:!0},marginTop:{type:[String,Number],default:0},iconStyle:{type:Object,default:function(){return{}}}},data:function(){return{icons:{car:"购物车为空",page:"页面不存在",search:"没有搜索结果",address:"没有收货地址",wifi:"没有WiFi",order:"订单为空",coupon:"没有优惠券",favor:"暂无收藏",permission:"无权限",history:"无历史记录",news:"无新闻列表",message:"消息列表为空",list:"列表为空",data:"数据为空"}}}};e.default=o},"842e":function(t,e,i){"use strict";i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){return o}));var o={uCard:i("59af").default,uLoadmore:i("f754").default,uEmpty:i("bdb0").default,uIcon:i("09fc").default},r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("Tabs",{attrs:{tabs:t.tabs},on:{handleTabsTitle:function(e){arguments[0]=e=t.$handleEvent(e),t.showListSort.apply(void 0,arguments)},handleTabsRight:function(e){arguments[0]=e=t.$handleEvent(e),t.showListStyle.apply(void 0,arguments)}}},[t.historyList.length?i("v-uni-scroll-view",{staticClass:"goods_list",attrs:{"scroll-y":"true","lower-threshold":"30","refresher-enabled":"true","refresher-triggered":t.triggered,"scroll-top":t.scrollTop},on:{scroll:function(e){arguments[0]=e=t.$handleEvent(e),t.pageScroll.apply(void 0,arguments)},scrolltolower:function(e){arguments[0]=e=t.$handleEvent(e),t.scrolltolower.apply(void 0,arguments)},refresherrefresh:function(e){arguments[0]=e=t.$handleEvent(e),t.refresherrefresh.apply(void 0,arguments)}}},[t.tabs[0].isActive?i("v-uni-view",{class:t.isListStyle?"first_tab_list":"first_tab_img"},t._l(t.historyList,(function(e){return i("v-uni-view",{key:e.id,staticClass:"goods_item_box"},[i("u-card",{staticClass:"card",attrs:{margin:"10rpx",padding:"20","show-foot":!1,"show-head":!1}},[i("v-uni-navigator",{staticClass:"goods_item",attrs:{slot:"body",url:"../goods_detail/index?id="+e.goodsId},slot:"body"},[i("v-uni-view",{staticClass:"goods_img_wrap"},[i("v-uni-image",{attrs:{src:e.pic?e.pic:"https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg"}})],1),i("v-uni-view",{staticClass:"goods_info_wrap"},[i("v-uni-view",{staticClass:"goods_name"},[t._v(t._s(e.goodsName))]),i("v-uni-view",{staticClass:"goods_num"},[t._v("日期: "+t._s(e.dateVisit))])],1)],1)],1)],1)})),1):t.tabs[1].isActive?i("v-uni-view",[t._v("店铺收藏")]):t._e(),t.totalPages>1?i("u-loadmore",{attrs:{status:t.loadMore,"margin-bottom":"25"}}):t._e()],1):i("v-uni-view",{staticClass:"cart_empty"},[i("u-empty",{attrs:{text:"暂时没有数据",mode:"history"}})],1),i("v-uni-view",{directives:[{name:"show",rawName:"v-show",value:t.isBackTop,expression:"isBackTop"}],staticClass:"BackTop",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleBackTop.apply(void 0,arguments)}}},[i("u-icon",{attrs:{name:"arrow-upward"}})],1)],1)],1)},a=[]},bdb0:function(t,e,i){"use strict";i.r(e);var o=i("3921"),r=i("1e2c");for(var a in r)"default"!==a&&function(t){i.d(e,t,(function(){return r[t]}))}(a);i("2391");var n,s=i("f0c5"),l=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"27d61a1e",null,!1,o["a"],n);e["default"]=l.exports},bdb7:function(t,e,i){var o=i("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-empty[data-v-27d61a1e]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\nflex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:100%}.u-image[data-v-27d61a1e]{margin-bottom:%?20?%}.u-slot-wrap[data-v-27d61a1e]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?20?%}',""]),t.exports=e},c4a4:function(t,e,i){"use strict";i.r(e);var o=i("33ae"),r=i.n(o);for(var a in o)"default"!==a&&function(t){i.d(e,t,(function(){return o[t]}))}(a);e["default"]=r.a},f92e:function(t,e,i){"use strict";var o=i("54dd"),r=i.n(o);r.a}}]);