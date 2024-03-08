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
    // Choose a random row for the word to be placed
    const rowIndex = Math.floor(Math.random() * gridArray.length);
    // Choose a starting column index ensuring the word fits within the grid
    const startColIndex = Math.floor(Math.random() * (gridArray[rowIndex].length - word.length));

    // Place each letter of the word into the grid
    for (let i = 0; i < word.length; i++) {
        gridArray[rowIndex][startColIndex + i] = word[i];
    }
}

function calculateDistribution() {
    const totalCells = gridArray.length * gridArray[0].length; // Total number of cells in the grid
    const letters = "tonigh"; // Excluding 't' as it appears twice in "tonight"
    const counts = { t: 1, o: 1, n: 1, i: 1, g: 1, h: 1 }; // Start with count 1 for each letter from "tonight"

    // Total letters to distribute (total cells minus the letters in "tonight")
    const totalLettersToDistribute = totalCells - 7;

    // Distribute the letters approximately equally
    let remainingLetters = totalLettersToDistribute;
    while (remainingLetters > 0) {
        for (let letter of letters) {
            if (remainingLetters > 0) {
                counts[letter]++;
                remainingLetters--;
            }
        }
    }

    // Adjust for the second 't' in "tonight"
    counts['t'] += Math.floor(totalLettersToDistribute / letters.length);

    return counts;
}

function fillGrid() {
    const counts = calculateDistribution();
    const letters = "tonigh"; // We'll handle 't' separately due to its double occurrence

    gridArray.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            if (gridArray[rowIndex][cellIndex] === '') { // Check if the cell is empty
                let letter = letters[Math.floor(Math.random() * letters.length)];
                if (letter === 't' && counts['t'] > 0) { // Special handling for 't'
                    if (Math.random() < 0.5) { // Randomly choose to place 't' to ensure distribution
                        gridArray[rowIndex][cellIndex] = letter;
                        counts[letter]--;
                    } else {
                        let nonTLetter = letters.replace('t', '')[Math.floor(Math.random() * (letters.length - 1))];
                        gridArray[rowIndex][cellIndex] = nonTLetter;
                        counts[nonTLetter]--;
                    }
                } else if (counts[letter] > 0) { // Place other letters
                    gridArray[rowIndex][cellIndex] = letter;
                    counts[letter]--;
                }
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

// Three.js setup for 3D grid
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set the background color to black

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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
// Set the camera position to view the grid
camera.position.set(0, 40, 0);
camera.lookAt(scene.position); // Camera looks at the center of the grid

// Render the scene
renderer.render(scene, camera);
