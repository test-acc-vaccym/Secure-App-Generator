(function(n,d){var s=Object.prototype.toString;function t(v,y,x){if(Array.prototype.map){return Array.prototype.map.call(v,y,x)}var u=new Array(v.length);for(var w=0,z=v.length;w<z;w++){u[w]=y.call(x,v[w],w,v)}return u}function i(u){return{newPos:u.newPos,components:u.components.slice(0)}}function f(w){var u=[];for(var v=0;v<w.length;v++){if(w[v]){u.push(w[v])}}return u}function l(u){var v=u;v=v.replace(/&/g,"&amp;");v=v.replace(/</g,"&lt;");v=v.replace(/>/g,"&gt;");v=v.replace(/"/g,"&quot;");return v}function e(z,u,A){u=u||[];A=A||[];var y;for(y=0;y<u.length;y+=1){if(u[y]===z){return A[y]}}var v;if("[object Array]"===s.call(z)){u.push(z);v=new Array(z.length);A.push(v);for(y=0;y<z.length;y+=1){v[y]=e(z[y],u,A)}u.pop();A.pop()}else{if(typeof z==="object"&&z!==null){u.push(z);v={};A.push(v);var w=[],x;for(x in z){w.push(x)}w.sort();for(y=0;y<w.length;y+=1){x=w[y];v[x]=e(z[x],u,A)}u.pop();A.pop()}else{v=z}}return v}function c(z,B,A,w){var y=0,u=z.length,C=0,v=0;for(;y<u;y++){var D=z[y];if(!D.removed){if(!D.added&&w){var E=B.slice(C,C+D.count);E=t(E,function(H,G){var F=A[v+G];return F.length>H.length?F:H});D.value=E.join("")}else{D.value=B.slice(C,C+D.count).join("")}C+=D.count;if(!D.added){v+=D.count}}else{D.value=A.slice(v,v+D.count).join("");v+=D.count;if(y&&z[y-1].added){var x=z[y-1];z[y-1]=z[y];z[y]=x}}}return z}function r(u){this.ignoreWhitespace=u}r.prototype={diff:function(B,E,G){var H=this;function z(I){if(G){setTimeout(function(){G(d,I)},0);return true}else{return I}}if(E===B){return z([{value:E}])}if(!E){return z([{value:B,removed:true}])}if(!B){return z([{value:E,added:true}])}E=this.tokenize(E);B=this.tokenize(B);var A=E.length,v=B.length;var u=1;var F=A+v;var D=[{newPos:-1,components:[]}];var x=this.extractCommon(D[0],E,B,0);if(D[0].newPos+1>=A&&x+1>=v){return z([{value:E.join("")}])}function y(){for(var K=-1*u;K<=u;K+=2){var O;var J=D[K-1],I=D[K+1],L=(I?I.newPos:0)-K;if(J){D[K-1]=d}var M=J&&J.newPos+1<A,N=I&&0<=L&&L<v;if(!M&&!N){D[K]=d;continue}if(!M||(N&&J.newPos<I.newPos)){O=i(I);H.pushComponent(O.components,d,true)}else{O=J;O.newPos++;H.pushComponent(O.components,true,d)}L=H.extractCommon(O,E,B,K);if(O.newPos+1>=A&&L+1>=v){return z(c(O.components,E,B,H.useLongestToken))}else{D[K]=O}}u++}if(G){(function w(){setTimeout(function(){if(u>F){return G()}if(!y()){w()}},0)}())}else{while(u<=F){var C=y();if(C){return C}}}},pushComponent:function(w,u,x){var v=w[w.length-1];if(v&&v.added===u&&v.removed===x){w[w.length-1]={count:v.count+1,added:u,removed:x}}else{w.push({count:1,added:u,removed:x})}},extractCommon:function(C,y,x,B){var w=y.length,u=x.length,A=C.newPos,v=A-B,z=0;while(A+1<w&&v+1<u&&this.equals(y[A+1],x[v+1])){A++;v++;z++}if(z){C.components.push({count:z})}C.newPos=A;return v},equals:function(w,v){var u=/\S/;return w===v||(this.ignoreWhitespace&&!u.test(w)&&!u.test(v))},tokenize:function(u){return u.split("")}};var m=new r();var o=new r(true);var q=new r();o.tokenize=q.tokenize=function(u){return f(u.split(/(\s+|\b)/))};var h=new r(true);h.tokenize=function(u){return f(u.split(/([{}:;,]|\s+)/))};var b=new r();var a=new r();a.ignoreTrim=true;b.tokenize=a.tokenize=function(A){var x=[],w=A.split(/^/m);for(var z=0;z<w.length;z++){var v=w[z],u=w[z-1],y=u&&u[u.length-1];if(v==="\n"&&y==="\r"){x[x.length-1]=x[x.length-1].slice(0,-1)+"\r\n"}else{if(this.ignoreTrim){v=v.trim();if(z<w.length-1){v+="\n"}}x.push(v)}}return x};var g=new r();g.tokenize=function(x){var v=[],y=x.split(/(\n|\r\n)/);if(!y[y.length-1]){y.pop()}for(var w=0;w<y.length;w++){var u=y[w];if(w%2){v[v.length-1]+=u}else{v.push(u)}}return v};var k=new r();k.tokenize=function(u){return f(u.split(/(\S.+?[.!?])(?=\s+|$)/))};var p=new r();p.useLongestToken=true;p.tokenize=b.tokenize;p.equals=function(v,u){return b.equals(v.replace(/,([\r\n])/g,"$1"),u.replace(/,([\r\n])/g,"$1"))};var j={Diff:r,diffChars:function(u,v,w){return m.diff(u,v,w)},diffWords:function(u,v,w){return o.diff(u,v,w)},diffWordsWithSpace:function(u,v,w){return q.diff(u,v,w)},diffLines:function(u,v,w){return b.diff(u,v,w)},diffTrimmedLines:function(u,v,w){return a.diff(u,v,w)},diffSentences:function(u,v,w){return k.diff(u,v,w)},diffCss:function(u,v,w){return h.diff(u,v,w)},diffJson:function(u,v,w){return p.diff(typeof u==="string"?u:JSON.stringify(e(u),d,"  "),typeof v==="string"?v:JSON.stringify(e(v),d,"  "),w)},createTwoFilesPatch:function(D,G,v,B,E,L){var N=[];if(D==G){N.push("Index: "+D)}N.push("===================================================================");N.push("--- "+D+(typeof E==="undefined"?"":"\t"+E));N.push("+++ "+G+(typeof L==="undefined"?"":"\t"+L));var C=g.diff(v,B);C.push({value:"",lines:[]});function x(O){return t(O,function(P){return" "+P})}function w(P,Q,T){var R=C[C.length-2],S=Q===C.length-2,O=Q===C.length-3&&T.added!==R.added;if(!(/\n$/.test(T.value))&&(S||O)){P.push("\\ No newline at end of file")}}var K=0,y=0,I=[],z=1,M=1;for(var J=0;J<C.length;J++){var H=C[J],u=H.lines||H.value.replace(/\n$/,"").split("\n");H.lines=u;if(H.added||H.removed){if(!K){var F=C[J-1];K=z;y=M;if(F){I=x(F.lines.slice(-4));K-=I.length;y-=I.length}}I.push.apply(I,t(u,function(O){return(H.added?"+":"-")+O}));w(I,J,H);if(H.added){M+=u.length}else{z+=u.length}}else{if(K){if(u.length<=8&&J<C.length-2){I.push.apply(I,x(u))}else{var A=Math.min(u.length,4);N.push("@@ -"+K+","+(z-K+A)+" +"+y+","+(M-y+A)+" @@");N.push.apply(N,I);N.push.apply(N,x(u.slice(0,A)));if(u.length<=4){w(N,J,H)}K=0;y=0;I=[]}}z+=u.length;M+=u.length}}return N.join("\n")+"\n"},createPatch:function(y,v,w,x,u){return j.createTwoFilesPatch(y,y,v,w,x,u)},applyPatch:function(x,w){var B=w.split("\n"),u=[],A=0,D=false,C=false;while(A<B.length&&!(/^@@/.test(B[A]))){A++}for(;A<B.length;A++){if(B[A][0]==="@"){var v=B[A].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);u.unshift({start:v[3],oldlength:+v[2],removed:[],newlength:v[4],added:[]})}else{if(B[A][0]==="+"){u[0].added.push(B[A].substr(1))}else{if(B[A][0]==="-"){u[0].removed.push(B[A].substr(1))}else{if(B[A][0]===" "){u[0].added.push(B[A].substr(1));u[0].removed.push(B[A].substr(1))}else{if(B[A][0]==="\\"){if(B[A-1][0]==="+"){D=true}else{if(B[A-1][0]==="-"){C=true}}}}}}}}var E=x.split("\n");for(A=u.length-1;A>=0;A--){var z=u[A];for(var y=0;y<z.oldlength;y++){if(E[z.start-1+y]!==z.removed[y]){return false}}Array.prototype.splice.apply(E,[z.start-1,z.oldlength].concat(z.added))}if(D){while(!E[E.length-1]){E.pop()}}else{if(C){E.push("")}}return E.join("\n")},convertChangesToXML:function(w){var u=[];for(var v=0;v<w.length;v++){var x=w[v];if(x.added){u.push("<ins>")}else{if(x.removed){u.push("<del>")}}u.push(l(x.value));if(x.added){u.push("</ins>")}else{if(x.removed){u.push("</del>")}}}return u.join("")},convertChangesToDMP:function(x){var v=[],y,u;for(var w=0;w<x.length;w++){y=x[w];if(y.added){u=1}else{if(y.removed){u=-1}else{u=0}}v.push([u,y.value])}return v},canonicalize:e};if(typeof module!=="undefined"&&module.exports){module.exports=j}else{if(typeof define==="function"&&define.amd){define([],function(){return j})}else{if(typeof n.JsDiff==="undefined"){n.JsDiff=j}}}}(this));