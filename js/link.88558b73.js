(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["link"],{7830:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v(e._s(e.Link))]),n("p",[e._v("全站通用的超级链接。")]),n("h2",[e._v("何时使用")]),n("p",[e._v("用于跳转其他地方。")]),n("h2",[e._v("代码演示")]),n("WRow",{attrs:{gutter:16}},[n("WCol",{attrs:{span:12}},[n("OnlineReview",{attrs:{temCode:e.base.code,render:e.base.render,title:e.base.title,desc:e.base.desc}}),n("OnlineReview",{attrs:{temCode:e.href.code,render:e.href.render,title:e.href.title,desc:e.href.desc}}),n("OnlineReview",{attrs:{temCode:e.icon.code,render:e.icon.render,title:e.icon.title,desc:e.icon.desc}}),n("OnlineReview",{attrs:{temCode:e.size.code,render:e.size.render,title:e.size.title,desc:e.size.desc}})],1),n("WCol",{attrs:{span:12}},[n("WDemo",{attrs:{code:e.to.code,render:e.to.render,title:e.to.title,desc:e.to.desc}}),n("OnlineReview",{attrs:{temCode:e.target.code,render:e.target.render,title:e.target.title,desc:e.target.desc}}),n("OnlineReview",{attrs:{temCode:e.loading.code,render:e.loading.render,title:e.loading.title,desc:e.loading.desc}}),n("OnlineReview",{attrs:{temCode:e.disabled.code,render:e.disabled.render,title:e.disabled.title,desc:e.disabled.desc}})],1)],1),n("h2",[e._v("Link API")]),n("ApiTable",{attrs:{data:e.props}})],1)},o=[],d=n("9ab4"),c=n("60a3"),a=n("7712"),i=n("fdbe"),s=n("3104"),l=n("1980"),u=n("60b5"),p=n("be94"),b=n("d4c7");const f=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.attr,n=e.content;return`<w-link${t?` ${t}`:""}>${n}</w-link>`},g=(e,t)=>e("section",{class:t.noLayout?"":"demo-demo"},[e("div",{class:t.demoClassName},[e(b["a"],{props:Object(p["a"])({},t.props)},[t.render?t.render(e):t.defaultText])])]),v={title:"基本使用",desc:"基本使用。",code:f({content:"这个超链没有链接"}),render:e=>g(e,{defaultText:"这个超链没有链接"})};var h=v;const m={title:"站内跳转",desc:"设置 <code>to</code> 属性即可。",code:f({attr:":to=\"{ name: 'Icon' }\"",content:"去 Icon 图片 的站内跳转"}),render:e=>g(e,{defaultText:"去 Icon 图片 的站内跳转",props:{to:{name:"Icon"}}})};var w=m;const O={title:"当前页面站外跳转",desc:"设置 <code>href</code> 属性即可。这个跳转类型是当前页面跳转。",code:f({attr:'href="https://www.evente.cn"',content:"去 活动易 官网站外跳转"})};var y=O;const k={title:"新标签页跳转",desc:"设置 <code>target</code> 属性即可。",code:f({attr:'href="https://www.evente.cn" target="_blank"',content:"去 活动易 官网新标签页打开"})};var $=k,C=n("421e");const j={title:"超链图标",desc:"将属性 <code>slot</code> 设置为 <code>icon</code> ,进行图标的定制。",code:`${f({content:`\n  <img slot="icon" src="${C["b"]}" alt="${C["a"]}" />\n  这没有链接带图标的超链\n`})}`};var R=j;const _={title:"加载中状态",desc:"设置 <code>loading</code> 属性即可。",code:f({attr:"loading",content:"加载中的超链"})};var z=_,q=n("8972");const W=["","large","16","18"],S={title:"超链尺寸",desc:"超链分两种尺寸。通过属性 <code>size</code> 进行设置，可选值有 <code>large</code> <code>16</code> <code>18</code> 。",code:W.reduce((e,t,n)=>`${e}<w-link${t?` size="${t}"`:""}>\n  <img slot="icon" src="${C["b"]}" alt="${C["a"]}" />这是个超链 ${Object(q["upperFirst"])(t)||"Default"}\n</w-link>${n<W.length-1?"\n<br />\n":""}`,"")};var x=S;const I={title:"禁用状态",desc:"设置 <code>disabled</code> 属性即可。",code:f({attr:"disabled",content:"禁用的超链"})};var L=I;const P=[{param:"tag",desc:"link 实际渲染的标签",type:"String",require:"否",default:"a"},{param:"href",desc:"点击跳转的外链地址",type:"String",require:"否",default:"无"},{param:"to",desc:"站内跳转的地址",type:"Object",require:"否",default:"无"},{param:"target",desc:"外链跳转的方式",type:"String",require:"否",default:"无"},{param:"size",desc:"设置超链大小，可选值为 <code>small</code> <code>large</code> 或者不设",type:"String",require:"否",default:"无"},{param:"loading",desc:"设置超链载入状态",type:"Boolean",require:"否",default:"false"},{param:"disabled",desc:"按钮失效状态",type:"Boolean",require:"否",default:"false"}];let T=class extends c["g"]{constructor(){super(...arguments),this.Link=C["c"].Link,this.base=h,this.to=w,this.href=y,this.target=$,this.icon=R,this.loading=z,this.size=x,this.disabled=L,this.props=P}};T=d["a"]([Object(c["a"])({components:{ApiTable:a["a"],WRow:i["a"],WCol:s["a"],WDemo:l["a"],OnlineReview:u["a"]}})],T);var D=T,A=D,B=n("2877"),E=Object(B["a"])(A,r,o,!1,null,null,null);t["default"]=E.exports},be94:function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){r(e,t,n[t])})}return e}n.d(t,"a",function(){return o})}}]);