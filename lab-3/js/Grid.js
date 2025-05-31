class Grid {
    constructor(rows = 10, cols = 10) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        this.startNode = null;
        this.endNode = null;
        this.initializeGrid();
    }

    initializeGrid() {
        this.grid = [];
        for (let row = 0; row < this.rows; row++) {
            const currentRow = [];
            for (let col = 0; col < this.cols; col++) {
                currentRow.push(new Node(row, col));
            }
            this.grid.push(currentRow);
        }
    }

    getNode(row, col) {
        return this.grid[row][col];
    }

    setStartNode(row, col) {
        if (this.startNode) {
            this.startNode.isStart = false;
        }
        const node = this.getNode(row, col);
        node.isStart = true;
        this.startNode = node;
    }

    setEndNode(row, col) {
        if (this.endNode) {
            this.endNode.isEnd = false;
        }
        const node = this.getNode(row, col);
        node.isEnd = true;
        this.endNode = node;
    }

    toggleWall(row, col) {
        const node = this.getNode(row, col);
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
        }
    }

    clearGrid() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.getNode(row, col);
                node.reset();
                node.isWall = false;
                node.isStart = false;
                node.isEnd = false;
            }
        }
        this.startNode = null;
        this.endNode = null;
    }

    resetVisited() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const node = this.getNode(row, col);
                node.reset();
            }
        }
    }
} 