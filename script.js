// script.js
const cells = document.querySelectorAll('.cell');
const board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

// Event Listeners
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

document.getElementById('play-friend').addEventListener('click', startFriendGame);
document.getElementById('play-bot').addEventListener('click', startBotGame);
document.getElementById('reset').addEventListener('click', resetGame);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] || !isGameActive) return;

    updateBoard(index, currentPlayer);
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function updateBoard(index, player) {
    board[index] = player;
    cells[index].textContent = player;
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            displayWinner(currentPlayer);
            isGameActive = false;
            return;
        }
    }

    if (board.every(cell => cell)) {
        displayDraw();
        isGameActive = false;
    }
}

function displayWinner(player) {
    setTimeout(() => {
        alert(`${player} wins!`);
        // Add confetti effect here
    }, 100);
}

function displayDraw() {
    setTimeout(() => {
        alert('It\'s a draw!');
    }, 100);
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isGameActive = true;
    currentPlayer = 'X';
}

function startFriendGame() {
    resetGame();
    // Set up for friend game mode
}

function startBotGame() {
    resetGame();
    // Set up for AI mode
    // Implement AI logic here
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
