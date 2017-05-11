/*
TREES, an abstract data type

General Tree:
  A tree hass a root node, The root node has zero or more children
  Each child node has 0 or more children (each node in the tree can be seen as a subtree)

Constraints:
  A child node has only one parent, and the root node has no parent
  A tree is a soecial type of graph, A tree is a graph without cycles

*/

// N-ary tree - any number of children
function Tree(value) {
  this.value = value;
  this.children = [];
}

// Adds child  to tree or subtree bound to 'this' keyword
// O(1)
Tree.prototype.addChild = function(value) {
  var child = new Tree(value);
  this.children.push(child);
  return child;
};

var tree = new Tree(1);
var branch1 = tree.addChild(2);
var branch2 = tree.addChild(3);
var branch3 = tree.addchild(4);
branch1.addChild(5);
branch2.addChild(6);
branch3.addchild(7).addChild(8);


// O(n)
Tree.prototype.contains = function(value) {
  if (this.value === value) return true;
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].contains(value)) return true;
  }
  return false;
};

// O(n)
Tree.prototype.traverseDepthFirst = function(fn) { // dont keep track of depth like on a graph
  this.children.forEach(function(child) {
    child.traverseDepthFirst(fn);
  });
  fn(this);
}

var depthFirstResult = [];
tree.traverseDepthFirst(function(node) {
  depthFirstResult.push(node.value);
});
console.log(depthFirstResult, 'should be [5,6,2,3,8,7,4,1]');

// O(n)
Tree.prototype.traverseBreadthFirst = function(fn) {
  var queue = [this];
  while (queue.length) {
    var node = queue.shift();
    fn(node.value);
    node.children.forEach(function(child) {
      queue.push(child);
    });
  }
};

var breadthFirstResult = [];
tree.traverseBreadthFirst(function(node) {
  breadthFirstResult.push(node);
});

console.log(breadthFirstResult, 'should be [1,2,3,4,5,6,7,8]');

