class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isStart = false;
        this.isEnd = false;
        this.isWall = false;
        this.isVisited = false;
        this.isPath = false;
        this.distance = Infinity;
        this.previousNode = null;
    }

    reset() {
        this.isVisited = false;
        this.isPath = false;
        this.distance = Infinity;
        this.previousNode = null;
    }

    getNeighbors(grid) {
        const neighbors = [];
        const { row, col } = this;
        
        // Check all four directions
        if (row > 0) neighbors.push(grid[row - 1][col]); // Up
        if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // Down
        if (col > 0) neighbors.push(grid[row][col - 1]); // Left
        if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]); // Right

        return neighbors.filter(neighbor => !neighbor.isWall);
    }

    getDistance(otherNode) {
        // Manhattan distance
        return Math.abs(this.row - otherNode.row) + Math.abs(this.col - otherNode.col);
    }
} 