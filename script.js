// script.js
const grid = document.getElementById('grid');
const word = "tonight";
let gridArray = Array(20).fill().map(() => Array(20).fill(''));
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('particles.js loaded');
});
let hoverSound = new Audio('hover.mp3');

document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('mouseover', () => hoverSound.play());
});

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
