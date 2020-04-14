<?php

$json =  file_get_contents('php://input');
$obj = json_decode($json, true);

$pseudo = $obj["pseudo"];
$mdp = $obj["mdp"];

$userExiste = 0;
$users = "";
$index = null;
  $content = file_get_contents("invitations.txt");
  $content = explode(";", $content);
  for($i = 0; $i < sizeof($content); $i++){
    $user = array_pad(explode(",", $content[$i]),3, null);
    $psd = trim($user[0]);
    $pwd = trim($user[1]);
    $con = trim($user[2]);

    if($psd == $pseudo && $pwd== $mdp){
      session_start();
      $_SESSION["pseudonyme"] = $psd;
      $userExiste++;
      $users .= $psd.",".$pwd.",1;";
    }else{
      $users .= $psd.",".$pwd.",".$user[2].";";
    }

  }
  if($userExiste > 0){

    file_put_contents("joueursInscrits.txt", $users);
    echo json_encode("Utilisateur existant");
  }
  else{
    echo json_encode("Utilisateur inexistant");
  }

 ?>
