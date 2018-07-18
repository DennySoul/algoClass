/* eslint-disable max-len */
/*
GRAPHS

Abstract data type

Basic Graph:
Stores nodes (represented by any primitive value) and the neighbors for each node. This implementation represents a graph as an adjacency list (https://en.wikipedia.org/wiki/Adjacency_list).

Here's an example:
1---2---3
 \ /
  4
graph = {
  1: [2, 4],
  2: [1, 3, 4],
  3: [2],
  4: [1, 2]
}

Constraints:
This graph implementation is undirected and can have unconnected nodes. The nodes are represented by unique primitive values.

*** Operations:
graph.addNode(value) // value must be a primitive
=> undefined
Add node to graph

graph.removeNode(value)
=> undefined
Remove node from graph

graph.contains(value)
=> true/false
Returns true if value is found in graph, false otherwise

graph.addEdge(value1, value2)
=> undefined
Create connection between two nodes if they're both present in the graph

graph.removeEdge(value1, value2)
=> undefined
Remove connection between two nodes

graph.hasEdge(value1, value2)
=> true/false
Returns true if edge exists, false otherwise

graph.forEach(callback)
=> undefined
Traverse the graph and invoke the passed callback once for each node. The callback function receives the following for each node: node value, node Neighbors, all nodes.

Implement traversal methods for depth-first and breadth-first traversal. The methods take a starting node and a callback that gets invoked for each node. The callback should receive two arguments: the node value and the distance (number of edges that separate the node from the starting node). See example usage below.

graph.traverseDepthFirst(value1, callback)
=> undefined
Starting at the node with the value passed in, traverse the graph and invoke the callback for each node in a depth-first fashion.

graph.traverseBreadthFirst(value, callback)
=> undefined
Starting at the node with the value passed in, traverse the graph and invoke the callback for each node in a breadth-first fashion.

Example Usage:
1---2---3---5
 \ /
  4
{
  '1': [ 2, 4 ],
  '2': [ 1, 3, 4 ],
  '3': [ 2, 5 ],
  '4': [ 1, 2 ],
  '5': [ 3 ]
}

var traverseDF = [];
graph.traverseDepthFirst(1, function(val, distance) { traverseDF.push([val, distance]) });
traverseDF should be [ [ 1, 0 ], [ 2, 1 ], [ 3, 2 ], [ 5, 3 ], [ 4, 2 ] ]

var traverseBF = [];
graph.traverseBreadthFirst(1, function(val, distance) { traverseBF.push([val, distance]) });
traverseBF should be [ [ 1, 0 ], [ 2, 1 ], [ 4, 1 ], [ 3, 2 ], [ 5, 3 ] ]


*** Additional Exercises:

Given a directed graph and two nodes in the graph, write a function that indicates whether there is a route between the two nodes. Bonus: rather than returning a boolean, have your function return the shortest distance between the two nodes (the number of edges that separate them).

*/

/* eslint-enable max-len */

function Graph() {
    this.nodes = {};
}

Graph.prototype.addNode = function (value) {
    this.nodes = {
        ...this.nodes,
        [value]: [],
    };
};
// Time complexity:

Graph.prototype.removeNode = function (value) {
    for (let k in this.nodes) {
        const i = this.nodes[k].indexOf(value);

        if (i !== -1) {
            this.nodes[k] = [
                ...this.nodes[k].slice(0, i),
                ...this.nodes[k].slice(i),
            ];

            return true;
        }
    }

    return false;
};
// Time complexity:

Graph.prototype.contains = function (value) {
    for (let k in this.nodes) {
        if (this.nodes[k].indexOf(value) !== -1)
            return true;
    }

    return false;
};
// Time complexity:

Graph.prototype.addEdge = function (value1, value2) {
    if (!this.nodes[value1] || !this.nodes[value2])
        return false;

    this.nodes[value1].push(value2);
    this.nodes[value2].push(value1);
};
// Time complexity:

Graph.prototype.removeEdge = function (value1, value2) {
    if (!this.hasEdge(value1, value2))
        return false;

    const v2Index = this.nodes[value1].indexOf(value2);
    const v1Index = this.nodes[value2].indexOf(value1);
    const getValueIndex = v => v === value1 ? v2Index : v1Index;

    [value1, value2].forEach(v => {
        this.nodes[v] = [
            ...this.nodes[v].slice(0, getValueIndex(v)),
            ...this.nodes[v].slice(getValueIndex(v)),
        ];
    });
};
// Time complexity:

Graph.prototype.hasEdge = function (value1, value2) {
    return this.nodes[value1].indexOf(value2) !== -1 && this.nodes[value2].indexOf(value1) !== -1;
};
// Time complexity:

Graph.prototype.forEach = function (fn) {
    // implement me...
};
// Time complexity:

Graph.prototype.traverseDepthFirst = function (value, fn, visited, distance) {
    if (!this.nodes[value] || typeof fn !== 'function')
        return false;

    visited = visited || {};
    distance = distance || 0;

    fn(value, distance);

    visited[value] = true;

    this.nodes[value].forEach(neighbour => {
        if (visited[neighbour])
            return;

        this.traverseDepthFirst(neighbour, fn, visited, distance + 1);
    }, this);
};
// Time complexity:

Graph.prototype.traverseBreadthFirst = function (value, fn) {
    if (!this.nodes[value] || typeof fn !== 'function')
        return false;

    const visited = {};
    let queue = [value];

    visited[value] = 0;

    while (queue.length) {
        const node = queue.shift();

        fn(node, visited[node]);

        const neighbours = this.nodes.filter(neighbour => {
            if (!visited[neighbour]) {
                visited[neighbour] = visited[node] + 1;

                return true;
            }
        });

        queue = queue.concat(neighbours);
    }
};
// Time complexity:
