document.addEventListener('DOMContentLoaded', () => {
    const grid = new Grid(10, 10);
    const algorithm = new Algorithm(grid);
    let currentMode = 'wall'; // 'start', 'end', 'wall'

    // Initialize the grid UI
    function initializeGrid() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';

        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', () => handleCellClick(row, col));
                cell.addEventListener('mouseenter', (e) => {
                    if (e.buttons === 1) { // Left mouse button is pressed
                        handleCellClick(row, col);
                    }
                });

                gridElement.appendChild(cell);
            }
        }
    }

    // Update the grid visualization
    function updateGrid() {
        const cells = document.getElementsByClassName('cell');
        for (let row = 0; row < grid.rows; row++) {
            for (let col = 0; col < grid.cols; col++) {
                const node = grid.getNode(row, col);
                const cell = cells[row * grid.cols + col];
                
                cell.className = 'cell';
                if (node.isStart) cell.classList.add('start');
                if (node.isEnd) cell.classList.add('end');
                if (node.isWall) cell.classList.add('wall');
                if (node.isVisited) cell.classList.add('visited');
                if (node.isPath) cell.classList.add('path');
            }
        }
    }

    // Handle cell clicks
    function handleCellClick(row, col) {
        switch (currentMode) {
            case 'start':
                grid.setStartNode(row, col);
                break;
            case 'end':
                grid.setEndNode(row, col);
                break;
            case 'wall':
                grid.toggleWall(row, col);
                break;
        }
        updateGrid();
    }

    // Set up button event listeners
    document.getElementById('startBtn').addEventListener('click', () => {
        setActiveButton('startBtn');
        currentMode = 'start';
    });

    document.getElementById('endBtn').addEventListener('click', () => {
        setActiveButton('endBtn');
        currentMode = 'end';
    });

    document.getElementById('wallBtn').addEventListener('click', () => {
        setActiveButton('wallBtn');
        currentMode = 'wall';
    });

    document.getElementById('findPathBtn').addEventListener('click', async () => {
        grid.resetVisited();
        updateGrid();
        await algorithm.visualizeAlgorithm();
        updateGrid();
    });

    document.getElementById('clearBtn').addEventListener('click', () => {
        grid.clearGrid();
        updateGrid();
    });

    // Helper function to set active button
    function setActiveButton(buttonId) {
        const buttons = document.querySelectorAll('.controls button');
        buttons.forEach(button => button.classList.remove('active'));
        document.getElementById(buttonId).classList.add('active');
    }

    // Initialize the application
    initializeGrid();
    setActiveButton('wallBtn');
}); 