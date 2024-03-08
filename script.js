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

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();
