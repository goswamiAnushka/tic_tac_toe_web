const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('#message');
const resetButton = document.querySelector('#reset-button');
const playWithFriendButton = document.querySelector('#play-with-friend');
const playWithBotButton = document.querySelector('#play-with-bot');
const fireworks = document.createElement('div');
fireworks.classList.add('fireworks');
document.body.appendChild(fireworks);

let currentPlayer = 'X';
let gameMode = 'friend'; // 'friend' or 'bot'
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            displayWinner(currentPlayer);
            return true;
        }
    }
    if (!boardState.includes('')) {
        displayWinner('None');
        return true;
    }
    return false;
}

function displayWinner(winner) {
    gameActive = false;
    if (winner === 'None') {
        message.textContent = "It's a Draw!";
    } else {
        message.textContent = `${winner} Wins!`;
        startFireworks();
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] !== '' || !gameActive) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? '#ff4081' : '#40c4ff';

    if (checkWin()) return;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (gameMode === 'bot' && currentPlayer === 'O') {
        setTimeout(botMove, 500);
    }
}

function botMove() {
    let emptyCells = boardState.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = currentPlayer;
    cells[randomIndex].textContent = currentPlayer;
    cells[randomIndex].style.color = '#40c4ff';

    if (checkWin()) return;

    currentPlayer = 'X';
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    stopFireworks();
}

function startFireworks() {
    fireworks.style.display = 'block';
    for (let i = 0; i < 30; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        fireworks.appendChild(firework);
    }
    setTimeout(stopFireworks, 1000);
}

function stopFireworks() {
    fireworks.style.display = 'none';
    while (fireworks.firstChild) {
        fireworks.removeChild(fireworks.firstChild);
    }
}

playWithFriendButton.addEventListener('click', () => {
    gameMode = 'friend';
    resetGame();
});

playWithBotButton.addEventListener('click', () => {
    gameMode = 'bot';
    resetGame();
});

resetButton.addEventListener('click', resetGame);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
