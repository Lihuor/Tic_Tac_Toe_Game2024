// Player X always starts
let currentPlayer = 'X'; 
let gameBoard = ["", "", "", "","", "", "", "", ""];
let gameActive = true;

// Handling Player Turns
const handlePlayerTurn = (clickedCellIndex) =>{
    // console.log('handlePlayerTurn called')
    // console.log('gameBoard:', gameBoard);
    // console.log('currentPlayer:', currentPlayer);
    if (gameBoard[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    gameBoard[clickedCellIndex] = currentPlayer;
    checkForWinOrDraw();
    currentPlayer = currentPlayer === 'X' ? 'O': 'X';
}

// Handling Cell Clicks
const cellClicked = (clickedCellEvent) =>{
    // console.log('cell clicked');
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerTurn(clickedCellIndex);
    updateUI();
}

// Add Event Listener to the cells
const cells = document.querySelectorAll('.cell');

cells.forEach(cell =>{
    // console.log('Event listener added to cell:', cell);
    cell.addEventListener('click', cellClicked, false);
});

// Updating the User Interface
const updateUI = () =>{
    // console.log('updating UI')
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
    }
}
const announceWinner = (player) =>{
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = `Player ${player} Wins`;
}
const announceDraw = () => {
    const messageElement = document.getElementById('gameMessage');
    messageElement.innerText = 'Game Draw!';
}

// Defining the Win Conditions
const winConditions = [
    [0, 1, 2], //Top Row
    [3, 4, 5], //Middle Row
    [6, 7, 8], //Bottom Row
    [0, 3, 6], //Left Column
    [1, 4, 7], //Middle Column
    [2, 5, 8], //Right Column
    [0, 4, 8], //Left-to-right diagonal
    [2, 4, 6] //Right-to-left diagonal
];

// Checking for a Win or Draw
const checkForWinOrDraw = () =>{
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        announceWinner(currentPlayer);
        gameActive = false;
        return;
    }
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        announceDraw();
        gameActive = false;
        return;
    }
}

const resetGame = ()=> {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
    });
    document.getElementById('gameMessage').innerText = '';
}

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetGame, false);