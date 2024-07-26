//your JS code here. If required.
document.getElementById('submit').addEventListener('click', startGame);

let currentPlayer = 'X';
let gameActive = true;
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];

function startGame() {
    player1 = document.getElementById('player-1').value;
    player2 = document.getElementById('player-2').value;

    if (player1 === '' || player2 === '') {
        alert('Please enter names for both players');
        return;
    }

    document.querySelector('.player-inputs').style.display = 'none';
    updateMessage(`${player1}, you're up`);

    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
        cell.textContent = '';
    });
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.id - 1;

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        updateMessage(`${currentPlayer === 'X' ? player1 : player2} congratulations you won!`);
        gameActive = false;
    } else if (board.every(cell => cell !== '')) {
        updateMessage(`It's a draw!`);
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage(`${currentPlayer === 'X' ? player1 : player2}, you're up`);
    }
}

function updateMessage(message) {
    document.querySelector('.message').textContent = message;
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
