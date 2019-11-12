(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["tag"],{"01e9":function(e,t,a){},"449b":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h1",[e._v(e._s(e.Tag))]),e._m(0),a("h2",[e._v("何时使用")]),e._m(1),a("h2",[e._v("代码演示")]),a("WRow",{attrs:{gutter:16}},[a("WCol",{attrs:{span:12}},[a("OnlineReview",{attrs:{temCode:e.base.code,title:e.base.title,desc:e.base.desc}}),a("OnlineReview",{attrs:{temCode:e.loading.code,title:e.loading.title,desc:e.loading.desc,iframeHeight:"200px"}}),a("OnlineReview",{attrs:{temCode:e.newtag.code,jsCode:e.newtag.js,title:e.newtag.title,desc:e.newtag.desc,iframeHeight:"200px"}})],1),a("WCol",{attrs:{span:12}},[a("OnlineReview",{attrs:{temCode:e.size.code,title:e.size.title,desc:e.size.desc,iframeHeight:"200px"}}),a("OnlineReview",{attrs:{temCode:e.color.code,jsCode:e.color.js,title:e.color.title,iframeHeight:"260px"}})],1)],1),a("h2",[e._v("Tag API")]),a("ApiTable",{attrs:{data:e.props}}),a("h2",[e._v("Tag Method")]),a("MethodTable",{attrs:{data:e.methods}}),a("h2",[e._v("CheckTag API")]),a("ApiTable",{attrs:{data:e.checkTagProps}}),a("h2",[e._v("NewTag API")]),a("ApiTable",{attrs:{data:e.newTagProps}}),a("h2",[e._v("NewTag Method")]),a("MethodTable",{attrs:{data:e.newTagMethods}})],1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("p",[e._v("进行标记和分类的小标签。 "),a("code",[e._v("0.12.0")]),e._v(" 新增。")])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ul",[a("li",[e._v("用于标记事物的属性和维度。")]),a("li",[e._v("进行分类。")])])}],r=a("9ab4"),s=a("60a3"),i=a("7712"),l=a("4612"),c=a("fdbe"),d=a("3104"),g=a("60b5");const f={title:"基本使用",desc:"最简单的用法。",code:'<w-tag>标签</w-tag><w-tag closable>标签</w-tag><w-tag disabled>标签</w-tag><w-tag closable disabled>标签</w-tag>\n<br />\n<br />\n<w-check-tag :value="true">标签</w-check-tag><w-check-tag disabled>标签</w-check-tag><w-check-tag :value="true" disabled>标签</w-check-tag>'};var u=f;const p={title:"三种大小",desc:"设置 <code>size</code> 属性即可",code:'<w-tag size="small">标签</w-tag>\n<w-tag>标签</w-tag>\n<w-tag size="large">标签</w-tag>\n<br />\n<br />\n<w-tag size="small" color="#f00">标签</w-tag>\n<w-tag color="#f00">标签</w-tag>\n<w-tag size="large" color="#f00">标签</w-tag>\n<br />\n<br />\n<w-tag size="small" color="#f00" color-type="section">标签</w-tag>\n<w-tag color="#f00" color-type="section">标签</w-tag>\n<w-tag size="large" color="#f00" color-type="section">标签</w-tag>'};var m=p;const h=[{color:"#eb2f96",loading:!1},{color:"#f5222d",loading:!1},{color:"#fa541c",loading:!1},{color:"#fa8c16",loading:!1}],b=[{color:"#eb2f96",loading:!1},{color:"#f5222d",loading:!1},{color:"#fa8c16",loading:!1},{color:"#faad14",loading:!1}],w={title:"多彩标签",desc:"添加 <code>color</code> 即可设置颜色，添加 <code>colorType</code> 即可设置渲染类型。",code:'<h4>All:</h4>\n<w-tag v-for="(sColor, sColorIndex) in sectionColors" closable :color="sColor.color" :key="sColorIndex" @close="close1(sColorIndex)">标签</w-tag>\n<h4>Section:</h4>\n<w-tag v-for="(aColor, aColorIndex) in allColors" closable color-type="section" :color="aColor.color" :key="`a${aColorIndex}`" @close="close2(aColorIndex)">标签</w-tag>',js:`{\n    data() {\n      return {\n        sectionColors: ${JSON.stringify(h)},\n        allColors: ${JSON.stringify(b)},\n      };\n    },\n    methods: {\n      close1(aIndex) {\n        const { color } = this.sectionColors[aIndex];\n        this.sectionColors.splice(aIndex, 1, {\n          color,\n          loading: true,\n        });\n        setTimeout(() => {\n          this.sectionColors.splice(aIndex, 1);\n        }, 1000);\n      },\n      close2(aIndex) {\n        const { color } = this.allColors[aIndex];\n        this.allColors.splice(aIndex, 1, {\n          color,\n          loading: true,\n        });\n        setTimeout(() => {\n          this.allColors.splice(aIndex, 1);\n        }, 1000);\n      },\n    },\n  }`};var v=w;const C={title:"加载中",desc:"设置 <code>loading</code> 属性即可",code:'<w-tag size="small" loading>标签</w-tag>\n<w-tag size="small" loading color="#1996f9">标签</w-tag>\n<w-tag size="small" loading color="#1996f9" color-type="section">标签</w-tag>\n<br />\n<br />\n<w-tag loading>标签</w-tag>\n<w-tag loading color="#1996f9">标签</w-tag>\n<w-tag loading color="#1996f9" color-type="section">标签</w-tag>\n<br />\n<br />\n<w-tag size="large" loading>标签</w-tag>\n<w-tag size="large" loading color="#1996f9">标签</w-tag>\n<w-tag size="large" loading color="#1996f9" color-type="section">标签</w-tag>'};var y=C;const x={title:"动态添加和删除",desc:"用数组生成一组标签，可以动态添加和删除。",code:'<w-tag size="small" color="#1996f9" v-for="(tagItem, tagIndex) in newTags" :closable="tagItem.closable" :key="`small${tagIndex}`">{{tagItem.value}}</w-tag>\n<w-new-tag size="small" placeholder="数字标签" :before="beforeFn" :error="errorFn" :loading="newtagLoading" @change="newTageChange">标签</w-new-tag>\n<br />\n<br />\n<w-tag color="#1996f9" v-for="(tagItem, tagIndex) in newTags" :closable="tagItem.closable" :key="tagIndex">{{tagItem.value}}</w-tag>\n<w-new-tag placeholder="数字标签" :before="beforeFn" :error="errorFn" :loading="newtagLoading" @change="newTageChange">标签</w-new-tag>\n<br />\n<br />\n<w-tag size="large" color="#1996f9" v-for="(tagItem, tagIndex) in newTags" :closable="tagItem.closable" :key="`large${tagIndex}`">{{tagItem.value}}</w-tag>\n<w-new-tag size="large" placeholder="数字标签" :before="beforeFn" :error="errorFn" :loading="newtagLoading" @change="newTageChange">标签</w-new-tag>',js:"{\n  data() {\n    return {\n      newtagLoading: false,\n      newTags: [\n        {\n          value: '不可删除',\n          closable: false,\n        },\n      ],\n    };\n  },\n  methods: {\n    newTageChange(params) {\n      this.newTags.push({\n        value: params.value,\n        loading: false,\n        closable: true,\n      });\n    },\n    errorFn(errParams) {\n      return !/^[0-9]+$/.test(errParams.value);\n    },\n    beforeFn() {\n      this.newtagLoading = true;\n  \n      return new Promise((resolve) => {\n        setTimeout(() => {\n          this.newtagLoading = false;\n          resolve();\n        }, 1000);\n      });\n    },\n  },\n}"};var _=x;const j=[{param:"disabled",desc:"失效状态",type:"Boolean",require:"否",default:"无"},{param:"loading",desc:"加载模式",type:"Boolean",require:"否",default:"无"},{param:"stop",desc:"点击事件是否冒泡",type:"Boolean",require:"否",default:"无"},{param:"inline",desc:"是否有 <code>inline-block</code> ，属性排长一行",type:"Boolean",require:"否",default:"true"},{param:"closable",desc:"标签是否可以关闭",type:"Boolean",require:"否",default:"无"},{param:"size",desc:"设置按钮大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"},{param:"color",desc:"标签色",type:"String",require:"否",default:"无"},{param:"colorType",desc:"标签颜色的渲染类型，可选值为 <code>all(全部)</code> <code>section(部分)</code>",type:"String",require:"否",default:"无"},{param:"close",desc:"关闭触发的方法，返回 {Event对象}({ev})",type:"Function",require:"否",default:"() => {}"}],k=[{name:"close",desc:"关闭触发的方法",return:"{Event对象}({ev})"}],T=[{param:"disabled",desc:"失效状态",type:"Boolean",require:"否",default:"无"},{param:"loading",desc:"加载模式",type:"Boolean",require:"否",default:"无"},{param:"inline",desc:"是否有 <code>inline-block</code> ，属性排长一行",type:"Boolean",require:"否",default:"true"},{param:"size",desc:"设置按钮大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"}],I=[{param:"disabled",desc:"失效状态",type:"Boolean",require:"否",default:"无"},{param:"loading",desc:"加载模式",type:"Boolean",require:"否",default:"无"},{param:"stop",desc:"点击事件是否冒泡",type:"Boolean",require:"否",default:"无"},{param:"size",desc:"设置按钮大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"},{param:"placeholder",desc:"创建标签的默认提示文案",type:"String",require:"否",default:"无"},{param:"error",desc:"输入框报错的方法，当返回为 true 的时候，输入框为错误状态。",type:"Function",require:"否",default:"() => false"},{param:"before",desc:"改变之前触发，返回 Promise 对象",type:"Function",require:"否",default:"function() {return new Promise((resolve, reject) => {resolve();});}"},{param:"change",desc:"改变触发，返回 {当前值}({ value })",type:"Function",require:"否",default:"() => {}"}],S=[{name:"change",desc:"改变触发",return:"{当前值}({ value })"}];var O=a("421e");let z=class extends s["g"]{constructor(){super(...arguments),this.Tag=O["c"].Tag,this.base=u,this.size=m,this.color=v,this.loading=y,this.newtag=_,this.props=j,this.methods=k,this.checkTagProps=T,this.newTagProps=I,this.newTagMethods=S}};z=r["a"]([Object(s["a"])({components:{WRow:c["a"],WCol:d["a"],ApiTable:i["a"],MethodTable:l["a"],OnlineReview:g["a"]}})],z);var $=z,q=$,A=a("2877"),B=Object(A["a"])(q,n,o,!1,null,null,null);t["default"]=B.exports},4612:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement;e._self._c;return e._m(1)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("名称")]),a("th",[e._v("说明")]),a("th",[e._v("返回值")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-box"},[a("table",[e._m(0),a("tbody",e._l(e.data,function(t,n){return a("tr",{key:n},[a("td",[e._v(e._s(t.name))]),a("td",[e._v(e._s(t.desc))]),a("td",[e._v(e._s(t.return))])])}),0)])])}],r=a("9ab4"),s=a("60a3");let i=class extends s["g"]{};r["a"]([Object(s["e"])()],i.prototype,"data",void 0),i=r["a"]([s["a"]],i);var l=i,c=l,d=a("2877"),g=Object(d["a"])(c,n,o,!1,null,null,null);t["a"]=g.exports},"60b5":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{ref:"box",staticClass:"demo-box"},[a("section",{ref:"meta",staticClass:"demo-meta"},[a("a",{staticClass:"demo-title"},[e._v(e._s(e.title))]),a("p",{staticClass:"demo-desc",domProps:{innerHTML:e._s(e.desc)}}),a("div",{staticClass:"demo-actions-panel"},[a("WAffix",{attrs:{disabled:!e.expendStatus||e.isUsed,offsetTop:0},on:{change:e.affixChange}},[a("div",{staticClass:"demo-actions",class:e.expendStatus?"demo-actions-on":""},[a("WLink",{staticClass:"demo-actions-btn",nativeOn:{click:function(t){return e.handleExpendStatus(t)}}},[e._v(e._s(e.expendStatus?"收起":"展开")+"代码")]),e.expendStatus&&!e.jsCode?a("WLink",{staticClass:"demo-actions-run",nativeOn:{click:function(t){return e.updateIframe(t)}}},[e._v("运行")]):e._e()],1)])],1)]),a("section",{staticClass:"demo-core",style:{height:e.expendStatus?"auto":"0"}},[e.jsCode?a("nav",{staticClass:"demo-nav"},[a("a",{staticClass:"demo-nav-btn",class:"html"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("html")}}},[e._v("Html")]),a("a",{staticClass:"demo-nav-btn",class:"js"===e.codeStatus?"demo-nav-btn-on":"",attrs:{href:"javascript:;"},on:{click:function(t){return e.changeCodeStatus("js")}}},[e._v("JavaScript")]),a("a",{staticClass:"demo-nav-run",attrs:{href:"javascript:;"},on:{click:e.updateIframe}},[e._v("运行")])]):e._e(),e.jsCode?a("WCode",{staticClass:"demo-core-inner",style:"js"===e.codeStatus?"":"height: 0;overflow: hidden;",attrs:{lang:"js"},on:{mounted:e.jsMounted},model:{value:e.jsCode,callback:function(t){e.jsCode=t},expression:"jsCode"}}):e._e(),a("WCode",{staticClass:"demo-core-inner",style:"html"===e.codeStatus?"":"height: 0;overflow: hidden;",on:{mounted:e.temMounted},model:{value:e.temCode,callback:function(t){e.temCode=t},expression:"temCode"}})],1)])},o=[],r=a("9ab4"),s=a("60a3"),i=function(){var e,t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("codemirror",{class:(e={},e["code-mirror"]=t.border,e["code-auto"]=t.height,e),attrs:{options:t.cmOptions},on:{ready:t.onCmReady,cursorActivity:t.onCmCursorActivity},model:{value:t.codeValue,callback:function(e){t.codeValue=e},expression:"codeValue"}})],1)},l=[];a("693d"),a("1fdb"),a("4498"),a("8d7e");let c=class extends s["g"]{constructor(){super(...arguments),this.codemirror=null,this.codeValue=""}get getLang(){let e=this.lang;switch(e){case"js":e="javascript";break;default:e="x-vue";break}return e}get cmOptions(){return{styleActiveLine:!0,lineNumbers:!0,autoCloseTags:!0,autoCloseBrackets:!0,line:!0,tabSize:2,mode:`text/${this.getLang}`,theme:"xq-light",gutters:["CodeMirror-lint-markers"],lint:!0,showToken:/\w/,annotateScrollbar:!0,matchTags:{bothTags:!0},scrollbarStyle:"simple"}}created(){this.codeValue=this.code}onCmReady(e){return this.codemirror=e,e}onCmCursorActivity(e){return this.codemirror=e,e}};r["a"]([Object(s["d"])("model",{type:String})],c.prototype,"code",void 0),r["a"]([Object(s["e"])({type:String,default:"vue"})],c.prototype,"lang",void 0),r["a"]([Object(s["e"])({type:Boolean})],c.prototype,"border",void 0),r["a"]([Object(s["e"])({type:Boolean,default:!0})],c.prototype,"height",void 0),r["a"]([Object(s["b"])("mounted")],c.prototype,"onCmReady",null),r["a"]([Object(s["b"])("change")],c.prototype,"onCmCursorActivity",null),c=r["a"]([s["a"]],c);var d=c,g=d,f=(a("b537"),a("2877")),u=Object(f["a"])(g,i,l,!1,null,null,null),p=u.exports,m=a("d4c7"),h=a("fb9f"),b=a("99ef"),w=(e,t)=>`<!DOCTYPE html>\n<html lang="zh">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <script src="https://unpkg.com/vue@2.6.10/dist/vue.js"><\/script>\n  <script src="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.umd.js"><\/script>\n  <link href="https://unpkg.com/@fe6/water@0.17.7/dist/lib/water.css" rel="stylesheet">\n</head>\n<body style="margin: 36px 24px;">\n  <div id="app">\n    ${e}\n  </div>\n  <script>\n    Vue.use(water.default);\n    new Vue(${t}).$mount('#app');\n  <\/script>\n  <style>\n  .demo-grid-first { margin-top: 24px !important; }\n  .demo-grid-second { margin-top: 16px !important; }\n  .demo-grid-row {\n    margin-bottom: 8px;\n    background-image: linear-gradient(90deg, #f5f5f5 4.16666667%, transparent 0, transparent 8.33333333%, #f5f5f5 0, #f5f5f5 12.5%, transparent 0, transparent 16.66666667%, #f5f5f5 0, #f5f5f5 20.83333333%, transparent 0, transparent 25%, #f5f5f5 0, #f5f5f5 29.16666667%, transparent 0, transparent 33.33333333%, #f5f5f5 0, #f5f5f5 37.5%, transparent 0, transparent 41.66666667%, #f5f5f5 0, #f5f5f5 45.83333333%, transparent 0, transparent 50%, #f5f5f5 0, #f5f5f5 54.16666667%, transparent 0, transparent 58.33333333%, #f5f5f5 0, #f5f5f5 62.5%, transparent 0, transparent 66.66666667%, #f5f5f5 0, #f5f5f5 70.83333333%, transparent 0, transparent 75%, #f5f5f5 0, #f5f5f5 79.16666667%, transparent 0, transparent 83.33333333%, #f5f5f5 0, #f5f5f5 87.5%, transparent 0, transparent 91.66666667%, #f5f5f5 0, #f5f5f5 95.83333333%, transparent 0);\n  }\n  .demo-grid-col {\n    color: #333;\n  }\n  .demo-grid-col:nth-of-type(odd) {\n    color: #fff;\n    background: rgba(25, 150, 249, 0.5);\n  }\n  .demo-grid-text {\n    padding: 30px 0;\n    text-align: center;\n    font-size: 30px;\n    line-height: 1;\n  }\n  .demo-grid-box {\n    background: rgba(25, 150, 249, 0.8);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  .demo-grid-box2 {\n    background: rgba(25, 150, 249, 0.4);\n    color: #fff;\n    font-size: 14px;\n    text-align: center;\n    padding: 5px 0;\n  }\n  \n  </style>\n</body>\n</html>`;let v=class extends s["g"]{constructor(){super(...arguments),this.expendStatus=!1,this.temCodemirror=null,this.jsCodemirror=null,this.iframe=null,this.codeStatus="html",this.isUsed=!1}mounted(){this.iframe=this.$refs.iframe,this.updateIframe()}changeHandle(e){return e}temMounted(e){this.temCodemirror=e}jsMounted(e){this.jsCodemirror=e}updateIframe(){const e=this.temCodemirror.getValue(),t=this.jsCode?this.jsCodemirror.getValue():"";if(this.renderIframe(),this.iframe){const a=this.iframe.contentDocument||this.iframe.contentWindow.document;a.open(),a.write(w(e,t)),a.close()}}renderIframe(){const e=this.$refs.box,t=e.firstChild;"IFRAME"===t.nodeName&&e.removeChild(t);const a=document.createElement("iframe");e.insertBefore(a,e.firstChild),a.style.height=this.iframeHeight||"",this.iframe=a}changeCodeStatus(e){this.codeStatus=e,this.testAffixUsed()}handleExpendStatus(){this.expendStatus=!this.expendStatus,this.testAffixUsed()}testAffixUsed(){this.$nextTick(()=>{const e=this.$refs.box.getBoundingClientRect();this.isUsed=e.y+e.height-window.innerHeight<0})}affixChange(){const e=this.$refs.box.getBoundingClientRect();this.isUsed=e.y<40-e.height}};r["a"]([Object(s["e"])(Function)],v.prototype,"render",void 0),r["a"]([Object(s["e"])(Function)],v.prototype,"before",void 0),r["a"]([Object(s["e"])(String)],v.prototype,"temCode",void 0),r["a"]([Object(s["e"])(String)],v.prototype,"jsCode",void 0),r["a"]([Object(s["e"])(String)],v.prototype,"title",void 0),r["a"]([Object(s["e"])(String)],v.prototype,"desc",void 0),r["a"]([Object(s["e"])(String)],v.prototype,"iframeHeight",void 0),r["a"]([Object(s["e"])(Object)],v.prototype,"data",void 0),r["a"]([Object(s["b"])("changeHandle")],v.prototype,"changeHandle",null),v=r["a"]([Object(s["a"])({components:{WCode:p,WLink:m["a"],WRender:b["a"],WAffix:h["a"]}})],v);var C=v,y=C,x=(a("f6ed"),Object(f["a"])(y,n,o,!1,null,null,null));t["a"]=x.exports},b537:function(e,t,a){"use strict";var n=a("01e9"),o=a.n(n);o.a},c814:function(e,t,a){},f6ed:function(e,t,a){"use strict";var n=a("c814"),o=a.n(n);o.a}}]);