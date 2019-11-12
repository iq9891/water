(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["link"],{"268f":function(e,t,n){e.exports=n("fde4")},7830:function(e,t,n){"use strict";n.r(t);var c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.Link))]),n("p",[e._v("全站通用的超级链接。")]),n("h2",[e._v("何时使用")]),n("p",[e._v("用于跳转其他地方。")]),n("h2",[e._v("代码演示")]),n("WRow",{attrs:{gutter:16}},[n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.base.code,render:e.base.render,title:e.base.title,desc:e.base.desc}}),n("OnlineReview",{attrs:{temCode:e.href.code,render:e.href.render,title:e.href.title,desc:e.href.desc}}),n("OnlineReview",{attrs:{temCode:e.icon.code,render:e.icon.render,title:e.icon.title,desc:e.icon.desc}}),n("OnlineReview",{attrs:{temCode:e.size.code,render:e.size.render,title:e.size.title,desc:e.size.desc}})],1),n("WCol",{attrs:{span:12}},[n("WDemo",{attrs:{code:e.to.code,render:e.to.render,title:e.to.title,desc:e.to.desc}}),n("OnlineReview",{attrs:{temCode:e.target.code,render:e.target.render,title:e.target.title,desc:e.target.desc}}),n("OnlineReview",{attrs:{temCode:e.loading.code,render:e.loading.render,title:e.loading.title,desc:e.loading.desc}}),n("OnlineReview",{attrs:{temCode:e.disabled.code,render:e.disabled.render,title:e.disabled.title,desc:e.disabled.desc}})],1)],1),n("h2",[e._v("Link API")]),n("ApiTable",{attrs:{data:e.props}})],1)},r=[],o=n("d225"),d=n("308d"),a=n("6bb5"),i=n("4e2b"),s=n("9ab4"),l=n("60a3"),u=n("7712"),f=n("fdbe"),p=n("3104"),b=n("1980"),g=n("60b5"),m=n("cebc"),v=n("d4c7"),w=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.attr,n=e.content;return"<w-link".concat(t?" ".concat(t):"",">").concat(n,"</w-link>")},h=function(e,t){return e("section",{class:t.noLayout?"":"demo-demo"},[e("div",{class:t.demoClassName},[e(v["a"],{props:Object(m["a"])({},t.props)},[t.render?t.render(e):t.defaultText])])])},O={title:"基本使用",desc:"基本使用。",code:w({content:"这个超链没有链接"}),render:function(e){return h(e,{defaultText:"这个超链没有链接"})}},y=O,k={title:"站内跳转",desc:"设置 <code>to</code> 属性即可。",code:w({attr:":to=\"{ name: 'Icon' }\"",content:"去 Icon 图片 的站内跳转"}),render:function(e){return h(e,{defaultText:"去 Icon 图片 的站内跳转",props:{to:{name:"Icon"}}})}},j=k,C={title:"当前页面站外跳转",desc:"设置 <code>href</code> 属性即可。这个跳转类型是当前页面跳转。",code:w({attr:'href="https://www.evente.cn"',content:"去 活动易 官网站外跳转"})},R=C,_={title:"新标签页跳转",desc:"设置 <code>target</code> 属性即可。",code:w({attr:'href="https://www.evente.cn" target="_blank"',content:"去 活动易 官网新标签页打开"})},x=_,z=n("421e"),q={title:"超链图标",desc:"将属性 <code>slot</code> 设置为 <code>icon</code> ,进行图标的定制。",code:"".concat(w({content:'\n  <img slot="icon" src="'.concat(z["b"],'" alt="').concat(z["a"],'" />\n  这没有链接带图标的超链\n')}))},W=q,D={title:"加载中状态",desc:"设置 <code>loading</code> 属性即可。",code:w({attr:"loading",content:"加载中的超链"})},I=D,L=n("8972"),S=["","large","16","18"],T={title:"超链尺寸",desc:"超链分两种尺寸。通过属性 <code>size</code> 进行设置，可选值有 <code>large</code> <code>16</code> <code>18</code> 。",code:S.reduce(function(e,t,n){return"".concat(e,"<w-link").concat(t?' size="'.concat(t,'"'):"",'>\n  <img slot="icon" src="').concat(z["b"],'" alt="').concat(z["a"],'" />这是个超链 ').concat(Object(L["upperFirst"])(t)||"Default","\n</w-link>").concat(n<S.length-1?"\n<br />\n":"")},"")},P=T,A={title:"禁用状态",desc:"设置 <code>disabled</code> 属性即可。",code:w({attr:"disabled",content:"禁用的超链"})},B=A,E=[{param:"tag",desc:"link 实际渲染的标签",type:"String",require:"否",default:"a"},{param:"href",desc:"点击跳转的外链地址",type:"String",require:"否",default:"无"},{param:"to",desc:"站内跳转的地址",type:"Object",require:"否",default:"无"},{param:"target",desc:"外链跳转的方式",type:"String",require:"否",default:"无"},{param:"size",desc:"设置超链大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"},{param:"loading",desc:"设置超链载入状态",type:"Boolean",require:"否",default:"false"},{param:"disabled",desc:"按钮失效状态",type:"Boolean",require:"否",default:"false"}],J=function(e){function t(){var e;return Object(o["a"])(this,t),e=Object(d["a"])(this,Object(a["a"])(t).apply(this,arguments)),e.Link=z["c"].Link,e.base=y,e.to=j,e.href=R,e.target=x,e.icon=W,e.loading=I,e.size=P,e.disabled=B,e.props=E,e}return Object(i["a"])(t,e),t}(l["g"]);J=s["a"]([Object(l["a"])({components:{ApiTable:u["a"],WRow:f["a"],WCol:p["a"],WDemo:b["a"],OnlineReview:g["a"]}})],J);var F=J,N=F,$=n("2877"),G=Object($["a"])(N,c,r,!1,null,null,null);t["default"]=G.exports},bf90:function(e,t,n){var c=n("36c3"),r=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(e,t){return r(c(e),t)}})},cebc:function(e,t,n){"use strict";n.d(t,"a",function(){return l});var c=n("268f"),r=n.n(c),o=n("e265"),d=n.n(o),a=n("a4bb"),i=n.n(a),s=n("bd86");function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},c=i()(n);"function"===typeof d.a&&(c=c.concat(d()(n).filter(function(e){return r()(n,e).enumerable}))),c.forEach(function(t){Object(s["a"])(e,t,n[t])})}return e}},e265:function(e,t,n){e.exports=n("ed33")},ed33:function(e,t,n){n("014b"),e.exports=n("584a").Object.getOwnPropertySymbols},fde4:function(e,t,n){n("bf90");var c=n("584a").Object;e.exports=function(e,t){return c.getOwnPropertyDescriptor(e,t)}}}]);