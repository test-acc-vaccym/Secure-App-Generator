(function(a){a(function(f){var i,l,j;i=f("./when");l=i.promise;j=[].slice;return{apply:k,call:m,lift:c,bind:c,promisify:h};function k(n,o){return b(n,this,o)}function b(o,n,p){return i.all(p||[]).then(function(q){return l(function(t,s){var r=q.concat(d(t),d(s));o.apply(n,r)})})}function m(n){return b(n,this,j.call(arguments,1))}function c(o){var n=j.call(arguments,1);return function(){return b(o,this,n.concat(j.call(arguments)))}}function h(o,n){return function(){var p=this;return i.all(arguments).then(function(r){return l(q);function q(v,u){var t,s;if("callback" in n){t=e(r,n.callback)}if("errback" in n){s=e(r,n.errback)}if(s<t){g(r,s,u);g(r,t,v)}else{g(r,t,v);g(r,s,u)}o.apply(p,r)}})}}function e(n,o){return o<0?(n.length+o+2):o}function g(n,p,o){if(p!=null){o=d(o);if(p<0){p=n.length+p+2}n.splice(p,0,o)}}function d(n){return function(){if(arguments.length<=1){n.apply(this,arguments)}else{n.call(this,j.call(arguments))}}}})})(typeof define==="function"&&define.amd?define:function(a){module.exports=a(require)});