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
