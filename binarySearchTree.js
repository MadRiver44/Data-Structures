// Binary Search Tree
function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

// O(log (n))
BinarySearchTree.prototype.insert = function(value) {
  if (value <= this.value) {
    if (this.left) this.left.insert(value);
    else this.left = new BinarySearchTree(value);
  }
  else {
    if (this.right) this.right.insert(value);
    else this.right = new BinarySearchTree(value);
  }
  return this;
};

// O(log (n)
BinarySearchTree.prototype.contains = function(value) {
  if (this.value = value) return true;
  if (value <= this.value) {
    // if this.left doesn't exist, return false
    // if it does exist, check if subtree contains the value
    // !! forces to a boolean, if it's true, then its true
    return !!this.left && this.left.contains(value);
  }
  if (value > this.value) {
    // if this.right doesn't exist, return false
    // if it does exist, check if the subtree contains the value
    return !!this.right && this.right.contains(value);
  }
  return false;
};

var bsTree = new BinarySearchTree(10);
bsTree.insert(5).insert(15).insert(8).insert(3).insert(7).insert(20).insert(17).insert(9).insert(14);


// In Order Traversal, most common
/*
Visit the left branch, then current node, then right branch
for a binary search tree, this visits the nodes in secending order
O(n)
*/

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) { // we pass a fn to transform or operate on the node values
  if (!this.left && !this.right) return fn(this);
  if (this.left) this.left.traverseDepthFirst_inOrder(fn);
  fn(this);
  if (this.right) this.right.traverseDepthFirst_inOrder(fn);
};

var result_traverseDepthFirst_inOrder = [];
bsTree.traverseDepthFirst_inOrder(function(node) {
  result_traverseDepthFirst_inOrder.push(node.value);
});
console.log(result_traverseDepthFirst_inOrder, 'should be [3,5,7,8,9,10,14,15,17,20]');

// Pre Order Traversal
/*
visits the current node before it's child nodes
O(n)
*/

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  fn(this);
  if (this.left) this.left.traverseDepthFirst_preOrder(fn);
  if (this.right) this.right.traverseDepthFirst_preOrder(fn);
};

var result_traverseDepthFirst_preOrder = [];
bsTree.traverseDepthFirst_preOrder(function(node) {
  result_traverseDepthFirst_preOrder.push(node.value);
});
console.log(result_traverseDepthFirst_preOrder, 'should be [10,5,3,8,7,9,15,14,20,17]');












