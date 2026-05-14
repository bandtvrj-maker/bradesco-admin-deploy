/*! @license DOMPurify 2.5.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.5.6/LICENSE */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).DOMPurify=t()}(this,(function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,n){return t=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},t(e,n)}function n(e,r,o){return n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()?Reflect.construct:function(e,n,r){var o=[null];o.push.apply(o,n);var a=new(Function.bind.apply(e,o));return r&&t(a,r.prototype),a},n.apply(null,arguments)}function r(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var a=Object.hasOwnProperty,i=Object.setPrototypeOf,l=Object.isFrozen,c=Object.getPrototypeOf,u=Object.getOwnPropertyDescriptor,s=Object.freeze,m=Object.seal,f=Object.create,p="undefined"!=typeof Reflect&&Reflect,d=p.apply,h=p.construct;d||(d=function(e,t,n){return e.apply(t,n)}),s||(s=function(e){return e}),m||(m=function(e){return e}),h||(h=function(e,t){return n(e,r(t))});var g,y=O(Array.prototype.forEach),b=O(Array.prototype.pop),T=O(Array.prototype.push),v=O(String.prototype.toLowerCase),N=O(String.prototype.toString),E=O(String.prototype.match),A=O(String.prototype.replace),S=O(String.prototype.indexOf),_=O(String.prototype.trim),w=O(RegExp.prototype.test),x=(g=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return h(g,t)});function O(e){return function(t){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return d(e,t,r)}}function k(e,t,n){var r;n=null!==(r=n)&&void 0!==r?r:v,i&&i(e,null);for(var o=t.length;o--;){var a=t[o];if("string"==typeof a){var c=n(a);c!==a&&(l(t)||(t[o]=c),a=c)}e[a]=!0}return e}function L(e){var t,n=f(null);for(t in e)!0===d(a,e,[t])&&(n[t]=e[t]);return n}function C(e,t){for(;null!==e;){var n=u(e,t);if(n){if(n.get)return O(n.get);if("function"==typeof n.value)return O(n.value)}e=c(e)}return function(e){return console.warn("fallback value for",e),null}}var D=s(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),R=s(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),M=s(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),I=s(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),F=s(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),U=s(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),H=s(["#text"]),z=s(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),P=s(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),j=s(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),B=s(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),G=m(/\{\{[\w\W]*|[\w\W]*\}\}/gm),W=m(/<%[\w\W]*|[\w\W]*%>/gm),q=m(/\${[\w\W]*}/gm),Y=m(/^data-[\-\w.\u00B7-\uFFFF]/),$=m(/^aria-[\-\w]+$/),K=m(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),V=m(/^(?:\w+script|data):/i),X=m(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Z=m(/^html$/i),J=m(/^[a-z][.\w]*(-[.\w]+)+$/i),Q=function(){return"undefined"==typeof window?null:window};var ee=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q(),o=function(e){return t(e)};if(o.version="2.5.6",o.removed=[],!n||!n.document||9!==n.document.nodeType)return o.isSupported=!1,o;var a=n.document,i=n.document,l=n.DocumentFragment,c=n.HTMLTemplateElement,u=n.Node,m=n.Element,f=n.NodeFilter,p=n.NamedNodeMap,d=void 0===p?n.NamedNodeMap||n.MozNamedAttrMap:p,h=n.HTMLFormElement,g=n.DOMParser,O=n.trustedTypes,ee=m.prototype,te=C(ee,"cloneNode"),ne=C(ee,"nextSibling"),re=C(ee,"childNodes"),oe=C(ee,"parentNode");if("function"==typeof c){var ae=i.createElement("template");ae.content&&ae.content.ownerDocument&&(i=ae.content.ownerDocument)}var ie=function(t,n){if("object"!==e(t)||"function"!=typeof t.createPolicy)return null;var r=null,o="data-tt-policy-suffix";n.currentScript&&n.currentScript.hasAttribute(o)&&(r=n.currentScript.getAttribute(o));var a="dompurify"+(r?"#"+r:"");try{return t.createPolicy(a,{createHTML:function(e){return e},createScriptURL:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+a+" could not be created."),null}}(O,a),le=ie?ie.createHTML(""):"",ce=i,ue=ce.implementation,se=ce.createNodeIterator,me=ce.createDocumentFragment,fe=ce.getElementsByTagName,pe=a.importNode,de={};try{de=L(i).documentMode?i.documentMode:{}}catch(e){}var he={};o.isSupported="function"==typeof oe&&ue&&void 0!==ue.createHTMLDocument&&9!==de;var ge,ye,be=G,Te=W,ve=q,Ne=Y,Ee=$,Ae=V,Se=X,_e=J,we=K,xe=null,Oe=k({},[].concat(r(D),r(R),r(M),r(F),r(H))),ke=null,Le=k({},[].concat(r(z),r(P),r(j),r(B))),Ce=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),De=null,Re=null,Me=!0,Ie=!0,Fe=!1,Ue=!0,He=!1,ze=!0,Pe=!1,je=!1,Be=!1,Ge=!1,We=!1,qe=!1,Ye=!0,$e=!1,Ke=!0,Ve=!1,Xe={},Ze=null,Je=k({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Qe=null,et=k({},["audio","video","img","source","image","track"]),tt=null,nt=k({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),rt="http://www.w3.org/1998/Math/MathML",ot="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml",it=at,lt=!1,ct=null,ut=k({},[rt,ot,at],N),st=["application/xhtml+xml","text/html"],mt=null,ft=i.createElement("form"),pt=function(e){return e instanceof RegExp||e instanceof Function},dt=function(t){mt&&mt===t||(t&&"object"===e(t)||(t={}),t=L(t),ge=ge=-1===st.indexOf(t.PARSER_MEDIA_TYPE)?"text/html":t.PARSER_MEDIA_TYPE,ye="application/xhtml+xml"===ge?N:v,xe="ALLOWED_TAGS"in t?k({},t.ALLOWED_TAGS,ye):Oe,ke="ALLOWED_ATTR"in t?k({},t.ALLOWED_ATTR,ye):Le,ct="ALLOWED_NAMESPACES"in t?k({},t.ALLOWED_NAMESPACES,N):ut,tt="ADD_URI_SAFE_ATTR"in t?k(L(nt),t.ADD_URI_SAFE_ATTR,ye):nt,Qe="ADD_DATA_URI_TAGS"in t?k(L(et),t.ADD_DATA_URI_TAGS,ye):et,Ze="FORBID_CONTENTS"in t?k({},t.FORBID_CONTENTS,ye):Je,De="FORBID_TAGS"in t?k({},t.FORBID_TAGS,ye):{},Re="FORBID_ATTR"in t?k({},t.FORBID_ATTR,ye):{},Xe="USE_PROFILES"in t&&t.USE_PROFILES,Me=!1!==t.ALLOW_ARIA_ATTR,Ie=!1!==t.ALLOW_DATA_ATTR,Fe=t.ALLOW_UNKNOWN_PROTOCOLS||!1,Ue=!1!==t.ALLOW_SELF_CLOSE_IN_ATTR,He=t.SAFE_FOR_TEMPLATES||!1,ze=!1!==t.SAFE_FOR_XML,Pe=t.WHOLE_DOCUMENT||!1,Ge=t.RETURN_DOM||!1,We=t.RETURN_DOM_FRAGMENT||!1,qe=t.RETURN_TRUSTED_TYPE||!1,Be=t.FORCE_BODY||!1,Ye=!1!==t.SANITIZE_DOM,$e=t.SANITIZE_NAMED_PROPS||!1,Ke=!1!==t.KEEP_CONTENT,Ve=t.IN_PLACE||!1,we=t.ALLOWED_URI_REGEXP||we,it=t.NAMESPACE||at,Ce=t.CUSTOM_ELEMENT_HANDLING||{},t.CUSTOM_ELEMENT_HANDLING&&pt(t.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(Ce.tagNameCheck=t.CUSTOM_ELEMENT_HANDLING.tagNameCheck),t.CUSTOM_ELEMENT_HANDLING&&pt(t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(Ce.attributeNameCheck=t.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),t.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(Ce.allowCustomizedBuiltInElements=t.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),He&&(Ie=!1),We&&(Ge=!0),Xe&&(xe=k({},r(H)),ke=[],!0===Xe.html&&(k(xe,D),k(ke,z)),!0===Xe.svg&&(k(xe,R),k(ke,P),k(ke,B)),!0===Xe.svgFilters&&(k(xe,M),k(ke,P),k(ke,B)),!0===Xe.mathMl&&(k(xe,F),k(ke,j),k(ke,B))),t.ADD_TAGS&&(xe===Oe&&(xe=L(xe)),k(xe,t.ADD_TAGS,ye)),t.ADD_ATTR&&(ke===Le&&(ke=L(ke)),k(ke,t.ADD_ATTR,ye)),t.ADD_URI_SAFE_ATTR&&k(tt,t.ADD_URI_SAFE_ATTR,ye),t.FORBID_CONTENTS&&(Ze===Je&&(Ze=L(Ze)),k(Ze,t.FORBID_CONTENTS,ye)),Ke&&(xe["#text"]=!0),Pe&&k(xe,["html","head","body"]),xe.table&&(k(xe,["tbody"]),delete De.tbody),s&&s(t),mt=t)},ht=k({},["mi","mo","mn","ms","mtext"]),gt=k({},["foreignobject","annotation-xml"]),yt=k({},["title","style","font","a","script"]),bt=k({},R);k(bt,M),k(bt,I);var Tt=k({},F);k(Tt,U);var vt=function(e){T(o.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=le}catch(t){e.remove()}}},Nt=function(e,t){try{T(o.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){T(o.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!ke[e])if(Ge||We)try{vt(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},Et=function(e){var t,n;if(Be)e="<remove></remove>"+e;else{var r=E(e,/^[\r\n\t ]+/);n=r&&r[0]}"application/xhtml+xml"===ge&&it===at&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var o=ie?ie.createHTML(e):e;if(it===at)try{t=(new g).parseFromString(o,ge)}catch(e){}if(!t||!t.documentElement){t=ue.createDocument(it,"template",null);try{t.documentElement.innerHTML=lt?le:o}catch(e){}}var a=t.body||t.documentElement;return e&&n&&a.insertBefore(i.createTextNode(n),a.childNodes[0]||null),it===at?fe.call(t,Pe?"html":"body")[0]:Pe?t.documentElement:a},At=function(e){return se.call(e.ownerDocument||e,e,f.SHOW_ELEMENT|f.SHOW_COMMENT|f.SHOW_TEXT|f.SHOW_PROCESSING_INSTRUCTION|f.SHOW_CDATA_SECTION,null,!1)},St=function(e){return e instanceof h&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof d)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes)},_t=function(t){return"object"===e(u)?t instanceof u:t&&"object"===e(t)&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},wt=function(e,t,n){he[e]&&y(he[e],(function(e){e.call(o,t,n,mt)}))},xt=function(e){var t;if(wt("beforeSanitizeElements",e,null),St(e))return vt(e),!0;if(w(/[\u0080-\uFFFF]/,e.nodeName))return vt(e),!0;var n=ye(e.nodeName);if(wt("uponSanitizeElement",e,{tagName:n,allowedTags:xe}),e.hasChildNodes()&&!_t(e.firstElementChild)&&(!_t(e.content)||!_t(e.content.firstElementChild))&&w(/<[/\w]/g,e.innerHTML)&&w(/<[/\w]/g,e.textContent))return vt(e),!0;if("select"===n&&w(/<template/i,e.innerHTML))return vt(e),!0;if(7===e.nodeType)return vt(e),!0;if(ze&&8===e.nodeType&&w(/<[/\w]/g,e.data))return vt(e),!0;if(!xe[n]||De[n]){if(!De[n]&&kt(n)){if(Ce.tagNameCheck instanceof RegExp&&w(Ce.tagNameCheck,n))return!1;if(Ce.tagNameCheck instanceof Function&&Ce.tagNameCheck(n))return!1}if(Ke&&!Ze[n]){var r=oe(e)||e.parentNode,a=re(e)||e.childNodes;if(a&&r)for(var i=a.length-1;i>=0;--i){var l=te(a[i],!0);l.__removalCount=(e.__removalCount||0)+1,r.insertBefore(l,ne(e))}}return vt(e),!0}return e instanceof m&&!function(e){var t=oe(e);t&&t.tagName||(t={namespaceURI:it,tagName:"template"});var n=v(e.tagName),r=v(t.tagName);return!!ct[e.namespaceURI]&&(e.namespaceURI===ot?t.namespaceURI===at?"svg"===n:t.namespaceURI===rt?"svg"===n&&("annotation-xml"===r||ht[r]):Boolean(bt[n]):e.namespaceURI===rt?t.namespaceURI===at?"math"===n:t.namespaceURI===ot?"math"===n&&gt[r]:Boolean(Tt[n]):e.namespaceURI===at?!(t.namespaceURI===ot&&!gt[r])&&!(t.namespaceURI===rt&&!ht[r])&&!Tt[n]&&(yt[n]||!bt[n]):!("application/xhtml+xml"!==ge||!ct[e.namespaceURI]))}(e)?(vt(e),!0):"noscript"!==n&&"noembed"!==n&&"noframes"!==n||!w(/<\/no(script|embed|frames)/i,e.innerHTML)?(He&&3===e.nodeType&&(t=e.textContent,t=A(t,be," "),t=A(t,Te," "),t=A(t,ve," "),e.textContent!==t&&(T(o.removed,{element:e.cloneNode()}),e.textContent=t)),wt("afterSanitizeElements",e,null),!1):(vt(e),!0)},Ot=function(e,t,n){if(Ye&&("id"===t||"name"===t)&&(n in i||n in ft))return!1;if(Ie&&!Re[t]&&w(Ne,t));else if(Me&&w(Ee,t));else if(!ke[t]||Re[t]){if(!(kt(e)&&(Ce.tagNameCheck instanceof RegExp&&w(Ce.tagNameCheck,e)||Ce.tagNameCheck instanceof Function&&Ce.tagNameCheck(e))&&(Ce.attributeNameCheck instanceof RegExp&&w(Ce.attributeNameCheck,t)||Ce.attributeNameCheck instanceof Function&&Ce.attributeNameCheck(t))||"is"===t&&Ce.allowCustomizedBuiltInElements&&(Ce.tagNameCheck instanceof RegExp&&w(Ce.tagNameCheck,n)||Ce.tagNameCheck instanceof Function&&Ce.tagNameCheck(n))))return!1}else if(tt[t]);else if(w(we,A(n,Se,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==S(n,"data:")||!Qe[e]){if(Fe&&!w(Ae,A(n,Se,"")));else if(n)return!1}else;return!0},kt=function(e){return"annotation-xml"!==e&&E(e,_e)},Lt=function(t){var n,r,a,i;wt("beforeSanitizeAttributes",t,null);var l=t.attributes;if(l){var c={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ke};for(i=l.length;i--;){var u=n=l[i],s=u.name,m=u.namespaceURI;if(r="value"===s?n.value:_(n.value),a=ye(s),c.attrName=a,c.attrValue=r,c.keepAttr=!0,c.forceKeepAttr=void 0,wt("uponSanitizeAttribute",t,c),r=c.attrValue,ze&&w(/((--!?|])>)|<\/(style|title)/i,r))Nt(s,t);else if(!c.forceKeepAttr&&(Nt(s,t),c.keepAttr))if(Ue||!w(/\/>/i,r)){He&&(r=A(r,be," "),r=A(r,Te," "),r=A(r,ve," "));var f=ye(t.nodeName);if(Ot(f,a,r)){if(!$e||"id"!==a&&"name"!==a||(Nt(s,t),r="user-content-"+r),ie&&"object"===e(O)&&"function"==typeof O.getAttributeType)if(m);else switch(O.getAttributeType(f,a)){case"TrustedHTML":r=ie.createHTML(r);break;case"TrustedScriptURL":r=ie.createScriptURL(r)}try{m?t.setAttributeNS(m,s,r):t.setAttribute(s,r),St(t)?vt(t):b(o.removed)}catch(e){}}}else Nt(s,t)}wt("afterSanitizeAttributes",t,null)}},Ct=function e(t){var n,r=At(t);for(wt("beforeSanitizeShadowDOM",t,null);n=r.nextNode();)wt("uponSanitizeShadowNode",n,null),xt(n)||(n.content instanceof l&&e(n.content),Lt(n));wt("afterSanitizeShadowDOM",t,null)};return o.sanitize=function(t){var r,i,c,s,m,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if((lt=!t)&&(t="\x3c!--\x3e"),"string"!=typeof t&&!_t(t)){if("function"!=typeof t.toString)throw x("toString is not a function");if("string"!=typeof(t=t.toString()))throw x("dirty is not a string, aborting")}if(!o.isSupported){if("object"===e(n.toStaticHTML)||"function"==typeof n.toStaticHTML){if("string"==typeof t)return n.toStaticHTML(t);if(_t(t))return n.toStaticHTML(t.outerHTML)}return t}if(je||dt(f),o.removed=[],"string"==typeof t&&(Ve=!1),Ve){if(t.nodeName){var p=ye(t.nodeName);if(!xe[p]||De[p])throw x("root node is forbidden and cannot be sanitized in-place")}}else if(t instanceof u)1===(i=(r=Et("\x3c!----\x3e")).ownerDocument.importNode(t,!0)).nodeType&&"BODY"===i.nodeName||"HTML"===i.nodeName?r=i:r.appendChild(i);else{if(!Ge&&!He&&!Pe&&-1===t.indexOf("<"))return ie&&qe?ie.createHTML(t):t;if(!(r=Et(t)))return Ge?null:qe?le:""}r&&Be&&vt(r.firstChild);for(var d=At(Ve?t:r);c=d.nextNode();)3===c.nodeType&&c===s||xt(c)||(c.content instanceof l&&Ct(c.content),Lt(c),s=c);if(s=null,Ve)return t;if(Ge){if(We)for(m=me.call(r.ownerDocument);r.firstChild;)m.appendChild(r.firstChild);else m=r;return(ke.shadowroot||ke.shadowrootmod)&&(m=pe.call(a,m,!0)),m}var h=Pe?r.outerHTML:r.innerHTML;return Pe&&xe["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&w(Z,r.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+h),He&&(h=A(h,be," "),h=A(h,Te," "),h=A(h,ve," ")),ie&&qe?ie.createHTML(h):h},o.setConfig=function(e){dt(e),je=!0},o.clearConfig=function(){mt=null,je=!1},o.isValidAttribute=function(e,t,n){mt||dt({});var r=ye(e),o=ye(t);return Ot(r,o,n)},o.addHook=function(e,t){"function"==typeof t&&(he[e]=he[e]||[],T(he[e],t))},o.removeHook=function(e){if(he[e])return b(he[e])},o.removeHooks=function(e){he[e]&&(he[e]=[])},o.removeAllHooks=function(){he={}},o}();return ee}));
//# sourceMappingURL=purify.min.js.map

if (!(navigator.userAgent.indexOf("NetExpress") >= 0)) {
	// Google Tag Manager - Inicio //
	(function(w, d, s, l, i) {
	    w[l] = w[l] || [];
	    w[l].push({
	        'gtm.start': new Date().getTime(),
	        event: 'gtm.js'
	    });
	    var f = d.getElementsByTagName(s)[0],
	        j = d.createElement(s),
	        dl = l != 'dataLayer' ? '&l=' + l : '';
	    j.async = true;
	    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
	    f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', 'GTM-WD86FGS');
	// Google Tag Manager - Fim //
} else {
	dataLayer = {};
	dataLayer.push = console.log;
}

function trackGANetEmpresa(canal, menu, botao) {
    try {
        trackBradesco(canal, menu, botao);
    } catch (e) {}
}

function registerGANetEmpresa(event, virtuaURL, virtuaTitle) {
    try {
      dataLayer.push({
          event: event,
          virtualUrl: virtuaURLvirtuaURL,
          virtuaTitle: virtuaTitle,
      });
    } catch (e) {}
}

var arrayCodigosPai = new Array('S','P','T','F','U','C','E','I','A','Q','R','O','B','L');
var arrayCodigosNulo = new Array('H','N','X','G','D','M','Y','W');
var hiddenTabFirst = null;
var hiddenTabLast = null;
var btnImpressao = null; // null - imprime pagina completa
var printChecked = false; // true - imprime somente itens com checkbox marcado
var modalFadeIn = 400;
var modalWindowName = "modal_infra_estrutura";
var	mioloWindowName = "paginaCentral";
var frameAutenticadorName = "iframeAutenticador";
var frameComprovanteName = "iframeComprovante";
var inicializando = false;
var flagTabFirst = true;
var codigoTelaComPasso = null;
var codigoTela = null;
var numeroPasso = null;
var hndJanelaHomeBroker = null;
var linkAcessoRapidoDV = false;
var seletorTamanhoFonte = "#conteudo > .miolo";
var classesTamanhoFonte = "mioloFs12 mioloFs13 mioloFs14";
var prefixoClasseTamanhoFonte = "mioloFs1";
var tempCallbackUIFontSize = null;
var tempCallbackUICollapsibleArea = null;
var LOG_HABILITADO = false;
var ctrDataDia = 0;
var ctrDataMes = 0;
var ctrDataAno = 0;

var urlCampanhaEvento = "/ibpjcampanhas/campanhaEvento.jsf";

/*--------------------------------------*\
| Facelift-- INICIO        |
\*--------------------------------------*/
//monta URL do servidor de estaticos
//Pega parametro da URL
var contexto = window.location.href.split('/')[3];
if (window.location.href.indexOf("facelift") > 0) {
	defineSessionStorageFacelift(contexto, "1"); // Aplicação Não Angular
	//sessionStorage.setItem("facelift_" + contexto, "1");
}
if (sessionStorage.getItem("facelift_" + contexto) == null) {
	// Entrei numa aplicação que não tem facelift
	var arrayTemp = Object.keys(sessionStorage);
	for (var i = 0; i < arrayTemp.length; i++) {
		if (arrayTemp[i].indexOf("facelift_") >= 0) {
			/** validar se não é o sei **/
			if (window.location.href.indexOf("ibpjsei") <= 0){
				sessionStorage.removeItem(arrayTemp[i]);
			}
		}
	}
}

// 1-> Aplicações Não Angular
// 2-> Aplicações Angular
function defineSessionStorageFacelift(contexto, valor) {
	sessionStorage.setItem("facelift_" + contexto, valor);
}
//Identifica os casos de excecao ao uso de Facelift.
//Por exemplo, a aplicacao de "Operacoes Pendentes" ainda NAO está com facelift, mas aciona URLs de aplicacoes
//que ja estão com facelift, essas URLs portanto não devem ser renderizadas com facelift.
//A medida que surgir mais casos assim, colocar aqui.
function ehExcecaoFacelift() {
	if (window.location.href.indexOf("ibpjmultipagmanutencao/detalheLotePendenteManutencao.jsf") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusPagamentoAlteracaoIsolada.jsf" ) > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusAlterarLoteIsolada.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificaStatusLoteExclusaoAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificaStatusPagamentoExclusaoAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusAlteracaoLoteAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificaStatusPagamentoAlteracaoAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteLoteAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovantePagamentoAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteAlteracaoLoteAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteAlteracaoLoteAutorizacaoPendente.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/detatalheLotePendente.jsf") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusLoteExclusaoIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusPagamentoExclusaoIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusAlteracaoLoteIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteExclusaoLoteIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteExclusaoPagamentoIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteAlteracaoLoteIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteAlteracaoPagamentoIsolada.jsf" ) > 0 ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusPagamentoIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusLoteIsolada.jsf" ) > 0  ||
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoOrdemPagamentoIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoTedIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoDocIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoCreditoContaIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoCredContaSalarioIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoDarfIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoGpsIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoGareIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoCodBarrasIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoBoletosIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/comprovanteInclusaoPagamentoRastrBoletosIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusIncluirPagamentoIsolada") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/erroDetalheLotePendente") > 0 || 
			window.location.href.indexOf("ibpjmultipagmanutencao/verificarStatusAlterarPagamentoIsolada.jsf" ) > 0 )  {
					return true;
	} else {
		return false;
	}
}
function estilosFacelift() {
	var path = jQuery('link')[2].href;
	arrUrl = path.split('/');
	dominioUrl = arrUrl[2];
	url = arrUrl[0] + '//' + dominioUrl + '/ibpj/conteudo/js/geral/default-novolayout.js'
	urlCss = arrUrl[0] + '//' + dominioUrl + '/ibpj/conteudo/css/geral/estrutura-novolayout.css'

	//url = jQuery('script').eq(3).attr('src').replace('jquery.js', 'default-novolayout.js');

	//injeta o JS no JSP no momento do carregamento
	var imported = document.createElement('script');
	imported.src = url;
	document.head.appendChild(imported);

	//var head = document.getElementsByTagName('head')[0];
	var style = document.createElement('link');
	style.href = urlCss;
	style.type = 'text/css';
	style.rel = 'stylesheet';
	
	// função para correção de pisca na tela (legado x guide), após o carregamento da pagina ele desabilita a opacidade assim mostrando a tela com o guide , 
	// a opacidade foi colocado na folha de estilo do guide a core.css para não influenciar nas outras aplicações;
	
	//style.onload = function(){try {jQuery("div#conteudo.conteudo_pagina").attr("style", "opacity:1 !important");}catch(e){}}

	
	
	document.head.appendChild(style);
}
  
//Alterar estrutura da pagina inicial para o novo guide.
function alterarEstrutura(){
	jQuery('#lateral', window.top.document).hide();
	jQuery('#paginaCentral', window.top.document).attr('width', '985px');
	jQuery('#paginaCentral', window.top.document).show();
	jQuery('#conteudoPrincipal', window.top.document).attr('style', 'width:985px;');
	jQuery('#conteudo', window.top.document).attr('style', 'background-color: #f0f1f5;');
	jQuery('.dadosHeader, .stepsBar01', window.top.document).show();
	jQuery('#topo', window.top.document).attr('style', 'background-color: #f0f1f5;height:200px;');
	jQuery('#alerta', window.top.document).attr('style', 'background-color:#f0f1f5');
	jQuery('body').attr('style','background-color:#f0f1f5 !important');
	setTimeout(function(){jQuery('#alerta', window.top.document).addClass('none_i')}, 200);
}

function desativarFacelift(){
    jQuery('#lateral, #rodape', window.parent.document).show();
    jQuery('#paginaCentral', window.parent.document).attr('width', '752px');
    jQuery('#conteudoPrincipal', window.parent.document).attr('style', 'width: 752px;');
    //jQuery('#conteudo', window.parent.document).attr('style', 'background-color: #E4E4E4;'); 
	jQuery('.dadosHeader, .stepsBar01', window.parent.document).hide();
    jQuery('#topo', window.parent.document).removeAttr('style');
    jQuery('#alerta', window.parent.document).removeAttr('style');
	setTimeout(function(){jQuery('#alerta', window.top.document).removeClass('none_i')}, 200);
}

jQuery(document).ready(function() {

	var path = jQuery('link')[2].href;
	arrUrl = path.split('/');
	dominioUrl = arrUrl[2];
	jQuery.getScript(arrUrl[0] + '//' + dominioUrl + '/ibpj/conteudo/js/geral/purify-2.5.6.min.js', function() {
	});

	var valor = sessionStorage.getItem("facelift_" + contexto);
	if (valor != null) {
		if (valor != "2" && ehExcecaoFacelift() == false) { // 2 -> Aplicação Angular
			try {
				estilosFacelift();
			} catch(e){}
		}				
	} else {
		if(window.name != 'modal_infra_estrutura'){
			desativarFacelift();		
		}  
	} 
});


/**jQuery(window).load(function() {
	
	if (sessionStorage.getItem("facelift_" + contexto) != null) {
		if (ehExcecaoFacelift() == false) {
			try {
				estilosFacelift();
			} catch(e){}
		}				
	} else {
		if(window.name != 'modal_infra_estrutura'){
			desativarFacelift();		
		}  
	} 
	

});**/


/*--------------------------------------*\
| Facelift-- FIM        |
\*--------------------------------------*/

jQuery(window).load(function() {
	try { initCarrossel(true); } catch (e) { console.log(e); };

	try {
		// Determinar se existe c�digo de tagueamento
		var codigoTagueamento = getUrlParameter('codigoTagueamento');
		if (codigoTagueamento == null) {
			//Determinas se o servi�o � Saldos/Extratos
			var carSaldosExtratos = '';
			var codigoTela = jQuery('.txt-codigoTela').html(); 
			if (codigoTela != null) {
				carSaldosExtratos = codigoTela.substring(0,3);
			}
			if (carSaldosExtratos == 'SSC' || carSaldosExtratos == 'SEC' || carSaldosExtratos == 'SMC') {
				var tipoDeConta = 'cc';
				var agConta = $($($(".lstContas").find("li")[0]).find("span")[0]).html();
				var numConta = $($($(".lstContas").find("li")[0]).find("span")[1]).html();
				var digConta = $($($(".lstContas").find("li")[0]).find("span")[3]).html();
				var CTRL = getUrlParameter('CTRL');
				if (CTRL != null) {
					var parametrosCampanhaEvento = "CTRL=" + CTRL + "&CAR=" + carSaldosExtratos + "&agConta=" + agConta + "&numConta=" + numConta + "&digConta=" + digConta + "&razoesDasContas=" + tipoDeConta;
						jQuery.ajax({
							type: 'POST',
							url: urlCampanhaEvento,
							data: parametrosCampanhaEvento,
							error: function (jqXHR, textStatus, errorThrown) {},
							success: function(xmlDados, textStatus, jqXHR) {
								if (jqXHR.status==200) {
									var frameCampanha = parent.document.getElementById('paginaEntretela');
									var frameDoc = frameCampanha.contentDocument || frameCampanha.contentWindow.document;
									if (xmlDados.indexOf('campanhaPorEvento') > 0) {
										jQuery(frameDoc.body).empty();
										frameDoc.open();
										frameDoc.write(/^[\x00-\x7F]*$/.test(xmlDados));
										frameDoc.close();
									}
								}
							}
							});
				}
			}else{
				// Determinar se estamos no primeiro passo do servi�o
				var textoPasso = jQuery('.UISequenciaPasso-active').find('span').html();
				if (textoPasso == null)  { // MV
					textoPasso = jQuery('.active').find('span').html();
				}
				var index = textoPasso.indexOf('.');
				var numeroPasso = textoPasso.substring(0, index).trim();
				var contaDebito = jQuery("input[name='contaDebito']").val(); // TOP 10
				var tipoDeConta = jQuery("input[name='tipoDeConta']").val(); // MV
				if (contaDebito == null || contaDebito == undefined) {
					var cdConta = jQuery("input[name='cdConta']").val();
					if (cdConta == null || cdConta == '') {
						cdConta = 0;
					}
					if (tipoDeConta.match("^Conta Corr")) {
						tipoDeConta = 'cc';
					} else if (tipoDeConta.match("^Conta Poupa")) {
						tipoDeConta = 'cp';
					} else if (tipoDeConta.match("^Conta Invest")) { 
						tipoDeConta = 'ci';
					} else {
						tipoDeConta = 'cc,cp';
					}
				} else { // TOP 10
					var dados = contaDebito.split(',');
					cdConta = dados[0];
					tipoDeConta = dados[1];
					if (tipoDeConta == '1') {
						tipoDeConta = 'cc';
					} else if (tipoDeConta == '2') {
						tipoDeConta = 'cp';
					} else if (tipoDeConta == '3') {
						tipoDeConta = 'ci';
					} else {
						tipoDeConta = 'cc,cp';
					}
				}
				var CTRL = getUrlParameter('CTRL');
				if (numeroPasso == '1' && CTRL != undefined && CTRL != null) { // Primeiro passo do servi�o
					var car = "";
					var codigoTela = jQuery('.txt-codigoTela').html(); 
					if (codigoTela != null) {
						car = codigoTela.substring(0,3);
	
  }
					var parametrosCampanhaEvento = "CTRL=" + CTRL + "&CAR=" + car + "&cdConta=" + cdConta + "&razoesDasContas=" + tipoDeConta;
					jQuery.ajax({
						type: 'POST',
						url: urlCampanhaEvento,
						data: parametrosCampanhaEvento,
						error: function (jqXHR, textStatus, errorThrown) {},
						success: function(xmlDados, textStatus, jqXHR) {
							if (jqXHR.status==200) {
								var frameCampanha = parent.document.getElementById('paginaEntretela');
								var frameDoc = frameCampanha.contentDocument || frameCampanha.contentWindow.document;
								if (xmlDados.indexOf('campanhaPorEvento') > 0) {
									jQuery(frameDoc.body).empty();
									frameDoc.open();
									frameDoc.write(xmlDados);
									frameDoc.close();
								}
							}
						}
						});
				}
				
			}
		}
	} catch (err) {
	}
  
  
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

(function ($) {
    $(function() {
		var re = /^([a-zA-Z]+)([\d]+)$/;
		codigoTelaComPasso = $(".txt-codigoTela").html();
		try {
			if(!$('#modalInfraEstrutura').length) {
				var codigoTelaAtual = jQuery.trim(codigoTelaComPasso);
				var itemAtivado = false;
				if (codigoTelaAtual != null && codigoTelaAtual != '') {
					var siglaPaiAtual = codigoTelaAtual.substr(0, 1);
					for (var i = 0; i < arrayCodigosPai.length; i++) {
						if (siglaPaiAtual == arrayCodigosPai[i]) {
							var item = window.top.document.getElementById('menuP');
							var itemAcionado = jQuery(item).find('.topmenu_' + siglaPaiAtual);
							jQuery("#menuP ul li a.on", window.top.document).removeClass("on");
							jQuery(itemAcionado).addClass("on");
							itemAtivado = true;
							break;
						}
					}
					if (itemAtivado == false) {
						for (var i = 0; i < arrayCodigosNulo.length; i++) {
							if (siglaPaiAtual == arrayCodigosNulo[i]) {
								jQuery("#menuP ul li a.on", window.top.document).removeClass("on");
								break;
							}
						}
					}
				}
			}
    	} catch (e) {
		}
		// OBTEN��O DO C�DIGO DO SERVI�O E DO N�MERO DO PASSO...
		if (codigoTelaComPasso && codigoTelaComPasso.length && re.test(codigoTelaComPasso)) {
			codigoTela = RegExp.$1;
			numeroPasso = RegExp.$2;
		}
		else {
			codigoTelaComPasso = '';
		}

    	// FUN��ES P/ MODAL
    	//INICIA O PLUG-IN DO MODAL
    	$(".jqmWindow").jqm({
            modal: true,
    		onShow: initModal,
    		onHide: exitModal
    	});

    	// Modal que impede fechamento da janela qdo clicar fora ou escape
	  	$(".modalNaoFecha").jqm({
			modal: true,
	    	onShow: initModal,
	    	onHide: exitModal
	  	});


    	// COMBO
	  	var cmbContaKeys = new Array();
    	if (typeof($.combo) != "undefined") {
    		$.each($(".cmbConta > option"), function() {
    			$arr = $(this).text().split(" | ");
    			if ($arr.length == 3) {
	    			$arrWords = $arr[2].replace("-", " ").split(" ");
	    			$key = "";
	    			for($loop = 0; $loop < $arrWords.length; $loop++) {
	    				$key = $key + $arrWords[$loop].charAt(0);
	    			}
	    			cmbContaKeys[$key.toLowerCase()] = $arr[2];
    			}
    		})
    		$(".combo.cmbConta").combo({
    			changeCallback:function(){
    				$(this.selectbox).parents(".campos_form").removeClass("form_erro");
    			},
    			filterFn: function(currentComboValue, itemValue, allComboValues , itemTitle) {
	    			if (!this.multiple) {
	    				var dado = cmbContaKeys[currentComboValue.toLowerCase()];
	    				if(dado != null) {
	    					return itemValue.toLowerCase().search(dado.toLowerCase()) != -1 ? $.highLight(itemValue, dado) : false;
	    				} else {
	    					return itemValue.toLowerCase().search(currentComboValue.toLowerCase()) != -1 ? $.highLight(itemValue, currentComboValue) : false;
					}
				} else {
				}
			}
		});
		
    		$(".combo:not(.cmbConta)").combo({changeCallback:function(){
    			$(this.selectbox).parents(".campos_form").removeClass("form_erro");
    		}});
    	}
	

        // CLASSE PARA ABRIR O MODAL AUTOMATICAMENTE
    	$(".openModal:not(.inativo .openModal)").live('click' , function(evt) {
    		$(".jqmWindow").jqmHide();
    		$(this).is("input") ? $($(this).attr("alt")).jqmShow() : $($(this).attr("href")).jqmShow();
    		evt.preventDefault();
    	});

        // CLASSE PARA FECHAR O MODAL
        $(".closeModal").click(function() {
						parent.fecharModalInfraEstrutura();
						//$(this).closest(".jqmWindow").jqmHide();
            return false;
        });
		
    	// FECHAR MODAL NO ESC
    	$(document).keypress(function(e){
			try {
				if (e.keyCode == 27) {
					if (parent && parent.fecharModalInfraEstrutura) {
						parent.fecharModalInfraEstrutura();
					}
					// incluido para funcionamento do modal da tela inicial/mensagem e avisos
				// alterado para impedir o fechamento quando for modal que nao deve fechar
				$(".jqmWindow:visible:not(.modalNaoFecha)").jqmHide();
				}
		   	} catch (e) {
			 
			}
    	});
		
        // FUN��ES P/ MODAL

		// CLASSE PARA ABRIR O MODAL AUTOMATICAMENTE

		
        // CONTADOR CARACTERES
    	$(".cont_caracteres").keyup(function() {
    		var idCampo = $(this).attr("id");
    		if (idCampo.indexOf(":") >= 0) {
    			idCampo = idCampo.split(":")[1];
    		}
    		try {
    			$("span.cont_" + idCampo).text("[" + ($(this).val().length) + "]");
    		}
    		catch(err) {
    		}
    	});

    	// Contagem regressiva
   
        (function ($){
            var contComp = $('.cont_regr_caracteres');
            $.each(contComp, function() {
                if(contComp.length > 0){
                    if(contComp.val().length > 0){
                        var idCampo = $(this).attr('id');
                        var lenCampo = $('#' + idCampo).val().length;
                        var maxLenCampo = $('#' + idCampo).attr("maxlength");
                        if (idCampo.indexOf(":") >= 0) {
                            idCampo = idCampo.split(':')[1];
                        }
                        try {
                            $("span.cont_" + idCampo).text("[" + (maxLenCampo - lenCampo) + "]");
                        }
                        catch(err) {
                        }
                    }
                }
            });
        })(jQuery);
        
    	$(".cont_regr_caracteres").keyup(function() {
    		var idCampo = $(this).attr("id");
    		if (idCampo.indexOf(":") >= 0) {
    			idCampo = idCampo.split(":")[1];
    		}
    		try {
	    		$("span.cont_" + idCampo).text("[" + ($(this).attr("maxlength") - $(this).val().length) + "]");
			}
			catch(err) {
			}
    	});
		// CONTADOR CARACTERES
		// Navega��o entre frames migra��o visual paginaCentral >> iframeAutenticador
		$(document).bind('keyup', function (e) {
			var code = e.keyCode || e.which;
			if (code == 9) {
				jQuery("#iframeAutenticador").attr("class", "tabindex");
				//if(jQuery("#iframeAutenticador").hasClass("tabindex")){alert("****");}
			}
		});
					
		// TAMANHO DE FONTE
		//Aumento de fontes do comprovante
		
		//Verificar qual o tamanho da fonte ao carregar o comprovante e setar no iframe.

		//Verificar top10, pois as classes para o aumento de fontes � diferente.
			//Migra��o Visual
		jQuery("ul#UIFontSize li.UIFontSize-firstButton-li").click(function() {
			try {
				$("iframe").contents().find(".mioloFs12, .mioloFs13, .mioloFs14").addClass("mioloFs12").removeClass("mioloFs13").removeClass("mioloFs14");		
    		}
				catch(err) {
    		}				
		});
		jQuery("ul#UIFontSize li.UIFontSize-secondButton-li").click(function() {
		try {
			$("iframe").contents().find(".mioloFs12, .mioloFs13, .mioloFs14").addClass("mioloFs13").removeClass("mioloFs12").removeClass("mioloFs14");		
    		}
    		catch(err) {
    		}			
		});
		jQuery("ul#UIFontSize li.UIFontSize-thirdButton-li").click(function() {
		try {
			$("iframe").contents().find(".mioloFs12, .mioloFs13, .mioloFs14").addClass("mioloFs14").removeClass("mioloFs12").removeClass("mioloFs13");		
    		}
    		catch(err) {
    		}			
		});		
		
			//Top10
			
		jQuery("ul#UIFontSize li.UIFontSize-firstButton-li").click(function() {
			try {
				$("iframe").contents().find(".UIFontSize-level-1, .UIFontSize-level-2, .UIFontSize-level-3").addClass("UIFontSize-level-1").removeClass("UIFontSize-level-2").removeClass("UIFontSize-level-3");		
    		}
				catch(err) {
    		}				
		});
		jQuery("ul#UIFontSize li.UIFontSize-secondButton-li").click(function() {
		try {
			$("iframe").contents().find(".UIFontSize-level-1, .UIFontSize-level-2, .UIFontSize-level-3").addClass("UIFontSize-level-2").removeClass("UIFontSize-level-1").removeClass("UIFontSize-level-3");		
    		}
    		catch(err) {
    		}			
		});
		jQuery("ul#UIFontSize li.UIFontSize-thirdButton-li").click(function() {
		try {
			$("iframe").contents().find(".UIFontSize-level-1, .UIFontSize-level-2, .UIFontSize-level-3").addClass("UIFontSize-level-3").removeClass("UIFontSize-level-1").removeClass("UIFontSize-level-2");		
    		}
    		catch(err) {
    		}			
		});		
		//Final aumento de fontes do comprovante
		
		// Verifica se a p�gina n�o est� utilizando o tamanho de fonte da AWB
		if ($("#UIFontSize").length == 0) {
			// Adi��o dos eventos .click nos bot�es de tamanho de fonte.
			var tamanhoFonte = [];
			var $aux = $(".listaPersonalizacao .tp2");

			if ($aux.length > 0) {

				tamanhoFonte[0] = $aux;
				tamanhoFonte[1] = $(".listaPersonalizacao .tp3");
				tamanhoFonte[2] = $(".listaPersonalizacao .tp4");

				for (var i = 0; i < tamanhoFonte.length; i++) {
					$(tamanhoFonte[i]).bind("click", {tamanho: i + 1}, function(event) {
						$(this).closest("ul").find("li").removeClass("On");
						$(this).addClass("On");
						// Altera o tamanho da fonte do conte�do da p�gina e das p�ginas dentro dos frames
						aplicaTamanhoFonte(event.data.tamanho);
						if (!inicializando) {
							salvaTamanhoFonte(event.data.tamanho, codigoTela, numeroPasso);
						}
					});
				}
			}

			// Recupera��o de tamanho de fonte de forma ass�ncrona.
			obtemTamanhoFonteConfigurado(codigoTela, numeroPasso, callbackInicializaTamanhoFonte);
		}

		// TAMANHO DE FONTE

        // EXPANS�VEIS LATERAL // #### HDA - Tratamento do expansivel de Apoio e Atendimento do menu lateral esquerdo para exibi��o/inibi��o do Assistente ####
    	$("#lateral dt a").not(".editar").click(function(evt) {
    		$(this).toggleClass("on");
    	});

    	// EXPANSIVEL AJUDA
        $("#btn_ajuda").attr("title", "Pressione ENTER para Obter Ajuda. Utilize as setas para navegar.");
    	$("#btn_ajuda").click(function() {
    		var btnAjuda = $(this);
    		var ajudaLeitura = $(".box-ajuda .ajuda-leitura");
    		if (btnAjuda.hasClass("active")) {
    			$(".box-ajuda").slideUp(300, function() {
    				btnAjuda.removeClass("active");
                    btnAjuda.attr("title", "Pressione ENTER para Obter Ajuda. Utilize as setas para navegar.");
    				if (ajudaLeitura.length > 0) {
        			    btnAjuda.attr("tabindex", ajudaLeitura.attr("tabindex"));
        			    ajudaLeitura.removeAttr("tabindex");
	       			    btnAjuda.focus();
        			}
    			});
    		}
    		else {
    			btnAjuda.addClass("active");
    			$(".box-ajuda").slideDown(300, function() {
                    btnAjuda.attr("title", "Pressione ENTER para fechar ajuda. Utilize as setas para navegar.");
        			if (ajudaLeitura.length > 0) {
            			ajudaLeitura.attr("tabindex", btnAjuda.attr("tabindex"));
            			btnAjuda.removeAttr("tabindex");
            			ajudaLeitura.focus();
                    }
    			});
    		}
    	});

    	$(".box-ajuda .btn-fechar").click(function(){
    		$("#btn_ajuda").click();
    	});

    	$(".box-ajuda .ajuda-leitura").keyup(function(e) {
    		if (e.which == 13) {
    			$("#btn_ajuda").click();
    		}
    	});
    	// EXPANSIVEL AJUDA

        // HOVER
        $("#lateral dt").hover(function() {
            $(this).find("a.editar, span.drag").addClass("visible");
        }, function() {
            $(this).find("a.editar, span.drag").removeClass("visible");
        });
        // FUN��ES PARA MENU LATERAL

        // LINKS INATIVOS
        $(".inativo a").live('click', function() {
            return false;
        });
        // LINKS INATIVOS

	jQuery(window).load(function() {
		jQuery('table tr.select td:not(.noSelect)').click(function() {
			if(jQuery(this).parent().find('input:[type=checkbox]').attr('checked')){
				jQuery(this).parent().find('input:[type=checkbox]').removeAttr('checked');
			}else{
				jQuery(this).parent().find('input:[type=checkbox]').attr('checked','checked');
			}
		})
		jQuery('table tr.select td:not(.noSelect)').click(function() {
			if(jQuery(this).parent().find('input:[type=radio]')){
				jQuery(this).parent().find('input:[type=radio]').attr('checked','checked');
			}
		})		 
	});


        // CAMPOS NUMERICOS
        
        $("input.numeric").keyup(function(e) {
    		if ($.checkKey(e)) {
    		   	// Obt�m a posi��o atual do cursor
    		   	var caretPos = $(this).caret();
   				var len = $(this).val().length;
    		   	// Substitui caracteres inv�lidos (no IE isso coloca o cursor no final do campo)
    			$(this).val($(this).val().replace(/\D/g, ""));
    		   	// Posiciona o cursor
    			$(this).caret(caretPos - (len - $(this).val().length));
			}
        });
       // CAMPOS NUMERICOS

    	// CAMPOS DE MOEDA
    	$.inputCurrency = $(".inputCurrency");
    	$.inputCurrency.each(function(){
    		if($(this).val() == "") {
    			$(this).val("0,00");
    		}
    	});
    	$.inputCurrency.live("click focus", function(e) {
    		if($(this).val() == "0,00") {
    			$(this).val("");
    		}
    	});
    	$.inputCurrency.live("blur", function(e) {
			$(this).val(currencyFormatted($(this).val()));
			if ($(this).val().length == 0) {
    			$(this).val("0,00");
			}
			else if($(this).val().length <= 2) {
				if (parseInt($(this).val(), 10) == 0)
					$(this).val("0,00");
				else
					$(this).val($(this).val() + ",00");
			}
    	});
    	$.inputCurrency.live("keyup", function(e) {
    		if ($.checkKey(e)) {
    		   	// Obt�m a posi��o atual do cursor
    		   	var caretPos = $(this).caret();
   				var len = $(this).val().length;
    			$(this).val(currencyFormatted($(this).val().replace(/\D/g, "")));
    		   	// Posiciona o cursor
    		   	var caretNewPos = caretPos - (len - $(this).val().length);
    		   	if (caretNewPos < 0) caretNewPos = 0;
    			$(this).caret(caretNewPos);
    		}
    	});
		$.inputCurrency.live("keydown", function(e) {
			if( $.checkKey(e) && e.which !=  8 && e.which != 46 ) {
				jQuery(this).trigger("keyup");
			}

		});
		$.inputCurrency.live('paste',function(e){
			inputMaxlength = $(this).attr("maxlength");
			var data = e.originalEvent.clipboardData.getData('Text');
			if (data.length > (inputMaxlength - 3)) {
				return false;
			} else {
				return true;
			}
		});
		
    	// CAMPOS DE MOEDA

    	$.checkKey = function(e) {
    		var ret = false;
    		if (
                e.which !=  9 &&    /* tab */
                e.which != 13 &&    /* enter */
    		    e.which != 16 &&    /* shift */
    		    e.which != 17 &&    /* ctrl */
    		    e.which != 27 &&    /* esc */
    		    e.which != 35 &&    /* end */
    		    e.which != 36 &&    /* home */
    		    e.which != 37 &&    /* seta direcional esquerda */
    		    e.which != 38 &&    /* seta direcional cima */
    		    e.which != 39 &&    /* seta direcional direita */
    		    e.which != 40       /* seta direcional baixo */
    		   ) {
    		   	ret = true;
    		}
			return ret;
    	};

        function hasClassRegex(el, selector) {
            return (el.className && new RegExp("(^|\\s)" + selector + "(\\s|$)").test(el.className));
        }
        function hasClassRegex2(el, regexp) {
            return (el.className && regexp.test(el.className));
        }
        var regexp_tabfirst = new RegExp("(^|\\s)tabfirst(\\s|$)");
        var regexp_tabn = new RegExp("(^|\\s)\u0074\u0061\u0062\u002d([\\d]+)(\\s|$)");
        // AUTO TABINDEX
        var retry = false;
    	$.tabindex = function(v) {
    	    logNow("tabindex: inicio");
    		var j, classes, re, bAjuste, ajuste, ti;
            var v1 = $.extend({index: 1, search: "body .tabindex:not(font,table):first", filter: ""}, v);
            v = $.extend({index: 1, search: "body .tabindex:not(font,table)", filter: ""}, v);
            var $itensTabindex = $(v1.search);
			var isFrameExterno = $("#" + mioloWindowName).length > 0 ? true : false;

    		if ($itensTabindex.length > 0) {
	            if (window.name == modalWindowName && !retry) {
	                //� janela modal, postergar processamento.
	                retry = true;
	                setTimeout("$.tabindex()", modalFadeIn + 100);
	            }

	            // Insere elementos para controle de navega��o entre �reas/frames
	            if (isFrameExterno) {
					var $aux1;
					var $aux2;
					var HTML_A = '<a href="javascript:;" title="" class="tabindex" style="font-size:1px;">&nbsp;</a>';
					var HTML_DIV = '<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;" />';

					var $topo = $("#topo");
					var $lateral = $("#miolo #lateral");
					var $rodape = $("#rodape");
					var $iframe = $("#miolo #paginaCentral");
                    var $comprovante = $("#iframeComprovante");
                    var $autenticador = $("#iframeAutenticador");
                    

					if ($topo.find("#topo_hiddentabfirst").length == 0) {
						$aux1 = $(HTML_A).attr("id", "topo_hiddentabfirst");
						$aux2 = $(HTML_A).attr("id", "topo_hiddentablast");
						$topo.prepend($aux1);
						$topo.append($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}

					if ($iframe.parent("div").find("#miolo_hiddentabbeforeout").length == 0) {
						$aux1 = $(HTML_A).attr("id", "miolo_hiddentabbeforeout");
						$aux2 = $(HTML_A).attr("id", "miolo_hiddentabbeforein");
						$iframe.before($aux1);
						$iframe.before($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);

						$aux1 = $(HTML_A).attr("id", "miolo_hiddentabafterout");
						$aux2 = $(HTML_A).attr("id", "miolo_hiddentabafterin");
						$iframe.after($aux1);
						$iframe.after($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}

					if ($comprovante.parent("div").find("#comprovante_hiddentabbeforeout").length == 0) {
						$aux1 = $(HTML_A).attr("id", "comprovante_hiddentabbeforeout");
						$aux2 = $(HTML_A).attr("id", "comprovante_hiddentabbeforein");
						$comprovante.before($aux1);
						$comprovante.before($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);

						$aux1 = $(HTML_A).attr("id", "comprovante_hiddentabafterout");
						$aux2 = $(HTML_A).attr("id", "comprovante_hiddentabafterin");
						$comprovante.after($aux1);
						$comprovante.after($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}

					if ($autenticador.parent("div").find("#autenticador_hiddentabbeforeout").length == 0) {
						$aux1 = $(HTML_A).attr("id", "autenticador_hiddentabbeforeout");
						$aux2 = $(HTML_A).attr("id", "autenticador_hiddentabbeforein");
						$autenticador.before($aux1);
						$autenticador.before($aux2);
						
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);

						$aux1 = $(HTML_A).attr("id", "autenticador_hiddentabafterout");
						$aux2 = $(HTML_A).attr("id", "autenticador_hiddentabafterin");
						$autenticador.after($aux1);
						$autenticador.after($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}

					if ($lateral.find("#lateral_hiddentabfirst").length == 0) {
						$aux1 = $(HTML_A).attr("id", "lateral_hiddentabfirst");
						$aux2 = $(HTML_A).attr("id", "lateral_hiddentablast");
						$lateral.prepend($aux1);
						$lateral.append($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}

					if ($rodape.find("#rodape_hiddentabfirst").length == 0) {
						$aux1 = $(HTML_A).attr("id", "rodape_hiddentabfirst");
						$aux2 = $(HTML_A).attr("id", "rodape_hiddentablast");
						$rodape.prepend($aux1);
						$rodape.append($aux2);
						$aux1.wrap(HTML_DIV);
						$aux2.wrap(HTML_DIV);
					}
	        	}
	            else if (window.name != modalWindowName) {
					if (!document.getElementById('hiddentablast')) {
						hiddenTabFirst = $('<a href="javascript:;" title="" id="hiddentabfirst" class="tabindex" style="font-size:1px">&nbsp;</a>');
						hiddenTabLast = $('<a href="javascript:;" title="" id="hiddentablast" class="tabindex" style="font-size:1px">&nbsp;</a>');
						$("body").prepend(hiddenTabFirst);
						$("body").append(hiddenTabLast);
						hiddenTabFirst.wrap('<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;" />');
						hiddenTabLast.wrap('<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;" />');
					}
	            }

				// Remove eventuais elementos criados para navega��o entre frames
	    		$(".tabindexBeforeFrame, .tabindexAfterFrame").remove();

	    		// Refaz a pesquisa para considerar as eventuais inclus�es e remo��es
	    		$itensTabindex = $(v.search);
                var $tabfocus_1 = null;
                var $tabfocus_2 = null;
	    		$itensTabindex.each(function(i) {
	                // Verifica se � um iframe
					if (this.nodeName == "IFRAME" && (!(isFrameExterno && ($(this).attr("name") == mioloWindowName)) || !(isFrameExterno && ($(this).attr("name") == frameAutenticadorName)))) {
                    //if (this.nodeName == "IFRAME" && !(isFrameExterno && ($(this).attr("name") == mioloWindowName))) {
						// Insere um link antes e outro depois do iframe para controle de navega��o entre os frames
						var $linkAntes = $('<a style="font-size:1px;" onfocus="mudaFocoAutenticador()"><script>function mudaFocoAutenticador(){jQuery("#iframeAutenticador").contents().find(".senhaCertificado").focus();}</script>&nbsp;</a>').attr("tabindex", v.index++);

						var $linkDepois = $('<a style="font-size:1px;">&nbsp;</a>').attr("tabindex", v.index++);
						$(this).before($linkAntes).after($linkDepois);
						$linkAntes.wrap('<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;" class="tabindexBeforeFrame" />');
						$linkDepois.wrap('<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;" class="tabindexAfterFrame" />');
						$linkAntes.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 0, seletor: v.search + v.filter}, colocaFocoFrame);
						$linkDepois.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 2, seletor: v.search + v.filter}, colocaFocoFrame);
	                }
	                else {
		                bAjuste = false;
		                // Procura nas classes do elemento se existe uma no formato tab-N
                        if (hasClassRegex2(this, regexp_tabn)) {
                            bAjuste = true;
                            ajuste = parseInt(RegExp.$2, 10);
                        }
		                if (bAjuste) {
		                    // Se o elemento possui a classe de ajuste tab-N, reposiciona os N elementos anteriores ...
		    	            for (var i = 1; i <= ajuste; i++) {
		    	                var $aux = $("[tabindex=" + (v.index - i) + "]");
		    	                var oldTabindex = parseInt($aux.attr("tabindex"), 10);
		    	                $aux.attr("tabindex", oldTabindex + 1);
		    	            }
		                    // ... e coloca o elemento na posi��o -N
                            this.tabIndex = v.index++ - ajuste;
		                }
		                else {
                            this.tabIndex = v.index++;
		                }
                        //pre sele? de tabfirst
                        if (hasClassRegex2(this, regexp_tabfirst) && $(this).is(":visible")) {
                           $tabfocus_1 = $(this);
                        }                        
                        if (this.tabIndex == 2) {
                            $tabfocus_2 = $(this);
		                }
		            }
	    		});
	            // Ajusta a navega��o entre �reas
	            if (window.name != modalWindowName) {
					//navega��o entre frames por setas virtual vision
					if (window.name == frameComprovanteName){
						var $iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
						$iframe.removeClass("tabindex").removeAttr("tabIndex").removeAttr("tabindex");
					}
					
	            	if (window.name == mioloWindowName) {
						var $iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
						if ($iframe.length > 0) {
		                    hiddenTabFirst.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 3, delta: 1, seletor: v.search + v.filter}, colocaFocoFrame);
		                    hiddenTabLast.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 1, delta: 1, seletor: v.search + v.filter}, colocaFocoFrame);
						}
						else {
			        		var $tabfirst = $(".tabindex[tabindex=2]");
			        		var $tablast = $(".tabindex[tabindex=" + (v.index - 2) + "]");
			        		if ($tablast.length > 0) {
			                    hiddenTabFirst.unbind("focus", colocaFoco).bind("focus", {destino: $tablast.get(0)}, colocaFoco);
			                }
			        		if ($tabfirst.length > 0) {
			                    hiddenTabLast.unbind("focus", colocaFoco).bind("focus", {destino: $tabfirst.get(0)}, colocaFoco);
			                }
			            }
	            	}
					else if (window.name == frameAutenticadorName) {
						var $iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
						if ($iframe.length > 0) {
							hiddenTabFirst.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 3, delta: 1, seletor: v.search + v.filter}, colocaFocoFrame);
							hiddenTabLast.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 1, delta: 1, seletor: v.search + v.filter}, colocaFocoFrame);
						} else {
							var $tabfirst = $(".tabindex[tabindex=2]");
							var $tablast = $(".tabindex[tabindex=" + (v.index - 3) + "]");
							if ($tablast.length > 0) {
								hiddenTabFirst.unbind("focus", colocaFoco).bind("focus", {destino: $tablast.get(0)}, colocaFoco);
							}
							if ($tabfirst.length > 0) {
								hiddenTabLast.unbind("focus", colocaFoco).bind("focus", {destino: $tabfirst.get(0)}, colocaFoco);
							}
						}	
							
					}
						
                    else if (window.parent != window) {
						var $iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
						if ($iframe.hasClass("tabindex")) {
							hiddenTabFirst.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 3, seletor: v.search + v.filter}, colocaFocoFrame);
							hiddenTabLast.unbind("focus", colocaFocoFrame).bind("focus", {sentido: 1, seletor: v.search + v.filter}, colocaFocoFrame);
						}
						else {
							var $tabfirst = $(".tabindex[tabindex=2]");
							var $tablast = $(".tabindex[tabindex=" + (v.index - 2) + "]");
							if ($tablast.length > 0) {
								hiddenTabFirst.unbind("focus", colocaFoco).bind("focus", {destino: $tablast.get(0)}, colocaFoco);
							}
							if ($tabfirst.length > 0) {
								hiddenTabLast.unbind("focus", colocaFoco).bind("focus", {destino: $tabfirst.get(0)}, colocaFoco);
							}
						}
					}
					else if (isFrameExterno) {
						var $topo = $("#topo");
						var $topoItens = $topo.find(".tabindex");
						var $topoTabFirst = $topoItens.eq(1);
						var $topoTabLast = $topoItens.eq($topoItens.length - 2);

						var $lateral = $("#miolo #lateral");
						var $lateralItens = $lateral.find(".tabindex");
						var $lateralTabFirst = $lateralItens.eq(1);
						var $lateralTabLast = $lateralItens.eq($lateralItens.length - 2);

						var $rodape = $("#rodape");
						var $rodapeItens = $rodape.find(".tabindex");
						var $rodapeTabFirst = $rodapeItens.eq(1);
						var $rodapeTabLast = $rodapeItens.eq($rodapeItens.length - 2);

						// Topo --> Miolo
						$("#topo_hiddentablast").unbind("focus", colocaFoco).bind("focus", {destino: $("#miolo_hiddentabbeforein").get(0)}, colocaFoco);
						$("#miolo_hiddentabbeforein").unbind("focus", colocaFocoFrame).bind("focus", {sentido: 0, seletor: v.search + v.filter}, colocaFocoFrame);
						// Miolo --> Lateral
						$("#miolo_hiddentabafterout").unbind("focus", colocaFoco).bind("focus", {destino: $lateralTabFirst.get(0)}, colocaFoco);
						// Lateral --> Rodap�
						$("#lateral_hiddentablast").unbind("focus", colocaFoco).bind("focus", {destino: $rodapeTabFirst.get(0)}, colocaFoco);
						// Rodap� --> Topo
						$("#rodape_hiddentablast").unbind("focus", colocaFoco).bind("focus", {destino: $topoTabFirst.get(0)}, colocaFoco);

						// Topo <-- Miolo
						$("#miolo_hiddentabbeforeout").unbind("focus", colocaFoco).bind("focus", {destino: $topoTabLast.get(0)}, colocaFoco);
						// Miolo <-- Lateral
						$("#lateral_hiddentabfirst").unbind("focus", colocaFoco).bind("focus", {destino: $("#miolo_hiddentabafterin").get(0)}, colocaFoco);
						$("#miolo_hiddentabafterin").unbind("focus", colocaFocoFrame).bind("focus", {sentido: 2, seletor: v.search + v.filter}, colocaFocoFrame);
						// Lateral <-- Rodap�
						$("#rodape_hiddentabfirst").unbind("focus", colocaFoco).bind("focus", {destino: $lateralTabLast.get(0)}, colocaFoco);
						// Rodap� <-- Topo
						$("#topo_hiddentabfirst").unbind("focus", colocaFoco).bind("focus", {destino: $rodapeTabLast.get(0)}, colocaFoco);
					}
	            	else {
		        		var $tabfirst = $(".tabindex[tabindex=2]");
		        		var $tablast = $(".tabindex[tabindex=" + (v.index - 2) + "]");
		        		if ($tablast.length > 0) {
		                    hiddenTabFirst.unbind("focus", colocaFoco).bind("focus", {destino: $tablast.get(0)}, colocaFoco);
		                }
		        		if ($tabfirst.length > 0) {
		                    hiddenTabLast.unbind("focus", colocaFoco).bind("focus", {destino: $tabfirst.get(0)}, colocaFoco);
		                }
	            	}
	        	}

	            // Descobre o elemento que deve receber o foco inicial
                var $tabfocus = $tabfocus_1;
                if ($tabfocus == null) {
                    $tabfocus = $tabfocus_2;
                }
	    		if ($tabfocus != null && $tabfocus.length > 0) {

	                try {
                        if (flagTabFirst && !($("#txtPesquisar", top.document).hasClass("focoPesquisar"))) {
                            setTimeout(function() {
                                // Refaz verificacao do pesquisar caso o campo receba o foco durante a espera do timeout
                                try {
									if (document.getElementById('identificationForm:txtUsuario').toString().trim().equals("")) {
										document.getElementById('identificationForm:txtUsuario').focus();
									}	
                                }catch (err) {
                        		} 
                            }, 800);
                        }
	                }
	                catch (err) {
					}
	    		}
	    	}
    	    logNow("tabindex: fim");
        };

    	// Fun��o auxiliar utilizada para o repasse de foco
    	// A propriedade data do objeto de evento cont�m as seguintes informa��es
    	//	- destino: elemento DOM que deve receber o foco
    	function colocaFoco(evt) {
    		try {
    			evt.data.destino.focus();
    		}
    		catch (err) {
    		}
    	}

    	// Fun��o auxiliar utilizada para o repasse de foco entre frames
    	// A propriedade data do objeto de evento cont�m as seguintes informa��es
    	//	- sentido: 0 = do frame externo para o frame interno no sentido normal (tab)
    	//			   1 = do frame interno para o frame externo no sentido normal (tab)
    	//			   2 = do frame externo para o frame interno no sentido reverso (shift+tab)
    	//			   3 = do frame interno para o frame externo no sentido reverso (shift+tab)
    	//	- seletor: seletor a ser utilizado para encontrar os elementos dentro do frame
    	//	- delta: delta a ser considerado na identifica��o do elemento a partir do frame
    	colocaFocoFrame = function(evt) {
    		var destino = null
    		var pos;
    		var $iframe, $itens, $itensAux, $aux;
    		var delta = (evt.data.delta != undefined) ? evt.data.delta : 0;

    		switch (evt.data.sentido) {
    			case 0:
    				try {
		    			$iframe = $(this).parent().next();
		    			$itens = $(evt.data.seletor, $iframe.get(0).contentWindow.document);
		    			if ($itens.length > 0) {
		    				destino = $itens.filter("[tabindex=2]").get(0);
		    			}
		    		}
		    		catch (err) {
		    		}
	    			if (destino == null) {
	    				$itens = $(evt.data.seletor);
	    				pos = $itens.index($iframe);
	    				for (var i = pos + 1; i < $itens.length; i++) {
	    					$aux = $itens.eq(i);
			    			if ($aux.is(":visible") && !($aux.attr("disabled") == true))
			    				break;
		    			}
		    			destino = $aux.get(0);
	    			}
	    			break;
				case 1:
					$itens = $(evt.data.seletor, window.parent.document);
	    			if ($itens.length == 0)
	    				return;
	    			$iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
	    			pos = $itens.index($iframe);
    				for (var i = pos + delta + 1; i < $itens.length; i++) {
    					$aux = $itens.eq(i);
		    			if ($aux.is(":visible") && !($aux.attr("disabled") == true))
		    				break;
	    			}
					destino = $aux.get(0);
					break;
    			case 2:
					try {
		    			$iframe = $(this).parent().prev();
		    			if ($iframe.get(0).contentWindow.jQuery == null || $iframe.get(0).contentWindow.jQuery.itensTabIndex() == null) {
							// esse caso e caso onde o conteuo iframe nao possui referencia ao jquery ou aos elementos iniciados pelo tabindex
							$itens = $iframe.contents().find(".tabindex");
							
						} else {
							$itens = $iframe.get(0).contentWindow.jQuery.itensTabIndex();
						}
						if ($itens.length > 0) {
							var itens = ordenaPorTabindex($itens.toArray());
							$aux = null;
							if (itens.length > 1) {
								$aux = $(itens[itens.length - 2]);
								if ($aux.is("iframe")) {
									$itensAux = $aux.get(0).contentWindow.jQuery.itensTabIndex();
									var itensAux = ordenaPorTabindex($itensAux.toArray());
									$aux = $(itensAux[itensAux.length - 2]);
								}
							} else {
								$aux = $(itens[itens.length - 1]);
							}		
							destino = $aux.get(0);
						}
					}
		    		catch (err) {
		    		}
	    			if (destino == null) {
	    				$itens = $(evt.data.seletor);
	    				pos = $itens.index($iframe);
	    				for (var i = pos - 1; i >= 0; i--) {
	    					$aux = $itens.eq(i);
			    			if ($aux.is(":visible") && !($aux.attr("disabled") == true))
			    				break;
		    			}
		    			destino = $aux.get(0);
	    			}
	    			break;
				case 3:
					$itens = $(evt.data.seletor, window.parent.document);
	    			if ($itens.length == 0)
	    				return;
	    			$iframe = $("iframe[name=" + DOMPurify.sanitize(window.name) + "]", window.parent.document);
	    			pos = $itens.index($iframe);
    				for (var i = pos - delta - 1; i >= 0; i--) {
    					$aux = $itens.eq(i);
		    			if ($aux.is(":visible") && !($aux.attr("disabled") == true))
		    				break;
	    			}
					
					try {
						destino = $aux.get(0);
					}catch (e) {
						//navega��o por setas virtual vision
					}

	    			break;
	    		default:
	    			return;
    		}

    		evt.data.destino = destino;
    		colocaFoco(evt);
    	}

		var p_itensTabIndex = null;
		$.itensTabIndex = function() {
			if (p_itensTabIndex == null) {
				// O IE cria por default o atributo tabindex com valor igual a 0 para todos os n�s do DOM,
				// enquanto o FF cria os elementos sem o atributo. Por isso, n�o existe um seletor comum.
				// Assim, testa-se primeiro qual filtro deve ser usado. Um retorna os elementos corretos e
				// o outro retorna todos os n�s. Logo, utiliza-se o que retorna menos itens.
				var $itens1 = $("[tabindex]");
				var $itens2 = $("[tabindex!=0]");
				p_itensTabIndex = ($itens1.length < $itens2.length) ? $itens1 : $itens2;
			}
			return p_itensTabIndex;
		}

		function ordenaPorTabindex(vetorDom) {
			var retorno = vetorDom;
			retorno.sort(function(a, b) {
			   var compA = parseInt($(a).attr("tabindex"), 10);
			   var compB = parseInt($(b).attr("tabindex"), 10);
			   return (compA < compB) ? -1 : (compA > compB) ? 1 : 0; 
			});
			return retorno;
		}


		(function ($){
			setTimeout(function() {
				jQuery("#iframeAutenticador").removeAttr("class");
			}, 5000);
        })(jQuery);
		
    	// AUTO TABINDEX

	    // TOOLTIP
	    $.criaTooltips = function() {
			try {

				// invalid json input, set to null
				json = null

				logNow("criaTooltips - inicio");
				if ($.fn.tooltip) {
					$(".loging_Tip,.senha_Tip,.nome_Tip,.lstUtil li a:not(.notooltip):not([id='btn_ajuda'])," +
					  ".ico_1line_Tip,.ico_2lines_Tip,.ico_3lines_Tip,.ico_4lines_Tip,.ico_5lines_Tip," +
					  ".auto_Tip")
					  .tooltip({
						extraClass: "tooltip_auto"
					});
			
					// Acesso rapido
					var $tipAcesso = $("sup.tooltip");
					if ($tipAcesso.length > 0) {
						var titleAcesso = $tipAcesso.attr("title");
						if (titleAcesso == "") {
							//titleAcesso = 'Para acesso r&#225;pido a essa opera&#231;&#227;o pressione a tecla "A" e digite o c&#243;digo';
									titleAcesso = 'Para acesso r�pido a essa opera��o pressione a tecla "A" e digite o c�digo';
							$tipAcesso.attr("title", titleAcesso);
						}

						// Inclui um link invis�vel para leitura pelo Virtual Vision, uma vez que o title
						//	do elemento � removido pelo plug-in de tooltip
						if (!linkAcessoRapidoDV) {
							titleAcesso = titleAcesso.replace(/\"/gi, "");
							var $linkAcesso = $("<a>").attr("href", "javascript:;").attr("title", titleAcesso).attr("class", "tabindex");
							$tipAcesso.before($linkAcesso);
							linkAcessoRapidoDV = true;
						}

						$tipAcesso.tooltip({
							extraClass: "tooltip_acesso_rapido"
						});
					}
				}
				logNow("criaTooltips - fim");
			} catch (e) {
			}
		}
		
	    // TOOLTIP

		// TROCA FOCO
        $("input:not(.naotrocafoco)").live("keyup", function(e) {
            if ($(this).attr("maxlength") > 0 &&
            	$(this).caret() >= $(this).attr("maxlength") &&
                $.checkKey(e)) {

                var thisTabIndex = parseInt($(this).attr("tabindex"), 10);
				var $itens = $.itensTabIndex();
				var nextTabIndex = thisTabIndex + 1;
                var proximoCampo = null;
                while (true) {
                    if (nextTabIndex > $itens.length) {
                        nextTabIndex = 1;
                    }
                	else if (nextTabIndex == thisTabIndex) {
                		proximoCampo = null;
                		break;
                	}

    				proximoCampo = $itens.filter("[tabindex=" + nextTabIndex + "]");

    				if (proximoCampo.length == 0) {
    					proximoCampo = null;
    					break
    				}
    				else if ((!proximoCampo.is(":visible") || proximoCampo.attr("disabled") == true) && !proximoCampo.hasClass("ajaxFocus")) {
                        nextTabIndex = nextTabIndex + 1;
                    }
                    else {
                        break;
                    }
				}
                if (proximoCampo != null) {
	                this.blur();
	                if (proximoCampo.is(":button") || proximoCampo.is(":submit") || proximoCampo.is(":image")) {
	                    proximoCampo.focus();
	                }
	                else {
	                    proximoCampo.focus();
	                    proximoCampo.select();
	                }
	            }
            }
        });
        // TROCA FOCO

    	// LIMPA CAMPO NO FOCO
    	$("input.clearField,textarea.clearField").each(function() {
    		// Foco
    		$(this).focus(function() {
    			if ($(this).val() == $(this).attr("title"))
    				$(this).val("");

    		// Blur
    		}).blur(function() {
    			if ($(this).val() == "")
    				$(this).val($(this).attr("title"));
    		});
    	});
    	// LIMPA CAMPO NO FOCO

        //VERIFICA SE CAMPO PESQUISAR RECEBEU OU NAO O FOCO
        $("#txtPesquisar", top.document).unbind("focus");
        $("#txtPesquisar", top.document).unbind("blur");
        $("#txtPesquisar", top.document).bind({
            focus: function() {
                $(this).addClass("focoPesquisar");
            },
            blur: function() {
                $(this).removeClass("focoPesquisar");
            }
        });

        //VERIFICA SE CAMPO PESQUISAR RECEBEU OU NAO O FOCO

    	// TAMANHO COLUNA
		var l;
		if (window.parent.$ && window.parent.$('#lateral')) {
			l = window.parent.$('#lateral').outerHeight();
		} else {
			l = 800;
		}
		//var l = window.parent.$('#lateral').outerHeight();
    	var c = $('#conteudo').outerHeight();
   		var i = $('#conteudo .topo').height() + $('#conteudo .base').height();
   		l = l - (i + 10);
   		if (l > 0) {
	   		if (typeof document.body.style.maxHeight === "undefined") {
	   			if (c < l) {
	   				$('#conteudo .miolo:first').css('height', (l) + "px");
	   			}
	   		} else {
	   			$('#conteudo .miolo:first').css('min-height', (l) + "px");
	   		}
	   	}
    	// TAMANHO COLUNA

    	// LINKS EXTERNOS
    	$("a[rel*='external']").click(function(evt) {
    		window.open($(this).attr("href"));
    		evt.preventDefault();
    	});
    	// LINKS EXTERNOS

    	// ORDENACAO DE TABELAS
    	$("tr.ordenacao_tabela a").click(function(evt) {
    		$(this).parents("tr").find("a").not(this).removeClass("sortAsc").removeClass("sortDesc");
    		if ($(this).hasClass("sortAsc")) {
    			$(this).removeClass("sortAsc");
    			$(this).addClass("sortDesc");
    		} else {
    			$(this).addClass("sortAsc");
    			$(this).removeClass("sortDesc");
    		}
    		var u = $(this).attr('href');
    		if( u == "#"){
    			evt.preventDefault();
    		}
    	});
    	// ORDENACAO DE TABELAS

    	// IMPRESSAO
    	$("a[rel*='btn_imprimir']").click(function(evt) {
    		$(".printBlock").removeClass("printImportant");
    		if ($(this).hasClass("imprimeIndividual")) {
    			btnImpressao = $(this);
    			btnImpressao.parents(".printBlock").addClass("printImportant");
    		} else if ($(this).hasClass("bt_print")) {
    			printChecked = true;
    		} else {
    			printChecked = false;
    			btnImpressao = null;
    		}
    		evt.preventDefault();
    	});

    	$(".ico-imprimir").click(function(e) {
    		$(this).parents("tr").next().find("a[rel*='btn_imprimir']").click();

    		e.stopPropagation();
    		e.preventDefault();
    	});

    	// SCROLL TO
    	$(".scrollTo").live("click",function(evt){
			if ($(this).attr("href") != '#') {
	    		var posTop = $($(this).attr("href")).offset().top;
	    		$("html, body").animate({"scrollTop":posTop},500);
	    		evt.preventDefault();
    		}
    	});

    	// TABELAS COM HOVER
    	$('.tabCollapse tbody .linhaConta').hover(
    		function(){
    			$(this).addClass('over');
    		},
    		function(){
    			$(this).removeClass('over');
    		}
    	);

    	// SETA O CHECK BOX DA LINHA DA TABELA
    	$('.tabCollapse tbody .linhacheck input:checkbox , .tabCollapse tbody .tdCheck input:checkbox').click(function(evt){
    		evt.stopPropagation();
    	});

    	$('.tabCollapse tbody .linhacheck').click(function(){
    		if ($(this).find('input').is(':checked')){
    			$(this).find('input').not(':disabled').attr('checked','');
    		}else{
    			$(this).find('input').not(':disabled').attr('checked','checked');
    		}
    	});

    	$('thead input:checkbox').click(function(){
            if($('thead').is('noSelAll')){
                if($(this).is(":checked")){
                    $('tbody').find('input').not(':disabled').attr('checked','checked');
                }else{
                    $('tbody').find('input').not(':disabled').attr('checked','');
                }
            }
    	});

        // ATIVA FORMULARIO
        $(".ativa_formulario, .ativa_formulario_txt").blur(function() {
    		var loading = $(this).parents(".formulario").find('.loading');
    		loading.removeClass('none_i');
    		setTimeout(function(){
    			$(".inativo").removeClass("inativo").find('input:not(.disabled)').attr('disabled', '');
    			loading.addClass('none_i');
    		} , 2000);
        });

    	$("input.limpaCampo,textarea.limpaCampo").each(function() {
    		// Foco
    		$(this).focus(function() {
                if (($(this).attr("title_ori") != undefined && $(this).val() == $(this).attr("title_ori"))
					|| ($(this).attr("limpa_campo") != undefined && $(this).val() == $(this).attr("limpa_campo"))) {
    				$(this).val("");
    			} else if ($(this).val() == $(this).attr("title")) {
    				$(this).val("");
                }

    		// Blur
    		}).blur(function() {
    			if ($(this).val() == "") {
					if ($(this).attr("limpa_campo") != undefined) {
						 $(this).val($(this).attr("limpa_campo"));
                    } else if ($(this).attr("title_ori") != undefined) {
                        $(this).val($(this).attr("title_ori"));
                    } else {
						$(this).val($(this).attr("title"));
                    }
                }
    		});
    	});

    	// EXPAND COLLAPSE
    	$(".btn_collapse").click(function(evt) {
    		var conteudo = $(this).next();
    		var btnCollapse = $(this);

    		if (conteudo.is(":visible")) {
    			conteudo.slideUp({
                        duration: 500,
                        complete: function() {
                                    btnCollapse.removeClass("btn_collapse_on")
                                },
                        step: collapseAutoIframeModal
                        
                    });
    		} else {
    			btnCollapse.addClass("btn_collapse_on");
    			conteudo.slideDown({
                        duration: 500,
                        step: collapseAutoIframeModal
                    });
    		}

    		evt.preventDefault();
    	});
        function collapseAutoIframeModal() {
            if ($("#modalInfraEstrutura").is(":visible") && window.parent.autoIframeModalImmediate) {
                window.parent.autoIframeModalImmediate();
            }
        }

    	// Tabelas expans�veis

        $(".tabela-expansivel .expansor td").filter(":not(.check, .icone, .noClick)").click(function(){
    		var $tbody = $(this).closest("tbody");
    		var $box = $tbody.find(".box-expansivel");
    		var $callback = $tbody.find(".box-expansivel-callback");
    		var $callbackTable = $tbody.closest("table").prev(".tabela-expansivel-callback");

    		if ($box.is(":hidden")) {
    			$(".tabela-expansivel .box-expansivel").hide();
    			$(".tabela-expansivel tbody")
    				.removeClass("ativo hover")
    				.find(".expansivel").hide();
    			$tbody.addClass("ativo").find(".expansivel").show();
    			$box.slideDown(400, function() { // 400 is default
					if (window.parent.autoIframe) {
						window.parent.autoIframe();
					}
					$callback.click();
					$callbackTable.click();
				});
    		}
    		else {
    			$box.slideUp(function (){
    				$tbody.removeClass("ativo").find(".expansivel").hide();
					if (window.parent.autoIframe) {
						window.parent.autoIframe();
					}
					$callback.click();
					$callbackTable.click();
    			});
    		}
    	});
        
    	$(".tabela-expansivel .expansor td").hover(function(){
    		var $tbody = $(this).parents("tbody");

    		if (!$tbody.hasClass("ativo")) $tbody.addClass("hover");
    	}, function(){
    		$(this).parents("tbody").removeClass("hover");
    	});

    	$(".tabela-expansivel th:contains(a)").click(function(){
    		$(this).siblings().removeClass("desc asc");
    		if ($(this).hasClass("desc")) {
    			$(this)
    				.removeClass("desc")
    				.addClass("asc");
    		} else {
    			$(this)
    				.removeClass("asc")
    				.addClass("desc");
    		}
    	});
    	//Tabelas expans�veis

    	// #### HDA - Expansivel no login, pagina inicial avancada e modal - para lateral, ver expansivel do Apoio e Atendimento ####
		$(".boxHDA").each(function(i) {
			var objHDA = $(this);

			// Expande / Minimiza
			objHDA.find(".btnExpandCollapse").click(function(evt) {
				var obj = $(this).next(); // Conteudo que abre

				if (obj.is(":visible")) {
					// Minimiza
					objHDA.removeClass("boxHDAOn");
					parent.alterarVisibilidadeHDA(false);
					setTimeout(function() { $(this).next().slideUp(); }, 500);
				} else {
					// Expande
					$(this).next().slideDown();
					parent.alterarVisibilidadeHDA(true);
					objHDA.addClass("boxHDAOn");

					// #### HDA - Evento incluido para tratar o primeiro n� executado ao carregar a p�gina de login (ou clique no bot�o para exibir HDA) ####
					if (typeof onHDASlideDown == "function") {
						setTimeout("onHDASlideDown()", 700);
					}
				}
				evt.preventDefault();
			});
		});

        //memorizar foco anterior
/*        
	$('a,:input').live("focus", function(evt){
		top.currentFocus = this;
	});
*/
	$('a').live("focus", function(evt){
		top.currentFocus = this;
	});
	$('input[type!="hidden"]').filter(":input").live("focus", function(evt){
		top.currentFocus = this;
	});
	$('textarea').live("focus", function(evt){
		top.currentFocus = this;
	});
    
        //inserir elemento inicial e final para controle de tab autom�tico para janela modal
        if(window.name == modalWindowName) {
            var divPre = '<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;"><a href="javascript:;" title="" class="tabindex focoUltimo" style="font-size:1px">&nbsp;</a></div>';
            var divPos = '<div style="height:1px;width:1px;position:absolute;top:0px;left:0px;"><a href="javascript:;" title="" class="tabindex focoPrimeiro" style="font-size:1px">&nbsp;</a><a href="javascript:;" title="" class="focoPrimeiro" style="font-size:1px">&nbsp;</a></div>';
            $("body").prepend(divPre);
            $("body").append(divPos);
            $(".focoUltimo").focus(function(evt) {
                setTimeout("focoUltimo();", 10);
            });
            $(".focoPrimeiro").focus(function(evt) {
                setTimeout("focoPrimeiro();", 10);
            });
        }

	    // DATE PICKER
	    if ($.fn.datePicker) {
		    var visivel = new Array();
		    var $ico_calendario = $(".ico_calendario");
		    if ($ico_calendario.size() > 0) {
		    	Date.format = 'dd/mm/yyyy';
		    	$ico_calendario.each(function() {
		            visivel[$(this).closest(".dataCalendario").attr("id")] = false;
		        });
		    	$ico_calendario.datePicker({
					createButton: false,
					startDate: '01/01/1900'
				})
				.click(function(evt) {
		    		if ((!$(this).parent().parent().hasClass("inativo")) && (!$(this).parent().parent().parent().hasClass("inativo"))) {
		    			var $dataCalendario = $(this).closest(".dataCalendario");
		    			//-----------------------------------------------------------------------
		    			// Configura o per�odo se estiver definido no mesmo DIV do calend�rio
		    			var dataInicial = $dataCalendario.find(".dataInicial").val();
		    			var dataFinal = $dataCalendario.find(".dataFinal").val();
		    			if (dataInicial != 'undefined')
		    				$(this).dpSetStartDate(dataInicial);
		    			if (dataFinal != 'undefined')
		    				$(this).dpSetEndDate(dataFinal);
		    			//-----------------------------------------------------------------------
		    			// Atribui uma data ao calend�rio caso os campos de dia, m�s e ano j� estejam preenchidos
		        		var dia = $.trim($dataCalendario.find(".dia").val());
		        		var mes = $dataCalendario.find(".mes").val();
		        		var ano = $dataCalendario.find(".ano").val();
			            if (dia != "" && dia.length == 2 && mes != "" && mes.length == 2 && ano != "" && ano.length == 4) {
							$(this).dpSetSelected(dia + "/" + mes + "/" + ano);
		    			}
		    			//-----------------------------------------------------------------------
		    			$(this).dpDisplay();
		    			evt.preventDefault();
		    		}

		    	})
		    	.bind("dateSelected", function(e, selectedDate, $td, state) {
		    		// Quando uma data � selecionada, atualiza os campos de input
		    		var $dataCalendario = $(this).closest(".dataCalendario");
	    			var arrDataSel = arrDate(selectedDate);
	        		var elDia = $dataCalendario.find(".dia");
	        		var elMes = $dataCalendario.find(".mes");
	        		var elAno = $dataCalendario.find(".ano");

	    			$(elDia).val(arrDataSel[0]);
	    			$(elMes).val(arrDataSel[1]);
	    			$(elAno).val(arrDataSel[2]);

	    			removerErroCampoCal(elDia);
	    			removerErroCampoCal(elMes);
	    			removerErroCampoCal(elAno);

	    	        $(elDia).closest(".campos_form").removeClass("form_erro")
	    	                .find(".erro_msg").html("<strong></strong>");

					var $onDS = $dataCalendario.find("#OnDateSelected");
					if ($onDS.length > 0) {
						eval($onDS.val());
					}
				})
				.bind("dpDisplayed", function(event, datePickerDiv) {
					visivel[$(this).closest(".dataCalendario").attr("id")] = true;
				})
				.bind("dpClosed", function(event, selected) {
					visivel[$(this).closest(".dataCalendario").attr("id")] = false;
				});

		    	$("input.dia, input.mes, input.ano").each(function() {

		        	$(this).click(function(evt) {
	                    var $dataCalendario = $(this).closest(".dataCalendario");
	                    var $icoCalendario = $dataCalendario.find(".ico_calendario");
		        		if (!visivel[$dataCalendario.attr("id")])
		        			$icoCalendario.click();
					});

		        	$(this).focus(function(evt) {
	                    var $dataCalendario = $(this).closest(".dataCalendario");
	                    var $icoCalendario = $dataCalendario.find(".ico_calendario");

					    var dia = $.trim($dataCalendario.find("input.dia").val());
			            var mes = $.trim($dataCalendario.find("input.mes").val());
			            var ano = $.trim($dataCalendario.find("input.ano").val());

			            if (dia == "" || mes == "" || ano == "") {
							var d = new Date();
							$icoCalendario
								.dpSetSelected("00/00/0000")
								.dpSetDisplayedMonth(d.getMonth(), d.getFullYear());
			            }

		            	// Utiliza timer, pois na valida��o de algumas aplica��es primeiro � colocado
		            	// o foco no campo de dia e s� depois � colocada a formata��o de erro
		            	setTimeout(function() {$icoCalendario.dpClose().click()}, 10);
					});

			        $(this).blur(function(evt){
	                    var $dataCalendario = $(this).closest(".dataCalendario");
	                    var $icoCalendario = $dataCalendario.find(".ico_calendario");

					    var dia = $.trim($dataCalendario.find("input.dia").val());
			            var mes = $.trim($dataCalendario.find("input.mes").val());
			            var ano = $.trim($dataCalendario.find("input.ano").val());

			            if (validaDataDigitada(this, evt)) {
				            if (dia != "" && dia.length == 2 && mes != "" && mes.length == 2 && ano != "" && ano.length == 4) {
				                $icoCalendario.dpSetSelected(dia + "/" + mes + "/" + ano);
								var $onDS = $dataCalendario.find("#OnDateSelected");
								if ($onDS.length > 0) {
									var selectedDate = new Date(parseInt($icoCalendario.dpGetSelected(), 10));
									eval($onDS.val());
								}
				            }
			            }
			            else {
							var d = new Date();
							$icoCalendario
								.dpSetSelected("00/00/0000")
								.dpSetDisplayedMonth(d.getMonth(), d.getFullYear());
			            }
					});

		    	    $(this).keyup(function(evt) {
		           		if ($.checkKey(evt)) {
							validaDataDigitada(this, evt);
		                }
		        	});

		    	});

		        function validaDataDigitada(el, evt) {
					var $camposForm = $(el).closest(".campos_form");
                    var $dataCalendario = $(el).closest(".dataCalendario");
                    var $icoCalendario = $dataCalendario.find(".ico_calendario");

                    var bErroAnterior = false;
                    var erro = "";
                    var erroDia = false;
                    var erroMes = false;
                    var erroAno = false;
                    var erroLimite = false;
                    var contErro = 0;
                    var prefixoErro = "";

                    if ($camposForm.hasClass("form_erro")) {
                        bErroAnterior = true;
                    }

                    var elDia = $dataCalendario.find(".dia");
                    var elMes = $dataCalendario.find(".mes");
                    var elAno = $dataCalendario.find(".ano");

                    var dia = $(elDia).val();
                    var mes = $(elMes).val();
                    var ano = $(elAno).val();

                    if ($(el).hasClass("dia") && ((dia == "0") || (dia == "1") || (dia == "2") || (dia == "3")) && (evt.type == "keyup")) {
                    	dia = "";
                    }
                    else if ((dia != "") && (dia.length < 2)) {
                    	dia = "0";
                    }

                    if ($(el).hasClass("mes") && ((mes == "0") || (mes == "1")) && (evt.type == "keyup")) {
                    	mes = "";
                    }
                    else if ((mes != "") && (mes.length < 2)) {
                    	mes = "0";
                    }

                    if ($(el).hasClass("ano") && (ano.length < 4) && (evt.type == "keyup")) {
                    	ano = "";
                    }
                    else if ((ano != "") && (ano.length < 4)) {
                    	ano = "0";
                    }

                    if (dia != "") dia = parseInt(dia, 10); else dia = -1;
                    if (mes != "") mes = parseInt(mes, 10); else mes = -1;
                    if (ano != "") ano = parseInt(ano, 10); else ano = -1;

                    // Identifica os campos com erro
                    if ((dia == 0) || (dia > 31)) {
                        erroDia = true;
                        contErro++;
                    }
                    else if ((dia > 30) && ((mes == 4) || (mes == 6) || (mes == 9) || (mes == 11))) {
                        erroDia = true;
                        erroMes = true;
                        contErro = contErro + 2;
                    }
                    else if (mes == 2) {
                        if (dia > 29) {
                            erroDia = true;
                            erroMes = true;
                            contErro = contErro + 2;
                        }
                        else if ((dia == 29) && !((ano < 0) || (ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)))) {
                            erroDia = true;
                            erroMes = true;
                            erroAno = true;
                            contErro = contErro + 3;
                        }
                    }

                    if ((!erroMes) && ((mes == 0) || (mes > 12))) {
                        erroMes = true;
                        contErro++;
                    }

                    if ((!erroAno) && (ano == 0)) {
                        erroAno = true;
                        contErro++;
                    }

                    // Formata a mensagem de erro
                    if (erroDia) {
                        erro = "O dia";
                    }
                    if (erroMes) {
						//if (erroDia && !erroAno) erro = erro + " e o m&ecirc;s";
						if (erroDia && !erroAno) erro = erro + " e o m�s";
                        //else if (!erroDia) erro = "O m&ecirc;s";
						else if (!erroDia) erro = "O m�s";
                        //else erro = erro + ", o m&ecirc;s";
						else erro = erro + ", o m�s";
                    }
                    if (erroAno) {
                        if (erro != "") erro = erro + " e o ano";
                        else erro = "O ano";
                    }

                    if (contErro == 1)
						//erro = erro + " informado &eacute; inv&aacute;lido.";
						erro = erro + " informado � inv�lido.";
                    else if (contErro > 1)
						//erro = erro + " informados s&atilde;o inv&aacute;lidos.";
						erro = erro + " informados s�o inv�lidos.";
                	else if ((dia > 0) && (mes > 0) && (ano > 0)) {
						var $onDS = $dataCalendario.find("#OnDateSelected");
		    			if ($onDS.length > 0) {
							var dataSelecionada = new Date(ano, mes - 1, dia);
			    			var dataInicial = $dataCalendario.find(".dataInicial").val();
			    			var dataFinal = $dataCalendario.find(".dataFinal").val();
							var dataAux = new Date();
							if (dataInicial != undefined) {
								dataAux = new Date(parseInt(dataInicial.substring(6, 10), 10),
												   parseInt(dataInicial.substring(3, 5), 10) - 1,
												   parseInt(dataInicial.substring(0, 2), 10));
								if (dataSelecionada < dataAux) {
									erro = "A data deve ser maior ou igual a " + dataInicial + ".";
									contErro = 1;
									erroLimite = true;
								}
							}
							else if (dataFinal != undefined) {
								dataAux = new Date(parseInt(dataFinal.substring(6, 10), 10),
												   parseInt(dataFinal.substring(3, 5), 10) - 1,
												   parseInt(dataFinal.substring(0, 2), 10));
								if (dataSelecionada > dataAux) {
									erro = "A data deve ser menor ou igual a " + dataFinal + ".";
									contErro = 1;
									erroLimite = true;
								}
							}
		    			}
	                }

                    // Aplica a formata��o e a mensagem de erro nos campos individuais
                    if (erroDia) {
                        if(elDia.hasClass("erro_input")){
							elDia.focus().select();
							evt.stopImmediatePropagation();
                        }else{
                            elDia.focus().select();
							evt.stopImmediatePropagation();
                            removerErroCampoCal(elDia);
                            incluirErroCampoCal(elDia, erro, prefixoErro);                           
                        }
                        if ($(el).hasClass("dia")) evt.stopImmediatePropagation();
                    }
                    else {
                        removerErroCampoCal(elDia);
                    }

                    if (erroMes && !erroDia) {
                        if(elMes.hasClass("erro_input")){
							elMes.focus().select();
							evt.stopImmediatePropagation();
                        }else{                    
                            removerErroCampoCal(elMes);
                            incluirErroCampoCal(elMes, erro, prefixoErro);
                        }
                        if ($(el).hasClass("mes")) evt.stopImmediatePropagation();
                    }
                    else {
                        removerErroCampoCal(elMes);
                    }

                    if (erroAno) {
                        if(elAno.hasClass("erro_input")){
                            elAno.focus().select();
                            evt.stopImmediatePropagation();
                        }else{                     
                            removerErroCampoCal(elAno);                        
                            incluirErroCampoCal(elAno, erro, prefixoErro);
                        }
                        if ($(el).hasClass("ano")) evt.stopImmediatePropagation();
                    }
                    else {
                        removerErroCampoCal(elAno);
                    }

					if (erroLimite) {
                        incluirErroCampoCal(elDia, erro, prefixoErro);
                        incluirErroCampoCal(elMes, erro, prefixoErro);
                        incluirErroCampoCal(elAno, erro, prefixoErro);
						evt.stopImmediatePropagation();
					}

                    if (contErro > 0) {
	                    // Aplica a formata��o e a mensagem de erro no grupo de campos
                        incluirErroGrupoCampos($camposForm.get(0), erro, elDia, elMes, elAno);
						if(contErro == 2){
							elDia.addClass('erro_input');
							elMes.addClass('erro_input');
							$(elDia).focus().select();
						}
                        if (!bErroAnterior && (evt.type == "keyup")) {
                            // Renderiza novamente o calend�rio para ajustar a posi��o
                            $icoCalendario.dpClose().click();
                        }
                        return false;
                    }
                    else {
	                    // Remove a formata��o e a mensagem de erro do grupo de campos
                        removerErroGrupoCampos($camposForm.get(0));
                        if (bErroAnterior && (evt.type == "keyup")) {
                            // Renderiza novamente o calend�rio para ajustar a posi��o
                            $icoCalendario.dpClose().click();
                        }
                        return true;
                    }
		        }

		        $(".tabindex:not(input.dia, input.mes, input.ano, .ico_calendario)").focus(function(evt) {
				    $ico_calendario.dpClose();
				});

		    	function arrDate(dataSelect){
		    		date = new Date(dataSelect);
		    		var d = date.getDate();
		    		var m = date.getMonth() + 1;
		    		var y = date.getFullYear();

		    		if(d < 10)
		    			d = "0" + d;
		    		if(m < 10)
		    			m = "0" + m;

		    		var arr = new Array(d , m , y);
		    		return arr;
		    	}
		    }
		}

	    $('#servico_concessonaria').change(function(){
	    	$('#loading_concessonaria').removeClass('none_i');

	    	setTimeout(function(){
	    		$('#loading_concessonaria').addClass('none_i');

	    	},1000)

	    });


	    $('#estConc').change(function(){
	    	$('#loading_concessonaria').removeClass('none_i');

	    	var vl = $(this).val();

	    	setTimeout(function(){
	    		$('#loading_concessonaria').addClass('none_i');
	    		if (vl == 'sp'){
	    			$('#ConcSaoPaulo').show();
	    			$('#ConcRio').hide();
	    		}
	    		if (vl == 'rj'){
	    			$('#ConcSaoPaulo').hide();
	    			$('#ConcRio').show();
	    		}


	    	},1000)

	    });

		$(function(){
			$( "form input:checkbox" ).keypress(function(e) {
				var code = e.keyCode || e.which;
				if(code == 13){
					return false;
				}
			});
	    });
	    // TABELA ABRE/FECHA
	    $(function(){
	    	$(".tabAbreFecha tr.click").click(function(){
	    		$(this).parent("tbody").find("div.expansible").slideToggle();
	    		$(this).parent("tbody").toggleClass("clicked");
	    	});

	    	$(".tabAbreFecha tr.click").hover(function(){
	    		$(this).addClass("over");
	    	},function(){
	    		$(this).removeClass("over");
	    	});

	        // TABELA CEDENTES

	         //ORDENA��O TH TABLE
	    	 $(".tabOrdena thead tr th a.sortDesc").live("click",function(evt) {
	    		$(this).removeClass("sortDesc");
	    		$(this).addClass("sortAsc");
	    		evt.preventDefault();
	    	});

	    	$(".tabOrdena thead tr th a.sortAsc").live("click",function(evt) {
	    		$(this).removeClass("sortAsc");
	    		$(this).addClass("sortDesc");
	    		evt.preventDefault();
	    	});

	    	$(".tabOrdena thead tr th a.sortOff").live("click",function(evt) {
	    		$(".tabOrdena thead tr th a").each(function() {
	    			$(this).addClass("sortOff");
	    			$(this).removeClass("sortDesc");
	    			$(this).removeClass("sortAsc");
	    		});
	    		$(this).removeClass("sortOff");
	    		$(this).addClass("sortDesc");
	    		evt.preventDefault();
	    	});
	         //ORDENA��O TH TABLE

	    });
		
		//desabilita link caminho de p�o Site a Site
		$(function(){
			if(jQuery("#siteSite", top.document).val() == 'true'){
				try {
					$(".topo a").removeAttr('href').attr('style', 'text-decoration:none;opacity:0.5;');
				}
					catch(err) {
				}		
				try {
					$("#UIBreadCrumb2 a").removeAttr('href').attr('style', 'text-decoration:none;opacity:0.7;');
				}
					catch(err) {
				}		
			}
		});
		// HOR�RIOS E LIMITES

		// CODIGO DO SERVI�O E N�MERO DE TELA J� OBTIDOS NESTE PONTO...

		var $btnHorariosLimites = $(".btn_horarios_limites");
		$btnHorariosLimites.click(function(evt) {

    		var status = $(this).hasClass("active");
    		var box = $(this).parent().next();

    		$(this).toggleClass("active");

    		if (status) {
    			box.slideUp(200);
    		}
    		else {
    			box.slideDown(200);
    		}

			salvaStatusHorarioLimite(!status, codigoTela, numeroPasso);
    	});

		// Inicializa��o

		if ($btnHorariosLimites.length > 0 && codigoTela && numeroPasso) {
			obtemStatusHorarioLimiteConfigurado(codigoTela, numeroPasso, callbackInicializaHorariosLimites);
		}

		// HOR�RIOS E LIMITES

	    // ACESSO R�PIDO
		$(document).keypress(function(e) {
			if ($(e.target).is(":input") || $('.jqmWindow').is(":visible") || $("#txtPesquisar", top.document).hasClass("focoPesquisar")) return;
			if (e.which == 97 || e.which == 65) {
				if(jQuery("#siteSite", top.document).val() == 'false'){
					top.abrirAcessoRapido();
				}
				return false;
			}
        });
	    // ACESSO R�PIDO
    });

    $(window).load(function(){
		try {
			$.criaTooltips();
		} catch (e) {

		}

    	if(!$('.semAutoTab').length){
			try {
				$.tabindex();
			} catch (e) {

			}
    	
    	}
    	$('#lateral_apoio_atendimento a').removeAttr('tabindex');
    });

    function initModal(hash){
        //guardar o foco atual
        top.focusStack.push(top.currentFocus);
    	var ww = $(window).width();
    	var wh = $(window).height();
    	var mw = hash.w.width();
    	var mh = hash.w.height();
    	var ws = $(window).scrollTop();
    	var x = mw > ww ? 0 : (ww - mw) /2;
    	var y = mh > wh ? (ws) : ws + ((wh - mh) / 2);

    	hash.w.css({
    		top : y,
    		left : x
    	})
    	.fadeIn(modalFadeIn);

    };

    // FUN��ES P/ FINALIZAR MODAL
    function exitModal(hash){
    	hash.o.hide();
    	hash.w.hide();

		//retornar foco anterior
        try {
            var focusAux = top.focusStack.pop();
            if (focusAux != null) {
                focusAux.focus();
            }
         } catch (err) {
         }
    };

    /** $.highLight();
     * Fun��o que retorna uma string com o termo procurado fazendo colocando em volta <strong>
     *
     * Op��es de edi��o
     * value : (string) String a ser procurada o term.
     * term : (string) Termo procurado. Caso encontrado ser� colocado em volta <strong>.
     */

    $.highLight = function(value, term) {
    	return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
    };

    $.extend($.expr[':'], {
    	containsI : function(elem, i, match, array) {
    		return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    	}
    });

	$.fn.caret = function(pos) {
		var el = $(this).get(0);
	    var caretPos;
		//var ie11 = !!navigator.userAgent.match(/Trident\/7\./);
		var doc = document.selection;
	    if (pos >= 0) {
	        caretPos = pos;
			//Testa vers�o do IE

			
		    if (doc) {
				try{
					var range;
					var range = doc.createRange();	
					if (el.type == 'text' || el.type == 'password') { // textbox
						range.moveStart ('character', -el.value.length);
						range.moveEnd ('character', -el.value.length) ;
						range.moveStart ('character', caretPos);
						range.select();
					}
					else { // textarea
						range.collapse(false);
						range.move ('character', caretPos - el.value.length + el.value.substring(caretPos).split('\n').length - 1);
						range.select();
					}
				
				} catch(err) {/*ERRO*/}			
			}
		    else if (el.selectionStart || el.selectionStart == '0') { // Firefox
				try{
					el.setSelectionRange(caretPos, caretPos);
				}catch(e){/*erro*/}		
				
		    }
	    }
	    else {
			try{
				caretPos = 0;
				if (doc) { // IE hack
					if (el.type == 'text' || el.type == 'password') { // textbox
							var selectionRange = doc.createRange();
							selectionRange.moveStart ('word', -el.value.length);
							caretPos = selectionRange.text.length;
					}
					else { // textarea
						caretPos = Math.abs(doc.createRange().moveStart("character", -1000000)) - 193;
					}
				}
				else if (el.selectionStart || el.selectionStart == '0') { // Firefox
					caretPos = el.selectionStart;
				}
				return caretPos;
			}catch(e){/*erro*/}		
	    }
	}
})(jQuery);

var focusStack = [];

function focoPrimeiro() {
    var tabindex = jQuery(".tabindex");
    var tabfirst = jQuery(".tabindex[tabindex=2]");
    if (tabfirst.length > 0) {
        tabfirst[0].focus();
    }
}

function focoUltimo() {
    var tabindex = jQuery(".tabindex");
    if (tabindex.length > 1) {
		var index = tabindex.length - 1;
		for(; index > 0 ; index--) {
			var tablast = jQuery(".tabindex[tabindex=" + index + "]:visible");
			if (tablast.length > 0) {
				tablast[0].focus();
				break;
			}
		}
    }
}

//tratamento de encerramento de sessão.
function analisaExibicaoErroSessao(resposta) {
	var regexS = 'var urlTriggerFimSessao = "([^"]*)";';
	var regex = new RegExp( regexS );
	var results = regex.exec(resposta);
	if( results != null ) {
		try {
			var url = new URL(results[1]);
			if (!url.host.endsWith(document.domain)) {
				throw new Error("host invalido");
			}
			//desativar autoEncerra
			if (top.disableAutoEncerra) {
				top.disableAutoEncerra();
			}
			window.top.location = DOMPurify.sanitize(results[1]);
			return true;
		} catch (e) {
			return false;
		}
	} else {
		return false;
	}
}

if (typeof(A4J) != "undefined") {
	A4J.AJAX.onError = function(req, status, message){
		if (status == 401) {
			analisaExibicaoErroSessao(req.getResponseText());
		}
	}
}
var flagDisableAjaxSessionEnd = false;
function disableAjaxSessionEnd() {
            flagDisableAjaxSessionEnd = true;
}
jQuery(document).ajaxError(function(event, xmlHttpRequest, ajaxOptions, thrownError) {
	try{
		if (xmlHttpRequest.status == 401 && ! flagDisableAjaxSessionEnd) {
			analisaExibicaoErroSessao(xmlHttpRequest.responseText);
		}
	} catch(err) {}
	flagDisableAjaxSessionEnd = false;
});
// TAMANHO DE FONTE (IN�CIO)

// Obt�m na personaliza��o o tamanho de fonte configurado
function obtemTamanhoFonteConfigurado(codigoTela, numeroPasso, callback) {
	var personalizacao = getComponentePersonalizacao();
	var personalizacaoCategoria = personalizacao.obterCategoria("ibpj.geral.tamanhoFonte", codigoTela, numeroPasso, callback);
    callback(personalizacaoCategoria);
}

// Extrai, do retorno da personaliza��o, o tamanho de fonte.
//   Poss�veis valores: 1, 2 ou 3
function extraiTamanhoFonte(categoriaPersonalizacao) {
	var tamanhoFonte = null;
	try {
		if (categoriaPersonalizacao != null) {
			var conteudo;
			for (var iConteudo = 0; iConteudo  < categoriaPersonalizacao.length; iConteudo++) {
				conteudo = categoriaPersonalizacao[iConteudo];
				if (conteudo && jQuery.trim(conteudo.getChave()) == "tamanho") {
					tamanhoFonte = conteudo.getValor();
					break;
				}
			}
		}
	}
	catch(err) {
		tamanhoFonte = obtemCookie("tamanhoFonte");
	}
	if ((tamanhoFonte == null) || (tamanhoFonte == "") || (isNaN(tamanhoFonte)))
		tamanhoFonte = "1";
	return parseInt(tamanhoFonte, 10);
}

// Aplica os estilos para alterar o tamanho de fonte
function aplicaTamanhoFonte(tamanho) {
	var tamanhoAux = "" + (tamanho + 1);
	try {
	    jQuery(seletorTamanhoFonte, document.body).removeClass(classesTamanhoFonte).addClass(prefixoClasseTamanhoFonte + tamanhoAux);
	}
	catch (err) {
		return;
	}
    // Aplica o tamanho de fonte aos frames da p�gina
   	aplicaTamanhoFonteFrames(window, tamanho);
}

// Aplica nos frames da p�gina os estilos para alterar o tamanho de fonte
function aplicaTamanhoFonteFrames(janela, tamanho) {
	var tamanhoAux = "" + (tamanho + 1);
    for (var i = 0; i < janela.frames.length; i++) {
		try {
		    jQuery(seletorTamanhoFonte, janela.frames[i].document.body).removeClass(classesTamanhoFonte).addClass(prefixoClasseTamanhoFonte + tamanhoAux);
		    aplicaTamanhoFonteFrames(janela.frames[i], tamanho);
			var $iframe = jQuery("iframe[name=" + janela.frames[i].name + "]", janela.document);
			$iframe.attr("height", janela.frames[i].document.getElementById("conteudo").scrollHeight + "px");
		}
		catch (err) {
			return;
		}
    }
	if (janela.parent.autoIframe) {
		janela.parent.autoIframe();
	}
}

// Verifica se existe alguma p�gina acima da atual que tenha o controle de tamanho de fonte
function existeTamanhoFonte(janela) {
    var encontrou = false;
	try {
	    if ((jQuery(".listaPersonalizacao .tp2", janela.document.body).length > 0) || (jQuery("#UIFontSize", janela.document.body).length > 0)) {
	        encontrou = true;
		}
	    else if (janela.parent != janela) {
			encontrou = existeTamanhoFonte(janela.parent);
		}
	}
	catch (err) {
		encontrou = false;
	}
	return encontrou;
}

// Fun��o de callback chamada pela personaliza��o ap�s a obten��o do tamamnho de fonte das p�ginas da migra��o visual
function callbackInicializaTamanhoFonte(categoriaPersonalizacao) {
	var tamanhoFonteRecuperado = extraiTamanhoFonte(categoriaPersonalizacao);
	var tamanhoFonte = [];
	var $aux = jQuery(".listaPersonalizacao .tp2");
	if ($aux.length > 0) {
		tamanhoFonte[0] = $aux;
		tamanhoFonte[1] = jQuery(".listaPersonalizacao .tp3");
		tamanhoFonte[2] = jQuery(".listaPersonalizacao .tp4");
		inicializando = true;
		jQuery(tamanhoFonte[tamanhoFonteRecuperado - 1]).click();
		inicializando = false;
		if (window.parent.autoIframe) {
			window.parent.autoIframe();
		}
	}
	else {
		// Se a p�gina n�o cont�m o controle de tamanho de fonte, verifica se n�o est� dentro
		// de um frame de uma p�gina que o cont�m
		if ((window.parent != window) && (existeTamanhoFonte(window.parent))) {
			aplicaTamanhoFonte(tamanhoFonteRecuperado);
		}
	}
}

// Salva, na personaliza��o, o tamanho de fonte selecionado (1, 2 ou 3)
function salvaTamanhoFonte(tamanho, codigoTela, numeroPasso) {
	try {
		var personalizacao = getComponentePersonalizacao();
		var arrayConteudo = new Array();
		arrayConteudo.push(new Conteudo("tamanho", tamanho));
		personalizacao.salvarCategoriaArray("ibpj.geral.tamanhoFonte", arrayConteudo, codigoTela, numeroPasso);
	} catch(err) {
		setaCookie("tamanhoFonte", "", -1);
		setaCookie("tamanhoFonte", "", -1, "/");
		setaCookie("tamanhoFonte", tamanho, 365, "/", document.domain);
	}
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pelo componente da AWB para indicar qual a fun��o de callback a ser chamada para a sua inicializa��o
//   conforme tamanho de fonte (1, 2 ou 3) configurado na personaliza��o
function inicializaUIFontSize(param) {
	tempCallbackUIFontSize = param["asyncFunc"];
	obtemTamanhoFonteConfigurado(codigoTela, numeroPasso, callbackInicializaUIFontSize)
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pelo componente da AWB para persistir o tamanho de fonte selecionado pelo cliente (1, 2 ou 3)
function salvaUIFontSize(param) {
	var state = JSON.parse(param["state"]);
	salvaTamanhoFonte(state.fontSize);
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pela personaliza��o ap�s a obten��o do tamanho de fonte (1, 2 ou 3) que deve ser informado
//   para o componente da AWB
function callbackInicializaUIFontSize(categoriaPersonalizacao) {
	var tamanhoFonteRecuperado = extraiTamanhoFonte(categoriaPersonalizacao);
	var state = JSON.stringify({fontSize: tamanhoFonteRecuperado});
	tempCallbackUIFontSize(state);
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pelo componente da AWB ap�s aplicar na p�gina corrente um novo tamanho de fonte (1, 2 ou 3),
//   inclusive no final da sua inicializa��o
function callbackUIFontSize(param) {
	var tamanho = parseInt(param.newClass.substr(param.newClass.length - 1, 1), 10);
	aplicaTamanhoFonteFrames(window, tamanho);
}

// TAMANHO DE FONTE (FIM)

// HORARIOS E LIMITES (IN�CIO)

// Obt�m na personaliza��o o estado (aberto/fechado) da �rea expans�vel de hor�rios e limites
function obtemStatusHorarioLimiteConfigurado(codigoTela, numeroPasso, callback) {
	var personalizacao = getComponentePersonalizacao();
	personalizacao.obterCategoria("ibpj.geral.horariosLimites", codigoTela, numeroPasso, callback);
}

// Extrai, do retorno da personaliza��o, o estado da �rea expans�vel de hor�rios e limites.
//   Poss�veis valores: true (aberto) e false (fechado)
function extraiStatusHorariosLimites(categoriaPersonalizacao) {
	var statusHorariosLimites = null;
	try {
		if (categoriaPersonalizacao != null) {
			var conteudo;
			for (iConteudo = 0; iConteudo  < categoriaPersonalizacao.length; iConteudo++) {
				conteudo = categoriaPersonalizacao[iConteudo];
				if (conteudo && jQuery.trim(conteudo.getChave()) == codigoTelaComPasso) {
					statusHorariosLimites = conteudo.getValor();
					break;
				}
			}
		}
		if ((statusHorariosLimites == null) || (statusHorariosLimites == "")) statusHorariosLimites = "true";
	}
	catch(err) {
		var nomeCookie = "horariosLimites" + (jQuery.trim(codigoTelaComPasso) != "" ? "." + codigoTelaComPasso : "");
		statusHorariosLimites = obtemCookie(nomeCookie);
	}
	return !(statusHorariosLimites === "false");
}

// Fun��o de callback chamada pela personaliza��o ap�s a obten��o do estado (aberto/fechado)
//   da �rea expans�vel de hor�rios e limites das p�ginas da migra��o visual
function callbackInicializaHorariosLimites(categoriaPersonalizacao) {
	var statusHorariosLimites = extraiStatusHorariosLimites(categoriaPersonalizacao);
	jQuery(".btn_horarios_limites").each(function() {
		var box = jQuery(this).parent().next();
		if (!statusHorariosLimites) {
			jQuery(this).removeClass("active");
			box.hide();
		}
	});
	if (window.parent.autoIframe) {
		window.parent.autoIframe();
	}
}

// Salva, na personaliza��o, o estado (aberto/fechado) da �rea expans�vel de hor�rios e limites
function salvaStatusHorarioLimite(status, codigoTela, numeroPasso) {
	try {
		var personalizacao = getComponentePersonalizacao();
		var arrayConteudo = new Array();
		arrayConteudo.push(new Conteudo(codigoTela + numeroPasso, status));
		personalizacao.salvarCategoriaArray("ibpj.geral.horariosLimites", arrayConteudo, codigoTela, numeroPasso);
	} catch(err) {
		var nomeCookie = "horariosLimites" + (jQuery.trim(codigoTelaComPasso) != "" ? "." + codigoTelaComPasso : "");
		setaCookie(nomeCookie, status, 365, "/", document.domain);
	}
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pelo componente da AWB para indicar qual a Fun��o de callback a ser chamada para a sua inicializa��o
//   conforme estado (aberto/fechado) da �rea expans�vel de hor�rios e limites configurado na personaliza��o
function inicializaUICollapsibleArea(param) {
	tempCallbackUICollapsibleArea = param["asyncFunc"];
	obtemStatusHorarioLimiteConfigurado(codigoTela, numeroPasso, callbackInicializaUICollapsibleArea);
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pelo componente da AWB para persistir o estado (aberto/fechado) da �rea expans�vel de hor�rios e limites
function salvaUICollapsibleArea(param) {
	var state = JSON.parse(param["state"]);
	salvaStatusHorarioLimite(state.collapsed == 'false', codigoTela, numeroPasso);
}

// Fun��o "ponte" entre componente da AWB e infra do site
//   chamada pela personaliza��o ap�s a obten��o do estado (aberto/fechado) da �rea expans�vel de hor�rios
//   e limites montada com o componente da AWB
function callbackInicializaUICollapsibleArea(categoriaPersonalizacao) {
	var statusHorariosLimites = extraiStatusHorariosLimites(categoriaPersonalizacao);
	var collapsed = "" + !statusHorariosLimites;
	var state = JSON.stringify({collapsed: collapsed});
	tempCallbackUICollapsibleArea(state);
	if (window.parent.autoIframe) {
		setTimeout("window.parent.autoIframe()", 300);
	}
}

// HORARIOS E LIMITES (FIM)

// CALEND�RIO (IN�CIO)

function incluirErroCampoCal(domElement, mensagem, prefixoErro) {
    jQuery(domElement).each(function(e) {
        var input = jQuery(this);
        input.addClass("erro_input");
        if (input.attr("title") == undefined) input.attr("title", "");
        if (input.attr("title_ori") == undefined) input.attr("title_ori", jQuery(this).attr("title"));
        input.attr("title", prefixoErro + mensagem + " " + input.attr("title_ori"));
        jQuery('.tabfirst').focus();    
        jQuery(this).focus().select();
    });
}

function removerErroCampoCal(domElement) {
    jQuery(domElement).each(function() {
        jQuery(this).removeClass("erro_input");
        jQuery(this).attr("title", jQuery(this).attr("title_ori"));
    });
}

function incluirErroGrupoCampos(domElement, mensagem, dia, mes, ano) {
	if (dia != undefined || mes != undefined || ano != undefined) {
		var auxErroDia = dia.eq(0).attr('title');
		var auxErroMes = mes.eq(0).attr('title');
		var auxErroAno = ano.eq(0).attr('title');
		var valDia = dia.val();
		var valMes = mes.val();
		var	valAno = ano.val();
		if(valDia != "" && valMes == "" && valAno == "" && ctrDataDia == 0){
			msg = mensagem + " " + auxErroDia;
			dia.eq(0).attr('title', msg);
			ctrDataDia = ctrDataDia + 1;
			ctrDataMes = 0;
			ctrDataAno = 0;
		}else if(valDia != "" && valMes != "" && valAno == "" && ctrDataMes == 0){
			msg = mensagem + " " + auxErroMes;
			mes.eq(0).attr('title', msg);
			ctrDataDia = 0;
			ctrDataMes = ctrDataMes + 1;
			ctrDataAno = 0;
		}else if(valAno != "" && ctrDataAno == 0){
			msg = mensagem + " " + auxErroAno;
			ano.eq(0).attr('title', msg);
			ctrDataDia = 0;
			ctrDataMes = 0;
			ctrDataAno = ctrDataAno + 1;
		}
	}
    jQuery(domElement).addClass("form_erro").find(".erro_msg").html("<strong>" + mensagem + "</strong>");
}

function removerErroGrupoCampos(domElement) {
    jQuery(domElement).removeClass("form_erro").find(".erro_msg").html("<strong></strong>");
}

// Fun��o "ponte" entre componente da AWB e infra do site
function aplicaFormatacaoCalendario(parameterMap) {

	var prefixoIdMensagem = "UICalendar_";
	var sufixoIdMensagem = "error";

	if (parameterMap["type"] != undefined) {
		// Valida��o de um campo de data

		var elDia = parameterMap["dayObject"];
		var elMes = parameterMap["monthObject"];
		var elAno = parameterMap["yearObject"];

		var erroDia = (parameterMap["day"] == "INVALID");
		var erroMes = (parameterMap["month"] == "INVALID");
		var erroAno = (parameterMap["year"] == "INVALID");
		var erroLimInf = (parameterMap["period"] == "SMALLER");
		var erroLimSup = (parameterMap["period"] == "BIGGER");
		var erroCal = !parameterMap["overall"];
		var dataAux;
        
		var elForm = jQuery(elAno).closest(".campos_form").get(0);

		var prefixoErro = replaceAscii(obtemMensagemBundle(parameterMap["bundleFunction"], parameterMap["bundlePrefix"], "UICalendar_title_prefix"));
		if ((prefixoErro != "") && (prefixoErro.substring(prefixoErro.length - 1) != " ")) prefixoErro += " ";
    
		var idMensagem = "";
		var mensagem = "";        
        

		if (erroDia || erroMes || erroAno) {
			if (erroDia) idMensagem += "day_";
			if (erroMes) idMensagem += "month_";
			if (erroAno) idMensagem += "year_";
			idMensagem = prefixoIdMensagem + idMensagem + sufixoIdMensagem;
			mensagem = replaceAscii(obtemMensagemBundle(parameterMap["bundleFunction"], parameterMap["bundlePrefix"], idMensagem));

		}
		else if (erroLimInf) {
			erroCal = true;
			dataAux = parameterMap["mindate"];
			idMensagem = prefixoIdMensagem + "lower_limit_" + sufixoIdMensagem;
			mensagem = replaceAscii(obtemMensagemBundle(parameterMap["bundleFunction"], parameterMap["bundlePrefix"], idMensagem));
			mensagem = mensagem.replace("{0}", formataData(dataAux));
		}
		else if (erroLimSup) {
			erroCal = true;
			dataAux = parameterMap["maxdate"];
			idMensagem = prefixoIdMensagem + "upper_limit_" + sufixoIdMensagem;
			mensagem = replaceAscii(obtemMensagemBundle(parameterMap["bundleFunction"], parameterMap["bundlePrefix"], idMensagem));
			mensagem = mensagem.replace("{0}", formataData(dataAux));
		}
        
		if (erroCal){
		
			incluirErroGrupoCampos(elForm, mensagem, elDia, elMes, elAno);
            if(erroDia){
                setTimeout("jQuery('div.form_erro').find('.dia').focus().select()", 10);
            }else if(erroMes){
                setTimeout("jQuery('div.form_erro').find('.mes').focus().select()", 10);
            }
		}else{
			removerErroGrupoCampos(elForm);
        }
	}
	else  {
		// Valida��o de um per�odo

		var erroPer = !parameterMap["period"];
		var elDiaID = "#" + parameterMap["beginDayID"].replace(":", "\\:");

		var elForm = jQuery(elDiaID).closest(".campos_form").get(0);
		if (erroPer) {
			idMensagem = prefixoIdMensagem + "period_" + sufixoIdMensagem;
			mensagem = replaceAscii(obtemMensagemBundle(parameterMap["bundleFunction"], parameterMap["bundlePrefix"], idMensagem));
			incluirErroGrupoCampos(elForm, mensagem, elDia, elMes, elAno);
			
		}
		else
			removerErroGrupoCampos(elForm);
	}

}
function formataData(data) {
	var dia = ("00" + data.getDate())
	dia = dia.substr(dia.length - 2, 2);
	var mes = ("00" + (data.getMonth() + 1));
	mes = mes.substr(mes.length - 2, 2)
	var ano = data.getFullYear();
	return dia + "/" + mes + "/" + ano;
}

function obtemMensagemBundle(funcao, prefixo, chave) {
	var bundle = new Function("return " + funcao + "();")();
	var mensagem = bundle[prefixo + chave];
	if (mensagem == null || mensagem == undefined)
		mensagem = bundle[chave];
	if (mensagem == null || mensagem == undefined)
		mensagem = "";
	return mensagem;
}

function replaceAscii(texto) {
	var ini = texto.indexOf('&#');
	var fin = texto.indexOf(';', ini);
	while (ini >= 0 && fin > ini) {
		var ascii = texto.substring(ini + 2, fin);
		if (ascii > 0) {
			var str = String.fromCharCode(ascii);
			texto = texto.replace('&#' + ascii + ';', str);
		}
		ini = texto.indexOf('&#', ini + 1);
		fin = texto.indexOf(';', ini);
	}
	return texto;
}
// CALEND�RIO (FIM)

// COOKIES (IN�CIO)
// 	Fun��es necess�rias, pois em alguma situa��es os componentes AWB
//  chamam as fun��es de callback quando script jquery.cookie ainda n�o foi carregado
function setaCookie(nome, valor, diasExp, caminho, dominio) {
	var dataExp = new Date();
	if (diasExp) dataExp.setDate(dataExp.getDate() + diasExp);
	document.cookie = nome + "=" + escape(valor) +
		((diasExp) ? ";expires=" + dataExp.toUTCString() : "") +
		((caminho) ? ";path=" + caminho : "") +
		((dominio) ? ";domain=" + dominio : "");
}

function obtemCookie(nome) {
	if (document.cookie.length > 0)  {
  		var inicio = document.cookie.indexOf(nome + "=");
  		if (inicio != -1) {
			inicio = inicio + nome.length + 1;
    		var fim = document.cookie.indexOf(";", inicio);
    		if (fim == -1) fim = document.cookie.length;
    		return unescape(document.cookie.substring(inicio, fim));
		}
	}
	return "";
}
// COOKIES

// personaliza��o (IN�CIO)

// Armazena o contexto do personaliza��o
var personalizacaoContexto = "/ibpjpersonalizacaocomponente";

/** Armazena os dados via COOKIE */
function Cookie(cliente) {

	this.cliente = cliente;

	this.init = function() {
	}

	//****** M�TODOS DA INTERFACE ******//
	this.obterCategoria = function(nomeCategoria) {

		var categoriaRetorno = null;
		var chaveGravacao = this.gerarChave(nomeCategoria);
		var stringConteudo = jQuery.cookie(chaveGravacao);
		if (stringConteudo) {
			categoriaRetorno = new Categoria(nomeCategoria);
			categoriaRetorno.setStringConteudo(stringConteudo);
		}
		return categoriaRetorno;
	}

	this.salvarCategoria = function(categoria) {
		var chaveGravacao = this.gerarChave(categoria.getNome());
		//this.PARAM_COOKIE = "{ expires: 7, path: '/', domain: 'jquery.com', secure: true }";
		var PARAM_COOKIE = { expires: 7 };
		jQuery.cookie(chaveGravacao, categoria.getStringConteudo(), PARAM_COOKIE); // grava cookie
	}

	this.obter = function(nomeCategoria, nomeConteudo) {
		var valor = null;
		var categoriaGravada = this.obterCategoria(nomeCategoria);
		if (categoriaGravada) {
			valor = categoriaGravada.obterValorConteudo(nomeConteudo);
		}
		return valor;
	}

	this.salvar = function(nomeCategoria, nomeConteudo, valor) {
		var categoria = new Categoria(nomeCategoria);
		// Verificar se existe a categoria
		var categoriaExistente = this.obterCategoria(categoria);
		if (categoriaExistente) { // Se existe realiza o merge
			categoriaExistente.adicionarConteudo(new Conteudo(nomeConteudo, valor));
			categoria = categoriaExistente;
		} else { // N�o existe a categoria, temos que criar e salvar
			categoria.adicionarConteudo(new Conteudo(nomeConteudo, valor));
		}
		this.salvarCategoria(categoria);
	}
	//****** FIM M�TODOS DA INTERFACE ******//

	this.remover = function(nomeCategoria, nomeConteudo) {
		var categoriaExistente = this.obterCategoria(nomeCategoria);
		if (categoriaExistente) {
			if (categoriaExistente.removerConteudo(nomeConteudo)) {
				this.salvarCategoria(categoriaExistente);
			}
		}
	}

	this.removerCategoria = function(nomeCategoria) {
		var chaveGravacao = this.gerarChave(nomeCategoria);
		jQuery.cookie(chaveGravacao, null);
	}

	/**
	 * A chave para consulta � gerada a partir da chave do cliente + "." + nome categoria
	 */
	this.gerarChave = function(nomeCategoria) {
		var chave = this.cliente.getChave() + "." + nomeCategoria;
		return chave;
	}
}

/** Armazena os dados via cache Javascript */
function CacheJavaScript(cliente) {

	this.cliente = cliente;

	this.init = function(size) {
    	jQuery.jCache.maxSize = size;
	}


	//****** M�TODOS DA INTERFACE ******//
	this.salvarCategoria = function(categoria) {
		var chaveGravacao = this.gerarChave(categoria.getNome());
		jQuery.jCache.setItem(chaveGravacao, categoria.getStringConteudo());
	}

	this.obterCategoria = function(nomeCategoria) {
		var categoriaRetorno = null;
		var chaveGravacao = this.gerarChave(nomeCategoria);
		var stringConteudo = jQuery.jCache.getItem(chaveGravacao);
		if (stringConteudo) {
			categoriaRetorno = new Categoria(nomeCategoria);
			categoriaRetorno.setStringConteudo(stringConteudo);
		}
		return categoriaRetorno;
	}

	this.obter = function(nomeCategoria, nomeConteudo) {
		var valor = null;
		var categoriaGravada = this.obterCategoria(nomeCategoria);
		if (categoriaGravada) {
			valor = categoriaGravada.obterValorConteudo(nomeConteudo);
		}
		return valor;
	}

	this.salvar = function(nomeCategoria, nomeConteudo, valor) {
		var categoria = new Categoria(nomeCategoria);
		// Verificar se existe a categoria
		var categoriaExistente = this.obterCategoria(categoria);
		if (categoriaExistente) { // Se existe realiza o merge
			categoriaExistente.adicionarConteudo(new Conteudo(nomeConteudo, valor));
			categoria = categoriaExistente;
		} else { // N�o existe a categoria, temos que criar e salvar
			categoria.adicionarConteudo(new Conteudo(nomeConteudo, valor));
		}
		this.salvarCategoria(categoria);
	}
	//****** FIM M�TODOS DA INTERFACE ******//

	/**
	 * A chave para consulta � gerada a partir da chave do cliente + "." + nome categoria
	 */
	this.gerarChave = function(nomeCategoria) {
		var chave = this.cliente.getChave() + "." + nomeCategoria;
		return chave;
	}

	this.remover = function(nomeCategoria, nomeConteudo) {
		var categoriaExistente = this.obterCategoria(nomeCategoria);
		if (categoriaExistente) {
			if (categoriaExistente.removerConteudo(nomeConteudo)) {
				this.salvarCategoria(categoriaExistente);
			}
		}
	}

	this.removerCategoria = function(nomeCategoria) {
		var chaveGravacao = this.gerarChave(nomeCategoria);
		jQuery.jCache.removeItem(chaveGravacao);
	}
}


function BaseDados(cliente) {

	this.cliente = cliente;

	this.init = function() {
	}

	//****** M�TODOS DA INTERFACE ******//
	/**
	 * Envia os dados para salvar a categoria no formato xml
	 * <categoria nome="">
	 * 	<conteudo>conteudo</conteudo>
	 * </categoria>
	 *
	 */
	this.salvarCategoria = function(categoria, cd_servico, numero_passo) {
		var arrayCategoria = new Array();
		arrayCategoria.push(categoria);
		this.salvarArrayCategoria(arrayCategoria, cd_servico, numero_passo);
	}

	this.salvar = function(nomeCategoria, nomeConteudo, valor, cd_servico, numero_passo) {
		var categoria = new Categoria(nomeCategoria);
		categoria.adicionarConteudo(new Conteudo(nomeConteudo, valor));
		this.salvarCategoria(categoria, cd_servico, numero_passo);
	}

	this.obterCategoria = function(nomeCategoria, cd_servico, numero_passo, objetoCallbackComponentePersonalizacao) {

		var categoriaBase = null;
		var params = "CTL=" + this.cliente.getCTL() + "&$action=personalizacaoBean" + "&$method=obterCategoria";
		params += "&codServico=" + cd_servico + "&numPasso=" + numero_passo;
		params += "&nomeCategoria=" + nomeCategoria;
		var self = this;

		if(objetoCallbackComponentePersonalizacao) {

			jQuery.ajax({
				type: "POST",
					url: personalizacaoContexto + "/obterCategoria.ajax",
					data: params,
					dataType: "text",
					success: function(data) {
						categoriaBase = self.parserCategoria(data);
						objetoCallbackComponentePersonalizacao.finalizar(categoriaBase);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						if (xhr.status == 401) {
							disableAjaxSessionEnd();
						}
					},
					async: true // ir� aguardar a resposta para continuar
			});

		} else {

			jQuery.ajax({
				type: "POST",
					url: personalizacaoContexto + "/obterCategoria.ajax",
					data: params,
					dataType: "text",
					success: function(data) {
						categoriaBase = self.parserCategoria(data);
					},
					error: function (xhr, ajaxOptions, thrownError) {
						if (xhr.status == 401) {
							disableAjaxSessionEnd();
						}
					},
					async: false // ir� aguardar a resposta para continuar
			});
		}
		return categoriaBase;
	}

	this.obter = function(nomeCategoria, nomeConteudo, cd_servico, numero_passo) {
		var valor = null;
		var categoriaBase = null;
		var params = "CTL=" + this.cliente.getCTL() + "&$action=personalizacaoBean" + "&$method=obterConteudo";
		params += "&codServico=" + cd_servico + "&numPasso=" + numero_passo;
		params += "&nomeCategoria=" + nomeCategoria + "&nomeConteudo=" + nomeConteudo;
		var self = this;
		jQuery.ajax({
     		type: "POST",
				url: personalizacaoContexto + "/obterConteudo.ajax",
				data: params,
				dataType: "text",
				success: function(data) {
					categoriaBase = self.parserCategoria(data);
				},
				error: function (xhr, ajaxOptions, thrownError) {
					if (xhr.status == 401) {
						disableAjaxSessionEnd();
					}
				},
				async: false // ir� aguardar a resposta para continuar
		});

		if (categoriaBase != null && categoriaBase.getArrayConteudo()) {
			valor = categoriaBase.getArrayConteudo()[0].getValor();

		}

		return valor;
	}
	//****** FIM M�TODOS DA INTERFACE ******//

	/**
	 * Envia os dados para salvar a categoria no formato xml
	 * <categoria nome="">
	 * 	<conteudo>conteudo</conteudo>
	 * </categoria>
	 *
	 */
	this.salvarArrayCategoria = function(arrayCategoria, cd_servico, numero_passo) {
		var params = "CTL=" + this.cliente.getCTL() + "&$action=personalizacaoBean" + "&$method=salvarCategoria";
		params += "&codServico=" + cd_servico + "&numPasso=" + numero_passo;
		//params += "&nomeCategoria=" + categoria.getNome() + "&" + categoria.getStringConteudo();
		var corpo = this.montarXML(arrayCategoria);
		var self = this;
		jQuery.ajax({
     		type: "POST",
				url: personalizacaoContexto + "/salvarCategoria.ajax?" + params,
				data: { xml: escape(corpo)},
				//dataType: "xml",
				success: function(data) {
					// VERIFICAR O QUE DEVE SER FEITO
				},
				error: function (xhr, ajaxOptions, thrownError){
					if (xhr.status == 401) {
						disableAjaxSessionEnd();
					}



				},
				async: true
		});

	}


	this.parserCategoria = function(data) {
		var categoriaBase = null;
		var index = data.indexOf("&");
		if (index > 0) {
			var categoriaDados = data.substring(0, index);
			var array = categoriaDados.split("=");
			if (array[0] == "nomeCategoria") {
				// Obt�m o nome da categoria
				categoriaBase = new Categoria(array[1]);
				// Obt�m os dados do conte�do
				categoriaBase.setStringConteudo(data.substring(index + 1, data.length));
			}
		}
		return categoriaBase;
	}

	this.montarXML = function(arrayCategorias) {
		var xml = "<?xml version='1.0' encoding='UTF-8'?><documento>";
		for (i = 0; i < arrayCategorias.length; i++) {
			var categoria = arrayCategorias[i];
			xml += "<categoria nome='" + categoria.getNome() + "'>";
			xml += "<conteudo><![CDATA[" + categoria.getStringConteudo() + "]]></conteudo>";
			xml += "</categoria>";
		}
		xml += "</documento>"
		return xml;
	}

	this.removerCategoria = function(nomeCategoria) {
		// N�o ser� realizada essa opera��o
	}


	this.remover = function(nomeCategoria, nomeConteudo) {
		// N�o ser� realizada essa opera��o
	}
}

// PARA CHAMADAS ASS�NCRONAS NECESSITAMOS DE VARI�VEIS "GLOBAIS".

function CallbackPersonalizacaoComponente(sei_nomeCategoria, sei_cd_servico, sei_numero_passo, sei_modoGravacao, sei_modoGravacaoCookie, sei_modoGravacaoBase, sei_funcaoCallback) {

	this.modoGravacao = sei_modoGravacao;
	this.modoGravacaoCookie = sei_modoGravacaoCookie;
	this.modoGravacaoBase = sei_modoGravacaoBase;
	this.nomeCategoria = sei_nomeCategoria;
	this.cd_servico = sei_cd_servico;
	this.numero_passo = sei_numero_passo;

	this._infra_sei_funcaoCallback = sei_funcaoCallback;

	this.finalizar = function(categoriaBase) {

		// Aqui obtivemos categoria da base de dados... neste contexto temos que fazer uma uni�o com
		// as categorias do cookie...

		// Primeiro procuramos no cache para verificar se existe algum conte�do n�o base gravado
		this.modoGravacao = this.modoGravacaoCookie;
		var categoria = null;
		//var categoriaBase = null;
		var categoriaCookie = this.modoGravacao.obterCategoria(this.nomeCategoria, this.cd_servico, this.numero_passo);
		// Realiza a adi��o com o que foi encontrado no cookie
		if (categoriaCookie != null) {
			categoriaCookie.adicao(categoriaBase); // o que estiver no cookie e na base (vale o da base)
			categoria = categoriaCookie;
		} else {
			categoria = categoriaBase;
		}
		// Transformamos o objeto em um array de conteudos.
		var retorno = null;
		if (categoria) {
			retorno = categoria.getArrayConteudo();
		}
		this._infra_sei_funcaoCallback(retorno);
	}
}

function Wrapper(cliente) {

	// Armazena a informa��o do controle
	this.CTL = cliente.getCTL();

	this.modoGravacaoCookie = new Cookie(cliente); // Grava��o em cookie
	this.modoGravacaoBase = new BaseDados(cliente); // Grava��o em base de dados
	this.modoGravacao = this.modoGravacaoCookie; // DEFAULT COOKIE

	// Armazena a lista de informa��es das quais devem ser persistidas em base
	// Lista vinda do servidor contendo categoria.conteudo do que deve ser persistido na base
	this.dadosBase = new Array();

	//****** M�TODOS DA INTERFACE ******//
	/**
	 * salvar -> Salvar um determinado conte�do
	 * @param nomeCategoria contendo o nome da categoria
	 * @param nomeConteudo contendo o nome do conte�do
	 * @param valor contendo o valor
	 */
	this.salvar = function(nomeCategoria, nomeConteudo, valor, cd_servico, numero_passo) {
		var conteudo = new Conteudo(nomeConteudo, valor);
		var arrayConteudo = new Array();
		arrayConteudo.push(conteudo);
		this.salvarCategoria(new Categoria(nomeCategoria, arrayConteudo), cd_servico, numero_passo);
	}

	/**
	 * salvarCategoria -> Salva o conte�do da categoria
	 * @param categoria contendo a categoria
	 */
	this.salvarCategoria = function(categoria, cd_servico, numero_passo) {

		// Verificar dentro da categoria o que deve ser salvo em base ou cookie
		var categoriaBase = this.verificarListaBase(categoria);

		// Retiro da categoria enviada o que deve ser salvo na base
		categoria.diff(categoriaBase);

		// Salvar o que � de cookie
		this.modoGravacao = this.modoGravacaoCookie;
		if (categoria.getArrayConteudo().length > 0) {
			var valor = categoria.getStringConteudo();
			// Precisa consultar o que existe antes de sobreescrever (COOKIE)
			categoriaExistente = this.modoGravacao.obterCategoria(categoria.getNome(), cd_servico, numero_passo);
			if (categoriaExistente) {
				categoriaExistente.adicao(categoria);
				categoria = categoriaExistente;
			}
			this.modoGravacao.salvarCategoria(categoria, cd_servico, numero_passo);
		}
		// Salvar o que � de base
		this.modoGravacao = this.modoGravacaoBase;
		if (categoriaBase.getArrayConteudo().length > 0) {
			this.modoGravacao.salvarCategoria(categoriaBase, cd_servico, numero_passo);
		}
	}

	/**
	 * Obt�m o valor de um determinado conte�do
	 * @param nomeCategoria contendo o nome da categoria
	 * @param nomeConteudo contendo o nome do conte�do
	 * @return valor do conte�do
	 */
	this.obter = function(nomeCategoria, nomeConteudo, cd_servico, numero_passo) {
		var categoria = new Categoria(nomeCategoria);
		categoria.adicionarConteudo(new Conteudo(nomeConteudo));

		var valor = null;
		// Verifico se o conte�do deve estar na base ou cookie
		var categoriaBase = this.verificarListaBase(categoria);

		if (categoriaBase.getArrayConteudo().length > 0) { // tem que estar na base
			// Verificar se est� na base
			this.modoGravacao = this.modoGravacaoBase;
			valor = this.modoGravacao.obter(nomeCategoria, nomeConteudo, cd_servico, numero_passo);
		} else { // tem que estar no cookie
			this.modoGravacao = this.modoGravacaoCookie;
			valor = this.modoGravacao.obter(nomeCategoria, nomeConteudo, cd_servico, numero_passo);
		}
		return valor;
	}

	/**
	 * Obter categoria
	 * @param nomeCategoria contendo o nome da categoria
	 * @return categoria procurada
	 */
	this.obterCategoria = function(nomeCategoria, cd_servico, numero_passo, funcaoCallback) {

		// Primeiro procuramos no cache para verificar se existe algum conte�do n�o base gravado
		this.modoGravacao = this.modoGravacaoCookie;
		var categoria = null;
		var categoriaBase = null;
		var categoriaCookie = this.modoGravacao.obterCategoria(nomeCategoria, cd_servico, numero_passo);

		// Verificamos o que deve estar em base na lista recebida
		var categoriaListaBase = this.verificarStringListaBase(nomeCategoria);
		if (categoriaListaBase.getArrayConteudo().length != 0) { // Existem informa��es no cache/base

			// Categoria deve ser consultada do Banco de Dados...
			// Esta consulta poder� ser ass�ncrona ou s�ncrona dependendo da exist�ncia ou n�o
			// de uma Fun��o de callback
			if (funcaoCallback) {
				// A Fun��o de callback significa que a execu��o ser� feita de forma ass�ncrona
				this.modoGravacao = this.modoGravacaoBase;
				var retornoAssincrono = new CallbackPersonalizacaoComponente(
					nomeCategoria,
					cd_servico,
					numero_passo,
					this.modoGravacao,
					this.modoGravacaoCookie,
					this.modoGravacaoBase,
					funcaoCallback);
				this.modoGravacao.obterCategoria(categoriaListaBase.getNome(), cd_servico, numero_passo, retornoAssincrono);

			} else {
				this.modoGravacao = this.modoGravacaoBase;
				categoriaBase = this.modoGravacao.obterCategoria(categoriaListaBase.getNome(), cd_servico, numero_passo);
				// Realiza a adi��o com o que foi encontrado no cookie
				if (categoriaCookie != null) {
					categoriaCookie.adicao(categoriaBase); // o que estiver no cookie e na base (vale o da base)
					categoria = categoriaCookie;
				} else {
					categoria = categoriaBase;
				}
			}
		} else { // N�o existem informa��es na base (somente cookie)
			if (funcaoCallback) {
				var retornoAssincrono = new CallbackPersonalizacaoComponente(
					nomeCategoria,
					cd_servico,
					numero_passo,
					this.modoGravacao,
					this.modoGravacaoCookie,
					this.modoGravacaoBase,
					funcaoCallback);
				retornoAssincrono.finalizar(categoriaCookie);
			} else {
				categoria = categoriaCookie;
			}
		}
		return categoria;
	}
	//****** FIM M�TODOS DA INTERFACE ******//


	//****** M�TODOS PRIVADOS ******//
	/**
	 * Realiza a leitura dos dados enviados pelo servidor do que deve ser persistido em base de dados
	 */
	this.init = function() {
		// Ler os dados que devem ser persistidos na base de dados

		var params = "CTL=" + this.CTL + "&$action=personalizacaoBaseBean" + "&$method=obterInformacoes";
		var self = this;
		jQuery.ajax({
     		type: "POST",
				url: personalizacaoContexto + "/personalizacaoBase.ajax",
				data: params,
				dataType: "text",
				success: function(data) {
					self.processarLista(data);
				},
				error: function (xhr, ajaxOptions, thrownError){
					if (xhr.status == 401) {
						disableAjaxSessionEnd();
					}
				},
				async: false
		});
	}

	/**
	 * M�todo que processa a lista dos dados que devem ser gravados em base e faz o sort do vetor
	 */
	this.processarLista = function(data) {
		this.dadosBase = data.split("&"); // quebra o retorno nas entradas
		this.dadosBase.sort(); // ordena a lista
	}

	/**
	 * Fun��o para a pesquisa bin�ria
	 * @param valor a ser procurado
	 * @param insert true caso deseja saber a posi��o de inser��o do elemento procurado
	 */
	this.binarySearch = function(valor, insert) {
	    var high = this.dadosBase.length, low = -1, mid;
	    while(high - low > 1)
	        if(this.dadosBase[mid = high + low >> 1] < valor) low = mid;
	        else high = mid;
	    return this.dadosBase[high] != valor ? insert ? high : -1 : high;
	}

	/**
	 * Verifica o que deve ser enviado para a persist�ncia em base de dados
	 * @param categoria contendo os dados para verifica��o
	 * @return categoria contendo os dados que devem ser enviados para persist�ncia em base de dados
	 */
	this.verificarListaBase = function(categoria) {
		var nomeCategoria = categoria.getNome();
		var arrayConteudo = categoria.getArrayConteudo();

		// O que for para ser gravado na base fica dentro da categoriaBase que ser� retornado
		var categoriaBase = new Categoria(nomeCategoria);

		for (pos = 0; pos < arrayConteudo.length; pos++) {
			var indice = this.binarySearch(nomeCategoria + "." + arrayConteudo[pos].getChave());
			if (indice >= 0) { // Deve ser enviado para a base
				categoriaBase.adicionarConteudo(arrayConteudo[pos]);
			}
		}
		return categoriaBase;
	}

	/**
	 * Verifica as entradas que devem ser enviadas para a base a partir do nome da categoria enviada
	 * @param nomeCategoria contendo o nome da categoria
	 * @return categoriaBase contendo a categoria com os nomes dos conte�dos que devem ser enviados para o servidor
	 */
	this.verificarStringListaBase = function(nomeCategoria) {
		var categoriaBase = new Categoria(nomeCategoria);
		nomeCategoria += ".";
		var indice = this.binarySearch(nomeCategoria, true);
		if (indice < 0) {
			indice = -indice
		}
		for (pos = indice; pos < this.dadosBase.length; pos++) {
			var nomeConteudo = this.dadosBase[pos].replace(nomeCategoria, "");
			if (nomeConteudo == null) { // Outra categoria
				break;
			}
			if (nomeConteudo.indexOf(".") == -1) { // � um conte�do da categoria?
				categoriaBase.adicionarConteudo(new Conteudo(nomeConteudo));
			}
		}
		return categoriaBase;
	}
}

/**
 *  Encapsula todos os m�todos para a obten��o dos dados de personaliza��o
 */
function PersonalizacaoComponente() {

	this.wrapper = null;
	this.inicializado = 'false';

	this.isInicializado = function() {
		return this.inicializado;
	}

	this.setCliente = function(agencia, conta, titularidade, CTL) {
		this.wrapper = new Wrapper(new Cliente(agencia, conta, titularidade, CTL));
		this.wrapper.init();
		this.inicializado = 'true';
	}

	/**
	 * salvarCategoria -> Salva a categoria
	 * @param categoria contendo a categoria
	 */
	this.salvarCategoria = function(categoria, cd_servico, numero_passo) {
		if (this.wrapper) {
			this.wrapper.salvarCategoria(categoria, cd_servico, numero_passo);
		}
	}

	/**
	 * salvarCategoria -> Salva o conte�do da categoria
	 * @param nomeCategoria contendo o nome da categoria
	 * @param arrayObjetosConteudo contendo a lista de conte�dos a serem salvos
	 */
	this.salvarCategoriaArray = function(nomeCategoria, arrayObjetosConteudo, cd_servico, numero_passo) {
		if (this.wrapper) {
			var categoria = new Categoria(nomeCategoria, arrayObjetosConteudo);
			this.wrapper.salvarCategoria(categoria, cd_servico, numero_passo);
		}
	}

	/**
	 * obterCategoria -> Obt�m a categoria com o conte�do preenchido
	 * @param nome contendo o nome da categoria a ser procurada
	 * @return Array contendo os conte�dos da categoria
	 */
	this.obterCategoria = function(nomeCategoria, cd_servico, numero_passo, funcaoCallback) {

		if (this.wrapper) {
			var retorno = null;
			var categoria = this.wrapper.obterCategoria(nomeCategoria, cd_servico, numero_passo, funcaoCallback);
			if (categoria) {
				retorno = categoria.getArrayConteudo();
			}
			return retorno;
		}
	}

	this.salvar = function(nomeCategoria, nomeConteudo, valor, cd_servico, numero_passo) {
		if (this.wrapper) {
			this.wrapper.salvar(nomeCategoria, nomeConteudo, valor, cd_servico, numero_passo);
		}
	}

	/**
	 * obter -> Obt�m o conte�do de uma determinada chave
	 * @param nomeConteudo contendo o nome do conteudo a ser procurado
	 */
	this.obter = function(nomeCategoria, nomeConteudo, cd_servico, numero_passo) {
		if (this.wrapper) {
			return this.wrapper.obter(nomeCategoria, nomeConteudo, cd_servico, numero_passo);
		}
		return null;
	}

	/**
	 * remover -> Remove um determinado conte�do de uma categoria
	 * @param nomeCategoria contendo o nome da categoria
	 * @param nomeConteudo contendo o nome do conte�do
	 */
	//this.remover = function(nomeCategoria, nomeConteudo) {
	//	var categoria = new Categoria(nomeCategoria);
	//	var chave = this.gerarChave(this.cliente, categoria);
	//	this.modoGravacao.remover(chave, nomeConteudo);
	//}

	/**
	 * Altera o modo de grava��o da informa��o
	 * @param pModoGravacao contendo o novo modo de grava��o a ser utilizado
	 */
	this.setWrapper = function(pModoGravacao) {
		this.wrapper = pModoGravacao;
	}

}

/**
 * Representa��o de uma categoria
 * nome: contendo o nome da categoria
 * arrayObjetosConteudo: contendo a lista de valores dessa categoria
 */
function Categoria(nome, arrayObjetosConteudo) {

	this.nome = nome;
	if (arrayObjetosConteudo) {
		this.arrayConteudo = arrayObjetosConteudo;
	} else {
		this.arrayConteudo = new Array();
	}

	this.getNome = function() {
		return this.nome;
	}

	this.getArrayConteudo = function() {
		return this.arrayConteudo;
	}

	/**
	 * Adiciona um conte�do dentro da categoria
	 */
	this.adicionarConteudo = function(conteudo) {
		if (!this.arrayConteudo) {
			this.arrayConteudo = new Array();
		}
		// Verificar se j� n�o existe o conte�do no array
		var indice = this.obterIndiceConteudo(conteudo.getChave());
		if (indice != null) { // j� existe o valor, precisa sobreescrever apenas
			this.arrayConteudo[indice] = conteudo;
		} else { // n�o existe o conte�do, precisa adicionar
			this.arrayConteudo.push(conteudo);
		}
	}

	/**
	 * Obt�m o indice dentro do vetor de uma determinada chave
	 */
	this.obterIndiceConteudo = function(chave) {
		var indice = null;
		if (this.arrayConteudo) {
			for (var i = 0; i < this.arrayConteudo.length; i++) {
				if (this.arrayConteudo[i].getChave() == chave) {
					indice = i;
					break;
				}
			}
		}
		return indice;
	}

	/**
	 * Obt�m o conte�do com uma determinada chave
	 */
	this.obterConteudo = function(chave) {
		var conteudo = null;
		var indice = this.obterIndiceConteudo(chave);
		if (indice != null) {
			conteudo = this.arrayConteudo[indice];
		}
		return conteudo;
	}

	/**
	 * Obt�m o valor de um determinado conte�do
	 */
	this.obterValorConteudo = function(chave) {
		var valor = null;
		var conteudo = this.obterConteudo(chave);
		if (conteudo) {
			valor = conteudo.getValor();
		}
		return valor;
	}

	/**
	 * Remove um determinado conte�do da categoria
	 * @param nomeConteudo contendo o nome do conte�do a ser removido
	 * @return true em caso de remo��o
	 */
	this.removerConteudo = function(nomeConteudo) {
		var retorno = false;
		if (this.arrayConteudo) {
			for (var i = 0; i < this.arrayConteudo.length; i++) {
				if (this.arrayConteudo[i].getChave() == nomeConteudo) {
					this.arrayConteudo.splice(i, 1); // remove o elemento da lista
					retorno = true;
					break;
				}
			}
		}
		return retorno;
	}

	/**
	 * Obt�m o cont�udo no formato de String da forma (chave=valor&)
	 */
	this.getStringConteudo = function() {
		var stringRetorno = null;
		var retorno = new Array();
		if (this.arrayConteudo) {
			for (var i = 0; i < this.arrayConteudo.length; i++) {
				retorno.push(this.arrayConteudo[i].getChave() + "=" + this.arrayConteudo[i].getValor());
			}
			stringRetorno = retorno.join("&");
		}
		return stringRetorno;
	}

	/**
	 * Realiza o diff de duas categorias (que possuem o mesmo nome)
	 */
	this.diff = function(categoria) {
		if (categoria != null) {
			if (this.nome == categoria.getNome()) {
				var arrayConteudo = categoria.getArrayConteudo();
				if (arrayConteudo) {
					for (var i = 0; i < arrayConteudo.length; i++) {
						var indice = this.obterIndiceConteudo(arrayConteudo[i].getChave());
						if (indice != null) {
							this.arrayConteudo.splice(indice, 1); // remove o elemento da lista
						}
					}
				}
			}
		}
	}

	/**
	 * Realiza a adi��o de duas categorias (sobreescrevendo o conte�do da atual com o enviado caso coexistam)
	 */
	this.adicao = function(categoria) {
		if (categoria != null) {
			if (this.nome == categoria.getNome()) {
				var arrayConteudo = categoria.getArrayConteudo();
				if (arrayConteudo) {
					for (var i = 0; i < arrayConteudo.length; i++) {
						var conteudo = this.obterConteudo(arrayConteudo[i].getChave());
						if (conteudo) {
							conteudo.setValor(arrayConteudo[i].getValor()); // Sobreescreve o valor
						} else {
							this.arrayConteudo.push(arrayConteudo[i]); // Adiciona o novo conte�do
						}
					}
				}
			}
		}
	}

	/**
	 * Altera o conte�do com uma string na forma (chave=valor&)
	 */
	this.setStringConteudo = function(stringConteudo) {
		this.arrayConteudo = new Array();
		var arrayString = stringConteudo.split("&");
		for (var i = 0; i < arrayString.length; i++) {
			var dados = arrayString[i].split("=");
			if (dados[0] && dados[1]) {
				var conteudo = new Conteudo(dados[0], dados[1]);
				this.arrayConteudo.push(conteudo);
			}
		}
	}
}

/**
 * Representa��o de uma entrada (conte�do) em uma determinada categoria
 */
function Conteudo(chave, valor) {

	this.chave = chave;
	this.valor = valor;

	this.getChave = function() {
		return this.chave;
	}

	this.getValor = function() {
		return this.valor;
	}

	this.setValor = function(pValor) {
		return this.valor = pValor;
	}
}

/**
 * Armazena as informa��es do cliente
 */
function Cliente(agencia, conta, titularidade, CTL) {

	this.agencia = agencia;
	this.conta = conta;
	this.titularidade = titularidade;
	this.CTL = CTL;

	this.getAgencia = function() {
		return this.agencia;
	}

	this.getConta = function() {
		return this.conta;
	}

	this.getTitularidade = function() {
		return this.getTitularidade();
	}

	this.getCTL = function() {
		return this.CTL;
	}

	this.getChave = function() {
		return this.agencia + "_" + this.conta + "_" + this.titularidade;
	}
}

function inicializarComponentePersonalizacao(agencia, conta, titularidade, CTL) {
		var global = (window.top) ? window.top : window;
		global.personalizacao = new PersonalizacaoComponente();
		global.personalizacao.setCliente(agencia, conta, titularidade, CTL);
}

function getComponentePersonalizacao() {

		var global = (window.top) ? window.top : window;

		if(!global.personalizacao) {

			global.personalizacao = new PersonalizacaoComponente();

			var agencia = global.document.getElementsByName('agencia');
			var conta = global.document.getElementsByName('conta');
			var titularidade = global.document.getElementsByName('titularidade');
			var CTL = global.document.getElementsByName('CTL');

			if (agencia.length == 1 && conta.length == 1 && titularidade.length == 1 && CTL.length == 1) {
				global.personalizacao.setCliente(agencia[0].value, conta[0].value, titularidade[0].value, CTL[0].value);
			}
		}

		return global.personalizacao;
}

// personaliza��o (FIM)

function disableTabFirst() {
    flagTabFirst = false;
}

function enableTabFirst() {
    flagTabFirst = true;
}

//Fun��o para exibir/ocultar valores dos iframes de posicao financeira e lancamentos futuros da tela inicial
function modificarExibicaoValores(linkKey) {
	var personalizacao = getComponentePersonalizacao();
    var links = personalizacao.obterCategoria("ibpj.telaInicial.exibicao.valores", "H", "1");

	if (links == null || links == "null" || links == "undefined") {
 		links = new Array();
 		links.push(new Conteudo("posicaoFinanceira", "1"));
 		links.push(new Conteudo("lancamentosFuturos", "1"));
 		links.push(new Conteudo("telaInicial", "0"));
 	 }

	 //Procura pelo valor do link clicado
	 var linkAtual;
	 var ocultarLnkTI = false;
	 var linkTelaInicial = null;
	 for (i = 0; i < links.length; i++) {
	    linkAtual = links[i];
		if ("telaInicial" == linkAtual.getChave()) {
			// Recupera o conteudo do link da tela inicial para uso posterior a essa itera��o
			linkTelaInicial = linkAtual;
		} else {
			// Recupera o conteudo do link acionado e modifica seus valores
			if (linkKey == linkAtual.getChave()) {
				//Se link j� estiver como Mostrar, deve-se mudar para Ocultar
				 if (linkAtual.getValor() == '1') {
					 if (linkAtual.getChave() == "posicaoFinanceira") {
	        			 //chamar Fun��o da posi��o financeira para ocultar
						 ocultarValores();
	    			 } else if (linkAtual.getChave() == "lancamentosFuturos") {
	        			 //chamar Fun��o de lancamentos futuros para ocultar
	    				 ocultarValoresFuturos();
	    			 }
					linkAtual.setValor('0');
				 } else {
					 if (linkAtual.getChave() == "posicaoFinanceira") {
	         			 //chamar Fun��o da posi��o financeira para mostrar
						 exibirValores();
	       			 } else if (linkAtual.getChave() == "lancamentosFuturos") {
	           			 //chamar Fun��o de lancamentos futuros para mostrar
	       				 mostrarValoresFuturos();
	       			 }
					linkAtual.setValor('1');
				 }

			}


			//Se algum link (excluindo o da tela inicial) estiver como Mostrar, link da tela inicial deve ser Ocultar
			if ('1' == linkAtual.getValor()) {
				ocultarLnkTI = true;
			}
		}
	 }

	 var framePrincipal;
	 if (navigator.appName != "Microsoft Internet Explorer") {
		 framePrincipal = window.top.document.getElementById('paginaCentral').contentDocument;
	 } else {
		 framePrincipal = window.top.document.getElementById('paginaCentral').contentWindow.document;
	 }

	 //Se algum link estiver como Mostrar, logo o link da tela inicial deve ser ocultar
	 if (ocultarLnkTI) {
		jQuery("#lnkOcultarValores", framePrincipal).text('Ocultar valores')
		            .attr("title", "Pressione ENTER para Ocultar valores");
		linkTelaInicial.setValor('0');
	 } else {
		jQuery("#lnkOcultarValores", framePrincipal).text('Mostrar valores')
		            .attr("title", "Pressione ENTER para Mostrar valores");
		linkTelaInicial.setValor('1');
	 }

	 //Atualizando na personaliza��o
	 personalizacao.salvarCategoriaArray("ibpj.telaInicial.exibicao.valores", links, "H", "1");
}

function expandirEsconderListaFiltroDetalhado() {
    var $lstFiltro = jQuery(".listaFiltroDetalhado");
    if(!jQuery(".boxWrapFiltro")[0]){
        $lstFiltro.wrap("<div class='boxWrapFiltro' />");
    }
    if (jQuery(".boxFiltroExtrato").is(":hidden")) {
        $lstFiltro.before("<div class='boxOverlay' />");
        $lstFiltro.find("li.tp4").css("position","static");
        jQuery(this).parents('form').find('.listaFiltroDetalhado li.tp4').addClass("tp4On");
        jQuery(".boxFiltroExtrato").stop(true, true).slideDown();
		jQuery("li.tp4").find('a').attr('title', 'Pressione enter para fechar busca detalhada.');
    } else {
        $lstFiltro.parents(".boxWrapFiltro").find("div:first").remove();
        jQuery(this).parents('form').find('.listaFiltroDetalhado li.tp4').removeClass("tp4On");
        jQuery(".boxFiltroExtrato").stop(true, true).slideUp();
		jQuery('li.tp4').find('a').attr('title', 'Pressione enter para abrir busca detalhada.');
    }
}
function diaOn(){
	var $elementoLista = jQuery(this).parents('li.tp3');
    jQuery(this).parents().find('.diaOn').removeClass('diaOn');
    if (!$elementoLista.is(".desabilitado")) {
    	$elementoLista.find('.dia').addClass('diaOn');
    }
}
jQuery(".listaFiltroDetalhado li.tp4, .boxFiltroExtrato .fecharFiltroExtrato").live('click', expandirEsconderListaFiltroDetalhado);
jQuery(".listaFiltroDetalhado li.tp3 a").live('click', diaOn);

jQuery(window).load(function(){
		
        jQuery("body #conteudo").resize(function(e){
            if (window.parent.autoIframe) {
                window.parent.autoIframe();
            }
  });   
});

$ = jQuery.noConflict();

(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);

// [name] is the name of the event "click", "mouseover", .. 
// same as you'd pass it to bind()
// [fn] is the handler function
jQuery.fn.bindFirst = function(name, fn) {    
      // obtem o evento nativo se tiver (funcoes do atributo on'funcao' ex: onclick=�alert(2);�)
      var nativeFunction = "this[0].on"+name+";";
      var evalResult = eval(nativeFunction);
      if (evalResult) {
            // remove do atributo
            eval("this[0].on"+name+" = null;");
            // insere na pilha de eventos jquery.
            this.bind(name, evalResult);
      }
    this.bind(name, fn);
    var handlers = this.data('events')[name.split('.')[0]];
    var handler = handlers.pop();
    handlers.splice(0, 0, handler);   
};
jQuery.fn.extend({
    myReplaceWith: function( value ) {
        return this.each(function() {
            var next = this.nextSibling,
                parent = this.parentNode;
            jQuery(this).empty().remove();
            if (next) {
                jQuery(next).before(value);
            } else {
                jQuery(parent).append(value);
            }
        });
    }
});
function spanLb(id) {
    try {
        $alvo = jQuery("#" + id);
        if (!$alvo.is(":disabled")) {
            $alvo.focus().select();
            if ($alvo.is(":checkbox")) {
                if($alvo.is(":checked")) {
                    $alvo.removeAttr("checked");
                } else {
                    $alvo.attr("checked", "checked");
                }
                $alvo.change();
                $alvo.triggerHandler("click");
            }
            else if ($alvo.is(":radio")) {
                var change = false;
                if($alvo.is(":checked")) {
                } else {
                    change = true;
                }
                $alvo.attr("checked", "checked");
                if (change) {
                    $alvo.change();
                }
                $alvo.triggerHandler("click");
            }
        }
    }
    catch(err) {
    }
}

function logNow(dado) {
    if (LOG_HABILITADO) {
        try {
            var dd = new Date();
            var hh = "00" + dd.getHours();
            var mm = "00" + dd.getMinutes();
            var ss = "00" + dd.getSeconds();
            var ms = "000" + dd.getMilliseconds();
            hh = hh.substring(hh.length - 2, hh.length);
            mm = mm.substring(mm.length - 2, mm.length);
            ss = ss.substring(ss.length - 2, ss.length);
            ms = ms.substring(ms.length - 3, ms.length);
            if (typeof console != "undefined") {
                console.log(hh + ":" + mm + ":" + ss + ":" + ms + " - " + dado);
            }
        } catch (e) {
        }
    }
}
function logInf(dado) {
    if (LOG_HABILITADO) {
        if (typeof console != "undefined") {
            console.log(dado);
        }
    }
}

//Identifica��o de browser
var BROWSER = (function(){
	var private = {
		'FIREFOX':1,
		'CHROME':2,
		'OPERA':3,
		'SAFARI':4,
		'NETSCAPE':5,
		'EXPLORER':6
	};
	return {
		get: function(browser){ return private[browser];}
	}
})();

function BrowserInfo(){
	this.pattFirefox = new RegExp(".*firefox.*");
	this.pattChrome = new RegExp(".*chrome.*");
	this.pattOpera = new RegExp(".*opera.*");
	this.pattSafari = new RegExp(".*safari.*");
	this.pattNetscape = new RegExp(".*navigator.*|.*netscape.*");
	this.pattIE7 = new RegExp(".*msie 7.*");
	this.pattIE8 = new RegExp(".*msie 8.*");
	this.pattIE9 = new RegExp(".*msie 9.*");
	this.pattIE10 = new RegExp(".*msie 10.*");
	this.pattIE11 = new RegExp(".*trident.*rv.11.*");
	this.pattIE = new RegExp(".*trident.*|.*msie.*");

	this.getBrowser = function (){
		if(this.isFirefox()) return BROWSER.get('FIREFOX');
		if(this.isChrome()) return BROWSER.get('CHROME');
		if(this.isOpera()) return BROWSER.get('OPERA');
		if(this.isSafari()) return BROWSER.get('SAFARI');
		if(this.isNetscape()) return BROWSER.get('NETSCAPE');
		if(this.isIE()) return BROWSER.get('EXPLORE');
	}
	
	this.getIEVersion = function (){
		var rv = -1;
		if(this.isIE()){			
			var re  = new RegExp("msie ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(navigator.userAgent.toLowerCase()) != null) {
				rv = parseFloat( RegExp.$1 );
			}else if(this.isIE11()){
				rv = 11;
			}
		}
		return rv;
	}
	
	this.isIE = function (){
		return this.regex(this.pattIE);
	}

	this.regex = function (regex){
		return regex.test(navigator.userAgent.toLowerCase());
	}

	this.isFirefox = function (){		
		return this.regex(this.pattFirefox);
	}

	this.isChrome = function (){		
		return this.regex(this.pattChrome);
	}

	this.isOpera = function (){		
		return this.regex(this.pattOpera);
	}

	this.isSafari = function (){
		if(!this.isChrome()){			
			return this.regex(this.pattSafari);
		}
		return false;
	}
	
	this.isNetscape = function (){		
		return this.regex(this.pattNetscape);
	}

	this.isIE7 = function (){		
		return this.regex(this.pattIE7);
	}

	this.isIE8 = function (){		
		return this.regex(this.pattIE8);
	}

	this.isIE9 = function (){		
		return this.regex(this.pattIE9);
	}

	this.isIE10 = function (){		
		return this.regex(this.pattIE10);
	}

	this.isIE11 = function (){		
		return this.regex(this.pattIE11);
	}
 
}

function checkPersonalizcaoCarrossel(nomenclaturaChave) {
	var exibirCarrossel = false;
	var exibirCarrosselSemChave = true;
	var personalizacao = getComponentePersonalizacao();
	var categoriaCarrossel = personalizacao.obterCategoria("ibpj.carrossel.aplicacoes");
	var valorCategoria = "0";
	for(var i=0; i<categoriaCarrossel.length; i++){
		if(nomenclaturaChave == categoriaCarrossel[i].getChave()){
			if(categoriaCarrossel[i].getValor() == "null" || "0" == categoriaCarrossel[i].getValor()){	
					var novoArrayExibicaoValores = new Array();
					novoArrayExibicaoValores.push(new Conteudo(nomenclaturaChave, "1"));
					personalizacao.salvarCategoriaArray("ibpj.carrossel.aplicacoes", novoArrayExibicaoValores);
					exibirCarrossel = true;
			} else {
				exibirCarrosselSemChave = false;
			}
			break;					
		}
	}	
	if(exibirCarrosselSemChave){
		exibirCarrossel = true;
	}
	return exibirCarrossel;
}  

function initCarrossel(checkPersonalizacao, chaveConsulta) {
	var searchUrl = jQuery(location)[0]['search'];
	var usaCarrossel = "trueCarrossel";
	// Verifica se a URL contém 'trueCarrossel' para exibir o carrossel apenas nas URLs que precisam dele
	if(searchUrl.indexOf(usaCarrossel) != -1){ 
		var nomenclaturaChave = chaveConsulta;
		if (chaveConsulta == null) {
			var pagina = contextoCarrosel()[2].split(".");
			nomenclaturaChave = contextoCarrosel()[1] + "-" + pagina[0];
		}
		var urlCheck = jQuery(location)[0]['protocol'] + "//" + jQuery(location)[0]['host'] + "/ibpj/angular/conteudo/carrossel/" + nomenclaturaChave + "/content.json";
		var url = jQuery(location)[0]['protocol'] + "//" + jQuery(location)[0]['host'] + "/ibpj/angular/aplicacoes/ibpj-fed-carrossel/?context=/" + nomenclaturaChave;
		jQuery.ajax({ // Check the content
        type: "HEAD",
        async: true,
        url: DOMPurify.sanitize(urlCheck),
		success: function() { // Show carrossel
			var showCarrossel = true;
			if (checkPersonalizacao) {
				showCarrossel = checkPersonalizcaoCarrossel(nomenclaturaChave);
			}
			if (showCarrossel) { 
				jQuery('<iframe>')
					.attr('src',url)
					.attr('id',"carrossel")
					.attr('height',100+"%")
					.attr('width',100+"%")
					.attr('class',"none_i")
					.attr('style',"width: 100%; height: 100%; position: fixed; z-index: 1999; left: 0px; top: 150px; border: 0px;")
					.appendTo(jQuery(window.parent.document).find('#conteudo'));
			}
		},
		error: function() {
	       // Carrossel não disponível
	    }
	});
	}	
}

function contextoCarrosel(){
	return DOMPurify.sanitize(jQuery(location)[0]['pathname']).split("/"); 
}

/* Scripts do componente snackbar do facelift */
var contSnackbar = 0;
function abrirSnackbar(timeout, conteudo, posicao){
    
    var idComponente = criarSnackBar(conteudo, posicao);
    //var numeroIndex = eventListSnackbar.push(idSnackbar);
    
    setTimeout(function(){closeSnackbar(idComponente)}, timeout);
}

/**Recupera o array de base apenas com os nomes passados por parametro */
function arrayFilter(name, array){
    var filtered = array.filter(function(value, index, arr){ 
        return value == name;
    });
    return filtered;
}

function closeSnackbar(idComponente){
    console.log(jQuery('#'+idComponente));
    jQuery('#'+idComponente, window.parent.document).remove();
}

function criarSnackBar(conteudo, posicao ) { 
    var idSnackbar = "snackId_"+contSnackbar;
    if('left'!=posicao&&'right'!=posicao){
        posicao = 'left';
    }
    componente = '<div id="'+idSnackbar+'" class="box-snackbar '+posicao+'"><div class="conteudo-snackbar">'+conteudo+'</div><div class="close"></div></div>';
    jQuery('body', window.parent.document).first().append(componente);
    contSnackbar++;

    jQuery('#'+idSnackbar+'.box-snackbar .close', window.parent.document).click(function(){
        parent.closeSnackbar(idSnackbar);
    });
    
    return idSnackbar;
}

/**valida se é contrato tipo 12 e retira o caminho de pão , para clientes não correntista */
jQuery(function(){		
		try {
			if(jQuery('.listaMenuPrincipal12', window.top.document).length > 0){
				jQuery('#UIBreadCrumb2').hide();
				jQuery('#UIBreadCrumb3').hide();
				jQuery('.listaCaminho').hide();
			}
		}
			catch(err) {
			console.log(err)
		}		
	
});


