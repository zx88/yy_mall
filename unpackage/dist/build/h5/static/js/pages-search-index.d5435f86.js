(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-search-index"],{"05ac":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.search_row[data-v-5260fb57]{padding:0 %?30?%}.search_history .history_title[data-v-5260fb57]{font-size:%?36?%;font-weight:700;padding:%?20?% %?20?% 0 %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.search_history .history_list[data-v-5260fb57]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?10?%}.search_history .history_list uni-text[data-v-5260fb57]{border:%?1?% #b4b5b6 solid;padding:%?10?% %?20?%;background:#fff;border-radius:%?20?%;margin:%?10?%}.hot_search .hot_title[data-v-5260fb57]{font-size:%?36?%;font-weight:700;padding:%?20?% %?20?% 0 %?20?%;display:-webkit-box;display:-webkit-flex;display:flex}.hot_search .hot_list[data-v-5260fb57]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;padding:%?10?%}.hot_search .hot_list uni-text[data-v-5260fb57]{border:%?1?% #b4b5b6 solid;margin:%?10?%;padding:%?10?% %?20?%;background:#fff;border-radius:%?20?%}.search_content[data-v-5260fb57]{padding:%?20?%}.search_content .search_item[data-v-5260fb57]{background-color:#fff;font-size:%?28?%;padding:%?20?%;border-bottom:%?1?% solid #ccc;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',""]),t.exports=e},"37cd":function(t,e,n){"use strict";var i=n("c427"),r=n.n(i);r.a},"3b84":function(t,e,n){"use strict";n.r(e);var i=n("5ac5"),r=n("67d0");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("ff6b");var o,s=n("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"13f672b9",null,!1,i["a"],o);e["default"]=c.exports},"5ac5":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uIcon:n("09fc").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-search",style:{margin:t.margin},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickHandler.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"u-content",style:{backgroundColor:t.bgColor,borderRadius:"round"==t.shape?"100rpx":"10rpx",border:t.borderStyle,height:t.height+"rpx"}},[n("v-uni-view",{staticClass:"u-icon-wrap"},[n("u-icon",{staticClass:"u-clear-icon",attrs:{size:30,name:t.searchIcon,color:t.searchIconColor?t.searchIconColor:t.color}})],1),n("v-uni-input",{staticClass:"u-input",style:[{textAlign:t.inputAlign,color:t.color,backgroundColor:t.bgColor},t.inputStyle],attrs:{"confirm-type":"search",value:t.value,disabled:t.disabled,focus:t.focus,maxlength:t.maxlength,"placeholder-class":"u-placeholder-class",placeholder:t.placeholder,"placeholder-style":"color: "+t.placeholderColor,type:"text"},on:{blur:function(e){arguments[0]=e=t.$handleEvent(e),t.blur.apply(void 0,arguments)},confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.search.apply(void 0,arguments)},input:function(e){arguments[0]=e=t.$handleEvent(e),t.inputChange.apply(void 0,arguments)},focus:function(e){arguments[0]=e=t.$handleEvent(e),t.getFocus.apply(void 0,arguments)}}}),t.keyword&&t.clearabled&&t.focused?n("v-uni-view",{staticClass:"u-close-wrap",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clear.apply(void 0,arguments)}}},[n("u-icon",{staticClass:"u-clear-icon",attrs:{name:"close-circle-fill",size:"34",color:"#c0c4cc"}})],1):t._e()],1),n("v-uni-view",{staticClass:"u-action",class:[t.showActionBtn||t.show?"u-action-active":""],style:[t.actionStyle],on:{click:function(e){e.stopPropagation(),e.preventDefault(),arguments[0]=e=t.$handleEvent(e),t.custom.apply(void 0,arguments)}}},[t._v(t._s(t.actionText))])],1)},a=[]},6062:function(t,e,n){"use strict";var i=n("6d61"),r=n("6566");t.exports=i("Set",(function(t){return function(){return t(this,arguments.length?arguments[0]:void 0)}}),r)},6566:function(t,e,n){"use strict";var i=n("9bf2").f,r=n("7c73"),a=n("e2cc"),o=n("0366"),s=n("19aa"),c=n("2266"),l=n("7dd0"),u=n("2626"),d=n("83ab"),f=n("f183").fastKey,h=n("69f3"),p=h.set,v=h.getterFor;t.exports={getConstructor:function(t,e,n,l){var u=t((function(t,i){s(t,u,e),p(t,{type:e,index:r(null),first:void 0,last:void 0,size:0}),d||(t.size=0),void 0!=i&&c(i,t[l],t,n)})),h=v(e),b=function(t,e,n){var i,r,a=h(t),o=w(t,e);return o?o.value=n:(a.last=o={index:r=f(e,!0),key:e,value:n,previous:i=a.last,next:void 0,removed:!1},a.first||(a.first=o),i&&(i.next=o),d?a.size++:t.size++,"F"!==r&&(a.index[r]=o)),t},w=function(t,e){var n,i=h(t),r=f(e);if("F"!==r)return i.index[r];for(n=i.first;n;n=n.next)if(n.key==e)return n};return a(u.prototype,{clear:function(){var t=this,e=h(t),n=e.index,i=e.first;while(i)i.removed=!0,i.previous&&(i.previous=i.previous.next=void 0),delete n[i.index],i=i.next;e.first=e.last=void 0,d?e.size=0:t.size=0},delete:function(t){var e=this,n=h(e),i=w(e,t);if(i){var r=i.next,a=i.previous;delete n.index[i.index],i.removed=!0,a&&(a.next=r),r&&(r.previous=a),n.first==i&&(n.first=r),n.last==i&&(n.last=a),d?n.size--:e.size--}return!!i},forEach:function(t){var e,n=h(this),i=o(t,arguments.length>1?arguments[1]:void 0,3);while(e=e?e.next:n.first){i(e.value,e.key,this);while(e&&e.removed)e=e.previous}},has:function(t){return!!w(this,t)}}),a(u.prototype,n?{get:function(t){var e=w(this,t);return e&&e.value},set:function(t,e){return b(this,0===t?0:t,e)}}:{add:function(t){return b(this,t=0===t?0:t,t)}}),d&&i(u.prototype,"size",{get:function(){return h(this).size}}),u},setStrong:function(t,e,n){var i=e+" Iterator",r=v(e),a=v(i);l(t,e,(function(t,e){p(this,{type:i,target:t,state:r(t),kind:e,last:void 0})}),(function(){var t=a(this),e=t.kind,n=t.last;while(n&&n.removed)n=n.previous;return t.target&&(t.last=n=n?n.next:t.state.first)?"keys"==e?{value:n.key,done:!1}:"values"==e?{value:n.value,done:!1}:{value:[n.key,n.value],done:!1}:(t.target=void 0,{value:void 0,done:!0})}),n?"entries":"values",!n,!0),u(e)}}},"67d0":function(t,e,n){"use strict";n.r(e);var i=n("eb13"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},8392:function(t,e,n){"use strict";n.r(e);var i=n("fbed"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},"84fc":function(t,e,n){"use strict";n.r(e);var i=n("e205"),r=n("8392");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("37cd");var o,s=n("f0c5"),c=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"5260fb57",null,!1,i["a"],o);e["default"]=c.exports},"9f0a":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* uni.scss */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-search[data-v-13f672b9]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-content[data-v-13f672b9]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?18?%;-webkit-box-flex:1;-webkit-flex:1;flex:1}.u-clear-icon[data-v-13f672b9]{\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center}.u-input[data-v-13f672b9]{-webkit-box-flex:1;-webkit-flex:1;flex:1;font-size:%?28?%;line-height:1;margin:0 %?10?%;color:#909399}.u-close-wrap[data-v-13f672b9]{width:%?40?%;height:100%;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;border-radius:50%}.u-placeholder-class[data-v-13f672b9]{color:#909399}.u-action[data-v-13f672b9]{font-size:%?28?%;color:#303133;width:0;overflow:hidden;-webkit-transition:all .3s;transition:all .3s;white-space:nowrap;text-align:center}.u-action-active[data-v-13f672b9]{width:%?80?%;margin-left:%?10?%}',""]),t.exports=e},a397:function(t,e,n){var i=n("9f0a");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("2217c29f",i,!0,{sourceMap:!1,shadowMode:!1})},c427:function(t,e,n){var i=n("05ac");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("405a6f41",i,!0,{sourceMap:!1,shadowMode:!1})},e205:function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uSearch:n("3b84").default,uIcon:n("09fc").default,uModal:n("d7a6").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"search_row"},[n("u-search",{attrs:{placeholder:"请输入搜索关键字"},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.handleChange.apply(void 0,arguments)},custom:function(e){arguments[0]=e=t.$handleEvent(e),t.handleInput.apply(void 0,arguments)}},model:{value:t.inpValue,callback:function(e){t.inpValue=e},expression:"inpValue"}})],1),!t.searchList.length&&t.historyList.length?n("v-uni-view",{staticClass:"search_history"},[n("v-uni-view",{staticClass:"history_title"},[n("u-icon",{attrs:{name:"clock",label:"最近搜索"}}),n("u-icon",{attrs:{name:"trash"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.isDelHistory=!0}}})],1),n("v-uni-view",{staticClass:"history_list"},t._l(t.historyList,(function(e,i){return n("v-uni-text",{key:i,on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handleHistoryBtn(e)}}},[t._v(t._s(e))])})),1)],1):t._e(),t.searchList.length?t._e():n("v-uni-view",{staticClass:"hot_search"},[n("v-uni-view",{staticClass:"hot_title"},[n("u-icon",{attrs:{name:"heart",label:"热门搜索"}})],1),n("v-uni-view",{staticClass:"hot_list"},t._l(8,(function(e,i){return n("v-uni-text",{key:i},[t._v("龙泉宝剑")])})),1)],1),n("v-uni-view",{staticClass:"search_content"},t._l(t.searchList,(function(e){return n("v-uni-navigator",{key:e.goods_id,staticClass:"search_item",attrs:{url:""}},[t._v(t._s(e.goods_name))])})),1),n("u-modal",{attrs:{"show-cancel-button":!0,content:"确认删除历史搜索记录?"},on:{confirm:function(e){arguments[0]=e=t.$handleEvent(e),t.handleDeleteHistory.apply(void 0,arguments)}},model:{value:t.isDelHistory,callback:function(e){t.isDelHistory=e},expression:"isDelHistory"}})],1)},a=[]},eb13:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-search",props:{shape:{type:String,default:"round"},bgColor:{type:String,default:"#f2f2f2"},placeholder:{type:String,default:"请输入关键字"},clearabled:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},showAction:{type:Boolean,default:!0},actionStyle:{type:Object,default:function(){return{}}},actionText:{type:String,default:"搜索"},inputAlign:{type:String,default:"left"},disabled:{type:Boolean,default:!1},animation:{type:Boolean,default:!1},borderColor:{type:String,default:"none"},value:{type:String,default:""},height:{type:[Number,String],default:64},inputStyle:{type:Object,default:function(){return{}}},maxlength:{type:[Number,String],default:"-1"},searchIconColor:{type:String,default:""},color:{type:String,default:"#606266"},placeholderColor:{type:String,default:"#909399"},margin:{type:String,default:"0"},searchIcon:{type:String,default:"search"}},data:function(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword:function(t){this.$emit("input",t),this.$emit("change",t)},value:{immediate:!0,handler:function(t){this.keyword=t}}},computed:{showActionBtn:function(){return!(this.animation||!this.showAction)},borderStyle:function(){return this.borderColor?"1px solid ".concat(this.borderColor):"none"}},methods:{inputChange:function(t){this.keyword=t.detail.value},clear:function(){var t=this;this.keyword="",this.$nextTick((function(){t.$emit("clear")}))},search:function(t){this.$emit("search",t.detail.value);try{uni.hideKeyboard()}catch(t){}},custom:function(){this.$emit("custom",this.keyword);try{uni.hideKeyboard()}catch(t){}},getFocus:function(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur:function(){var t=this;setTimeout((function(){t.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler:function(){this.disabled&&this.$emit("click")}}};e.default=i},fbed:function(t,e,n){"use strict";var i=n("4ea4");n("fb6a"),n("d3b7"),n("6062"),n("3ca3"),n("498a"),n("ddb0"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("2909"));n("96cf");var a=i(n("1da1")),o={data:function(){return{searchList:[],historyList:[],inpValue:"",isDelHistory:!1}},onLoad:function(){this.historyList=uni.getStorageSync("searchHistory")},methods:{handleChange:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=t,i.trim()){n.next=4;break}return e.searchList=[],n.abrupt("return");case 4:case"end":return n.stop()}}),n)})))()},handleInput:function(t){var e=t;if(!e.trim())return uni.showToast({icon:"none",title:"请先输入关键字"});var n=(0,r.default)(this.historyList);n.unshift(e),uni.setStorage({key:"searchHistory",data:(0,r.default)(new Set(n))}),this.historyList=uni.getStorageSync("searchHistory").slice(0,20),this.getsearchList(e)},handleDeleteHistory:function(){uni.setStorage({key:"searchHistory",data:[]}),this.historyList=[]},handleHistoryBtn:function(t){this.inpValue=t,this.getsearchList(t)},getsearchList:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$requests({url:"/goods/qsearch",data:{query:t}});case 2:if(i=n.sent,200===i.meta.status&&0!==i.message.length){n.next=5;break}return n.abrupt("return",uni.showToast({icon:"none",title:"没有搜索到数据!"}));case 5:e.searchList=i.message;case 6:case"end":return n.stop()}}),n)})))()}}};e.default=o},ff6b:function(t,e,n){"use strict";var i=n("a397"),r=n.n(i);r.a}}]);