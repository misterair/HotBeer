function toggleFolder(element,folder){
	feedBloc = $('ul',$(element).parent());

	open = 0;
	if(feedBloc.css('display')=='none') open = 1;
	feedBloc.slideToggle(200);
	$(element).html((!open?'':''));
	$.ajax({
				  url: "./action.php?action=changeFolderState",
				  data:{id:folder,isopen:open}
	});
}

function addFavorite(element,id){
	$(element).attr('onclick','removeFavorite(this,'+id+');').html('<img class="marque_dark" style="height:36px;width:20px" src="./templates/HotBeer/marque_dark.png">');
	$.ajax({
				  url: "./action.php?action=addFavorite",
				  data:{id:id}
	});
}

function removeFavorite(element,id){
	$(element).attr('onclick','addFavorite(this,'+id+');').html('<img class="marque_light" style="height:36px;width:20px" src="./templates/HotBeer/marque_light.png">');
	$.ajax({
				  url: "./action.php?action=removeFavorite",
				  data:{id:id}
	});
}

function renameFolder(element,folder){
	var folderLine = $(element).parent().parent();
	var folderNameCase = $('td:first',folderLine);
	var value = folderNameCase.html();
	$(element).html('Enregistrer');
	$(element).attr('style','background-color:#0C87C9;');
	$(element).attr('onclick','saveRenameFolder(this,'+folder+')');
	folderNameCase.replaceWith('<td><input type="text" name="folderName" value="'+value+'"/></td>');
}


function saveRenameFolder(element,folder){
	var folderLine = $(element).parent().parent();
	var folderNameCase = $('td:first',folderLine);
	var value = $('input',folderNameCase).val();
	$(element).html('Renommer');
	$(element).attr('style','background-color:#F16529;');
	$(element).attr('onclick','renameFolder(this,'+folder+')');
	folderNameCase.replaceWith('<td>'+value+'</td>');
	$.ajax({
				  url: "./action.php?action=renameFolder",
				  data:{id:folder,name:value}
	});
}


function renameFeed(element,feed){
	var feedLine = $(element).parent().parent();
	var feedNameCase = $('td:first a',feedLine);
	var url = feedNameCase.attr('href');
	var value = feedNameCase.html();
	$(element).html('Enregistrer');
	$(element).attr('style','background-color:#0C87C9;');
	$(element).attr('onclick','saveRenameFeed(this,'+feed+',"'+url+'")');
	feedNameCase.replaceWith('<input type="text" name="feedName" value="'+value+'"/>');
}

function saveRenameFeed(element,feed,url){
	var feedLine = $(element).parent().parent();
	var feedNameCase = $('td:first',feedLine);
	var value = $('input',feedNameCase).val();
	$(element).html('Renommer');
	$(element).attr('style','background-color:#F16529;');
	$(element).attr('onclick','renameFeed(this,'+feed+')');
	feedNameCase.replaceWith('<td><a href="'+url+'">'+value+'</a></td>');
	$.ajax({
				  url: "./action.php?action=renameFeed",
				  data:{id:feed,name:value}
	});
}




function changeFeedFolder(element,id){
	var value = $(element).val();
	window.location = "./action.php?action=changeFeedFolder&feed="+id+"&folder="+value;
}


function readThis(element,id,from){
var hide = ($('#pageTop').html()==''?true:false);
var parent = $(element).parent().parent();
if(!parent.hasClass('eventRead')){

if(hide){
parent.fadeOut(200);
}else{
parent.addClass('eventRead');
}

$.ajax({
url: "./action.php?action=readContent",
data:{id:id},
success:function(msg){
if(msg!="") alert('Erreur de lecture : '+msg);
}
});
}else{

if(from!='title'){

parent.removeClass('eventRead');
$.ajax({
url: "./action.php?action=unreadContent",
data:{id:id}
});
}
}
}


//synchronisation manuelle lancée depuis le boutton du menu
function synchronize(code){
	if(code!=''){
	$('article').html(
	'<iframe  class="importFrame" src="action.php?action=synchronize&format=html&code='+code+'" name="idFrameSynchro" id="idFrameSynchro"></iframe>'
	);
	}else{
		alert('Vous devez être connecté pour synchroniser vos flux');
	}
}
