<?php
//ajoute une invitation dans le fichier invitations.txt_popUp


$json =  file_get_contents('php://input');
$obj = json_decode($json, true);

$invitation = $obj["sender"].",".$obj["receiver"].",0;";

file_put_contents("invitations.txt", $invitation);
 ?>
