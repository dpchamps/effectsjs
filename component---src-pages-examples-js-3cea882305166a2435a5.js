(this.webpackJsonp=this.webpackJsonp||[]).push([[5],{231:function(e,t,a){"use strict";a.r(t);a(21);var n=a(232),l=a(85),r=a(2),s=a.n(r),c=a(88),i=a(69),m=a(86),p=(a(154),a(233));t.default=function(){var e=n.data.examples.edges,t=Object(p.toExamples)(e);return s.a.createElement(c.a,null,s.a.createElement(m.a,{title:"Examples"}),s.a.createElement("h2",{className:"node"},"Examples"),s.a.createElement("p",{className:"node"},"Want to see effects in action? Want to edit and tinker with them in real-time? You're in luck. Check out these rad examples:"),s.a.createElement("div",{className:"node"},s.a.createElement("table",null,s.a.createElement("tbody",null,t.map((function(e,t){var a=e.basename,n=e.name;return s.a.createElement("tr",{key:t},s.a.createElement("td",null,t+1),s.a.createElement("td",null,s.a.createElement(l.a,{to:"/examples/"+Object(p.withoutJsSuffix)(Object(p.withoutExampleSuffix)(a))},n)))}))))),s.a.createElement("div",{className:"node funsies",children:s.a.createElement(i.a,null)}))}},232:function(e){e.exports=JSON.parse('{"data":{"examples":{"edges":[{"node":{"relativePath":"pages/examples/complex-hello-world.js.example"}},{"node":{"relativePath":"pages/examples/concurrent-async-identity.js.example"}},{"node":{"relativePath":"pages/examples/get-http-resource.js.example"}},{"node":{"relativePath":"pages/examples/get-integer.js.example"}}]}}}')},233:function(e,t,a){a(17),a(10);var n=function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))},l=function(e){return e.replace(/\.example$/,"")},r=function(e){return e.replace(/\.js$/,"")};e.exports={upper:n,toExamples:function(e){return e.map((function(e){var t=e.node.relativePath.split("/"),a=t[t.length-1],s=r(l(a.split("-").map(n).join(" ")));return{basename:a,name:s}}))},withoutExampleSuffix:l,withoutJsSuffix:r}}}]);
//# sourceMappingURL=component---src-pages-examples-js-3cea882305166a2435a5.js.map