//STACK IMPLEMENTATIONS ~~~~~ LIFO
  // -- AN ARRAY

var Stack = function() {
  this.dataStore = [];
  this.top = 0; // top is our representation of how much is in the stack
};

Stack.prototype.push = function(element) {
  this.dataStore[this.top++] = element;
};

Stack.prototype.pop = function() {
  return this.dataStore[--this.top];
};

Stack.prototype.peek = function() {
  return this.dataStore[this.top -1];
};

Stack.prototype.length = function() {
  return this.top;
};

Stack.prototype.clear = function() {
  this.top = 0;
};

var s = new Stack();
s.push('dave');
s.push('ray');
s.push('mike');
s.push('molly');
s;
s.peek();
s.length();

// IMPLEMENT A STACK AS AN OBJECT

/* backtracking in a maze, undo operations, call stack, parsing expressions, Depth first search */
// _underscores indicate "private variables" to other engineers
var Stack = function(capacity) {
  this.dataStorage = {};
  this._capacity = capacity || Infinity;
  this._count = 0;
};

Stack.prototype.push = function(element) {
  if (this._count < this._capacity) {
    this.dataStorage[this._count++] = element;
    return this._count;
  }
  return "Max capacity of stack reached, please remove an element.";
};

Stack.prototype.pop = function() {
  var element = this.dataStorage[--this._count];
  delete this.dataStorage[this._count];
  if (this._count < 0) {
    this._count = 0;
  }
  return element;
};

Stack.prototype.peek = function() {
  return this.dataStorage[this._count -1];
};

Stack.prototype.count = function() {
  return this._count;
};

// IMPLEMENT A MIN STACK

var MinStack = function(capacity) {
  this.dataStorage = {};
  this._capacity = capacity;
  this._count = 0;
  this._min = new Stack();
};

MinStack.prototype.push = function(element) {
  if (this._count < this._capacity) {
    if (this._min.peek() < element) {
      this._min.push(this._min.peek());
    } else {
      this._min.push(element);
    }
    this.dataStorage[this._count++] = element;
    return this._count;
  }
  return "Max capacity reached, please remove an element before adding a new one";
};

MinStack.prototype.pop = function() {
  this._min.pop();
  var element = this.dataStorage[--this._count];
  delete this.storage[this._count];
  if (this._count < 0) {
    this.count = 0;
  }
  return element;
};

MinStack.prototype.peek = function() {
  return this._dataStorage[this._count - 1];
};

MinStack.prototype.count = function() {
  return this._count;
};

MinStack.prototype.min = function() {
  return this._min.peek();
};
