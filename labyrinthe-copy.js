

const posX_depart = 0;
const posY_depart = 0;
var player = {
    numeroJoueur: numeroChoisi,
    x: posX_depart,
    y: posY_depart,
    mancheGagnee: 0,
    vies: 300,
    etatChoix: 1
};

const txt_vie_j1 = document.getElementById('vie');
const txt_gagnant = document.getElementById('gagnant');
const txt_etatPartie = document.getElementById('etatPartie');
const txt_numeroJoueur = document.getElementById('numeroJoueur');
const txt_score_j1 = document.getElementById('score_j1');
const txt_score_j2 = document.getElementById('score_j2');
const btn_joueur1 = document.getElementById('btn_choix_joueurUn');
const btn_joueur2 = document.getElementById('btn_choix_joueurDeux');
const btn_rejouer = document.getElementById('btn_rejouer');
const btn_nouvellePartie = document.getElementById('btn_nouvellePartie');

var numeroChoisi = null;

btn_joueur1.addEventListener("click", function(){
  numeroChoisi = 1;
  txt_numeroJoueur.innerHTML = "Vous êtes le joueur : " + numeroChoisi;
  player.numeroJoueur = numeroChoisi;
  choisirJoueur(player.numeroJoueur);
  console.log(player);
});
btn_joueur2.addEventListener("click", function(){
  numeroChoisi = 2;
  txt_numeroJoueur.innerHTML = "Vous êtes le joueur : " + numeroChoisi;
  player.numeroJoueur = numeroChoisi;
  choisirJoueur(player.numeroJoueur);
  console.log(player);
});
btn_rejouer.addEventListener("click", function(){
  reinitialiserPosition();
});
btn_nouvellePartie.addEventListener("click", function(){
  reinitialiserTout();
});

var canvas = document.getElementById('GameBoardCanvas');
var canvas_adversaire = document.getElementById('GameBoardCanvas_adversaire');
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 3, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];

var gameIsFinished = false;

function draw2(adversaire){
    var width = canvas_adversaire.width;
    var blockSize = width/board.length;
    var ctx = canvas_adversaire.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); //inutile?
    ctx.clearRect(0, 0, width, width); //inutile?
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }

    //Draw the player

    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "red";
    ctx.arc(adversaire["x"]*blockSize+half, adversaire["y"]*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();

}

//Draw the game board
function draw(){
    console.log("coordonnées: " + board[player.y][player.x]);
    var width = canvas.width;
    var blockSize = width/board.length;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0); //inutile?
    ctx.clearRect(0, 0, width, width); //inutile?
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
            if(board[player.y][player.x] === -1){
              gameIsFinished = true;
              player.mancheGagnee += 1;
              if(player.numeroJoueur == 1)
                txt_score_j1.innerHTML = player.mancheGagnee;
              else {
                txt_score_j2.innerHTML = player.mancheGagnee;
              }
              updateGameState(1);
            }
            if(board[player.y][player.x] === 3){
              player.vies -= 1;
              if(player.numeroJoueur == 1){
                txt_vie_j1.innerHTML = "Vous ("+player.vies+")";
              }
              if(player.vies <100){
                gameIsFinished = true;
                updateGameState(1);
              }
                /*
              else {
                txt_vie_j2.innerHTML = player.mancheGagnee;
              }*/
            }
        }
    }

    //Draw the player
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "blue";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

//$(document).keyup(function(e){
document.addEventListener('keyup', (e) =>{
    if(!gameIsFinished && player.numeroJoueur != null && btn_joueur1.disabled && btn_joueur2.disabled){
      if((e.which == 38) && canMove(player.x, player.y-1))//Up arrow
          player.y--;
      else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
          player.y++;
      else if((e.which == 37) && canMove(player.x-1, player.y))
          player.x--;
      else if((e.which == 39) && canMove(player.x+1, player.y))
          player.x++;

      draw();
      updateCoordonnees(player);
      e.preventDefault();
    }
    else{
      e.preventDefault();
    }
});

draw();




setInterval(async function(){
  rep = await getUpdatedCoordonnees(player);
  draw2(rep);
  if(rep.mancheGagnee == 300){
    updateGameState(1);
    txt_gagnant.innerHTML = "Le vainqueur est le joueur " + rep["numeroJoueur"];
  }
  if(rep == "Choisir un numéro"){
    txt_numeroJoueur.innerHTML = "Choisissez un numéro de joueur ! ";
  }
  if(rep.vies < 100){
    txt_gagnant.innerHTML = "Vous gagnez car votre adversaire n'a plus de vie.";
  }
}, 500);


