define(["../core","./var/rsingleTag","../manipulation"],function(b,a){b.parseHTML=function(g,e,f){if(!g||typeof g!=="string"){return null}if(typeof e==="boolean"){f=e;e=false}e=e||document;var d=a.exec(g),c=!f&&[];if(d){return[e.createElement(d[1])]}d=b.buildFragment([g],e,c);if(c&&c.length){b(c).remove()}return b.merge([],d.childNodes)};return b.parseHTML});