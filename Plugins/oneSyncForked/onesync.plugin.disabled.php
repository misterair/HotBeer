<?php
/*
@name OneSyncForked
@author Mister aiR <mister.air@gmail.com>
@link http://remitaines.com
@licence CC by nc sa http://creativecommons.org/licenses/by-nc-sa/2.0/fr/
@version 1.1.1
@description Le plugin OneSyncForked ajoute un bouton avant chaque nom de flux afin de synchroniser uniquement celui-ci
*/

function OneSync_plugin_AddButton(&$feed){
	echo '<a class="onsyncButton" onclick="onesync_validate(\''.$feed['id'].'\');" alt="Synchroniser" title="Synchroniser">↺</a> ';
}

function OneSync_plugin_SynchronyzeOne(&$_){
	if ($_['action']=='syncronyzeOne'){
		$myUser = (isset($_SESSION['currentUser'])?unserialize($_SESSION['currentUser']):false);
		if($myUser==false) exit('Vous devez vous connecter pour cette action.');
			if(isset($_['feed']) && $_['feed']!=''){
				$feedManager = new Feed();
				$feed = $feedManager->getById($_['feed']);
				$feed->parse();
			}
			header('location: ./index.php');
		}
		
	}
 
Plugin::addJs("/js/main.js"); 
// Ajout de la fonction au Hook situé avant l'affichage des liens de flux
Plugin::addHook("menu_pre_feed_link", "OneSync_plugin_AddButton");  
Plugin::addHook("action_post_case", "OneSync_plugin_SynchronyzeOne"); 
?>
