// Binary Search Tree
// log n - height of the tree
function BinarySearchTree(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this._root = null;
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
pattern - LEFT SELF RIGHT
O(n)
*/

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function(fn) { // we pass a fn to transform or operate on the node values
  if (!this.left && !this.right) return fn(this);
  if (this.left) this.left.traverseDepthFirst_inOrder(fn); // left
  fn(this); // self
  if (this.right) this.right.traverseDepthFirst_inOrder(fn); // right
};

var result_traverseDepthFirst_inOrder = [];
bsTree.traverseDepthFirst_inOrder(function(node) {
  result_traverseDepthFirst_inOrder.push(node.value);
});
console.log(result_traverseDepthFirst_inOrder, 'should be [3,5,7,8,9,10,14,15,17,20]');

// Pre Order Traversal
/*
visits the current node before it's child nodes, PARENT FIRST
pattern - SELF LEFT RIGHT
O(n)
*/

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function(fn) {
  fn(this); // self
  if (this.left) this.left.traverseDepthFirst_preOrder(fn); // left
  if (this.right) this.right.traverseDepthFirst_preOrder(fn); // right
};

var result_traverseDepthFirst_preOrder = [];
bsTree.traverseDepthFirst_preOrder(function(node) {
  result_traverseDepthFirst_preOrder.push(node.value);
});
console.log(result_traverseDepthFirst_preOrder, 'should be [10,5,3,8,7,9,15,14,20,17]');

// Post Order Traversal
/*
visit the current node after it's child node
O(n)
*/

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function(fn) {
  if (this.left) this.left.traverseDepthFirst_postOrder(fn);
  if (this.right) this.right.traverseDepthFirst_postOrder(fn);
  fn(this);
};

var result_traverseDepthFirst_postOrder =[];
bsTree.traverseDepthFirst_postOrder(function(node) {
  result_traverseDepthFirst_postOrder.push(node.value);
});
console.log(result_traverseDepthFirst_postOrder, 'should be [3,7,9,8,5,14,17,20,15,10]')

// 3 cases:
// when a parent has a leaf node, set reference from parent to child  to null
// when node has one child, move the node up to the parent
//

BinarySearchTree.protoype.deleteMin = function(parent) {
  if (!this.left && !this.right) {
    if (parent) {
      parent.left = null;
    } else {
      this.value = null; // we want to add values later
    }
  } else if (!this.left && this.right) {
      if (parent) {
        parent.left = this.right;
      }else {
        this.value = this.right.value;
        this.right = this.right.right;
      }
    }
    if (this.left) this.left.deleteMin(this);
}


BinarySearchTree.protoype.deleteMax = function(parent) {
  if (!this.right && !this.left) {
    if (parent) {
      parent.right = null;
    } else { // if the max value is the last node
      this.value = null; // we want to add values later
    }
  } else if (!this.right && this.left) {
      if (parent) {
        parent.right = this.left;
      }else {
        this.value = this.left.value;
        this.left = this.left.right;
      }
    }
    if (this.right) this.right.deleteMax(this);
}

// Delete a node , nick zakas implementation
BinarySearchTree.protoype.deleteNode = function(value) {
  var found = false;
  var parent = null;
  var current = this._root;
  var childCount;
  var replacement;
  var replacementParent;

  // make sure there's a node to search
  while (!found && current) {
    // if the value is less than the current node's, go left
    if (value < current.value) {
      parent = current;
      current = current.left;
    // if the value is greater than the current node's go right
    } else if (value > current.value) {
        parent = current;
        current = current.right;
    // values are equal, found it!!
    } else {
        found = true;
    }
  }
  // only proceed if the node was found
  if (found) {
    // figure out how many children
    childCount = (current.left !== null ? 1 : 0) + (current.right !== null ? 1 : 0);
    // special case: value is at root
    if (current === this._root) {
      switch (childCount) {
        // no children, just erase the root
        case 0:
          this._root = null;
          break;
        // one child, use one as the root
        case 1:
          this._root = (current.right === null ? current.left : current.right);
          break;
        // two children, a liitle bit of work to do
        case 2:
          // new root will be the old root's left child, maybe
          replacement = this._root.left;
          // find the right most leaf node to be the real new root
          while (replacement.right !== null) {
            replacementParent = replacement;
            replacement = replacement.right;
          }
        // if it's not the first node on the left
          if (replacementParent !== null) {
            // remove the new root from it's previous position
            replacementParent.right = replacement.left;
            // give the new root all the old root's children
            replacement.right = this._root.right;
            replacement.left = this._root.left;
          } else {
            // just assign the children
            replacement.right = this._root.right;
          }
          // officially assign the new root
          this._root = replacement;
      }
    }
  }
}


// Traverse Breaadth First
// O(n)
BinarySearchTree.prototype.traverseBreadthFirst = function(fn) {
  var queue = [this];
  while (queue.length) {
    var node = queue.shift();
    fn(node);
    node.left && queue.push(node.left);
    node.right && queue.push(node.right);
  }
};

var result_traverseBreadthFirst = [];
bsTree.traverseBreadthFirst(function(node) {
  result_traverseBreadthFirst.push(node.value);
});
console.log(result_traverseBreadthFirst, 'should be [10, 5, 15, 3, 8, 14, 20, 7, 9, 17]');


// A binary tree is full if every node has either zero or two children (no nodes have only one child)
// O(n)
BinarySearchTre.prototype.checkIfFull = function() {
  var result = true;
  this.traverseBreadthFirst(function(node) {
    if (!node.left && node.right) result = false;
    else if (node.left && !node.right) result = false;
  });
  return result;
};
console.log(bsTree.checkIfFull(), 'should be false');

var fullBSTree = new BinarySearchTree(10);
fullBSTree.insert(5).insert(20).insert(15).insert(21),insert(16).insert(13);
console.log(fullBSTree.checkIfFull(), 'should be true');

// A Binary Search Tree is balance if the minimum height and maximum height differ by no maore than one
// O(n)

BinarySearchTree.prototype.checkIfBalanced = function() {
  var heights = [];
  var recurse = function(node, height) {
    if (!node.left && !node.right) return heights.push(height);
    node.left && recurse(node.left, height+1);
    node.right && recurse(node.left, height+1);
  };
  recurse(this, 1);
  var min = Math.min.apply(null, heights);
  var max = Math.max.apply(null, heights);
  return max - min <= 1;
};

console.log(bsTree.checkIfBalanced(), 'should be true');
console.log(bsTree.checkIfBalanced(), 'should be false');











