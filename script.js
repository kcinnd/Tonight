// script.js
const grid = document.getElementById('grid');
const word = "tonight";
let gridArray = Array(20).fill().map(() => Array(20).fill(''));

// Existing functions for placeWord, fillGrid

function renderGrid() {
    grid.innerHTML = '';
    gridArray.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            let cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.textContent = cell;
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
