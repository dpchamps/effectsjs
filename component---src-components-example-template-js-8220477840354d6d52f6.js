(this.webpackJsonp=this.webpackJsonp||[]).push([[3],{153:function(t,e,r){r(4),r(3),r(24),r(34),r(28),r(1),r(49),r(21),r(14),r(25),r(38),r(29);var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},o=n.iterator||"@@iterator",i=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,e,r,n){var o=e&&e.prototype instanceof s?e:s,i=Object.create(o.prototype),a=new x(n||[]);return i._invoke=function(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return L()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=w(a,r);if(c){if(c===l)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=u(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}t.wrap=c;var l={};function s(){}function h(){}function f(){}var d={};d[o]=function(){return this};var p=Object.getPrototypeOf,v=p&&p(p(_([])));v&&v!==e&&r.call(v,o)&&(d=v);var m=f.prototype=s.prototype=Object.create(d);function g(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function y(t){var e;this._invoke=function(n,o){function i(){return new Promise((function(e,i){!function e(n,o,i,a){var c=u(t[n],t,o);if("throw"!==c.type){var l=c.arg,s=l.value;return s&&"object"==typeof s&&r.call(s,"__await")?Promise.resolve(s.__await).then((function(t){e("next",t,i,a)}),(function(t){e("throw",t,i,a)})):Promise.resolve(s).then((function(t){l.value=t,i(l)}),(function(t){return e("throw",t,i,a)}))}a(c.arg)}(n,o,e,i)}))}return e=e?e.then(i,i):i()}}function w(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,w(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var n=u(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,l;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function b(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function _(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}return{next:L}}function L(){return{value:void 0,done:!0}}return h.prototype=m.constructor=f,f.constructor=h,f[a]=h.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},g(y.prototype),y.prototype[i]=function(){return this},t.AsyncIterator=y,t.async=function(e,r,n,o){var i=new y(c(e,r,n,o));return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},g(m),m[a]="Generator",m[o]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=_,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(b),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),b(r),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;b(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}},226:function(t,e,r){t.exports=r(153)},228:function(t,e,r){var n=r(229),o=["evaluate"];t.exports=function(){var t=new Worker(r.p+"built-editor.e803ca.worker.js",{name:"built-editor.[hash:6].worker.js"});return n(t,o),t}},229:function(t,e,r){r(28),r(1),r(14),r(12),t.exports=function(t,e){var r=0,n={};t.addEventListener("message",(function(e){var r=e.data;if("RPC"===r.type)if(r.id){var o=n[r.id];o&&(delete n[r.id],r.error?o[1](Object.assign(Error(r.error.message),r.error)):o[0](r.result))}else{var i=document.createEvent("Event");i.initEvent(r.method,!1,!1),i.data=r.params,t.dispatchEvent(i)}})),e.forEach((function(e){t[e]=function(){for(var o=[],i=arguments.length;i--;)o[i]=arguments[i];return new Promise((function(i,a){var c=++r;n[c]=[i,a],t.postMessage({type:"RPC",id:c,method:e,params:o})}))}}))}},257:function(t,e,r){"use strict";r.r(e);r(85);var n=r(2),o=r.n(n),i=r(88),a=r(69),c=r(86),u=(r(131),r(24),r(38),r(29),r(226)),l=r.n(u);r(28),r(4),r(3),r(1),r(84),r(153),r(12),r(227);function s(){return n.createElement("div",{id:"editor_downloading_status"},n.createElement(a.a,{animated:!0,spin:!0}),n.createElement("h3",null,"Downloading editor..."))}r(8),r(57),r(10),r(17);function h(){return"undefined"!=typeof window?window:null}function f(){var t=h();return t?(t.location.search||"").replace("?","").split("&").map((function(t){return t.split("=")})).reduce((function(t,e){var r;return Object.assign({},t,((r={})[e[0]]=e[1],r))}),{}):{}}var d=r(228);function p(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(l){return void r(l)}c.done?e(u):Promise.resolve(u).then(n,o)}function v(t){return function(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var m,g="object"==typeof window&&new(r.n(d).a),y=Promise.all([r.e(0),r.e(8)]).then(r.t.bind(null,258,7)),w=function(t){var e,n;function i(e){var r;(r=t.call(this,e)||this).handleWorkerMessage=function(t){var e=t.data,n=e.type,o=e.payload;switch(n){case"log":m||(m=document.getElementById("virtualConsole"));var i=r.state.i+1;r.state.logs.push(Object.assign({},o,{key:i})),51===r.state.logs.length&&r.state.logs.shift(),r.setState({logs:v(r.state.logs),i:i},(function(){return m.scrollTo(0,m.scrollHeight+100)}))}},r.evaluate=function(t){g.evaluate(t).catch((function(t){console.error("failed to evaluate user source code",t.message)}))},r.onChange=function(t){r.setState({src:t},(function(){r.state.isAutoEval&&g.evaluate(t)}))},r.toggleAutoEval=function(){r.setState({isAutoEval:!r.state.isAutoEval})},r.toggleFullscreen=function(){var t=!r.state.isFullScreen,e=f();t?e.fullscreen=1:delete e.fullscreen,function(t){if(h()){var e=Object.keys(t).filter((function(e){return t[e]})).map((function(e){return e+"="+t[e]})).join("&");window.history.replaceState(window.history.state,"","?"+e)}}(e),r.setState({isFullScreen:t})};var n=f().fullscreen;return r.state={i:0,isAutoEval:!0,isFullScreen:!!n||!1,logs:[],src:e.defaultSource},r}n=t,(e=i).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n;var a=i.prototype;return a.componentDidMount=function(){var t,e=(t=l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.then((function(t){return t.default}));case 2:return this.AceEditor=t.sent,t.next=5,Promise.all([Promise.all([r.e(0),r.e(9)]).then(r.t.bind(null,259,7)),Promise.all([r.e(0),r.e(10)]).then(r.t.bind(null,260,7))]);case 5:g.onmessage=this.handleWorkerMessage,this.onChange(""),this.props.defaultSource&&this.onChange(this.props.defaultSource);case 8:case"end":return t.stop()}}),t,this)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){p(i,n,o,a,c,"next",t)}function c(t){p(i,n,o,a,c,"throw",t)}a(void 0)}))});return function(){return e.apply(this,arguments)}}(),a.render=function(){var t=this,e=this.state,r=e.logs,n=e.isAutoEval,i=e.src,a=e.isFullScreen,c=this.AceEditor||s;return o.a.createElement("div",{id:"editor_container",className:a?"fullscreen":""},o.a.createElement("div",{id:"top_options",className:"node"},o.a.createElement("label",{htmlFor:"toggle_is_fullscreen_control",children:"fullscreen"}),o.a.createElement("input",{id:"toggle_is_fullscreen_control",type:"checkbox",name:"is_fullscreen",checked:a,onChange:this.toggleFullscreen}),o.a.createElement("label",{htmlFor:"toggle_autoeval_control",children:"autoeval"}),o.a.createElement("input",{id:"toggle_autoeval_control",type:"checkbox",name:"autoeval",checked:n,onChange:this.toggleAutoEval}),o.a.createElement("div",{id:"run_control",onClick:function(){return t.evaluate(i)}},"Run",o.a.createElement("div",{className:"arrow-right"}))),o.a.createElement(c,Object.assign({id:"editor"},a?{width:"100%",height:"calc(85vh - 30px)"}:{width:"100%",height:"400px"},{placeholder:"Type some javascript here and use effects!",className:"node",mode:"javascript",theme:"monokai",name:"editor",onChange:this.onChange,fontSize:14,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,value:i,setOptions:{enableBasicAutocompletion:!1,enableLiveAutocompletion:!1,enableSnippets:!1,showLineNumbers:!0,tabSize:2}})),o.a.createElement("div",{className:"node",id:"virtualConsole"},r.map((function(t){var e=t.level,r=t.timestamp,n=t.msg,i=t.key;return o.a.createElement("pre",{key:i},"[",r,"] ",e,": ",n)}))))},i}(o.a.PureComponent);function E(t){var e=t.data;return o.a.createElement(i.a,null,o.a.createElement(c.a,{title:"Editor - Effects Example"}),o.a.createElement(w,{defaultSource:e.file.fields.exampleSourceCode}),o.a.createElement("div",{className:"node funsies",children:o.a.createElement(a.a,null)}))}r.d(e,"default",(function(){return E})),r.d(e,"pageQuery",(function(){return b}));var b="171562119"}}]);
//# sourceMappingURL=component---src-components-example-template-js-8220477840354d6d52f6.js.map