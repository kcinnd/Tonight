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

// Three.js setup for 3D grid
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set the background color to black

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true }); // Use alpha: true for a transparent background
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Grid size and spacing
const gridSize = 25;
const gridSpacing = 1;

// Material for the grid lines - using grey for the lines
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x808080 }); // Grey color for the lines

// Create the grid lines
for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
    let horizontalGeometry = new THREE.Geometry();
    horizontalGeometry.vertices.push(new THREE.Vector3(-gridSize / 2, 0, i * gridSpacing));
    horizontalGeometry.vertices.push(new THREE.Vector3(gridSize / 2, 0, i * gridSpacing));
    let horizontalLine = new THREE.Line(horizontalGeometry, lineMaterial);
    scene.add(horizontalLine);

    let verticalGeometry = new THREE.Geometry();
    verticalGeometry.vertices.push(new THREE.Vector3(i * gridSpacing, 0, -gridSize / 2));
    verticalGeometry.vertices.push(new THREE.Vector3(i * gridSpacing, 0, gridSize / 2));
    let verticalLine = new THREE.Line(verticalGeometry, lineMaterial);
    scene.add(verticalLine);
}

// Set the camera position to view the grid
camera.position.set(0, 40, 0);
camera.lookAt(scene.position); // Camera looks at the center of the grid

// Render the scene
renderer.render(scene, camera);
