/**
 * Creates a node in the sigma.js graph with default properties
 * @param {Object} graph - The graphology graph instance
 * @param {string} name - The name/id of the node
 * @param {Object} options - Configuration options for the node
 * @param {number} options.size - Size of the node (default: 8.0)
 * @param {string} options.color - Color of the node (default: '#999999')
 * @param {string} options.type - Type of the node (default: 'image')
 * @param {string} options.imageFolder - Folder containing images (default: 'public/')
 * @param {string} options.imageExtension - Image file extension (default: '.jpg')
 * @param {string} options.label - Custom label (default: uses name)
 * @param {string} options.labelColor - Color of the label (default: same as node color)
 */
function createNode(graph, name, options = {}) {
    const defaults = {
        size: 8.0,
        color: '#999999',
        type: 'image',
        imageFolder: 'images/',
        imageExtension: '.jpg',
        label: name,
        labelColor: options.color || '#999999'
    };
    
    const config = { ...defaults, ...options };
    
    // Set labelColor to match color if not explicitly provided
    if (!options.labelColor && options.color) {
        config.labelColor = options.color;
    }
    
    const nodeConfig = {
        size: config.size,
        label: config.label,
        type: config.type,
        // Se o Python enviou um caminho (config.image), use-o. 
        // Caso contrário, monte um caminho novo como fallback.
        image: config.image || `${config.imageFolder}${name.toLowerCase().replace(/ /g, "_")}${config.imageExtension}`,
        color: config.color,
        labelColor: config.labelColor
    };
    
    graph.addNode(name, nodeConfig);
}

/**
 * Creates multiple nodes at once
 * @param {Object} graph - The graphology graph instance
 * @param {Array} nodeList - Array of node configurations
 * Each item can be either a string (name) or an object with name and options
 */
function createNodes(graph, nodeList) {
    nodeList.forEach(node => {
        if (typeof node === 'string') {
            createNode(graph, node);
        } else {
            createNode(graph, node.name, node.options || {});
        }
    });
}

/**
 * Creates an edge in the sigma.js graph
 * @param {Object} graph - The graphology graph instance
 * @param {string} source - The source node id
 * @param {string} target - The target node id
 * @param {Object} options - Configuration options for the edge
 * @param {string} options.type - Type of the edge (default: 'line')
 * @param {number} options.weight - Weight of the edge (default: 1.0)
 * @param {string} options.label - Label for the edge (default: '')
 * @param {number} options.size - Size of the edge (default: 1)
 * @param {string} options.color - Color of the edge (default: '#999999')
 */
function createEdge(graph, source, target, options = {}) {
    const defaults = {
        type: 'line',
        weight: 1.0,
        label: '',
        size: 3, // Increased default size to make edges more clickable
        color: '#999999'
    };
    
    const config = { ...defaults, ...options };
    
    // Ensure minimum size for clickability
    if (config.size < 2) {
        config.size = 2;
    }
    
    graph.addEdge(source, target, config);
}

/**
 * Creates multiple edges at once
 * @param {Object} graph - The graphology graph instance
 * @param {Array} edgeList - Array of edge configurations
 * Each item should be an object with source, target, and options properties
 */
function createEdges(graph, edgeList) {
    edgeList.forEach(edge => {
        createEdge(graph, edge.source, edge.target, edge.options || {});
    });
}

/* 
USAGE EXAMPLES:

// Simple node with default properties
createNode("John Doe");

// Node with custom size and color
createNode("Jane Smith", {
    size: 15.0,
    color: '#ff6600',
    labelColor: '#ff6600'
});

// Multiple nodes at once
createNodes([
    "Person One",
    { name: "Person Two", options: { size: 12.0, color: '#00ff00' } },
    { name: "Person Three", options: { size: 20.0, color: '#0000ff' } }
]);

// Node with custom image path
createNode("Special Person", {
    imageFolder: "images/special/",
    imageExtension: ".png",
    size: 25.0,
    color: '#ff0000'
});

// Simple edge with default properties
createEdge(graph, "John Doe", "Jane Smith");

// Edge with custom weight and color
createEdge(graph, "Person One", "Person Two", {
    weight: 2.0,
    color: '#ff0000',
    label: "strong connection"
});

// Multiple edges at once
createEdges(graph, [
    { source: "Person One", target: "Person Two", options: { weight: 1.5, color: '#00ff00' } },
    { source: "Person Two", target: "Person Three", options: { weight: 2.5, color: '#0000ff', label: "collaboration" } }
]);
*/

// Make functions globally available
window.createNode = createNode;
window.createNodes = createNodes;
window.createEdge = createEdge;
window.createEdges = createEdges;
window.createEdge = createEdge;
window.createEdges = createEdges;

