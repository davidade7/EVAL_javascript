// DOM queries
let globalScorePlayer1 = document.getElementById('global-score-1');
let globalScorePlayer2 = document.getElementById('global-score-2');
let currentScorePlayer1 = document.getElementById('current-score-1');
let currentScorePlayer2 = document.getElementById('current-score-2');
let player1 = document.getElementById('player-1');
let player2 = document.getElementById('player-2');
let dice = document.querySelector('.dice object');


// buttons queries
let newGame = document.querySelector("#validateNewGame");


// Toast
let toast = document.getElementById("toast");
function showToast(){
  let timer = 0;
  toast.style.transform = "translateX(-400px)";
  timer = setTimeout(() => {
      toast.style.transform = "translateX(400px)"
  }, 3000);
}


// NEW GAME
newGame.addEventListener('click', e => {
  // Reinitialize all scores
  globalScorePlayer1.innerText = 0;
  currentScorePlayer1.innerText = 0;
  globalScorePlayer2.innerText = 0;
  currentScorePlayer2.innerText = 0;
  // Reinitialize initial dice to dice 1
  dice.setAttribute("data", "images/dice-1.svg");
  // remove the class "active-player" from both player
  player2.classList.remove("active-player");
  player1.classList.add("active-player");
  
  // Show message to players
  showToast()
  console.log('The game has been initialize');
}); 

