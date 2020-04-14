<?php
  $json = file_get_contents('php://input');
  $obj = json_decode($json, true);

  $content = file_get_contents("invitations.txt");
  $content = explode(";", $content);
  //$obj["pseudo"] = "pseudo2";
  for($i = 0; $i < sizeof($content); $i++){
    $invitation = array_pad(explode(",", $content[$i]),3, null);
    $sender = trim($invitation[0]);
    $receiver = trim($invitation[1]);
    $etat = trim($invitation[2]);
    if($receiver == $obj["pseudo"] && $etat == 0){
      echo json_encode($sender);
    }
    if($receiver == $obj["pseudo"] && $etat == 1){
      echo json_encode(null);
    }
    if(isset($_GET["receiver"])){
      if($receiver == $_GET["receiver"] && $sender == $obj["pseudo"] && $etat == 1){
          echo json_encode("Invitation accepté");
      }
    }

  }
 ?>
