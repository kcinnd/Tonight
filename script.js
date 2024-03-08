// script.js
const grid = document.getElementById('grid');
const word = "tonight";
let gridArray = Array(20).fill().map(() => Array(20).fill(''));

function placeWord() {
    // Randomly place the word "tonight" in the grid
    // Ensure it fits without going out of bounds
}

function fillGrid() {
    // Fill the rest of the grid with random letters from "tonight"
    // Ensure approximately equal distribution and don't overwrite the "tonight" placement
}

function renderGrid() {
    grid.innerHTML = '';
    gridArray.forEach(row => {
        row.forEach(cell => {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
            grid.appendChild(cellElement);
        });
    });
}

placeWord();
fillGrid();
renderGrid();
