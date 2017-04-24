// Linked List
/* insert/ delete with reference to the node: O(1) */
/* insert/ delete eithout reference to node: O(n) */
/* search: O(n) */

function Node(value) {
  this.next = null;
  this.value = value;
}

function LinkedList(headValue) {
  if (headValue === undefined) console.log('Must provide a headValue for Node');
  this.head = new Node(headValue);
  this.tail = this.head;
}

LinkedList.prototype.forEach = function(callback) {
  var node = this.head;
  while (node) {
  callback(node.value);
  node = node.next;
  }
};

LinkedList.prototype.print = function() {
  var result = [];
  this.forEach(function(value) {
    result.push(value);
  });
  return result.join(', ');
};

LinkedList.prototype.insertAfter = function(node, value) {
  // get reference to former next
  var oldNext = node.next;
  // create a new node
  var newNext = new Node(value);
  // store it as the newNext
  node.next = newNext;
  // set next for the new Node to be the old next
  newNext.next = oldNext;
  // if reference node is tail, set tail to newNext;
  if (this.tail === node) this.tail = newNext;
  return newNext;
};


LinkedList.prototype.removeAfter = function(node) {
  // store reference to removed node
  var removedNode = node.next;
  // if node is tail , then there is nothing to remove
  if (!removedNode) return 'Nothing to remove';
  // get reference to node after removed node
  var newNext = removedNode.next;
  // set newNext as the next node
  node.next = newNext;
  //  remove reference to removed node from linked list
  remodeNode.next = null;
  // if removed node is tails, set tail to node
  if (removedNode === this.tail) this.tail = node;
  return removedNode;
};

LinkedList.prototype.insertHead = function(value) {
  var newHead = new Node(value);
  var oldHead = this.head;
  this.head = newHead;
  newHead.next = oldHead;
  return this.head;
};

LinkedList.prototype.removeHead = function() {
  var oldHead = this.head;
  var newHead = oldHead.next;
  this.head = newHead;
  oldHead.next = null;
  return oldHead;
};

LinkedList.prototype.findNode = function(value) {
  var node = this.head;
  while (node) {
    if (node.value === value) return node;
    node = node.next;
  }
  return 'No node with ' + value + ' found';
};

LinkedList.prototype.appendToTail = function(value) {
  var newTail = new Node(value);

  /* without myList.tail property O(n)
  var node - this.head;
  while (node.nwxt) {
    node = node.next;
  }
  node.next = newTail; */

  // with myLiust.tail property O(1)
  this.tail.next = newTail;
  this.tail = newTail;
  return newTail;
};
