<?php
  $json = file_get_contents("php://input");
  $obj = json_decode($json, true);

  $content = file_get_contents("invitations.txt");
  $content = explode(";", $content);
  $invitations ="";
  for($i=0; $i<sizeof($content); $i++){
    $invitation = array_pad(explode(",", $content[$i]),3,null);
    $sender = trim($invitation[0]);
    $receiver = trim($invitation[1]);
    $etat = trim($invitation[2]);
    if($sender == $obj["sender"] && $receiver == $obj["receiver"] && $etat == 0){
      $invitations .= $sender.",".$receiver.",1;";
    }
    if($sender == $obj["sender"] && $receiver == $obj["receiver"] && $etat == 1){
      $invitations .= $sender.",".$receiver.",".$etat.";";
    }
  }
  file_put_contents("invitations.txt", $invitations);

 ?>
