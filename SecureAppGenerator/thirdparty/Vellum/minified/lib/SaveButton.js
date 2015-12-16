var SaveButton={init:function(a){var b={disabled:false,$save:$("<span/>").text(SaveButton.message.SAVE).click(function(c){b.fire("save",c)}).addClass("btn btn-success"),$retry:$("<span/>").text(SaveButton.message.RETRY).click(function(c){b.fire("save",c)}).addClass("btn btn-success"),$saving:$("<span/>").text(SaveButton.message.SAVING).prepend('<i class="icon-refresh icon-spin"></i> ').addClass("btn disabled"),$saved:$("<span/>").text(SaveButton.message.SAVED).addClass("btn disabled"),ui:$("<div/>").addClass("pull-right"),setStateWhenReady:function(c){if(this.state==="saving"){this.nextState=c}else{this.setState(c)}},setState:function(c){if(this.state===c){return}this.state=c;this.$save.detach();this.$saving.detach();this.$saved.detach();this.$retry.detach();if(c==="save"){this.ui.append(this.$save)}else{if(c==="saving"){this.ui.append(this.$saving)}else{if(c==="saved"){this.ui.append(this.$saved)}else{if(c==="retry"){this.ui.append(this.$retry)}}}}this.fire("state:change")},ajaxOptions:function(d){var d=d||{},e=d.beforeSend||function(){},g=d.success||function(){},c=d.error||function(){},f=this;d.beforeSend=function(){f.setState("saving");f.nextState="saved";e.apply(this,arguments)};d.success=function(h){f.setState(f.nextState);g.apply(this,arguments)};d.error=function(h){f.nextState=null;f.setState("retry");alert(SaveButton.message.ERROR_SAVING);c.apply(this,arguments)};return d},ajax:function(d){d=b.ajaxOptions(d);if(typeof d.url==="function"){d.beforeSend();var c=d.url(d.data);d.success(c||{})}else{$.ajax(d)}},beforeunload:function(){var c=b.ui.parents()[b.ui.parents().length-1].tagName.toLowerCase()=="html";if(b.state!=="saved"&&c){return a.unsavedMessage||""}}};eventize(b);b.setState("saved");b.on("change",function(){this.setStateWhenReady("save")});b.on("disable",function(){this.disabled=true;this.$save.addClass("disabled");this.$saving.addClass("disabled");this.$retry.addClass("disabled")});b.on("enable",function(){this.disabled=false;this.$save.removeClass("disabled");this.$saving.removeClass("disabled");this.$retry.removeClass("disabled")});b.on("save",function(c){if(b.disabled){return}else{if(a.save){a.save(c)}else{if(a.saveRequest){var d=b.ajaxOptions();d.beforeSend();a.saveRequest(c).success(d.success).error(d.error)}}}});return b},initForm:function(a,c){var b=a.attr("action"),d=SaveButton.init({unsavedMessage:c.unsavedMessage,save:function(){d.ajax({url:b,type:"POST",dataType:"json",data:a.serialize(),success:c.success})}}),e=function(){d.fire("change")};a.find("*").change(e);a.find("input, textarea").bind("textchange",e);return d},message:{SAVE:"Export",SAVING:"Exporting",SAVED:"Exported",RETRY:"Try Again",ERROR_SAVING:"There was an error exportingƒ"}};var eventize=function(b){var a={};b.on=function(c,d){if(a[c]===undefined){a[c]=[]}a[c].push(d);return b};b.fire=function(c,f){var d;if(a[c]!==undefined){for(d=0;d<a[c].length;d+=1){a[c][d].apply(b,[f])}}return b};return b};