!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("jsplumb")):"function"==typeof define&&define.amd?define(["jsplumb"],t):e["jsflow-umd"]=t(e.jsplumb)}(this,function(i){"use strict";function d(i){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{},t=Object.keys(s);"function"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(s).filter(function(e){return Object.getOwnPropertyDescriptor(s,e).enumerable}))),t.forEach(function(e){var t,n,o;t=i,o=s[n=e],n in t?Object.defineProperty(t,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[n]=o})}return i}function l(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],o=!0,i=!1,s=void 0;try{for(var a,r=e[Symbol.iterator]();!(o=(a=r.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){i=!0,s=e}finally{try{o||null==r.return||r.return()}finally{if(i)throw s}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var e=function(e,t,n,o,i,s,a,r,c,d){"boolean"!=typeof a&&(c=r,r=a,a=!1);var l,f="function"==typeof n?n.options:n;if(e&&e.render&&(f.render=e.render,f.staticRenderFns=e.staticRenderFns,f._compiled=!0,i&&(f.functional=!0)),o&&(f._scopeId=o),s?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,c(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},f._ssrRegister=l):t&&(l=a?function(){t.call(this,d(this.$root.$options.shadowRoot))}:function(e){t.call(this,r(e))}),l)if(f.functional){var u=f.render;f.render=function(e,t){return l.call(t),u(e,t)}}else{var h=f.beforeCreate;f.beforeCreate=h?[].concat(h,l):[l]}return n},c="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());var f=document.head||document.getElementsByTagName("head")[0],u={};var t=function(e){return function(e,t){return function(e,t){var n=c?t.media||"default":e,o=u[n]||(u[n]={ids:new Set,styles:[]});if(!o.ids.has(e)){o.ids.add(e);var i=t.source;if(t.map&&(i+="\n/*# sourceURL="+t.map.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),o.element||(o.element=document.createElement("style"),o.element.type="text/css",t.media&&o.element.setAttribute("media",t.media),f.appendChild(o.element)),"styleSheet"in o.element)o.styles.push(i),o.element.styleSheet.cssText=o.styles.filter(Boolean).join("\n");else{var s=o.ids.size-1,a=document.createTextNode(i),r=o.element.childNodes;r[s]&&o.element.removeChild(r[s]),r.length?o.element.insertBefore(a,r[s]):o.element.appendChild(a)}}}(e,t)}},n=e({render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"palette-panel"},[this._t("palette",[this._m(0)])],2)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("ul",{staticClass:"palette-group"},[t("li",[t("div",{staticClass:"palette-default-item startpoint",attrs:{"data-type":"startpoint"}})]),t("li",[t("div",{staticClass:"palette-default-item endpoint",attrs:{"data-type":"endpoint"}})]),t("li",[t("div",{staticClass:"palette-default-item tasknode",attrs:{"data-type":"tasknode"}})]),t("li",[t("div",{staticClass:"palette-default-item gateway",attrs:{"data-type":"gateway"}})])])}]},function(e){e&&e("data-v-09b6e314_0",{source:".palette-group{margin:0;padding:0;background:#fcfcfc;text-align:center;list-style:none}.palette-group>li{padding:14px 0}.palette-default-item{display:inline-block;width:40px;height:40px;font-size:12px;color:#888;border:1px solid #999;border-radius:2px;cursor:pointer;user-select:none}.palette-default-item:hover{box-shadow:0 0 8px rgba(50,50,50,.3)}.startpoint{border-radius:50%;border:4px solid #6a6c8a}.endpoint{border-radius:50%;background:#6a6c8a}.tasknode{height:30px;border:2px solid #33d0c6}.gateway{width:30px;height:30px;background:#7c68fc;transform:rotate(-45deg)}",map:void 0,media:void 0})},{name:"PalettePanel",props:["selector"],data:function(){return{}}},void 0,!1,void 0,t,void 0),o=e({render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{staticClass:"tool-panel"},n._l(n.tools,function(t,e){return o("div",{key:e,class:["tool-item",t.cls,{actived:"frameSelect"===t.type&&n.isFrameSelecting}],on:{click:function(e){return n.onToolClick(t)}}},[n._v("\n        "+n._s(t.name)+"\n    ")])}),0)},staticRenderFns:[]},function(e){e&&e("data-v-2c518942_0",{source:".tool-item{display:inline-block;margin-right:10px;user-select:none;cursor:pointer}.tool-item:last-child{margin-right:0}.tool-item.actived{color:#3a84ff}",map:void 0,media:void 0})},{name:"ToolPanel",props:["tools","isFrameSelecting"],data:function(){return{}},methods:{onToolClick:function(e){this.$emit("onToolClick",e)}}},void 0,!1,void 0,t,void 0),s=e({render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bk-flow-location",on:{mousedown:e.onMouseDown,mouseup:e.onMouseUp}},["startpoint"===e.node.type?n("div",{staticClass:"circle-node startpoint"}):"endpoint"===e.node.type?n("div",{staticClass:"circle-node endpoint"}):"tasknode"===e.node.type?n("div",{staticClass:"tasknode"}):"gateway"===e.node.type?n("div",{staticClass:"gateway"}):n("div",{staticClass:"node-default"})])},staticRenderFns:[]},function(e){e&&e("data-v-0604134d_0",{source:".bk-flow-location .circle-node{width:30px;height:30px;border-radius:50%;text-align:center}.bk-flow-location .startpoint{border:4px solid #6a6c8a}.bk-flow-location .endpoint{background:#6a6c8a}.bk-flow-location .tasknode{width:80px;height:50px;border:2px solid #33d0c6}.bk-flow-location .gateway{width:30px;height:30px;background:#7c68fc;transform:rotate(-45deg)}.bk-flow-location .node-default{width:120px;height:80px;line-height:80px;border:1px solid #ccc;border-radius:2px;text-align:center}.bk-flow-location .node-default.selected{border:1px solid #3a84ff}",map:void 0,media:void 0})},{name:"NodeTemplate",props:{node:{type:Object,default:function(){return{}}}},data:function(){return{moveFlag:{x:0,y:0,moved:!1}}},methods:{onMouseDown:function(e){this.moveFlag={x:e.pageX,y:e.pageY,moved:!1},this.$el.addEventListener("mousemove",this.mouseMoveHandler)},onMouseUp:function(e){var t=e.pageX,n=e.pageY;this.moveFlag.x=t,this.moveFlag.y=n,this.moveFlag.moved?(console.log("drag event"),this.moveFlag.moved=!1):console.log("click event"),this.$el.removeEventListener("mousemove",this.mouseMoveHandler)},mouseMoveHandler:function(e){var t=e.pageX,n=e.pageY;(2<Math.abs(t-this.moveFlag.x)||2<Math.abs(n-this.moveFlag.y))&&(this.moveFlag.moved=!0)}}},void 0,!1,void 0,t,void 0);function a(e){return"touches"in e?e.touches[0]:e}var r={grid:[5,5]},h={connector:["Bezier",{curviness:30}],paintStyle:{strokeWidth:2,stroke:"#567567",outlineStroke:"tranparent",outlineWidth:6},hoverPaintStyle:{fill:"transparent",stroke:"#3a84ff"}},p={endpoint:"Dot",connector:["Flowchart",{stub:[1,6],alwaysRespectStub:!0,gap:8,cornerRadius:2}],connectorOverlays:[["PlainArrow",{width:8,length:6,location:1,id:"arrow"}]],paintStyle:{fill:"#3a84ff",radius:5},anchor:["Left","Right","Top","Bottom"],isSource:!0,isTarget:!0};function v(){for(var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"",t="",n=0;n<7;n++)t+=Math.floor(65536*(1+Math.random())).toString(16).substring(1);return e+t}var m={showPalette:{type:Boolean,default:!0},showTool:{type:Boolean,default:!0},tools:{type:Array,default:function(){return[{type:"zoomIn",name:"放大",cls:"tool-item"},{type:"zoomOut",name:"缩小",cls:"tool-item"},{type:"resetPosition",name:"重置",cls:"tool-item"}]}},editable:{type:Boolean,default:!0},selector:{type:String,default:"palette-default-item"},data:{type:Object,default:function(){return{nodes:[],lines:[]}}},nodeOptions:{type:Object,default:function(){return d({},r)}},connectorOptions:{type:Object,default:function(){return d({},h)}},endpointOptions:{type:Object,default:function(){return d({},p)}}},g={mousedown:"ontouchstart"in document.documentElement?"touchstart":"mousedown",mousemove:"ontouchmove"in document.documentElement?"touchmove":"mousemove",mouseup:"ontouchend"in document.documentElement?"touchend":"mouseup"},y=e({render:function(){var n=this,e=n.$createElement,o=n._self._c||e;return o("div",{class:["jsflow",{editable:n.editable}]},[o("div",{staticClass:"canvas-area"},[n.showTool?o("div",{staticClass:"tool-panel-wrap"},[n._t("toolPanel",[o("tool-panel",{attrs:{tools:n.tools,"is-frame-selecting":n.isFrameSelecting},on:{onToolClick:n.onToolClick}})])],2):n._e(),n.showPalette?o("div",{ref:"palettePanel",staticClass:"palette-panel-wrap"},[n._t("palettePanel",[o("palette-panel",{attrs:{selector:n.selector}})])],2):n._e(),o("div",{ref:"canvasFlowWrap",staticClass:"canvas-flow-wrap",style:n.canvasWrapStyle,on:n._d({},[n.mousedown,n.onCanvasMouseDown,n.mouseup,n.onCanvasMouseUp])},[o("div",{ref:"canvasFlow",staticClass:"canvas-flow",style:n.canvasStyle,attrs:{id:"canvas-flow"}},n._l(n.nodes,function(t){return o("div",{key:t.id},[o("div",{staticClass:"jsflow-node canvas-node",attrs:{id:t.id},on:{mouseover:function(e){return n.toggleHighLight(t,!0)},mouseout:function(e){return n.toggleHighLight(t,!1)}}},[n._t("nodeTemplate",[o("node-template",{attrs:{node:t}})],{node:t})],2)])}),0),n.isFrameSelecting?o("div",{staticClass:"canvas-frame-selector",style:n.frameSelectorStyle}):n._e()]),n.showAddingNode?o("div",{staticClass:"jsflow-node adding-node",style:n.setNodeInitialPos(n.addingNodeConfig)},[n._t("nodeTemplate",[o("node-template",{attrs:{node:n.addingNodeConfig}})],{node:n.addingNodeConfig})],2):n._e()])])},staticRenderFns:[]},function(e){e&&e("data-v-bb9dff6c_0",{source:".jsflow{height:100%;border:1px solid #ccc}.jsflow .canvas-area{position:relative;height:100%}.jsflow .tool-panel-wrap{position:absolute;top:20px;left:70px;padding:10px 20px;background:#c4c6cc;opacity:.65;border-radius:4px;z-index:4}.jsflow .palette-panel-wrap{float:left;width:60px;height:100%;border-right:1px solid #ccc}.jsflow .canvas-flow-wrap{position:relative;height:100%;overflow:hidden}.jsflow .canvas-flow{position:relative;min-width:100%;min-height:100%}.jsflow .canvas-frame-selector{position:absolute;border:1px solid #3a84ff;background:rgba(58,132,255,.15)}.jsflow .jsflow-node{position:absolute;user-select:none}.jsflow .jtk-endpoint{z-index:1;cursor:pointer}.jsflow .adding-node{opacity:.8}.jsflow .jtk-endpoint.jtk-dragging{z-index:0}.jsflow .jtk-connector{cursor:pointer}",map:void 0,media:void 0})},{name:"JsFlow",components:{PalettePanel:n,ToolPanel:o,NodeTemplate:s},model:{prop:"data",event:"change"},props:m,data:function(){var e=this.data;return d({nodes:e.nodes,lines:e.lines,canvasGrabbing:!1,isFrameSelecting:!1,mouseDownPos:{},canvasPos:{x:0,y:0},canvasOffset:{x:0,y:0},frameSelectorPos:{x:0,y:0},frameSelectorRect:{width:0,height:0},selectedNodes:[],showAddingNode:!1,addingNodeConfig:{},addingNodeRect:{},canvasRect:{},paletteRect:{},zoom:1},g)},computed:{canvasWrapStyle:function(){return{cursor:this.isFrameSelecting?"crosshair":this.canvasGrabbing?"-webkit-grabbing":"-webkit-grab"}},canvasStyle:function(){return{left:"".concat(this.canvasOffset.x,"px"),top:"".concat(this.canvasOffset.y,"px")}},frameSelectorStyle:function(){return{left:"".concat(this.frameSelectorPos.x,"px"),top:"".concat(this.frameSelectorPos.y,"px"),width:"".concat(this.frameSelectorRect.width,"px"),height:"".concat(this.frameSelectorRect.height,"px")}}},watch:{"data.nodes":{handler:function(e){this.nodes=e},deep:!0},editable:function(e){var t=this.$el.querySelectorAll(".canvas-node");this.toggleNodeDraggable(t,e)}},mounted:function(){this.initCanvas(),this.registerEvent(),this.renderData(),this.$refs.palettePanel&&(this.paletteRect=this.$refs.palettePanel.getBoundingClientRect(),this.registerPaletteEvent())},beforeDestroy:function(){this.$refs.palettePanel&&this.$refs.palettePanel.removeEventListener(this.mousedown,this.nodeCreateHandler),this.$el.removeEventListener(this.mousemove,this.nodeMovingHandler),document.removeEventListener(this.mouseup,this.nodeMoveEndHandler)},methods:{initCanvas:function(){var e={},t=d({},this.endpointOptions,this.connectorOptions);for(var n in t){var o=n[0].toUpperCase();e["".concat(o).concat(n.slice(1))]=t[n]}this.instance=i.jsPlumb.getInstance(d({Container:"canvas-flow"},e))},registerEvent:function(){var s=this;this.instance.bind("beforeDrag",function(e){return!!s.editable&&("function"!=typeof s.$listeners.onBeforeDrag||s.$listeners.onBeforeDrag(e))}),this.instance.bind("beforeDrop",function(e){return!!s.editable&&("function"!=typeof s.$listeners.onBeforeDrop||s.$listeners.onBeforeDrop(e))}),this.instance.bind("connectionDrag",function(e){"function"==typeof s.$listeners.connectionDrag&&s.$emit("connectionDrag",e)}),this.instance.bind("connection",function(e){"function"==typeof s.$listeners.onConnection&&s.$emit("onConnection",e)}),this.instance.bind("connectionDragStop",function(e,t){if(!e.target||!e.target.classList.contains("jsflow-node")){var n=s.getNodeWithEndpoint(t.target);if(n){var o=s.nodes.find(function(e){return n.id===e.id});if("function"==typeof s.$listeners.onConnectionDragStop){var i={id:e.source.id,arrow:e.endpoints[0].anchor.type};s.$emit("onConnectionDragStop",i,o.id,t)}}}}),this.instance.bind("beforeDetach",function(e){return"function"!=typeof s.$listeners.onBeforeDetach||s.$listeners.onBeforeDetach(e)}),this.instance.bind("connectionDetached",function(t,e){var n=s.lines.filter(function(e){return e.source.id!==t.sourceId&&e.target.id!==t.targetId});s.lines=n,"function"==typeof s.$listeners.onConnectionDetached&&s.$emit("onConnectionDetached",t)}),this.instance.bind("connectionMoved",function(e,t){"function"==typeof s.$listeners.onConnectionMoved&&s.$emit("onConnectionMoved",lines)}),this.instance.bind("click",function(e,t){"function"==typeof s.$listeners.onConnectionClick&&s.$emit("onConnectionClick",e,t)}),this.instance.bind("dblclick",function(e,t){"function"==typeof s.$listeners.onConnectionDbClick&&s.$emit("onConnectionDbClick",e,t)}),this.instance.bind("endpointClick",function(e,t){"function"==typeof s.$listeners.onEndpointClick&&s.$emit("onEndpointClick",e,t)}),this.instance.bind("endpointDblClick",function(e,t){"function"==typeof s.$listeners.onEndpointDbClick&&s.$emit("onEndpointDbClick",e,t)})},renderData:function(){var t=this;this.instance.batch(function(){t.nodes.forEach(function(e){t.initNode(e)}),t.lines.forEach(function(e){t.createConnector(e,t.connectorOptions)})})},updateCanvas:function(e){this.removeAllConnector(),this.lines=e.lines,this.nodes=e.nodes,this.renderData()},createNode:function(e){var t=this;("function"!=typeof this.$listeners.onCreateNodeBefore||this.$listeners.onCreateNodeBefore(e))&&(this.nodes.push(e),this.$nextTick(function(){t.initNode(e)}))},initNode:function(e){var t=document.getElementById(e.id);t.style.left="".concat(e.x,"px"),t.style.top="".concat(e.y,"px"),this.setNodeDraggable(e,this.nodeOptions),this.setNodeEndPoint(e,this.endpointOptions),"function"==typeof this.$listeners.onCreateNodeAfter&&this.$emit("onCreateNodeAfter",e)},removeNode:function(t){var e=this.nodes.findIndex(function(e){return e.id===t.id});this.nodes.splice(e,1),this.instance.remove(t.id)},setNodeEndPoint:function(t,n){var o=this;(t.endpoints||["Top","Right","Bottom","Left"]).forEach(function(e){o.instance.addEndpoint(t.id,d({anchor:e,uuid:e+t.id},n))})},setNodeDraggable:function(r,e){if(this.editable){var c=this;this.instance.draggable(r.id,d({grid:[20,20],drag:function(e){var t=c.nodes.find(function(e){return r.id===e.id}),n=Object.assign({},t);c.$emit("onNodeMoving",n,e)},stop:function(e){var n=-1,t=l(e.pos,2),o=t[0],i=t[1],s=c.nodes.find(function(e,t){if(e.id===r.id)return n=t,!0}),a=Object.assign({},s,{x:o,y:i});c.nodes.splice(n,1,a),c.$emit("onNodeMoveStop",a,e)}},e))}},setNodePosition:function(e){var t=document.getElementById(e.id);t.style.left="".concat(e.x,"px"),t.style.top="".concat(e.y,"px"),this.instance.revalidate(t)},toggleNodeDraggable:function(e,t){this.instance.setDraggable(e,t)},setNodeInitialPos:function(e){return{left:"".concat(e.x,"px"),top:"".concat(e.y,"px"),visibility:e.visible?"initial":"hidden"}},createConnector:function(e,t){var n=e.options||{};return this.instance.connect({source:e.source.id,target:e.target.id,uuids:[e.source.arrow+e.source.id,e.target.arrow+e.target.id]},d({},t,n))},setConnector:function(t,n,e){var o=this;this.instance.getAllConnections().filter(function(e){return e.sourceId===t&&e.targetId===n}).forEach(function(t){t.setConnector(e),o.endpointOptions&&o.endpointOptions.connectorOverlays&&o.endpointOptions.connectorOverlays.forEach(function(e){t.addOverlay(e)})})},removeConnector:function(e){var t=this;this.instance.getConnections({source:e.source.id,target:e.target.id}).forEach(function(e){t.instance.deleteConnection(e)})},removeAllConnector:function(){this.instance.deleteEveryConnection(),this.lines=[]},getConnectorsByNodeId:function(t){return this.instance.getAllConnections().filter(function(e){return e.sourceId===t||e.targetId===t})},getNodeWithEndpoint:function(e){var t=e.parentNode;return!(!t||"HTML"===t.nodeName)&&(t.classList.contains("jsflow-node")?t:this.getNodeWithEndpoint(t))},addLineOverlay:function(e,t){var n=this;this.instance.getConnections({source:e.source.id,target:e.target.id}).forEach(function(e){e.addOverlay([t.type,{label:t.name,location:t.location,cssClass:t.cls,id:t.id,events:{click:function(e,t){n.$emit("onOverlayClick",e,t)}}}])})},removeLineOverlay:function(e,t){this.instance.getConnections({source:e.source.id,target:e.target.id}).forEach(function(e){e.removeOverlay(t)})},onCanvasMouseDown:function(e){e=a(e),this.isFrameSelecting?this.frameSelectHandler(e):(this.canvasGrabbing=!0,this.mouseDownPos={x:e.pageX,y:e.pageY},this.$refs.canvasFlowWrap.addEventListener(this.mousemove,this.canvasFlowMoveHandler,!1))},canvasFlowMoveHandler:function(e){e=a(e),this.canvasOffset={x:this.canvasPos.x+e.pageX-this.mouseDownPos.x,y:this.canvasPos.y+e.pageY-this.mouseDownPos.y}},onCanvasMouseUp:function(e){this.isFrameSelecting?this.frameSelectEndHandler(e):(this.canvasGrabbing=!1,this.$refs.canvasFlowWrap.removeEventListener(this.mousemove,this.canvasFlowMoveHandler),this.canvasPos={x:this.canvasOffset.x,y:this.canvasOffset.y})},registerPaletteEvent:function(){this.$refs.palettePanel.addEventListener(this.mousedown,this.nodeCreateHandler,!1)},nodeCreateHandler:function(n){var o=this,e=function e(t,n){return 1===t.nodeType&&t.classList.contains(n)?t:"HTML"!==t.parentNode.nodeName?e(t.parentNode,n):null}(n.target,this.selector);if(e){var i=e.dataset.type?e.dataset.type:"",s={};for(var t in e.dataset){var a=t.match(/(config)(\w*)/);if(a&&""!==a[2]){var r=a[2],c=r[0].toLowerCase()+r.slice(1);s[c]=e.dataset[t]}}this.showAddingNode=!0,this.addingNodeConfig.id=v("node"),this.addingNodeConfig.type=i,this.$nextTick(function(){var e=o.$el.querySelector(".adding-node");o.addingNodeRect=e.getBoundingClientRect();var t=o.getAddingNodePos(n);o.addingNodeConfig=d({id:v("node"),type:i,x:t.x,y:t.y,adding:!0,visible:!1},s),o.$el.addEventListener(o.mousemove,o.nodeMovingHandler,!1),document.addEventListener(o.mouseup,o.nodeMoveEndHandler,!1)})}},nodeMovingHandler:function(e){var t=this.getAddingNodePos(e);this.$set(this.addingNodeConfig,"x",t.x),this.$set(this.addingNodeConfig,"y",t.y),this.$set(this.addingNodeConfig,"visible",!0)},nodeMoveEndHandler:function(e){if(this.$el.removeEventListener(this.mousemove,this.nodeMovingHandler),document.removeEventListener(this.mouseup,this.nodeMoveEndHandler),this.showAddingNode=!1,e.pageX>this.paletteRect.left+this.paletteRect.width){var t=this.addingNodeConfig.x-this.paletteRect.width-this.canvasOffset.x,n=this.addingNodeConfig.y-this.canvasOffset.y;this.$set(this.addingNodeConfig,"x",t),this.$set(this.addingNodeConfig,"y",n),delete this.addingNodeConfig.adding,delete this.addingNodeConfig.visible,this.createNode(this.addingNodeConfig)}this.addingNodeConfig={},this.addingNodeRect={}},getAddingNodePos:function(e){return{x:e.pageX-this.paletteRect.left-this.addingNodeRect.width/2,y:e.pageY-this.paletteRect.top-this.addingNodeRect.height/2}},toggleHighLight:function(e){var n=this,o=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];if(this.editable){this.instance.getEndpoints(e.id);var t=document.getElementById(e.id);this.instance.selectEndpoints({source:t}).each(function(e){var t=o?n.endpointOptions.hoverPaintStyle:n.endpointOptions.paintStyle;t&&e.setStyle(t)})}},onToolClick:function(e){"function"==typeof this[e.type]&&this[e.type](),this.$emit("onToolClick",e)},setZoom:function(e,t,n){this.instance.setContainer("canvas-flow"),this.$refs.canvasFlow.style.transform="matrix("+e+",0,0,"+e+","+t+","+n+")",this.$refs.canvasFlow.style.transformOrigin="0 0",this.$refs.canvasFlow.zoom=e,this.zoom=e,this.instance.setZoom(e)},zoomIn:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:1.1,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=this.zoom*e,i=t-t*o,s=n-n*o;2<o||this.setZoom(o,i,s)},zoomOut:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:.9,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0,o=this.zoom*e,i=t-t*o,s=n-n*o;o<.1||this.setZoom(o,i,s)},resetPosition:function(){this.setZoom(1,0,0),this.setCanvasPosition(0,0)},setCanvasPosition:function(e,t){this.canvasOffset={x:e,y:t},this.canvasPos={x:e,y:t}},frameSelect:function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0];this.isFrameSelecting=e},onOpenFrameSelect:function(){this.frameSelect()},onCloseFrameSelect:function(){this.frameSelect(!1)},frameSelectHandler:function(e){this.canvasRect=this.$refs.canvasFlowWrap.getBoundingClientRect(),this.mouseDownPos={x:e.clientX-this.canvasRect.left,y:e.clientY-this.canvasRect.top},this.$refs.canvasFlowWrap.addEventListener(this.mousemove,this.frameSelectMovingHandler,!1)},frameSelectMovingHandler:function(e){var t=e.clientX-this.mouseDownPos.x-this.canvasRect.left,n=e.clientY-this.mouseDownPos.y-this.canvasRect.top;this.frameSelectorRect={width:Math.abs(t),height:Math.abs(n)},this.frameSelectorPos={x:0<t?this.mouseDownPos.x:this.mouseDownPos.x+t,y:0<n?this.mouseDownPos.y:this.mouseDownPos.y+n}},frameSelectEndHandler:function(e){this.$refs.canvasFlowWrap.removeEventListener(this.mousemove,this.frameSelectMovingHandler),this.$refs.canvasFlowWrap.removeEventListener(this.mouseup,this.frameSelectEndHandler),document.addEventListener(this.mousedown,this.cancelFrameSelectorHandler,{capture:!1,once:!0});var t=this.getSelectedNodes(),n=t.map(function(e){return e.id}),o=this.mouseDownPos,i=o.x,s=o.y;this.isFrameSelecting=!1,this.frameSelectorPos={x:0,y:0},this.frameSelectorRect={width:0,height:0},this.selectedNodes=t,this.clearNodesDragSelection(),this.addNodesToDragSelection(n),this.$emit("onFrameSelectEnd",t.slice(0),i,s)},getSelectedNodes:function(){var i=this,e=this.frameSelectorPos,s=e.x,a=e.y,t=this.frameSelectorRect,r=t.width,c=t.height;return this.nodes.filter(function(e){var t=document.querySelector("#".concat(e.id)).getBoundingClientRect(),n=t.left-i.canvasRect.left,o=t.top-i.canvasRect.top;if(s<n&&n<s+r&&a<o&&o<a+c)return!0})},cancelFrameSelectorHandler:function(e){this.selectedNodes=[],this.clearNodesDragSelection(),this.$emit("onCloseFrameSelect")},addNodesToDragSelection:function(e){e.forEach(function(e){var t=document.querySelector("#".concat(e));t&&t.classList.add("selected")}),this.instance.addToDragSelection(e)},clearNodesDragSelection:function(){document.querySelectorAll(".jsflow-node.selected").forEach(function(e){e.classList.remove("selected")}),this.instance.clearDragSelection()}}},void 0,!1,void 0,t,void 0);return"undefined"!=typeof window&&"Vue"in window&&window.Vue.component("js-flow",y),y});