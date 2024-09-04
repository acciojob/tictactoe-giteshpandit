//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
    let player1 = document.getElementById('player-1').value;
    let player2 = document.getElementById('player-2').value;

    if (player1 === "" || player2 === "") {
        alert("Please enter names for both players.");
        return;
    }

    let currentPlayer = player1;
    let currentMarker = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    document.querySelector('.message').textContent = `${currentPlayer}, you're up!`;

    let boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board

    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.id = i;
        cell.addEventListener('click', function() {
            if (board[i] === '' && gameActive) {
                board[i] = currentMarker;
                cell.textContent = currentMarker;
                if (checkWinner(board, currentMarker)) {
                    document.querySelector('.message').textContent = `${currentPlayer} congratulations you won!`;
                    gameActive = false;
                } else if (board.indexOf('') === -1) {
                    document.querySelector('.message').textContent = "It's a tie!";
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    currentMarker = currentMarker === 'X' ? 'O' : 'X';
                    document.querySelector('.message').textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
        boardElement.appendChild(cell);
    }
});

function checkWinner(board, marker) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombos.some(combo => 
        combo.every(index => board[index] === marker)
    );
}

