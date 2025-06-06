let playerSide = '';
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];
let playerTurn = true;
let playerScore = 0;
let computerScore = 0;

function showSidePicker() {
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('sidePicker').style.display = 'block';
}

function pickSide(side) {
    playerSide = side;
    document.getElementById('continueBtn').disabled = false;
}

function startGame() {
    document.getElementById('sidePicker').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    if (playerSide === 'O') {
        playerTurn = false;
        setTimeout(computerMove, 500);
    }
}

function makeMove(index) {
    if (!board[index] && playerTurn && !gameOver) {
        board[index] = playerSide;
        playerTurn = false;
        renderBoard();
        checkWinner();
        if (!gameOver) {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    let emptyIndices = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    board[randomIndex] = playerSide === 'X' ? 'O' : 'X';
    renderBoard();
    checkWinner();
    playerTurn = true;
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.innerText = board[index];
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            if (board[a] === playerSide) {
                playerScore++;
                alert('You Win!');
            } else {
                computerScore++;
                alert('Computer Wins!');
            }
            updateScore();
        }
    });

    if (!board.includes('') && !gameOver) {
        gameOver = true;
        alert('It\'s a Draw!');
    }
}

function updateScore() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    playerTurn = playerSide === 'X';
    renderBoard();
    if (!playerTurn) {
        setTimeout(computerMove, 500);
    }
}