<?php
$json =  file_get_contents('php://input');
$obj = json_decode($json, true);

$joueur = $obj["pseudo"].",".$obj["mdp"].",1;";
file_put_contents("joueursInscrits.txt", $joueur, FILE_APPEND);
echo json_encode("Joueur inscrit");

?>
