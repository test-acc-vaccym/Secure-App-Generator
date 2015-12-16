define(["tests/utils","chai","jquery","text!static/setvalue/set-value.xml","text!static/setvalue/set-value-special.xml"],function(c,d,g,b,f){var a=d.assert,e=c.call;describe("setvalues",function(){before(function(h){c.init({javaRosa:{langs:["en"]},core:{onReady:h}})});it("should be associated with the correct mug on form load",function(){c.loadXML(b);var h=c.getMug("text");a.strictEqual(h.p.defaultValue,"blah")});it("should have event jr-insert when added into repeat",function(){c.loadXML("");c.addQuestion("Repeat","repeat");var j=c.addQuestion("Text","text"),i,h;j.p.defaultValue="blah";i=e("createXML");h=g(g.parseXML(i)).find("setvalue");a.strictEqual(h.attr("event"),"jr-insert");a.strictEqual(h.attr("ref"),"/data/repeat/text");a.strictEqual(h.attr("value"),"blah")});it("should have event xforms-ready when added outside of repeat",function(){c.loadXML("");var j=c.addQuestion("Text","text"),i,h;j.p.defaultValue="blah";i=e("createXML");h=g(g.parseXML(i)).find("setvalue");a.strictEqual(h.attr("event"),"xforms-ready");a.strictEqual(h.attr("ref"),"/data/text");a.strictEqual(h.attr("value"),"blah")});it("should not be associated with a question if event is not xforms-ready or jr-insert",function(){c.loadXML(f);var i=e("createXML"),h=g(g.parseXML(i)).find("setvalue");a.strictEqual(h.attr("event"),"special-snowflake");a.strictEqual(h.attr("ref"),"/data/text");a.strictEqual(h.attr("value"),"blah")});it("should warn when referencing another node",function(){c.loadXML("");c.addQuestion("Text","text1");var h=c.addQuestion("Text","text2");h.p.defaultValue="/data/text1";a.notStrictEqual(h.spec.defaultValue.validationFunc(h),"pass")});it("should not warn when referencing a case",function(){c.loadXML("");c.addQuestion("Text","text1");var h=c.addQuestion("Text","text2");h.p.defaultValue="instance('casedb')/case/attribute";a.strictEqual(h.spec.defaultValue.validationFunc(h),"pass")})})});