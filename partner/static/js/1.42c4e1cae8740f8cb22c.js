webpackJsonp([1],{MpTN:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=new(s("7+uW").default),i={data:function(){return{collapse:!0,fullscreen:!1,name:"linxin",message:2}},computed:{username:function(){var t=localStorage.getItem("ms_username");return t||this.name}},methods:{handleCommand:function(t){"loginout"==t&&(localStorage.removeItem("ms_username"),localStorage.removeItem("token"),localStorage.removeItem("category_index"),this.$router.push("/login"))},collapseChage:function(){this.collapse=!this.collapse,n.$emit("collapse",this.collapse)},handleFullScreen:function(){var t=document.documentElement;this.fullscreen?document.exitFullscreen?document.exitFullscreen():document.webkitCancelFullScreen?document.webkitCancelFullScreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullScreen?t.webkitRequestFullScreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen(),this.fullscreen=!this.fullscreen}},mounted:function(){document.body.clientWidth<1500&&this.collapseChage()}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"header"},[s("div",{staticClass:"collapse-btn",on:{click:t.collapseChage}},[s("i",{staticClass:"el-icon-menu"})]),t._v(" "),s("div",{staticClass:"logo"},[t._v("后台管理系统")]),t._v(" "),s("div",{staticClass:"header-right"},[s("div",{staticClass:"header-user-con"},[s("div",{staticClass:"btn-fullscreen",on:{click:t.handleFullScreen}},[s("el-tooltip",{attrs:{effect:"dark",content:t.fullscreen?"取消全屏":"全屏",placement:"bottom"}},[s("i",{staticClass:"el-icon-rank"})])],1),t._v(" "),s("el-dropdown",{staticClass:"user-name",attrs:{trigger:"click"},on:{command:t.handleCommand}},[s("span",{staticClass:"el-dropdown-link"},[t._v("\n                    "+t._s(t.username)+" "),s("i",{staticClass:"el-icon-caret-bottom"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"loginout"}},[t._v("退出登录")])],1)],1)],1)])])},staticRenderFns:[]};var a={data:function(){return{collapse:!1,items:[{icon:"el-icon-news",index:"finance",title:"设置分类"},{icon:"el-icon-news",index:"edit",title:"我的二级分销"},{icon:"el-icon-news",index:"editFinance",title:"个人设置"}]}},computed:{onRoutes:function(){return this.$route.path.replace("/","")}},created:function(){var t=this;n.$on("collapse",function(e){t.collapse=e})}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar"},[s("el-menu",{staticClass:"sidebar-el-menu",attrs:{"default-active":t.onRoutes,collapse:t.collapse,"background-color":"#324157","text-color":"#bfcbd9","active-text-color":"#20a0ff","unique-opened":"",router:""}},[t._l(t.items,function(e){return[e.subs?[s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])]),t._v(" "),t._l(e.subs,function(e){return[e.subs?s("el-submenu",{key:e.index,attrs:{index:e.index}},[s("template",{slot:"title"},[t._v(t._s(e.title))]),t._v(" "),t._l(e.subs,function(e,n){return s("el-menu-item",{key:n,attrs:{index:e.index}},[t._v("\n                                "+t._s(e.title)+"\n                            ")])})],2):s("el-menu-item",{key:e.index,attrs:{index:e.index}},[t._v("\n                            "+t._s(e.title)+"\n                        ")])]})],2)]:[s("el-menu-item",{key:e.index,attrs:{index:e.index}},[s("i",{class:e.icon}),s("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.title))])])]]})],2)],1)},staticRenderFns:[]};var c={data:function(){return{tagsList:[]}},methods:{isActive:function(t){return t===this.$route.fullPath},closeTags:function(t){var e=this.tagsList.splice(t,1)[0],s=this.tagsList[t]?this.tagsList[t]:this.tagsList[t-1];s?e.path===this.$route.fullPath&&this.$router.push(s.path):this.$router.push("/finance")},closeAll:function(){this.tagsList=[],this.$router.push("/finance")},closeOther:function(){var t=this,e=this.tagsList.filter(function(e){return e.path===t.$route.fullPath});this.tagsList=e},setTags:function(t){this.tagsList.some(function(e){return e.path===t.fullPath})||(this.tagsList.length>=8&&this.tagsList.shift(),this.tagsList.push({title:t.meta.title,path:t.fullPath,name:t.matched[1].components.default.name})),n.$emit("tags",this.tagsList)},handleTags:function(t){"other"===t?this.closeOther():this.closeAll()}},computed:{showTags:function(){return this.tagsList.length>0}},watch:{$route:function(t,e){this.setTags(t)}},created:function(){this.setTags(this.$route)}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.showTags?s("div",{staticClass:"tags"},[s("ul",t._l(t.tagsList,function(e,n){return s("li",{key:n,staticClass:"tags-li",class:{active:t.isActive(e.path)}},[s("router-link",{staticClass:"tags-li-title",attrs:{to:e.path}},[t._v("\n                "+t._s(e.title)+"\n            ")]),t._v(" "),s("span",{staticClass:"tags-li-icon",on:{click:function(e){t.closeTags(n)}}},[s("i",{staticClass:"el-icon-close"})])],1)}),0),t._v(" "),s("div",{staticClass:"tags-close-box"},[s("el-dropdown",{on:{command:t.handleTags}},[s("el-button",{attrs:{size:"mini",type:"primary"}},[t._v("\n                标签选项"),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown",size:"small"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:"other"}},[t._v("关闭其他")]),t._v(" "),s("el-dropdown-item",{attrs:{command:"all"}},[t._v("关闭所有")])],1)],1)],1)]):t._e()},staticRenderFns:[]};var u={data:function(){return{tagsList:[],collapse:!1}},components:{vHead:s("VU/8")(i,l,!1,function(t){s("ecCE")},"data-v-08c74acc",null).exports,vSidebar:s("VU/8")(a,o,!1,function(t){s("jEPs")},"data-v-88b04b74",null).exports,vTags:s("VU/8")(c,r,!1,function(t){s("iDp+")},null,null).exports},created:function(){var t=this;n.$on("collapse",function(e){t.collapse=e}),n.$on("tags",function(e){for(var s=[],n=0,i=e.length;n<i;n++)e[n].name&&s.push(e[n].name);t.tagsList=s})}},d={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"wrapper"},[e("v-head"),this._v(" "),e("v-sidebar"),this._v(" "),e("div",{staticClass:"content-box",class:{"content-collapse":this.collapse}},[e("v-tags"),this._v(" "),e("div",{staticClass:"content"},[e("transition",{attrs:{name:"move",mode:"out-in"}},[e("keep-alive",{attrs:{include:this.tagsList}},[e("router-view")],1)],1)],1)],1)],1)},staticRenderFns:[]},m=s("VU/8")(u,d,!1,null,null,null);e.default=m.exports},ecCE:function(t,e){},"iDp+":function(t,e){},jEPs:function(t,e){}});