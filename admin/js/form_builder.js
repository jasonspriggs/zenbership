function get_fields(){show_loading();send_data="action=get_list";$.post("cp-functions/field_editor.php",send_data,function(e){existing_fields=e;send_data="action=get_fieldset";$.post("cp-functions/field_editor.php",send_data,function(e){existing_fieldsets=e});close_loading()});return false}function prep_add(e,t){if(!e){e="1"}if(!t){t="0"}var n='<div id="add_field" style="border:1px solid #ccc;background-color:#fff;font-size:0.8em;width:600px;position: absolute;z-index:99999;left:50%;top:20%;margin-left:-300px;padding:24px;">';n+='<div class="col50">';n+='<h2>Add a Fieldset</h2><div class="field"><select name="existing_fs" id="existing_fs" style="width:250px;" onchange="return add_fieldset(\''+e+'\',this.value);"><option value=""></option>';n+=existing_fieldsets;n+="</select></div>";n+='<h3 style="margin-top:12px;">Add a Field</h3>';n+='<div class="field"><select name="existing" id="existing" style="width:200px;" onchange="return add_field(\''+e+'\',this.value);"><option value=""></option>';n+=existing_fields;n+="</select></div>";n+='</div><div class="col50">';n+='<h2 style="margin-top:12px;">Create Section Divider</h2><div class="field"><input type="text" id="new_fieldset" value="" style="width:200px;" /> <input type="button" value="Add" onclick="return add_field(\''+e+"','section||');\" /></div>";if(t=="1"){n+="<h1>Add Page Break</h1>";n+='<div class="field"><input type="text" id="new_page_break" value="" placeholder="Page/Step Name" style="width:200px;" /> <input type="button" value="Add" onclick="return add_field(\''+e+"','page_break||');\" /></div>"}else{n+="<h1>New Fields?</h1>";n+="<div class=\"field\"><a href=\"null.php\" onclick=\"return popup('field-add','','1');\">Click here to create a new fields.</a></div>"}n+='</div><div class="clear"></div><center><a href="null.php" onclick="return close_add_fields();">Close Window</a></center></div>';$("body").append(n);return false}function close_add_fields(){$("#add_field").remove();return false}function delete_field(e){$("#li-"+e).remove();return false}function build_form(e,t){show_loading();send_data="action=build_form&id="+e;$.post("cp-functions/field_editor.php",send_data,function(e){if(debug==1){console.log(e)}var n=e.toString().split(",");for(var r=0;r<n.length;r++){add_field(t,n[r])}close_loading()});return false}function add_fieldset(e,t){if(t){show_loading();var n=t.split("||");var r=n["0"];var i=n["1"];send_data="action=fieldset_fields&id="+r;$.post("cp-functions/field_editor.php",send_data,function(t){var n=t.toString().split(",");for(var r=0;r<n.length;r++){add_field(e,n[r])}close_loading()})}return false}function add_field(e,t){if(t){var n=t.split("||");var r=n["1"];var i=n["0"];var s=n["2"];var o=n["3"];if(e==1){var u="col1_fields";var a="col2_fields";var f="col1";col1_up+=1;var l=col2_up;var c="col1-"+col1_up}else{var u="col2_fields";var a="col1_fields";var f="col2";col2_up+=1;var l=col2_up;var c="col2-"+col2_up}var h="";if(o){h='<span><img src="imgs/icon-fb-'+o+'.png" width="16" height="16" border="0" alt="'+o+'" title="'+o+'" class="iconmid" /></span>';h='<span><img src="imgs/icon-fb-'+o+'.png" width="16" height="16" border="0" alt="'+o+'" title="'+o+'" class="iconmid" /></span>'}var p=$("#"+a).innerWidth();if(i=="section"){if(!r){r=$("#new_fieldset").val()}var d='<input type="hidden" name="'+form_name+"["+f+"]["+r+']" value="section" />';$("#"+u).append('<li class="section" id="li-'+c+'"><div style="float:right;"><img src="imgs/icon-delete.png" width="16" height="16" border="0" onclick="return delete_field(\''+c+'\');" alt="Delete" title="Delete" class="hover" /></div><div class="move"></div>'+h+"<b>"+r+d+"</b></li>");$("#new_fieldset").val("")}else if(i=="page_break"){breaks++;if(!r){new_page_break=$("#new_page_break").val()}else{new_page_break=r}$("#new_page_break").val("");var d='<input type="hidden" name="'+form_name+"["+f+"]["+new_page_break+']" value="page_break" />';$("#"+u).append('<li class="page_break" id="li-'+c+'"><div style="float:right;"><img src="imgs/icon-delete.png" width="16" height="16" border="0" onclick="return delete_field(\''+c+'\');" alt="Delete" title="Delete" class="hover" /></div><div class="move"></div>'+h+"<b>"+new_page_break+"</b>"+d+"</li>")}else{if(i=="first_name"||i=="last_name"||i=="username"||i=="password"||i=="email"){req_value="1";req_icon="icon-required-on.png"}else{req_value="0";req_icon="icon-required.png"}$("#"+u).append('<li id="li-'+c+'"><div style="float:right;"><img src="imgs/'+req_icon+'" id="reqimg-'+c+'" width="16" height="16" border="0" onclick="return set_required(\''+c+'\');" class="icon hover_req" alt="Required" title="Required" /><img src="imgs/icon-delete.png" width="16" height="16" border="0" onclick="return delete_field(\''+c+'\');" class="icon hover" alt="Delete" title="Delete" /></div><div class="move"></div>'+h+r+'<input type="hidden" id="req-'+c+'" name="'+form_name+"["+f+"]["+i+']" value="'+req_value+'" /></li>');if(s=="1"){set_required(c,"2")}}$("#"+u+" li.removefield").remove()}return false}function set_required(e,t){if(!t){var n=$("#req-"+e).val()}else{var n=t}if(n=="1"){$("#req-"+e).val("0");$("#reqimg-"+e).attr("src","imgs/icon-required.png")}else{$("#req-"+e).val("1");$("#reqimg-"+e).attr("src","imgs/icon-required-on.png")}return false}function update_name(e,t){var n="name-"+e;$("#"+n).html(t);return false}function edit_field(e){exit_editor();if(e!=active_edit){active_edit=e;var t="field-edit-"+e;var n="li-"+e;$("#"+t).show();$("#"+n).addClass("on")}else{active_edit=""}return false}function exit_editor(){$(".field_edit_menu").hide();$("ul#col1_fields li").removeClass("on");$("ul#col2_fields li").removeClass("on");return false}var breaks=0;var col1_up=0;var col2_up=0;var active_edit="";var existing_fields="";var existing_fieldsets="";var form_name="form";$("#col1_fields, #col2_fields").sortable({connectWith:".colfields",placeholder:"ui-state-highlight"}).disableSelection();get_fields()