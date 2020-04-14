<?php
if(isset($_GET["gameEnded"])){
  if($_GET["gameEnded"] == 1){
    file_put_contents("etatDuJeu.txt", "terminé");
    //echo json_encode("Partie terminé");
  }elseif ($_GET["gameEnded"] == 0) {
    file_put_contents("etatDuJeu.txt", "en cours");
    //echo json_encode("Partie en cours");
  }elseif ($_GET["gameEnded"] == 3){
    file_put_contents("etatDuJeu.txt", "recommencé");
    //echo json_encode("Partie en cours");
  }
}


 ?>
