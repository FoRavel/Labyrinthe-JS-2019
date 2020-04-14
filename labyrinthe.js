

const posX_depart = 0;
const posY_depart = 0;
var player = {
    numeroJoueur: numeroChoisi,
    x: posX_depart,
    y: posY_depart,
    mancheGagnee: 0,
    etatChoix: 1
};
const txt_gagnant = document.getElementById('gagnant');
const txt_etatPartie = document.getElementById('etatPartie');
const txt_numeroJoueur = document.getElementById('numeroJoueur');
const txt_score_j1 = document.getElementById('score_j1');
const txt_score_j2 = document.getElementById('score_j2');
const btn_joueur1 = document.getElementById('btn_choix_joueurUn');
const btn_joueur2 = document.getElementById('btn_choix_joueurDeux');
const btn_rejouer = document.getElementById('btn_rejouer');
var numeroChoisi = null;

btn_joueur1.addEventListener("click", function(){
  numeroChoisi = 1;
  txt_numeroJoueur.innerHTML = "Vous êtes le joueur : " + numeroChoisi;
  player.numeroJoueur = numeroChoisi;
  console.log(player);
});
btn_joueur2.addEventListener("click", function(){
  numeroChoisi = 2;
  txt_numeroJoueur.innerHTML = "Vous êtes le joueur : " + numeroChoisi;
  player.numeroJoueur = numeroChoisi;
  console.log(player);
});
btn_rejouer.addEventListener("click", function(){
  reinitialiserPartie();
});

var canvas = document.getElementById('GameBoardCanvas');
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];



var gameIsFinished = false;

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
    if(!gameIsFinished && player.numeroJoueur != null){
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
  rep = await getUpdatedCoordonnees(player)
  if(rep.mancheGagnee == 300)
    updateGameState(1);
  if(rep == "Choisir un numéro"){
    txt_numeroJoueur.innerHTML = "Choisissez un numéro de joueur ! ";
  }
}, 500);


setInterval(async function(){
  etat = await getGameState(gameIsFinished);
  if(etat == "terminé"){
    txt_etatPartie.innerHTML="Etat de la partie : Terminée, cliquer sur «Rejouer»";
    gameIsFinished = true;
    console.log(gameIsFinished);
  }else if (etat == "en cours") {
    txt_etatPartie.innerHTML="Etat de la partie : En cours";
    gameIsFinished = false;
    console.log(gameIsFinished);
  }else if (etat == "recommencé") {
    txt_etatPartie.innerHTML="Etat de la partie : Recommencée";
    player.x = posX_depart;
    player.y = posY_depart;
    draw();
    updateGameState(0);
    console.log("PARTIE RECOMMENCÉE");
  }
}, 500);


async function reinitialiserPartie(){
  gameIsFinished = false;
  player.x = posX_depart;
  player.y = posY_depart;
  player.etatChoix = 0;
  updateCoordonnees(player);
  updateGameState(3);
  draw();
}

//Mise à jour des coordonnées du joueur sur le serveur toutes les 0.1 seconde
async function updateCoordonnees(joueur){
  console.log(joueur);
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

    if(responseJson.numeroJoueur == 1){
      txt_score_j1.innerHTML = "Joueur 1 : " + responseJson.mancheGagnee;
      txt_score_j2.innerHTML = "Joueur 2 : " +  joueur.mancheGagnee;
    }
    if(responseJson.numeroJoueur == 2){
      txt_score_j2.innerHTML = "Joueur 2 : " +  responseJson.mancheGagnee;
      txt_score_j1.innerHTML = "Joueur 1 : " +  joueur.mancheGagnee;
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
