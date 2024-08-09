const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const gameContainer = document.querySelector('.game-container');

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

function triggerWinCelebration() {
    const hurrahPopup = document.createElement('div');
    hurrahPopup.classList.add('hurrah-popup');
    hurrahPopup.innerHTML = `<h2>Hurrah! Player ${currentPlayer} Wins!</h2>`;
    gameContainer.appendChild(hurrahPopup);
    fireworkAnimation();

    setTimeout(() => {
        hurrahPopup.remove();
    }, 3000);
}

function fireworkAnimation() {
    for (let i = 0; i < 10; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        gameContainer.appendChild(firework);
        setTimeout(() => {
            firework.remove();
        }, 2000);
    }
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
            triggerWinCelebration();
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
    const fireworks = document.querySelectorAll('.firework');
    fireworks.forEach(firework => firework.remove());
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestartGame);
