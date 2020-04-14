<?php
  $content = file_get_contents("etatDuJeu.txt");
  echo json_encode($content);
?>
