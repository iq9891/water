(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["switch"],{"01e9":function(e,t,n){},"07ea":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.Switch))]),e._m(0),n("h2",[e._v("何时使用")]),e._m(1),n("h2",[e._v("代码演示")]),n("WRow",{attrs:{gutter:16}},[n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.base.code,title:e.base.title,desc:e.base.desc}}),n("OnlineReview",{attrs:{temCode:e.disabled.code,title:e.disabled.title,desc:e.disabled.desc}}),n("OnlineReview",{attrs:{temCode:e.size.code,title:e.size.title,desc:e.size.desc}})],1),n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.loading.code,title:e.loading.title,desc:e.loading.desc}}),n("OnlineReview",{attrs:{temCode:e.icon.code,title:e.icon.title,desc:e.icon.desc}}),n("OnlineReview",{attrs:{temCode:e.before.code,jsCode:e.before.js,title:e.before.title,desc:e.before.desc}})],1)],1),n("h2",[e._v("Switch API")]),n("ApiTable",{attrs:{data:e.props}}),n("h2",[e._v("Switch Method")]),n("MethodTable",{attrs:{data:e.methods}}),n("h2",[e._v("change 函数返回的参数")]),n("ChangeTable",{attrs:{data:e.changeProps}})],1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("开关选择器。 "),n("code",[e._v("0.4.0")]),e._v(" 新增。")])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ul",[n("li",[e._v("需要表示开关状态/两种状态之间的切换时；")]),n("li",[e._v("\n      和 "),n("code",[e._v("checkbox")]),e._v(" 的区别是，\n      切换 "),n("code",[e._v("switch")]),e._v(" 会直接触发状态改变，\n      而 "),n("code",[e._v("checkbox")]),e._v(" 一般用于状态标记，需要和提交操作配合。\n    ")])])}],r=n("d225"),s=n("308d"),i=n("6bb5"),c=n("4e2b"),d=n("9ab4"),l=n("60a3"),u=n("7712"),f=n("42a5"),p=n("4612"),h=n("fdbe"),m=n("3104"),b=n("60b5"),v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.attr,n=e.content;return"<w-switch".concat(t?" ".concat(t):"").concat(n?"":" /",">").concat(n?"".concat(n,"</w-switch>"):"")},g={title:"基本使用",desc:"默认图标，只有一款。",code:v()},y=g,_={title:"加载状态",desc:"设置 <code>loading</code> 属性即可",code:v({attr:"loading"})},j=_,C={title:"禁用状态",desc:"设置 <code>disabled</code> 属性即可",code:v({attr:"disabled"})},w=C,O=n("421e"),x={title:"自定义内容",desc:"设置 <code>slot</code> 属性即可",code:v({content:'\n  <span slot="open">开</span>\n  <img slot="close" src="'.concat(O["b"],'" alt="').concat(O["a"],'" style="width: 16px; display: block; position: absolute; top: 50%; transform: translateY(-50%); right: 5px" />\n')})},k=x,S={title:"两种大小",desc:"设置 <code>size</code> 属性即可",code:'<w-switch></w-switch>\n<br />\n<w-switch size="small"></w-switch>'},E=S,T={title:"加载状态",desc:"设置 <code>before</code> 属性即可",code:v({attr:':loading="swtichLoading" v-model="swtichStatus" :before="beforeFn"'}),js:"{\n  data() {\n    return {\n      swtichStatus: false,\n      swtichLoading: false,\n    };\n  },\n  methods: {\n    beforeFn() {\n      this.swtichLoading = true;\n      return new Promise((resolve) => {\n        setTimeout(() => {\n          this.swtichLoading = false;\n          if (window.confirm('你确定选择吗？')) {\n            resolve();\n          }\n        }, 1000);\n      });\n    }\n  },\n}"},$=T,R=[{param:"loading",desc:"加载模式",type:"Boolean",require:"否",default:"无"},{param:"disabled",desc:"禁用模式",type:"Boolean",require:"否",default:"无"},{param:"stop",desc:"点击事件是否冒泡",type:"Boolean",require:"否",default:"无"},{param:"size",desc:"设置大小，可选值为 <code>small</code> 或者不设",type:"String",require:"否",default:"无"},{param:"before",desc:"改变之前触发，返回 Promise 对象",type:"Function",require:"否",default:"function() {return new Promise((resolve, reject) => {resolve();});}"},{param:"change",desc:"改变触发，返回 {Event对象,当前状态}({ev,status})",type:"Function",require:"否",default:"() => {}"}],W=[{name:"change",desc:"改变触发",return:"{Event对象,当前状态}({ev,status})"}],A=[{desc:"Event对象",type:"Event",key:"ev"},{desc:"当前状态",type:"Boolean",key:"status"}],z=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(s["a"])(this,Object(i["a"])(t).apply(this,arguments)),e.Switch=O["c"].Switch,e.base=y,e.loading=j,e.disabled=w,e.icon=k,e.size=E,e.before=$,e.props=R,e.changeProps=A,e.methods=W,e}return Object(c["a"])(t,e),t}(l["g"]);z=d["a"]([Object(l["a"])({components:{WRow:h["a"],WCol:m["a"],ApiTable:u["a"],ChangeTable:f["a"],MethodTable:p["a"],OnlineReview:b["a"]}})],z);var L=z,M=L,B=n("2877"),H=Object(B["a"])(M,a,o,!1,null,null,null);t["default"]=H.exports},"42a5":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th",[e._v("参数")]),n("th",[e._v("说明")]),n("th",[e._v("类型")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-box"},[n("table",[e._m(0),n("tbody",e._l(e.data,function(t,a){return n("tr",{key:a},[n("td",[e._v(e._s(t.key))]),n("td",{domProps:{innerHTML:e._s(t.desc)}}),n("td",[e._v(e._s(t.type))])])}),0)])])}],r=n("d225"),s=n("308d"),i=n("6bb5"),c=n("4e2b"),d=n("9ab4"),l=n("60a3"),u=function(e){function t(){return Object(r["a"])(this,t),Object(s["a"])(this,Object(i["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),t}(l["g"]);d["a"]([Object(l["e"])()],u.prototype,"data",void 0),u=d["a"]([l["a"]],u);var f=u,p=f,h=n("2877"),m=Object(h["a"])(p,a,o,!1,null,null,null);t["a"]=m.exports},4612:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c;return e._m(1)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th",[e._v("名称")]),n("th",[e._v("说明")]),n("th",[e._v("返回值")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-box"},[n("table",[e._m(0),n("tbody",e._l(e.data,function(t,a){return n("tr",{key:a},[n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.desc))]),n("td",[e._v(e._s(t.return))])])}),0)])])}],r=n("d225"),s=n("308d"),i=n("6bb5"),c=n("4e2b"),d=n("9ab4"),l=n("60a3"),u=function(e){function t(){return Object(r["a"])(this,t),Object(s["a"])(this,Object(i["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),t}(l["g"]);d["a"]([Object(l["e"])()],u.prototype,"data",void 0),u=d["a"]([l["a"]],u);var f=u,p=f,h=n("2877"),m=Object(h["a"])(p,a,o,!1,null,null,null);t["a"]=m.exports},"60b5":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{ref:"box",staticClass:"demo-box"},[n("section",{ref:"meta",staticClass:"demo-meta"},[n("a",{staticClass:"demo-title"},[e._v(e._s(e.title))]),n("p",{staticClass:"demo-desc",domProps:{innerHTML:e._s(e.desc)}}),n("div",{staticClass:"demo-actions-panel"},[n("WAffix",{attrs:{disabled:!e.expendStatus||e.isUsed,offsetTop:0},on:{change:e.affixChange}},[n("div",{staticClass:"demo-actions",class:e.expendStatus?"demo-actions-on":""},[n("WLink",{staticClass:"demo-actions-btn",nativeOn:{click:function(t){return e.handleExpendStatus(t)}}},[e._v(e._s(e.expendStatus?"收起":"展开")+"代码")]),e.expendStatus&&!e.jsCode?n("WLink",{staticClass:"demo-actions-run",nativeOn:{click:function(t){return e.updateIframe(t)}}},[e._v("运行")]):e._e()],1)])],1)]),n("section",{staticClass:"demo-core",style:{height:e.expendStatus?"auto":"0"}},[e.jsCode?n("nav",{staticClass:"demo-nav"},[n("a",{staticClass:"demo-nav-btn",class:"html"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("html")}}},[e._v("Html")]),n("a",{staticClass:"demo-nav-btn",class:"js"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("js")}}},[e._v("JavaScript")]),n("a",{staticClass:"demo-nav-run",attrs:{href:"javascript:;"},on:{click:e.updateIframe}},[e._v("运行")])]):e._e(),e.jsCode?n("WCode",{staticClass:"demo-core-inner",style:"js"===e.codeStatus?"":"height: 0;overflow: hidden;",attrs:{lang:"js"},on:{mounted:e.jsMounted},model:{value:e.jsCode,callback:function(t){e.jsCode=t},expression:"jsCode"}}):e._e(),n("WCode",{staticClass:"demo-core-inner",style:"html"===e.codeStatus?"":"height: 0;overflow: hidden;",on:{mounted:e.temMounted},model:{value:e.temCode,callback:function(t){e.temCode=t},expression:"temCode"}})],1)])},o=[],r=n("d225"),s=n("b0b4"),i=n("308d"),c=n("6bb5"),d=n("4e2b"),l=n("9ab4"),u=n("60a3"),f=function(){var e,t=this,n=t.$createElement,a=t._self._c||n;return a("div",[a("codemirror",{class:(e={},e["code-mirror"]=t.border,e["code-auto"]=t.height,e),attrs:{options:t.cmOptions},on:{ready:t.onCmReady,cursorActivity:t.onCmCursorActivity},model:{value:t.codeValue,callback:function(e){t.codeValue=e},expression:"codeValue"}})],1)},p=[],h=(n("693d"),n("1fdb"),n("4498"),n("8d7e"),function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(i["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.codemirror=null,e.codeValue="",e}return Object(d["a"])(t,e),Object(s["a"])(t,[{key:"created",value:function(){this.codeValue=this.code}},{key:"onCmReady",value:function(e){return this.codemirror=e,e}},{key:"onCmCursorActivity",value:function(e){return this.codemirror=e,e}},{key:"getLang",get:function(){var e=this.lang;switch(e){case"js":e="javascript";break;default:e="x-vue";break}return e}},{key:"cmOptions",get:function(){return{styleActiveLine:!0,lineNumbers:!0,autoCloseTags:!0,autoCloseBrackets:!0,line:!0,tabSize:2,mode:"text/".concat(this.getLang),theme:"xq-light",gutters:["CodeMirror-lint-markers"],lint:!0,showToken:/\w/,annotateScrollbar:!0,matchTags:{bothTags:!0},scrollbarStyle:"simple"}}}]),t}(u["g"]));l["a"]([Object(u["d"])("model",{type:String})],h.prototype,"code",void 0),l["a"]([Object(u["e"])({type:String,default:"vue"})],h.prototype,"lang",void 0),l["a"]([Object(u["e"])({type:Boolean})],h.prototype,"border",void 0),l["a"]([Object(u["e"])({type:Boolean,default:!0})],h.prototype,"height",void 0),l["a"]([Object(u["b"])("mounted")],h.prototype,"onCmReady",null),l["a"]([Object(u["b"])("change")],h.prototype,"onCmCursorActivity",null),h=l["a"]([u["a"]],h);var m=h,b=m,v=(n("b537"),n("2877")),g=Object(v["a"])(b,f,p,!1,null,null,null),y=g.exports,_=n("d4c7"),j=n("fb9f"),C=n("99ef"),w=function(e,t){return'<!DOCTYPE html>\n<html lang="zh">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <script src="https://unpkg.com/vue@2.6.10/dist/vue.js"><\/script>\n  <script src="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.umd.js"><\/script>\n  <link href="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.css" rel="stylesheet">\n</head>\n<body style="margin: 36px 24px;">\n  <div id="app">\n    '.concat(e,"\n  </div>\n  <script>\n    Vue.use(water.default);\n    new Vue(").concat(t,").$mount('#app');\n  <\/script>\n  <style>\n  .demo-grid-first { margin-top: 24px !important; }\n  .demo-grid-second { margin-top: 16px !important; }\n  .demo-grid-row {\n    margin-bottom: 8px;\n    background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 0, transparent 8.33333333%, #f5f5f5 0, #f5f5f5 12.5%, transparent 0, transparent 16.66666667%, #f5f5f5 0, #f5f5f5 20.83333333%, transparent 0, transparent 25%, #f5f5f5 0, #f5f5f5 29.16666667%, transparent 0, transparent 33.33333333%, #f5f5f5 0, #f5f5f5 37.5%, transparent 0, transparent 41.66666667%, #f5f5f5 0, #f5f5f5 45.83333333%, transparent 0, transparent 50%, #f5f5f5 0, #f5f5f5 54.16666667%, transparent 0, transparent 58.33333333%, #f5f5f5 0, #f5f5f5 62.5%, transparent 0, transparent 66.66666667%, #f5f5f5 0, #f5f5f5 70.83333333%, transparent 0, transparent 75%, #f5f5f5 0, #f5f5f5 79.16666667%, transparent 0, transparent 83.33333333%, #f5f5f5 0, #f5f5f5 87.5%, transparent 0, transparent 91.66666667%, #f5f5f5 0, #f5f5f5 95.83333333%, transparent 0);\n  }\n  .demo-grid-col {\n    color: #333;\n  }\n  .demo-grid-col:nth-of-type(odd) {\n    color: #fff;\n    background: rgba(25, 150, 249, 0.5);\n  }\n  .demo-grid-text {\n    padding: 30px 0;\n    text-align: center;\n    font-size: 30px;\n    line-height: 1;\n  }\n  .demo-grid-box {\n    background: rgba(25, 150, 249, 0.8);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  .demo-grid-box2 {\n    background: rgba(25, 150, 249, 0.4);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  \n  </style>\n</body>\n</html>")},O=function(e){function t(){var e;return Object(r["a"])(this,t),e=Object(i["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.expendStatus=!1,e.temCodemirror=null,e.jsCodemirror=null,e.iframe=null,e.codeStatus="html",e.isUsed=!1,e}return Object(d["a"])(t,e),Object(s["a"])(t,[{key:"mounted",value:function(){this.iframe=this.$refs.iframe,this.updateIframe()}},{key:"changeHandle",value:function(e){return e}},{key:"temMounted",value:function(e){this.temCodemirror=e}},{key:"jsMounted",value:function(e){this.jsCodemirror=e}},{key:"updateIframe",value:function(){var e=this.temCodemirror.getValue(),t=this.jsCode?this.jsCodemirror.getValue():"";if(this.renderIframe(),this.iframe){var n=this.iframe.contentDocument||this.iframe.contentWindow.document;n.open(),n.write(w(e,t)),n.close()}}},{key:"renderIframe",value:function(){var e=this.$refs.box,t=e.firstChild;"IFRAME"===t.nodeName&&e.removeChild(t);var n=document.createElement("iframe");e.insertBefore(n,e.firstChild),n.style.height=this.iframeHeight||"",this.iframe=n}},{key:"changeCodeStatus",value:function(e){this.codeStatus=e,this.testAffixUsed()}},{key:"handleExpendStatus",value:function(){this.expendStatus=!this.expendStatus,this.testAffixUsed()}},{key:"testAffixUsed",value:function(){var e=this;this.$nextTick(function(){var t=e.$refs.box.getBoundingClientRect();e.isUsed=t.y+t.height-window.innerHeight<0})}},{key:"affixChange",value:function(){var e=this.$refs.box.getBoundingClientRect();this.isUsed=e.y<40-e.height}}]),t}(u["g"]);l["a"]([Object(u["e"])(Function)],O.prototype,"render",void 0),l["a"]([Object(u["e"])(Function)],O.prototype,"before",void 0),l["a"]([Object(u["e"])(String)],O.prototype,"temCode",void 0),l["a"]([Object(u["e"])(String)],O.prototype,"jsCode",void 0),l["a"]([Object(u["e"])(String)],O.prototype,"title",void 0),l["a"]([Object(u["e"])(String)],O.prototype,"desc",void 0),l["a"]([Object(u["e"])(String)],O.prototype,"iframeHeight",void 0),l["a"]([Object(u["e"])(Object)],O.prototype,"data",void 0),l["a"]([Object(u["b"])("changeHandle")],O.prototype,"changeHandle",null),O=l["a"]([Object(u["a"])({components:{WCode:y,WLink:_["a"],WRender:C["a"],WAffix:j["a"]}})],O);var x=O,k=x,S=(n("f6ed"),Object(v["a"])(k,a,o,!1,null,null,null));t["a"]=S.exports},b537:function(e,t,n){"use strict";var a=n("01e9"),o=n.n(a);o.a},c814:function(e,t,n){},f6ed:function(e,t,n){"use strict";var a=n("c814"),o=n.n(a);o.a}}]);