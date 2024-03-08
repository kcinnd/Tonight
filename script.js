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

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set the background color to black

// Setup for OrthographicCamera
let aspectRatio = window.innerWidth / window.innerHeight;
let camera = new THREE.OrthographicCamera(-gridSize * aspectRatio / 2, gridSize * aspectRatio / 2, gridSize / 2, -gridSize / 2, 1, 100);
camera.position.set(0, 50, 0); // Position the camera above the grid for a top-down view
camera.lookAt(scene.position); // Camera looks at the center of the grid

let renderer = new THREE.WebGLRenderer({ alpha: true }); // Alpha set to true for a transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Grid size and spacing
const gridSize = 25;
const gridSpacing = 1;

// Material for the grid lines - using grey for the lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x808080 }); // Grey color for the lines

// Create the grid lines
for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
    // Horizontal lines
    let horizontalGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-gridSize / 2, 0, i * gridSpacing),
        new THREE.Vector3(gridSize / 2, 0, i * gridSpacing),
    ]);
    let horizontalLine = new THREE.Line(horizontalGeometry, lineMaterial);
    scene.add(horizontalLine);

    // Vertical lines
    let verticalGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i * gridSpacing, 0, -gridSize / 2),
        new THREE.Vector3(i * gridSpacing, 0, gridSize / 2),
    ]);
    let verticalLine = new THREE.Line(verticalGeometry, lineMaterial);
    scene.add(verticalLine);
}

// Render the scene
renderer.render(scene, camera);
