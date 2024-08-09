const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const line = document.querySelector('.line');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

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

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerHTML = `Player ${currentPlayer}'s turn`;
}

function drawWinningLine(indexes) {
    const [first, second, third] = indexes;
    const firstCell = cells[first].getBoundingClientRect();
    const thirdCell = cells[third].getBoundingClientRect();

    const x1 = firstCell.left + firstCell.width / 2;
    const y1 = firstCell.top + firstCell.height / 2;
    const x2 = thirdCell.left + thirdCell.width / 2;
    const y2 = thirdCell.top + thirdCell.height / 2;

    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    line.style.width = `${length}px`;
    line.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    line.classList.add('show');
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            drawWinningLine(winCondition);
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerHTML = `Game ended in a draw!`;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    statusText.innerHTML = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.innerText = '');
    line.classList.remove('show');
    line.style.width = '0';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
