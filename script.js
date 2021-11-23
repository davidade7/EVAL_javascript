// DOM queries
let globalScorePlayer1 = document.getElementById('global-score-1');
let globalScorePlayer2 = document.getElementById('global-score-2');
let currentScorePlayer1 = document.getElementById('current-score-1');
let currentScorePlayer2 = document.getElementById('current-score-2');
let player1 = document.getElementById('player-1');
let player2 = document.getElementById('player-2');
let dice = document.querySelector('.dice object');
let mssgPlayer = document.querySelector('#mssgPlayer');

// buttons queries
let newGame = document.querySelector('#validateNewGame');
let rollDice = document.querySelector('.roll-dice');

// Variable
let activePlayer = 2;
let gSP1 = 0;
let gSP2 = 0;
let cSP1 = 0;
let cSP2 = 0;


// Toast New Game
let toast = document.getElementById("toast");
let timer;
function showToast(){
  toast.style.transform = "translateX(-400px)";
  timer = setTimeout(() => {
      toast.style.transform = "translateX(400px)"
  }, 3000);
}


// Toast dice 1
let toast2 = document.getElementById("toast2");
let timer2;
function showToastDiceOne(){
  toast2.style.transform = "translateX(-400px)";
  let toasterMessage = `Sorry Player ${activePlayer}`;
  mssgPlayer.innerText = toasterMessage;
  timer2 = setTimeout(() => {
      toast2.style.transform = "translateX(400px)"
  }, 3000);
}


// Change Player
function changePlayer(){
  if(activePlayer === 1){
    activePlayer = 2
    player1.classList.remove("active-player");
    player2.classList.add("active-player");
  } else {
    activePlayer = 1
    player2.classList.remove("active-player");
    player1.classList.add("active-player");
  }
}


// NEW GAME
newGame.addEventListener('click', () => {
  // Reinitialize all scores
  gSP1 = 0;
  gSP2 = 0;
  cSP1 = 0;
  cSP2 = 0;
  globalScorePlayer1.innerText = gSP1;
  currentScorePlayer1.innerText = cSP1;
  globalScorePlayer2.innerText = gSP2;
  currentScorePlayer2.innerText = cSP2;
  // Reinitialize initial dice to dice 1
  dice.setAttribute("data", "images/dice-1.svg");
  // remove the class "active-player" from both player
  player2.classList.remove("active-player");
  player1.classList.add("active-player");
  activePlayer = 1;
  // Show message to players
  showToast()
  console.log('The game has been initialize');
}); 


// Random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}


// ROLL DICE
rollDice.addEventListener('click', () => {
  let diceThrow = getRandomIntInclusive(1,6);
  let diceFace = "images/dice-"+diceThrow+".svg";

  dice.setAttribute("data", diceFace)
  console.log(`dice ${diceThrow}`);

  if (diceThrow === 1){
    if (activePlayer === 1){
      cSP1 = 0; 
      currentScorePlayer1.innerText = cSP1;
      showToastDiceOne();
      changePlayer();
    } else {
      cSP2 = 0;
      currentScorePlayer2.innerText = cSP2;
      showToastDiceOne();
      changePlayer();      
    }      
  } else {
    if (activePlayer === 1){
      cSP1 += diceThrow; 
      currentScorePlayer1.innerText = cSP1;
    } else {
      cSP2 += diceThrow;
      currentScorePlayer2.innerText = cSP2;
    }
  }
});

