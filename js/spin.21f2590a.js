(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["spin"],{"01e9":function(e,t,n){},"160c":function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.Spin))]),e._m(0),n("h2",[e._v("何时使用")]),n("p",[e._v("页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。")]),n("h2",[e._v("代码演示")]),n("WRow",{attrs:{gutter:16}},[n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.base.code,title:e.base.title,desc:e.base.desc}}),n("OnlineReview",{attrs:{temCode:e.color.code,title:e.color.title,desc:e.color.desc}}),n("OnlineReview",{attrs:{temCode:e.basesize.code,title:e.basesize.title,desc:e.basesize.desc}})],1),n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.region.code,jsCode:e.region.js,title:e.region.title,desc:e.region.desc}}),n("OnlineReview",{attrs:{temCode:e.regionsize.code,jsCode:e.regionsize.js,title:e.regionsize.title,desc:e.regionsize.desc}}),n("OnlineReview",{attrs:{temCode:e.tip.code,title:e.tip.title,desc:e.tip.desc}})],1)],1),n("h2",[e._v("Spin API")]),n("ApiTable",{attrs:{data:e.props}})],1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",[e._v("用于页面和区块的加载中状态。 "),n("code",[e._v("0.5.0")]),e._v(" 新增。")])}],a=n("9ab4"),o=n("60a3"),r=n("7712"),d=n("4612"),c=n("fdbe"),l=n("3104"),p=n("60b5");const f={title:"基本使用",desc:"一个简单的 <code>loading</code> 状态。",code:"<w-spin />"};var u=f;const m={title:"icon 版的三种大小",desc:"设置 <code>size</code> 即可。",code:'<w-spin size="small"></w-spin>\n<w-spin></w-spin>\n<w-spin size="large"></w-spin>'};var h=m;const v={title:"定义颜色",desc:"设置 <code>color</code> 即可。",code:'<w-spin color="#1996f9" />'};var g=v;const b={title:"自定义描述文案",desc:"设置 <code>tip</code> 即可。",code:'<w-spin tip="正在加载">\n  <div>\n    <h1>这只是一个标题</h1>\n    <p>这只是一段文案。</p>\n  </div>\n</w-spin>'};var C=b;const w={title:"区域加载",desc:"可以直接把内容内嵌到 <code>Spin</code> 中，将现有容器变为加载状态。",code:'<w-switch v-model="spinStatus"></w-switch>\n<w-spin v-model="spinStatus">\n  <div>\n    <h1>这只是一个标题</h1>\n    <p>这只是一段文案。</p>\n  </div>\n</w-spin>',js:"{\n  data() {\n    return {\n      spinStatus: true,\n    };\n  },\n}"};var x=w;const j={title:"区域大小",desc:"设置 <code>size</code> 即可。",code:'<w-spin size="small" tip="拼命的跑啊跑">\n  <div>\n    <h1>这只是一个标题</h1>\n    <p>这只是一段文案。</p>\n  </div>\n</w-spin>\n<w-spin tip="拼命的跑啊跑">\n  <div>\n    <h1>这只是一个标题</h1>\n    <p>这只是一段文案。</p>\n  </div>\n</w-spin>\n<w-spin size="large" tip="拼命的跑啊跑">\n  <div>\n    <h1>这只是一个标题</h1>\n    <p>这只是一段文案。</p>\n  </div>\n</w-spin>'};var y=j;const _=[{param:"tip",desc:"当作为包裹元素时，可以自定义描述文案。",type:"String",require:"否",default:"无"},{param:"color",desc:"自定义 icon 的颜色，只有在默认 icon 的时候有效。",type:"String",require:"否",default:"#333"},{param:"size",desc:"设置大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"}];var S=n("421e");let O=class extends o["g"]{constructor(){super(...arguments),this.Spin=S["c"].Spin,this.base=u,this.basesize=h,this.color=g,this.tip=C,this.region=x,this.regionsize=y,this.props=_}};O=a["a"]([Object(o["a"])({components:{WRow:c["a"],WCol:l["a"],ApiTable:r["a"],MethodTable:d["a"],OnlineReview:p["a"]}})],O);var k=O,z=k,R=n("2877"),$=Object(R["a"])(z,s,i,!1,null,null,null);t["default"]=$.exports},4612:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c;return e._m(1)},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("thead",[n("tr",[n("th",[e._v("名称")]),n("th",[e._v("说明")]),n("th",[e._v("返回值")])])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-box"},[n("table",[e._m(0),n("tbody",e._l(e.data,function(t,s){return n("tr",{key:s},[n("td",[e._v(e._s(t.name))]),n("td",[e._v(e._s(t.desc))]),n("td",[e._v(e._s(t.return))])])}),0)])])}],a=n("9ab4"),o=n("60a3");let r=class extends o["g"]{};a["a"]([Object(o["e"])()],r.prototype,"data",void 0),r=a["a"]([o["a"]],r);var d=r,c=d,l=n("2877"),p=Object(l["a"])(c,s,i,!1,null,null,null);t["a"]=p.exports},"60b5":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{ref:"box",staticClass:"demo-box"},[n("section",{ref:"meta",staticClass:"demo-meta"},[n("a",{staticClass:"demo-title"},[e._v(e._s(e.title))]),n("p",{staticClass:"demo-desc",domProps:{innerHTML:e._s(e.desc)}}),n("div",{staticClass:"demo-actions-panel"},[n("WAffix",{attrs:{disabled:!e.expendStatus||e.isUsed,offsetTop:0},on:{change:e.affixChange}},[n("div",{staticClass:"demo-actions",class:e.expendStatus?"demo-actions-on":""},[n("WLink",{staticClass:"demo-actions-btn",nativeOn:{click:function(t){return e.handleExpendStatus(t)}}},[e._v(e._s(e.expendStatus?"收起":"展开")+"代码")]),e.expendStatus&&!e.jsCode?n("WLink",{staticClass:"demo-actions-run",nativeOn:{click:function(t){return e.updateIframe(t)}}},[e._v("运行")]):e._e()],1)])],1)]),n("section",{staticClass:"demo-core",style:{height:e.expendStatus?"auto":"0"}},[e.jsCode?n("nav",{staticClass:"demo-nav"},[n("a",{staticClass:"demo-nav-btn",class:"html"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("html")}}},[e._v("Html")]),n("a",{staticClass:"demo-nav-btn",class:"js"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("js")}}},[e._v("JavaScript")]),n("a",{staticClass:"demo-nav-run",attrs:{href:"javascript:;"},on:{click:e.updateIframe}},[e._v("运行")])]):e._e(),e.jsCode?n("WCode",{staticClass:"demo-core-inner",style:"js"===e.codeStatus?"":"height: 0;overflow: hidden;",attrs:{lang:"js"},on:{mounted:e.jsMounted},model:{value:e.jsCode,callback:function(t){e.jsCode=t},expression:"jsCode"}}):e._e(),n("WCode",{staticClass:"demo-core-inner",style:"html"===e.codeStatus?"":"height: 0;overflow: hidden;",on:{mounted:e.temMounted},model:{value:e.temCode,callback:function(t){e.temCode=t},expression:"temCode"}})],1)])},i=[],a=n("9ab4"),o=n("60a3"),r=function(){var e,t=this,n=t.$createElement,s=t._self._c||n;return s("div",[s("codemirror",{class:(e={},e["code-mirror"]=t.border,e["code-auto"]=t.height,e),attrs:{options:t.cmOptions},on:{ready:t.onCmReady,cursorActivity:t.onCmCursorActivity},model:{value:t.codeValue,callback:function(e){t.codeValue=e},expression:"codeValue"}})],1)},d=[];n("693d"),n("1fdb"),n("4498"),n("8d7e");let c=class extends o["g"]{constructor(){super(...arguments),this.codemirror=null,this.codeValue=""}get getLang(){let e=this.lang;switch(e){case"js":e="javascript";break;default:e="x-vue";break}return e}get cmOptions(){return{styleActiveLine:!0,lineNumbers:!0,autoCloseTags:!0,autoCloseBrackets:!0,line:!0,tabSize:2,mode:`text/${this.getLang}`,theme:"xq-light",gutters:["CodeMirror-lint-markers"],lint:!0,showToken:/\w/,annotateScrollbar:!0,matchTags:{bothTags:!0},scrollbarStyle:"simple"}}created(){this.codeValue=this.code}onCmReady(e){return this.codemirror=e,e}onCmCursorActivity(e){return this.codemirror=e,e}};a["a"]([Object(o["d"])("model",{type:String})],c.prototype,"code",void 0),a["a"]([Object(o["e"])({type:String,default:"vue"})],c.prototype,"lang",void 0),a["a"]([Object(o["e"])({type:Boolean})],c.prototype,"border",void 0),a["a"]([Object(o["e"])({type:Boolean,default:!0})],c.prototype,"height",void 0),a["a"]([Object(o["b"])("mounted")],c.prototype,"onCmReady",null),a["a"]([Object(o["b"])("change")],c.prototype,"onCmCursorActivity",null),c=a["a"]([o["a"]],c);var l=c,p=l,f=(n("b537"),n("2877")),u=Object(f["a"])(p,r,d,!1,null,null,null),m=u.exports,h=n("d4c7"),v=n("fb9f"),g=n("99ef"),b=(e,t)=>`<!DOCTYPE html>\n<html lang="zh">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <script src="https://unpkg.com/vue@2.6.10/dist/vue.js"><\/script>\n  <script src="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.umd.js"><\/script>\n  <link href="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.css" rel="stylesheet">\n</head>\n<body style="margin: 36px 24px;">\n  <div id="app">\n    ${e}\n  </div>\n  <script>\n    Vue.use(water.default);\n    new Vue(${t}).$mount('#app');\n  <\/script>\n  <style>\n  .demo-grid-first { margin-top: 24px !important; }\n  .demo-grid-second { margin-top: 16px !important; }\n  .demo-grid-row {\n    margin-bottom: 8px;\n    background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 0, transparent 8.33333333%, #f5f5f5 0, #f5f5f5 12.5%, transparent 0, transparent 16.66666667%, #f5f5f5 0, #f5f5f5 20.83333333%, transparent 0, transparent 25%, #f5f5f5 0, #f5f5f5 29.16666667%, transparent 0, transparent 33.33333333%, #f5f5f5 0, #f5f5f5 37.5%, transparent 0, transparent 41.66666667%, #f5f5f5 0, #f5f5f5 45.83333333%, transparent 0, transparent 50%, #f5f5f5 0, #f5f5f5 54.16666667%, transparent 0, transparent 58.33333333%, #f5f5f5 0, #f5f5f5 62.5%, transparent 0, transparent 66.66666667%, #f5f5f5 0, #f5f5f5 70.83333333%, transparent 0, transparent 75%, #f5f5f5 0, #f5f5f5 79.16666667%, transparent 0, transparent 83.33333333%, #f5f5f5 0, #f5f5f5 87.5%, transparent 0, transparent 91.66666667%, #f5f5f5 0, #f5f5f5 95.83333333%, transparent 0);\n  }\n  .demo-grid-col {\n    color: #333;\n  }\n  .demo-grid-col:nth-of-type(odd) {\n    color: #fff;\n    background: rgba(25, 150, 249, 0.5);\n  }\n  .demo-grid-text {\n    padding: 30px 0;\n    text-align: center;\n    font-size: 30px;\n    line-height: 1;\n  }\n  .demo-grid-box {\n    background: rgba(25, 150, 249, 0.8);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  .demo-grid-box2 {\n    background: rgba(25, 150, 249, 0.4);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  \n  </style>\n</body>\n</html>`;let C=class extends o["g"]{constructor(){super(...arguments),this.expendStatus=!1,this.temCodemirror=null,this.jsCodemirror=null,this.iframe=null,this.codeStatus="html",this.isUsed=!1}mounted(){this.iframe=this.$refs.iframe,this.updateIframe()}changeHandle(e){return e}temMounted(e){this.temCodemirror=e}jsMounted(e){this.jsCodemirror=e}updateIframe(){const e=this.temCodemirror.getValue(),t=this.jsCode?this.jsCodemirror.getValue():"";if(this.renderIframe(),this.iframe){const n=this.iframe.contentDocument||this.iframe.contentWindow.document;n.open(),n.write(b(e,t)),n.close()}}renderIframe(){const e=this.$refs.box,t=e.firstChild;"IFRAME"===t.nodeName&&e.removeChild(t);const n=document.createElement("iframe");e.insertBefore(n,e.firstChild),n.style.height=this.iframeHeight||"",this.iframe=n}changeCodeStatus(e){this.codeStatus=e,this.testAffixUsed()}handleExpendStatus(){this.expendStatus=!this.expendStatus,this.testAffixUsed()}testAffixUsed(){this.$nextTick(()=>{const e=this.$refs.box.getBoundingClientRect();this.isUsed=e.y+e.height-window.innerHeight<0})}affixChange(){const e=this.$refs.box.getBoundingClientRect();this.isUsed=e.y<40-e.height}};a["a"]([Object(o["e"])(Function)],C.prototype,"render",void 0),a["a"]([Object(o["e"])(Function)],C.prototype,"before",void 0),a["a"]([Object(o["e"])(String)],C.prototype,"temCode",void 0),a["a"]([Object(o["e"])(String)],C.prototype,"jsCode",void 0),a["a"]([Object(o["e"])(String)],C.prototype,"title",void 0),a["a"]([Object(o["e"])(String)],C.prototype,"desc",void 0),a["a"]([Object(o["e"])(String)],C.prototype,"iframeHeight",void 0),a["a"]([Object(o["e"])(Object)],C.prototype,"data",void 0),a["a"]([Object(o["b"])("changeHandle")],C.prototype,"changeHandle",null),C=a["a"]([Object(o["a"])({components:{WCode:m,WLink:h["a"],WRender:g["a"],WAffix:v["a"]}})],C);var w=C,x=w,j=(n("f6ed"),Object(f["a"])(x,s,i,!1,null,null,null));t["a"]=j.exports},b537:function(e,t,n){"use strict";var s=n("01e9"),i=n.n(s);i.a},c814:function(e,t,n){},f6ed:function(e,t,n){"use strict";var s=n("c814"),i=n.n(s);i.a}}]);