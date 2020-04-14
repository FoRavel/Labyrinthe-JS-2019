<?php
  $joueurUn = file_get_contents("joueur1.txt");
  $joueurUn = explode(",",  $joueurUn);
  $etatDuChoixJ1 = $joueurUn[5];

  $joueurDeux = file_get_contents("joueur2.txt");
  $joueurDeux = explode(",",  $joueurDeux);
  $etatDuChoixJ2 = $joueurDeux[5];

  if ($etatDuChoixJ2 == 1 && $etatDuChoixJ1 == 1){
    echo json_encode("Les deux joueurs ont choisi");
  }else {
    if ($etatDuChoixJ2 == 0 && $etatDuChoixJ1 == 0){
      echo json_encode("Aucun joueur choisi");
    }else {
      if($etatDuChoixJ1 == 1){
        echo json_encode("Joueur 1 déjà choisi");
      }
      if ($etatDuChoixJ2 == 1) {
        echo json_encode("Joueur 2 déjà choisi");
      }
    }

  }


 ?>
