<!DOCTYPE html>
	<html>
		<head>
			<title>Labyrinthe</title>
			<meta charset="utf-8"/>
      <link href="style.css" rel="stylesheet">
		</head>
		<body>
			<div id="regles">
				<ul>
					<h2>Explications</h2>
					<li>Deux joueurs font la course. Il faut atteindre en premier la croix jaune. Celui qui arrive en premier, remporte une manche. Au bout de 3 manches gagnées par un joueur, celui-ci remporte la partie ;</li>
					<li>Cliquer sur <strong>«Joueur 1»</strong> ou <strong>«Joueur 2»</strong> pour indiquer à l'adversaire que vous êtes prêts. La partie ne peut débuter si les deux joueurs ne sont pas prêts ;</li>
					<li>Lorsqu'une manche se termine, il faut cliquer sur <strong>«Manche suivante»</strong> ;</li>
					<li>Lorsque une partie se termine, on peut cliquer sur <strong>«Nouvelle partie»</strong> pour rejouer ;</li>
					<li>On peut observer en temps réel les déplacements de l'adversaire sur le labyrinthe de droite.</li>
				</ul>
			</div>
			<p>Le premier joueur à atteindre 300 points à gagné la partie. Une manche gagnée rapporte 100 points.</p>
			<p id="etatPartie">Etat de la partie: </p>
			<p id="numeroJoueur">Vous êtes le joueur: </p>
			<div id="box">
				<div id="box_gauche">
					<h2 id="vie">Vous</h2>
		      <canvas id="GameBoardCanvas" width="400px" height="400px"></canvas>
					<div id="box_btn_choixJoueur">
						<button id="btn_choix_joueurUn">Joueur 1</button>
						<button id="btn_choix_joueurDeux">Joueur 2</button>
					</div>
					<button id="btn_rejouer">Manche suivante</button>
					<button id="btn_nouvellePartie">Nouvelle partie	</button>
				</div>
				<div id="box_droite">
					<h2>Adversaire</h2>
					<canvas id="GameBoardCanvas_adversaire" width="400px" height="400px"></canvas>
				</div>
			</div>
			<h2>Scores</h2>
			<p id="score_j1"></p>
			<p id="score_j2"></p>
			<h2 id="gagnant"></h2>
      <script src="labyrinthe-copy.js"></script>
    </body>
</html>
