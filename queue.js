// IMPLEMENT A QUEUE ~~~~ FIFO
/*  Breadth first search, pop up messages, events http requests */
var Queue = function(capacity) {
  this._capacity = capacity || Infinity;
  this._dataStorage = {};
  this._head = 0;
  this._tail = 0;
};

Queue.prototype.enqueue = function(value) {
  if (this._count() < this._capacity) {
    this._dataStorage[this._tail++] = value;
    return this._count();
  }
  return "Max capacity is reached, please remove an item before adding a new one";
};

Queue.prototype.dequeue = function() {
  var element = this._dataStorage[this._head];
  delete this._dataStorage[this._head];
  if (this._head < this._tail) {
    this._head++;
  }
  return element;
};

Queue.prototype.peek = function() {
  return this._dataStorage[this.head];
};

Queue.prototype.count = function() {
  return this._tail - this._head;
};

Queue.prototype.contains = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._dataStorage[i] === value) {
      return true;
    }
  }
  return false;
};

Queue.prototype.until = function(value) {
  for (var i = this._head; i < this._tail; i++) {
    if (this._dataStorage[i] === value) {
      return i - this._head + 1;
    }
  }
  return null;
};


// IMPLEMENT A QUEUE WITH 2 STACKS

function Queue_TwoStacks() {
  this._stackIn = new Stack();
  this._stackOut = new Stack();
}

Queue_TwoStacks.prototype.enqueue = function(value) {
  this._stackIn.push(value);
};

Queue_TwoStacks.prototype.transferStacks = function() {
  while (this._stackIn.count() > 0) {
    this._stackOut.push(this._stackIn.pop());
  }
};

Queue_TwoStacks.prototype.dequeue = function() {
  if (this._stackOut.count() === 0) this._transferStacks;
  return this._stackOut.pop();
};

Queue_TwoStacks.prototype.count = function() {
  return this._stackIn.count() + this._stackOut.count();
};

Queue_TwoStacks.prototype.peek = function() {
  if (this._stackOut.count() === 0) this._transferStacks();
  return this._stackOut.peek();
};
