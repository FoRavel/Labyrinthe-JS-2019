<?php

if($_GET["numeroJoueur"] != 1 && $_GET["numeroJoueur"] != 2 ){
  echo json_encode("Choisir un numéro");
}else{
  if($_GET["numeroJoueur"] == 1){
    $content = file_get_contents("joueur2.txt"); // => numeroJoueur, posX, posY (texte)
    $content = explode(",", $content); // => [numeroJoueur, posX, posY] (tableau de chaine de caractères)
    $player = ARRAY("numeroJoueur"=>$content[0], "x"=>$content[1], "y"=>$content[2], "mancheGagnee"=>$content[3], "vies"=>$content[4]);
    echo json_encode($player);
  }
  if($_GET["numeroJoueur"] == 2){
    $content = file_get_contents("joueur1.txt");
    $content = explode(",", $content);
    $player = ARRAY("numeroJoueur"=>$content[0], "x"=>$content[1], "y"=>$content[2], "mancheGagnee"=>$content[3], "vies"=>$content[4]);
    echo json_encode($player);
  }
}

 ?>
