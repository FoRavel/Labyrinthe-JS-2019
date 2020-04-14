<!DOCTYPE html>
	<html>
		<head>
			<title>Inscription</title>
			<meta charset="utf-8"/>
      <link href="style.css" rel="stylesheet">
		</head>
		<body>
			<div id="inline">
				<div class="bloc">
					<h2>Connexion</h2>
						<form>
							<div class="bloc_input">
				        <label for="pseudo">Pseudonyme:</label>
				        <input type="text" name="pseudo" id="pseudo_connexion">
				        <label for="mot_de_passe">Mot de passe:</label>
				        <input type="password" name="mdp" id="mdp_connexion">
				        <input type="button" value="Se connecter"id="button_connexion">
							</div>
			      </form>
				</div>
				<div class="bloc">
		      <h2>Inscription</h2>
		      <form>
						<div class="bloc_input">
			        <label for="pseudo">Choisir un pseudonyme:</label>
			        <input type="text" name="pseudo" id="pseudo">
			        <label for="mot_de_passe">Choisir un mot de passe:</label>
			        <input type="password" name="mdp" id="mdp">
			        <input type="button" value="S'inscrire "id="button_inscription">

						</div>
		      </form>

				</div>

			</div>
			<p id="erreur"></p>
      <script>
        const input_pseudo = document.getElementById("pseudo");
        const input_mdp = document.getElementById("mdp");
				const input_pseudoCon = document.getElementById("pseudo_connexion");
				const input_mdpCon = document.getElementById("mdp_connexion");
        const btn_valider = document.getElementById("button_inscription");
				const btn_seConnecter = document.getElementById("button_connexion");
        const txt_erreur = document.getElementById("erreur");

        var pseudo = "";
        var mdp = "";
        btn_valider.addEventListener("click", function(e){
          pseudo = input_pseudo.value;
          mdp = input_mdp.value;
          if(verifierChamp()){
            inscrireJoueur(pseudo, mdp);

          }
        })

				btn_seConnecter.addEventListener("click", function(e){
          pseudo = input_pseudoCon.value;
          mdp = input_mdpCon.value;
          if(verifierChamp()){
            connecterJoueur(pseudo, mdp);

          }
        })

        function verifierChamp(){
          if(pseudo == "" || mdp == ""){
            txt_erreur.innerHTML = "Erreur: Vous devez renseigner tous les champs";
            txt_erreur.style.color = "red";
            return false;
          }else{
            txt_erreur.innerHTML = "";
            return true;
          }
        }

        async function inscrireJoueur(pseudo, mdp){
          try{
            response = await fetch("inscription_trt.php",{
              method: "POST",
              headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                pseudo: pseudo,
                mdp: mdp
              })
            });
						responseJson = await response.json();
						if(responseJson == "Joueur inscrit"){
							txt_erreur.innerHTML = "Vous vous êtes inscrit, vous pouvez maintenant vous connecter.";
							txt_erreur.style.color = "green";
						}
          }catch(error){
            console.log(error);
          }
        }

				async function connecterJoueur(pseudo, mdp){
					try{
						const response = await fetch("connexion_trt.php",{
							method: "POST",
							headers:{
								'Accept': 'application/json',
								'Content-Type': 'application/json'
							},
							body:JSON.stringify({
								pseudo: pseudo,
								mdp: mdp
							})
						});
						const responseJson = await response.json();
						console.log(responseJson);
						if(responseJson == "Utilisateur inexistant"){
							txt_erreur.innerHTML = "Erreur: Utilisateur inexistant.";
							txt_erreur.style.color = "red";
						}else{
							window.location.href = "lobby.php";
						}
					}catch(error){
						console.log(error);
					}
				}


      </script>
    </body>
</html>
