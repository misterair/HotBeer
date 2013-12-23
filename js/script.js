
// Ajout class 
function addClass(id,new_class){
       var i,n=0;

       new_class=new_class.split(",");

       for(i=0;i<new_class.length;i++){
               if((" "+document.getElementById(id).className+" ").indexOf(" "+new_class[i]+" ")==-1){
                       document.getElementById(id).className+=" "+new_class[i];
                       n++;
               }
       }

       return n;
}
function removeClass(id,classToRemove){
 
var i = 0,
n = 0,
$id = document.getElementById(id),
classes = classToRemove.split(",");
 
for(; i < classes.length; i++) {
 
if( $id.className.indexOf(classes[i]) > -1 ) {
$id.className = $id.className.replace(classes[i],'').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
}
}

function removeAllClass(className) {
    var els = Array.prototype.slice.call(
        document.getElementsByClassName(className)
    );
    for (var i = 0, l = els.length; i < l; i++) {
        var el = els[i];
        el.className = el.className.replace(
            new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g'),
            '$1'
        );
    }
}

function toggleFolder(element,folder){
	feedBloc = $('ul',$(element).parent());

	open = 0;
	if(feedBloc.css('display')=='none') open = 1;
	feedBloc.slideToggle(200);
	$(element).html((!open?'':''));
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
	$('article').html('<section>'+
	'<iframe class="importFrame" src="action.php?action=synchronize&format=html&code='+code+'" name="idFrameSynchro" id="idFrameSynchro" width="100%" height="300" ></iframe>'+
	'</section>');
	}else{
		alert('Vous devez être connecté pour synchroniser vos flux');
	}
}

// Active ou desactive inputs type affichage des events
function toggleArticleView(){
        var element = $("input[name=articleView]");
        element.prop("disabled",!element.prop("disabled"));
}

// Disparition block et affichage block clique
function toggleBlocks(target){
        target=target.substring(1);
        $('#main article > section').hide();$('.'+target).fadeToggle(200);
}

function buttonAction(target,id){
        // Check unreadEvent
        if($('#pageTop').html()){
                var from=true;
        }else{
                var from='';
        }
        readThis(target,id,from);
}
