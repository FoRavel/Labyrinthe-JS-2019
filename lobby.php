<?php
session_start();
if(empty($_SESSION["pseudonyme"])){
	header("Location:connexion.php");
}

 ?>

<!DOCTYPE html>
	<html>
		<head>
			<title>Accueil</title>
			<meta charset="utf-8"/>
      <link href="style.css" rel="stylesheet">
		</head>
		<body>
			<h2>Bienvenue : <?php echo $_SESSION["pseudonyme"] ?></h2>
			<p> Pour inviter un joueur à jouer avec toi, clique sur le bouton «inviter».
				Il recevra une notification de son côté. Si il accepte l'invitation, la partie se lancera directement</p>
      <h2>Liste des joueurs connectés</h2>
			<ul id="listeConnectes">
      </ul>
			<div id="invitation_popUp">
				<h2>Invitation reçue</h2>
				<p>Vous venez de recevoir une invitation de la part de <strong  id="texte_popUp"></strong></p>
				<div id="box_boutons_invit">
					<button id="btn_accepter">Accepter</button>
					<button id="btn_refuser">Refuser</button>
				</div>
			</div>
      <script>


				const popUp = document.getElementById("invitation_popUp");
				const txt_popUp = document.getElementById("texte_popUp");
				const btn_accepter = document.getElementById("btn_accepter");
				const btn_refuser = document.getElementById("btn_refuser");

				var sender = "";
        afficherJoueursConnectes()
				setInterval(async function(){
					sender = await ecouterInvitations();
					if(sender != null){
						popUp.style.display = "flex";
						txt_popUp.innerHTML = sender;
					}else{
						popUp.style.display = "none";
					}
				}, 1000)
				popUp.style.display = "none";

				btn_accepter.addEventListener("click", function(e){
					accepterInvitation(sender);
					window.location.href = "labyrinthe.php";
				});

        async function afficherJoueursConnectes(){
          liste = await getJoueursConnectes();
          liste.forEach(function(joueur){
            var node = document.createElement("LI");                 // Create a <li> node
            var textnode = document.createTextNode(joueur);         // Create a text node
						var btn_inviter = document.createElement("BUTTON");
						btn_inviter.id=joueur;
						btn_inviter.className = "inviter";
						var textnodeButton = document.createTextNode("inviter");
						btn_inviter.appendChild(textnodeButton);
            node.appendChild(textnode);                              // Append the text to <li>
						node.appendChild(btn_inviter);
            document.getElementById("listeConnectes").appendChild(node);     // Append <li> to <ul> with id="myList"
          })
					var arrBoutons = document.getElementsByClassName("inviter");
					Array.from(arrBoutons).forEach((bouton)=>{
						bouton.addEventListener("click", function(){
							createInvitation(<?php echo json_encode($_SESSION["pseudonyme"]);?>, bouton.id)
							setInterval(async function(){
								etatInvitation = await ecouterInvitations(bouton.id);
								if(etatInvitation == "Invitation accepté"){
									window.location.href = "labyrinthe.php";
								}
							}, 1000);
						})
					})
        }

				async function createInvitation(sender, receiver){
					try{
						response = await fetch("create_invitation.php",{
							method:"POST",
							headers:{
								"Accept":"application/json",
								"Content-Type": "application/json"
							},
							body:JSON.stringify({
				        sender: <?php echo json_encode($_SESSION["pseudonyme"]);?>,
								receiver: receiver
				      })
						});
					}catch(error){
						console.log(error);
					}
				}

        async function getJoueursConnectes(){
          try{
            const response = await fetch("get_joueursInscrits.php");
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
          }catch(error){
            console.log(error);
          }
        }
				//Savoir si j'ai reçu une invitation
				async function ecouterInvitations(rcv){
					var $url = "";
					if(rcv != undefined){
						$url = "get_invitations.php?receiver="+rcv;
					}else{
						$url = "get_invitations.php";
					}
					try{
            const response = await fetch($url,{
							method: "POST",
							headers:{
								'Accept': 'application/json',
				        'Content-Type': 'application/json'
							},
							body:JSON.stringify({
				        pseudo: <?php echo json_encode($_SESSION["pseudonyme"]);?>
				      })
						});
						if(rcv != undefined){
							const responseJson = await response.json();
							console.log(responseJson);
							return responseJson;
						}else{
							const responseJson = await response.json();
							console.log(responseJson);
							if(responseJson != null){
								return responseJson;
							}else{
								return null;
							}
						}

          }catch(error){
            console.log(error);
          }
				}

				async function accepterInvitation(sender){
					try{
            const response = await fetch("set_invitations.php",{
							method: "POST",
							headers:{
								'Accept': 'application/json',
				        'Content-Type': 'application/json'
							},
							body:JSON.stringify({
				        receiver: <?php echo json_encode($_SESSION["pseudonyme"]);?>,
								sender: sender
				      })
						});
            const responseJson = await response.json();
						console.log(responseJson);

          }catch(error){
            console.log(error);
          }
				}
      </script>
    </body>
</html>
