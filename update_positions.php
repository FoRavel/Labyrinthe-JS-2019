<?php

  $json =  file_get_contents('php://input');
  $obj = json_decode($json, true);




  if($obj["numeroJoueur"] == 1 || $_GET["numeroJoueur"] == 1){
    $joueurUn = ARRAY("numeroJoueur"=> 1,"x"=>$obj["x"], "y"=>$obj["y"], "mancheGagnee"=>$obj["mancheGagnee"], "vies"=>$obj["vies"], "etatChoix"=>$obj["etatChoix"]);
    file_put_contents("joueur1.txt", "");
    file_put_contents("joueur1.txt", $joueurUn['numeroJoueur'].",".$joueurUn['x'].",".$joueurUn['y'].",".$joueurUn['mancheGagnee'].",".$joueurUn['vies'].",".$joueurUn['etatChoix'].";");
    echo json_encode("coordonnées mises à jour");
  }
  if($obj["numeroJoueur"] == 2 || $_GET["numeroJoueur"] == 2){
    $joueurDeux = ARRAY("numeroJoueur"=> 2,"x"=>$obj["x"], "y"=>$obj["y"], "mancheGagnee"=>$obj["mancheGagnee"], "vies"=>$obj["vies"], "etatChoix"=>$obj["etatChoix"]);
    file_put_contents("joueur2.txt", "");
    file_put_contents("joueur2.txt", $joueurDeux['numeroJoueur'].",".$joueurDeux['x'].",".$joueurDeux['y'].",".$joueurDeux['mancheGagnee'].",".$joueurDeux['vies'].",".$joueurDeux['etatChoix'].";");
    echo json_encode("coordonnées mises à jour");
  }

 ?>