setInterval(async function(){
  etat = await getGameState(gameIsFinished);
  if(etat == "terminé"){
    txt_etatPartie.innerHTML="Etat de la partie : Terminée, cliquer sur «Manche suivante»";
    gameIsFinished = true;
    console.log("gameIsFinished : " + gameIsFinished);
  }else if (etat == "en cours") {
    txt_etatPartie.innerHTML="Etat de la partie : En cours";
    gameIsFinished = false;
    console.log("gameIsFinished : " + gameIsFinished);
  }else if (etat == "recommencé") {
    txt_etatPartie.innerHTML="Etat de la partie : Recommencée";
    player.x = posX_depart;
    player.y = posY_depart;
    draw();
    updateGameState(0);
    console.log("PARTIE RECOMMENCÉE");
  }
}, 500);

setInterval(async function(){
  response = await getChoixJoueur();
  console.log("PRET: " + response);
  if(response == "Les deux joueurs ont choisi"){
    btn_joueur1.disabled = true;
    btn_joueur2.disabled = true;
  }else{
    if(response == "Aucun joueur choisi"){
      btn_joueur1.disabled = false;
      btn_joueur2.disabled = false;
    }else{
      if(response == "Joueur 1 déjà choisi"){
        btn_joueur1.disabled = true;
      }else{
        btn_joueur1.disabled = false;
      }
      if(response == "Joueur 2 déjà choisi"){
        btn_joueur2.disabled = true;
      }else{
        btn_joueur2.disabled = false;
      }
    }

  }
}, 500);

//On repositionne le joueur à sa position de départ, on utilise cette fonction quand on joue une nouvelle manche
async function reinitialiserPosition(){
  gameIsFinished = false;
  player.x = posX_depart;
  player.y = posY_depart;
  player.vies = 300;
  player.etatChoix = 1;
  updateCoordonnees(player);
  updateGameState(3);
  draw();
}
//On repositionne le joueur à sa position de départ ET on remet son score à 0, on utilise cette fonction quand on recommence une nouvelle partie
async function reinitialiserTout(){
  player.x = posX_depart;
  player.y = posY_depart;
  player.mancheGagnee = 0; //score
  player.vies = 300;
  player.etatChoix = 0;

  updateCoordonnees(player);
  updateGameState(0);
  draw();
}


//Mise à jour des coordonnées du joueur
async function updateCoordonnees(joueur){
    console.log("COORD"+joueur);
    try{
    const response = await fetch("update_positions.php?numeroJoueur="+joueur.numeroJoueur,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        numeroJoueur: joueur.numeroJoueur,
        x: joueur.x,
        y: joueur.y,
        mancheGagnee: joueur.mancheGagnee,
        vies: joueur.vies,
        etatChoix: joueur.etatChoix
      })
    });
    const responseJson = await response.json();

  }catch(error){
    console.log(error);
  }
}
//Permet d'obtenir les coordonnées et le nombre de manches gagnées de l'adversaire du joueur passé en paramètre
async function getUpdatedCoordonnees(joueur){
  try{
    const response = await fetch("get_positions.php?numeroJoueur="+joueur.numeroJoueur);
    const responseJson = await response.json();
    //Si l'adversaire est le joueur 1
    if(responseJson.numeroJoueur == 1){
      txt_score_j1.innerHTML = "Joueur 1 : " + responseJson.mancheGagnee; //Affichage du score du joueur 1
      txt_score_j2.innerHTML = "Joueur 2 : " +  joueur.mancheGagnee; //Affichage du score du joueur 2 (moi)
    }
    //Si l'adversaire est le joueur 2
    if(responseJson.numeroJoueur == 2){
      txt_score_j2.innerHTML = "Joueur 2 : " +  responseJson.mancheGagnee; //Affichage du score du joueur 2
      txt_score_j1.innerHTML = "Joueur 1 : " +  joueur.mancheGagnee; //Affichage du score du joueur 1 (moi)
    }
    console.log(responseJson);
    return responseJson;
  }catch(error){
    console.log(error);
  }
}

async function updateGameState(booleen){
  try{
    if(booleen == 1){
       response = await fetch("gameState.php?gameEnded="+1);
    }else if (booleen == 0) {
       response = await fetch("gameState.php?gameEnded="+0);
    }else if (booleen == 3) {
       response = await fetch("gameState.php?gameEnded="+3);
    }

    responseJson = await response.json();
  }catch(error){
    console.log(error);
  }
}

async function getGameState(etat){
  try{
    const response = await fetch("get_GameState.php");
    const responseJson = await response.json();
    return responseJson;
    console.log(responseJson);
  }catch(error){
    console.log(error);
  }
}

async function choisirJoueur(numero){
  fetch("update_choixJoueur.php",{
    method: "POST",
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      numero: numero
    })
  });
}

getChoixJoueur = async() => {
  try{
    const response = await fetch("get_choixJoueur.php");
    const responseJson = await response.json();
    return responseJson;
    console.log(responseJson);
  }catch(error){
    console.log(error);
  }
}
