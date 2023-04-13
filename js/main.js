const cells = document.querySelectorAll('.game-cell');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(event) {
    const cell = event.target;
    if (cell.innerText === '') {
        cell.innerText = currentPlayer;
        checkGameEnd();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkGameEnd() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const cellsArr = Array.from(cells);
    const currentCells = cellsArr.reduce((acc, cell, index) => {
        if (cell.innerText === currentPlayer) {
            return [...acc, index];
        }
        return acc;
    }, []);

    const isWinningCombo = winningCombos.some(combo => {
        return combo.every(index => currentCells.includes(index));
    });

    if (isWinningCombo) {
        alert(`${currentPlayer} wins!`);
        cells.forEach(cell => {
            cell.innerText = '';
        });
        currentPlayer = 'X';
    } else if (cellsArr.every(cell => cell.innerText !== '')) {
        alert('Tie game!');
        cells.forEach(cell => {
            cell.innerText = '';
        });
        currentPlayer = 'X';
    }
}
