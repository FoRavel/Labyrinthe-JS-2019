<?php
  $json = file_get_contents("php://input");
  $obj = json_decode($json, true);

 //1,9,0,0,300,0; numJoueur, x, y, nombreMancheGagnées, viesRestantes, joueurChoisiOUNon;

  $numeroJoueurChoisi = $obj["numero"];

  if($numeroJoueurChoisi == 1){
    $content = file_get_contents("joueur1.txt");
    $content = explode(",", $content);
    $player = $content[0].",".$content[1].",".$content[2].",".$content[3].",".$content[4].",1;";
    file_put_contents("joueur1.txt", $player);
  }
  if($numeroJoueurChoisi == 2){
    $content = file_get_contents("joueur2.txt");
    $content = explode(",", $content);
    $player = $content[0].",".$content[1].",".$content[2].",".$content[3].",".$content[4].",1;";
    file_put_contents("joueur2.txt", $player);
  }



 ?>
