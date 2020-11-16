/*
Author: FarasK
Date: 11/15/2020
Purpose: HTML, CSS and js tic tac toe with a stupid ai
*/

//setup
let startBtn = document.getElementById('startBtn');
let restartBtn = document.getElementById('RestartBtn');
let scoreboardWinner = document.getElementById('winner');// the DOM element of the winner in ther scoreboard
let scoreboardTimer = document.getElementById('timer');// holdes the timer element
let showTurn = document.getElementById('turn');
let radioBtns = document.getElementsByName('gameMode'); // list of radio buttons
const RNG = ()=>{
  let rng = Math.random();
  if (rng >= 0.5) {
    return 'X';
  }else{
    return 'O';
  }
}
let turn = null;
let winner = null;
let gameIsRunning = false;
let countOfPlays = 0;
let cells = document.querySelectorAll('.cell');
let emptyCell = document.getElementsByClassName('cell')[0].innerHTML // for later comparison
let theTimer;
let playMode;
let gameRunning = false;
///////////////////////////////////////////////////////////////////////////


//When start button is clicked
startBtn.addEventListener('click', ()=>{

  if(startBtn.innerHTML !== 'start'){
    location.reload();
  }
    turn = RNG();
    showTurn.innerHTML = 'it is ' + turn + "'s turn";
    startTimer();
    //PvP stands for Player v Player
    //PvC stands for vs. Computer
    playMode = (radioBtns[0].checked == true)? 'pvp' : 'pvc';
    clearBoard(cells);
    startBtn.innerHTML = 'Restart';
    game(playMode);
});



function startTimer(){
    if(!theTimer){
      let seconds = 1;
      theTimer = setInterval(()=>{
        scoreboardTimer.innerHTML = seconds + 's';
        seconds++;
      }, 1000)
    }else{// when another timer is started and other one is not stopped stop it then start new one;
      stopTimer(theTimer);
      theTimer = null;
      startTimer(theTimer);
    }
}
function stopTimer(timer){
  clearInterval(timer);
}


function drawPlay(e, whosTurn){
  let clickedCell = e.target.childNodes[1]; // the h1 element is at index 1 in the node list, so now we can change the value
  notFreeCell = (clickedCell == undefined || clickedCell.innerHTML !== '')? true : false;
  if(notFreeCell || e.target.className === "the-play" ){
    return;
  }else{
    if(!checkWinner(document.querySelectorAll('.cell'))){
      clickedCell.innerHTML = whosTurn;
      countOfPlays++;
      turn = (turn === 'X')? 'O':'X';
    if (countOfPlays >= 9) {
        stopTimer(theTimer);
        scoreboardWinner.innerHTML = 'Cat’s Game (tie)';
        startBtn.innerHTML = 'Play again?';
      }
  }
}
checkWinner(cells);// check winner after every play;
}
function checkWinner(gameBoard){

  // check horizontally
 if((gameBoard[0].innerHTML === gameBoard[1].innerHTML && gameBoard[1].innerHTML === gameBoard[2].innerHTML && gameBoard[2].innerHTML !== emptyCell)
  || (gameBoard[3].innerHTML === gameBoard[4].innerHTML && gameBoard[4].innerHTML === gameBoard[5].innerHTML && gameBoard[5].innerHTML !== emptyCell)
  || (gameBoard[6].innerHTML === gameBoard[7].innerHTML && gameBoard[7].innerHTML === gameBoard[8].innerHTML && gameBoard[8].innerHTML !== emptyCell)){

      winner = (turn === 'X')? 'O':'X';
      scoreboardWinner.innerHTML = 'The Winner is ' + winner;
      startBtn.innerHTML = 'Play again?';
      stopTimer(theTimer);
  return true;
}
// check vertically
else if ((gameBoard[0].innerHTML === gameBoard[3].innerHTML && gameBoard[3].innerHTML === gameBoard[6].innerHTML && gameBoard[6].innerHTML !== emptyCell)
      || (gameBoard[1].innerHTML === gameBoard[4].innerHTML && gameBoard[4].innerHTML === gameBoard[7].innerHTML && gameBoard[7].innerHTML !== emptyCell)
      || (gameBoard[2].innerHTML === gameBoard[5].innerHTML && gameBoard[5].innerHTML === gameBoard[8].innerHTML && gameBoard[8].innerHTML !== emptyCell)) {

        winner = (turn === 'X')? 'O':'X';
        scoreboardWinner.innerHTML = 'The Winner is ' + winner;
        startBtn.innerHTML = 'Play again?';
        //timer(theTimer, 'stop');
        stopTimer(theTimer);
        return true;
}
// check diagnolly
else if ((gameBoard[0].innerHTML === gameBoard[4].innerHTML && gameBoard[4].innerHTML === gameBoard[8].innerHTML && gameBoard[8].innerHTML !== emptyCell)
      || (gameBoard[2].innerHTML === gameBoard[4].innerHTML && gameBoard[4].innerHTML === gameBoard[6].innerHTML && gameBoard[6].innerHTML !== emptyCell)) {

        winner = (turn === 'X')? 'O':'X';
        scoreboardWinner.innerHTML = 'The Winner is ' + winner;
        startBtn.innerHTML = 'Play again?';
        stopTimer(theTimer);
    return true;
}else {
  return false;
}
}
function clearBoard(gameBoard){
  scoreboardWinner.innerHTML = '<span style="color:red;">No Winner Yet</span>';
  gameBoard.forEach((item) => {
    item.innerHTML = emptyCell;
  });
  winner= null;
  countOfPlays = 0;
}

function lookForEmptyCell(gameBoard){
  let cell = null;

  while(true){
    rng = Math.floor(Math.random() * 9);
    if (gameBoard[rng].innerHTML === emptyCell) {
      cell = gameBoard[rng];
      break;
    }
  }
  return cell;
}
function drawComputer(cell){
  checkWinner(cells);
  if(turn === 'O' && countOfPlays <= 9){
    cell.childNodes[1].innerHTML = 'O';
    countOfPlays++;
    turn = (turn === 'X')? 'O':'X';
  }else{
    return;
  }

}
function game(mode){
  //game setup
  mode = playMode;
  if(mode === 'pvp'){
    cells.forEach((item) => {
      item.addEventListener('click', (e)=>{
       drawPlay(e, turn);
     });

   });
 }else if(mode === 'pvc'){
   if(turn === 'O'){
     drawComputer(lookForEmptyCell(cells));
     cells.forEach((item) => {
       item.addEventListener('click', (e)=>{
        drawPlay(e, turn);
      });
    });
  }else if(turn === 'X'){
     cells.forEach((item) => {
       item.addEventListener('click', (e)=>{
        drawPlay(e, 'X');
        if (!checkWinner(cells) && countOfPlays <=8) {
          drawComputer(lookForEmptyCell(cells));
        }

      });
    });

   }
  }
}
