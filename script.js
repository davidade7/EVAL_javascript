// Main DOM queries
let globalScorePlayer1 = document.getElementById('global-score-1');
let globalScorePlayer2 = document.getElementById('global-score-2');
let currentScorePlayer1 = document.getElementById('current-score-1');
let currentScorePlayer2 = document.getElementById('current-score-2');
let player1 = document.getElementById('player-1');
let player2 = document.getElementById('player-2');
let dice = document.querySelector('.dice object');

// Variable
let activePlayer = 2;
let notActivePlayer = 1;
let gSP1 = 0;
let gSP2 = 0;
let cSP1 = 0;
let cSP2 = 0;

// ---------------------------- TOASTS ----------------------
// Toast New Game
let toastNewGame = document.querySelector('#toast-1');
let mssgNG1 = document.querySelector('#mssg-ng-1');
let timer;
function showToastNewGame(){
  toastNewGame.style.transform = "translateX(-400px)";
  mssgNG1.innerHTML = `<strong>Player ${activePlayer}</strong> it's your turn!`;
  timer = setTimeout(() => {
    toastNewGame.style.transform = "translateX(400px)"
  }, 3000);
}


// Toast if dice 1
let toastDiceOne = document.querySelector('#toast-2');
let mssgDice1 = document.querySelector('#mssg-dice-1');
let mssgDice2 = document.querySelector('#mssg-dice-2');
let timer2;
function showToastDiceOne(){
  toastDiceOne.style.transform = "translateX(-400px)";
  mssgDice1.innerText = `Sorry Player ${activePlayer}`;
  mssgDice2.innerHTML = `<strong>Player ${notActivePlayer}</strong> it's your turn!`;
  timer2 = setTimeout(() => {
    toastDiceOne.style.transform = "translateX(400px)"
  }, 3000);
}


// Toast if hold
let toastHold = document.querySelector('#toast-3');
let mssgHold1 = document.querySelector('#mssg-hold-1');
let mssgHold2 = document.querySelector('#mssg-hold-2');
let timer3;
function showToastHold(){
  toastHold.style.transform = "translateX(-400px)";
  mssgHold1.innerText = `Player ${activePlayer} decides to hold.`;
  mssgHold2.innerHTML = `<strong>Player ${notActivePlayer}</strong> it's your turn!`;
  timer3 = setTimeout(() => {
    toastHold.style.transform = "translateX(400px)"
  }, 3000);
}

// ---------------------------- small functions ----------------------
// Change Player
function changePlayer(){
  if(activePlayer === 1){
    activePlayer = 2;
    notActivePlayer = 1;
    player1.classList.remove("active-player");
    player2.classList.add("active-player");
  } else {
    activePlayer = 1;
    notActivePlayer = 2;
    player2.classList.remove("active-player");
    player1.classList.add("active-player");
  }
}


// reset of current score of player 1
function resetCurrentScore1(){
  cSP1 = 0; 
  currentScorePlayer1.innerText = cSP1;
}


// reset of current score of player 2
function resetCurrentScore2(){
  cSP2 = 0; 
  currentScorePlayer2.innerText = cSP2;
}


// reset of all global scores
function resetGlobalScores(){
  gSP1 = 0;
  gSP2 = 0;
  globalScorePlayer1.innerText = gSP1;
  globalScorePlayer2.innerText = gSP2;
}


// Random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}


// Check if the global score is reached
let checkScore = (score => {
  if (score >= 100){
      return true;
  } else {
      return false;
    }
});


// Open the winner modal
let modalWinner = document.querySelector('#modalWinner');
let backdrop = document.getElementById("backdrop")
function openModal() {
  backdrop.style.display = "block"
  modalWinner.style.display = "block"
  modalWinner.classList.add("show")
}


// Close the winner modal
function closeModal() {
  backdrop.style.display = "none"
  modalWinner.style.display = "none"
  modalWinner.classList.remove("show")
}


// Winner
let winner = document.querySelector('#winner');
function theWinner(player){
    openModal();
    winner.innerText = player;
    /*console.log(`Player ${player} won the game!`);*/
}


// ---------------------------- main functions ----------------------
// NEW GAME
function newGame(){
  // Close the winner modal in case if it's open
  closeModal();
  // Reinitialize all scores
  resetGlobalScores();
  resetCurrentScore1();
  resetCurrentScore2();
  // Reinitialize initial dice to dice 1
  dice.setAttribute("data", "images/dice-1.svg");
  // remove the class "active-player" from both player
  player2.classList.remove("active-player");
  player1.classList.add("active-player");
  activePlayer = 1;
  notActivePlayer = 2;
  // Show message to players
  showToastNewGame()
  /*console.log('The game has been initialize');*/
} 


// ROLL DICE
let rollDice = document.querySelector('.roll-dice');
rollDice.addEventListener('click', () => {
  let diceThrow = getRandomIntInclusive(1,6);
  let diceFace = "images/dice-"+diceThrow+".svg";

  dice.setAttribute("data", diceFace)
  /*console.log(`dice ${diceThrow}`);*/

  if (diceThrow === 1){
    if (activePlayer === 1){
      resetCurrentScore1()
      showToastDiceOne();
      changePlayer();
    } else {
      resetCurrentScore2()
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


// HOLD
let hold = document.querySelector('.hold');
hold.addEventListener('click', () => {
  if (activePlayer === 1){
    gSP1 += cSP1;
    globalScorePlayer1.innerText = gSP1;
    resetCurrentScore1();
    if (checkScore(gSP1)){
      theWinner(activePlayer);
    } else {
      showToastHold();
      changePlayer();
    }
    
  } else {
    gSP2 += cSP2;
    globalScorePlayer2.innerText = gSP2;
    resetCurrentScore2();
    if (checkScore(gSP2)){
      theWinner(activePlayer);
    } else {
      showToastHold();
      changePlayer();
    }
  }
});
