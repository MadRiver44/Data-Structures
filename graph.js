
function Graph() {
  /* we use an object to represent our adjacency list allow for more flexibility,
  constant time lookup on primative values, an array constrains us to only using numbers
    */
  this._nodes = {};
}

Graph.prototype.addNode = function(value) {
  if (value === undefined) return;
  // add a key, itself if it exists or initialize it as empty array
  this._nodes[value] = this._nodes[value] || [];
};
/* myGraph = new Graph()
{_nodes: {} }
myGraph.addNode('pickles');
{_nodes:{'pickles': [] }}
myGraph.addNode('dobby');
{_nodes: {'pickles': [], 'dobby': [] }}
*/


Graph.prototype.removeNode = function(value) {
  this._nodes[value].forEach(function(neighbor) {
    var neighborsNeighbors = this._nodes[neighbor];
    var index = neighborsNeighbors.indexOf(value);
    neighborsNeighbors.splice(index, 1);
  });
  delete this._nodes[value];
};

Graph.prototype.contains = function(value) {
  return this._nodes[value] !== undefined;
};

Graph.prototype.addEdge = function(value1, value2) {
  if (!this_nodes[value1] || !this._nodes[value2]) return 'Invalid node value';
  // if nodes exist, push each value to each others adjacency list
  this._nodes[value1].push(value2);
  this._nodes[value2].push(value1);
};
/* myGraph.addEdge('dobby', 'pickles')*/
/* {_nodes: {'pickles':['dobby'], 'dobby': ['pickles']

  'dobby' ------ 'pickles'

*/

Graph.prototype.removeEdge = function(value1, value2) {
  if (!this._nodes[value1] || !this._nodes[value2]) return 'Invalid node value';
  var value1Neighbors = this._nodes[value1];
  value1Neighbors.splice(value1Neighbors.indexOf(value2),1);
  var value2Neighbors = this._nodes[value2];
  value2Neighbors.splice(value2Neighbors.indexOf(value2), 1);
};

Graph.prototype.hasEdge = function(value1, value2) {
  return this._nodes[value1].indexOf(value2) > -1;
};


Graph.prototype.forEach = function(fn) {
  for (var node in this._nodes) {
    fn(node, this._nodes[node], this._nodes);
  }
};

Graph.prototype.traverseDepthFirst = function(value, fn, visited, distance) { // passing a callback to do some operation on each node
  /* implicitly using a stack data structures
  explored is when all  of our items in the adjacncy list have been visited
  each node needs to be visited and marked as explored,

  base case: if it has been explored,
    nowhere to go (empty adjacency list)
    visited/explored
  for i, loop through array of edges
  traverse(this._nodes[value][i]

  */
  // all the way down then over, can only traverse if there is a connection
  if (!this._nodes[value] || typeof fn !== 'function') return 'Invalid value or function'; // catching errors
  visited = visited || {}; // use as a quick lookup to see if it has been visited
  distance = distance || 0; // how deep into ds
  fn(value, distance); // once we run the function on the node, we mark it as visited = true
  visited[value] = true;
  this._nodes[value].forEach(function(neighbor) { // for every item in our adjacency list, do the following, every item in our adjacency list is a neighbor
    if (visited[neighbor]) return;
    this.traverseDepthFirst(neighbor, fn, vistited, distance + 1);
  }, this); // setting our context, our current node, so we dont lose or current node
};

Graph.prototype.traverseBreadthFirst = function(value, fn) {
  /* this type of search uses a queue
  STEPS:
    1. create a queue Q
    2. Mark node as discovered (gray), and enqueue node into Q
    3. While Q is not empty, do the following:
      A. Dequeue u from Q
      B. Mark u as discovered (gray)
      C. Enqueue all unvisited (white) neighbors w of u
      D. Mark u as explored (black)

      */
  if (!this._nodes[value] || typeof fn !== 'function') return 'Invalid value or function';
  var visited = {};
  var queue = [value]; // adds our value and makes it an array
  visited[value] = 0;
  while (queue.length) { // while queue has something in it, do the following:
    var node = queue.shift(); // returns the first item in an array
    fn(node, visited[node]);
    var neighbors = this._nodes[node].filter(function(neighbor) {
      if (visited[neighbor] === undefined) { // cant have visited it, a way to build a queue on the nodes we have not yet visited yet
        visited[neighbor] = visited[node] + 1;
        return true; // if condition is met we add to neighbors array
      }
    });
    queue = queue.concat(neighbors); // adding all neighbors next on the queue until its empty
  }
};






