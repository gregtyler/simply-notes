if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,n)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const o={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return o;default:return e(r)}}))).then((e=>{const r=n(...e);return i.default||(i.default=r),i}))})))}}define("./sw.js",["./workbox-0e1ca5c2"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"bundle.js",revision:"83499fea25da326c164cf3f1a2e23e9e"},{url:"images/favicon-144.png",revision:"a94cc198fa17063f19c2531d637d3c94"},{url:"images/favicon-192.png",revision:"3a5042cfa5130a7c6a9fa2327345d6cf"},{url:"images/favicon-512.png",revision:"49296eb0979b69af4f27d3d91338ded1"},{url:"images/favicon.png",revision:"89dbe22760fd5b40d92d4f173e559a77"},{url:"index.html",revision:"c9246f6a5bc909d56cb878d20819bf3d"},{url:"manifest.webmanifest",revision:"e3d0576011d06b3cb0d15000f05fee3b"},{url:"offline.html",revision:"3146563b9010e05789b0cb33800113b5"}],{})}));
//# sourceMappingURL=sw.js.map
