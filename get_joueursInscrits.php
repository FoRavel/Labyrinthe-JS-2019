<?php
  //on ajoute les joueurs connectés dans un tableau et on le retourne via echo
  $content = file_get_contents("joueursInscrits.txt");
  $content = explode(";", $content);
  $array = array();
  for($i = 0; $i < sizeof($content); $i++){
    $user = explode(",", $content[$i]);
    foreach($user as $val){
      if($val == 1){ // 1 = est connecté, 0 = déconnecté
        array_push($array, $user[0]);
      }
    }
  }
  echo json_encode($array);
 ?>
