document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player-1').value;
    const player2 = document.getElementById('player-2').value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    const board = document.getElementById('board');
    board.style.display = "grid"; // Show the board

    const messageDiv = document.querySelector('.message');
    let currentPlayer = player1;
    let currentMarker = 'X';
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];

    messageDiv.textContent = `${currentPlayer}, you're up!`;

    board.addEventListener('click', function(event) {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.id) - 1;

        if (gameState[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[clickedCellIndex] = currentMarker;
        clickedCell.textContent = currentMarker;

        if (checkWinner(gameState)) {
            gameActive = false;
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            return;
        }

        if (!gameState.includes("")) {
            gameActive = false;
            messageDiv.textContent = "It's a tie!";
            return;
        }

        currentPlayer = currentPlayer === player1 ? player2 : player1;
        currentMarker = currentMarker === 'X' ? 'O' : 'X';
        messageDiv.textContent = `${currentPlayer}, you're up!`;
    });
});

function checkWinner(gameState) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}


