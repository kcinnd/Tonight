const grid = document.getElementById('grid');
const word = "tonight";
let gridArray = Array(20).fill().map(() => Array(20).fill(''));
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('particles.js loaded');
});
let hoverSound = new Audio('sounds/bloop.mp3');

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('mouseover', () => hoverSound.play());
});

function placeWord() {
    const word = "tonight";
    const rowIndex = Math.floor(Math.random() * gridArray.length);
    const startColIndex = Math.floor(Math.random() * (gridArray[rowIndex].length - word.length));
    
    for (let i = 0; i < word.length; i++) {
        gridArray[rowIndex][startColIndex + i] = word[i] + '*'; // Marking the cell
    }
}

function fillGrid() {
    const letters = "tonigh"; // Unique letters in "tonight" minus one 't'
    gridArray.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (cell === '') { // If the cell is empty
                let randomLetter = letters[Math.floor(Math.random() * letters.length)];
                gridArray[rowIndex][cellIndex] = randomLetter;
            } else if (cell.endsWith('*')) { // If the cell is part of the correct "tonight"
                gridArray[rowIndex][cellIndex] = cell[0]; // Remove the mark, leaving only the letter
            }
        });
    });
}

function renderGrid() {
    grid.innerHTML = '';
    gridArray.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell.replace('*', ''); // Remove any marks before displaying
            cellElement.addEventListener('mouseover', () => {
                cellElement.style.transform = 'translateZ(60px)';
            });
            cellElement.addEventListener('mouseout', () => {
                cellElement.style.transform = 'translateZ(30px)';
            });
            grid.appendChild(cellElement);
        });
    });
}

placeWord();
fillGrid();
renderGrid();
