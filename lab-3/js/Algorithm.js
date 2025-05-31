class Algorithm {
    constructor(grid) {
        this.grid = grid;
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];
    }

    async dijkstra(startNode, endNode, speed = 'medium') {
        this.visitedNodesInOrder = [];
        this.nodesInShortestPathOrder = [];
        
        const unvisitedNodes = this.getAllNodes();
        startNode.distance = 0;

        // Reset statistics
        document.getElementById('visitedCount').textContent = '0';
        document.getElementById('pathLength').textContent = '0';

        while (unvisitedNodes.length > 0) {
            this.sortNodesByDistance(unvisitedNodes);
            const closestNode = unvisitedNodes.shift();

            if (closestNode.distance === Infinity) {
                return this.visitedNodesInOrder;
            }

            closestNode.isVisited = true;
            this.visitedNodesInOrder.push(closestNode);
            
            // Update visited count immediately
            document.getElementById('visitedCount').textContent = this.visitedNodesInOrder.length;

            if (closestNode === endNode) {
                this.nodesInShortestPathOrder = this.getNodesInShortestPathOrder(endNode);
                // Update path length immediately
                document.getElementById('pathLength').textContent = this.nodesInShortestPathOrder.length;
                return this.visitedNodesInOrder;
            }

            this.updateUnvisitedNeighbors(closestNode);
            
            // Add delay for visualization
            await this.delay(speed);
        }
    }

    sortNodesByDistance(unvisitedNodes) {
        unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
    }

    updateUnvisitedNeighbors(node) {
        const unvisitedNeighbors = node.getNeighbors(this.grid.grid).filter(neighbor => !neighbor.isVisited);
        for (const neighbor of unvisitedNeighbors) {
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }

    getNodesInShortestPathOrder(finishNode) {
        const nodesInShortestPathOrder = [];
        let currentNode = finishNode;
        while (currentNode !== null) {
            nodesInShortestPathOrder.unshift(currentNode);
            currentNode = currentNode.previousNode;
        }
        return nodesInShortestPathOrder;
    }

    getAllNodes() {
        const nodes = [];
        for (let row = 0; row < this.grid.rows; row++) {
            for (let col = 0; col < this.grid.cols; col++) {
                nodes.push(this.grid.getNode(row, col));
            }
        }
        return nodes;
    }

    delay(speed) {
        const speeds = {
            'slow': 100,
            'medium': 50,
            'fast': 10
        };
        return new Promise(resolve => setTimeout(resolve, speeds[speed]));
    }

    async visualizeAlgorithm() {
        if (!this.grid.startNode || !this.grid.endNode) {
            alert('Please set both start and end points!');
            return;
        }

        // Reset statistics at the start
        document.getElementById('visitedCount').textContent = '0';
        document.getElementById('pathLength').textContent = '0';

        const speed = document.getElementById('speed').value;
        await this.dijkstra(this.grid.startNode, this.grid.endNode, speed);
        
        // Visualize the path
        for (const node of this.nodesInShortestPathOrder) {
            node.isPath = true;
            await this.delay(speed);
        }

        // Ensure final statistics are displayed
        document.getElementById('visitedCount').textContent = this.visitedNodesInOrder.length;
        document.getElementById('pathLength').textContent = this.nodesInShortestPathOrder.length;
    }
} 