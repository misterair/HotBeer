<?php
/*
@name FleadItLaterForked
@author Mister aiR <mister.air@gmail.com>
@link http://remitaines.com
@licence CC by nc sa http://creativecommons.org/licenses/by-nc-sa/2.0/fr/
@version 1.1.1
@description Le plugin FleadItLaterForked ajoute un bouton à gauche de la date de l'article qui permet de marquer un evenement comme "a lire plus tard" qui s'affichera dans un menu de la barre de droite.
*/

function fleaditlater_plugin_AddButton(&$event){
	$eventId = $event->getId();
	$count = mysql_query('SELECT COUNT(id) FROM '.MYSQL_PREFIX.'plugin_feaditlater WHERE event='.$eventId);
	$count = mysql_fetch_row($count);
	if(!$count[0]){
		echo '<a  onclick="fleadItLater('.$eventId.',\'add\',this);" class="fleaditLaterButton"></a>';
	}
}

function fleaditlater_plugin_displayEvents(&$myUser){
	$query = mysql_query('SELECT le.id,le.title,le.link FROM '.MYSQL_PREFIX.'event le INNER JOIN '.MYSQL_PREFIX.'plugin_feaditlater fil ON (le.id=fil.event)');
	if($query!=null){
	echo '
		<ul class="flux">				
			<li class="flux">
				<a class="left roll" tabindex="2" >A lire</a>
						<ul class="rollList"> ';
							
							while($data = mysql_fetch_array($query)){
							echo '<li> 
								<a class="rollClick" onclick="fleadItLater('.$data['id'].',\'delete\',this)">
									<span title="marquer comme lu" alt="marquer comme lu">✓</span>
								</a>
																					
								<a title="'.$data['link'].'" href="'.$data['link'].'" target="_blank">
									'.Functions::truncate($data['title'],40).'
								</a>		  
								
								</li>';
							}

						echo '</ul>
						
					</li>
				
			</ul>
			';
			}
}

function fleaditlater_plugin_action($_,$myUser){
	if($myUser==false) exit('Vous devez vous connecter pour cette action.');
	if($_['state']=='add'){
		$return = mysql_query('INSERT INTO '.MYSQL_PREFIX.'plugin_feaditlater (event)VALUES(\''.$_['id'].'\')');
	}else{
		$return = mysql_query('DELETE FROM '.MYSQL_PREFIX.'plugin_feaditlater WHERE event=\''.$_['id'].'\'');
	}
	if(!$return) echo mysql_error();
}

Plugin::addJs("/js/main.js"); 
// Ajout de la fonction au Hook situé dans les options d'évenements
Plugin::addHook("event_post_top_options", "fleaditlater_plugin_AddButton");  
//Ajout de la fonction au Hook situé après le menu des fluxs
Plugin::addHook("menu_pre_folder_menu", "fleaditlater_plugin_displayEvents");  
//Ajout des actions fleadit
Plugin::addHook("action_post_case", "fleaditlater_plugin_action");  
?>
