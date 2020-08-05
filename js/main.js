// /*----- constants -----*/

const lookup = {
  '1': 'blue',
  '-1': 'red',
  'null': ''
};


const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// /*----- app's state (variables) -----*/


let board, turn, winner;



// /*----- cached element references -----*/

const squares = document.querySelectorAll('td div');
const message = document.querySelector('h2');

// /*----- event listeners -----*/


document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);




// /*----- functions -----*/


init();

function handleMove(e) {
  const idx = parseInt(e.target.id.replace('sq', ''))  

  if (board[idx] || winner) return;

  board[idx] = turn;
  turn *= -1
  winner = getWinner();
  render();
}


function getWinner() {
for (let i = 0; i < winningCombos.length; i++) {
  if (Math.abs(board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]]) === 3) return board[winningCombos[i][0]];
  
}
  if (board.includes(null)) return null;
  return 'T';

}


function render(){
  board.forEach(function(sq, idx){
    squares[idx].style.background = lookup[sq];
  });
  if (winner === 'T') {
    message.innerHTML = 'Boohoo no one wins this time!';
  } else if(winner) {
    message.innerHTML =`Congrats ${lookup[winner].toUpperCase()}!`;
    confetti.start(2000);
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`
  }
  }


function init() {
  board = new Array(9).fill(null);
  turn = 1;
  winner = null;
  render();
}