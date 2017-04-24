// List implementation
var List = function() {
  // list properties
  this.listSize = 0;
  this.position = 0;
  this.dataStorage = [];

};

// add an element to the List
List.prototype.append = function(element) {
  this.dataStorage[this.listSize++] = element;
};


// find() helper function
List.prototype.find = function(element) {
  for (var i = 0; i < this.dataStorage.length; i++) {
    if (this.dataStorage[i] === element) {
      return i;
    }
  }
  return -1;
}

// remove an element form the List
List.prototype.remove = function(element) {
  var foundAt = this.find(element); // get index of element from find()
  if (foundAt > -1) {
    this.dataStorage.splice(foundAt, 1);
    this.listSize--; // reduce List size
    return true; // confirmation
  }
  return false;
};

List.prototype.length = function() {
  return this.listSize;
};

List.prototype.toString = function() {
  return this.dataStorage;
};

List.prototype.insert = function(element, after) {
  var insertPos = this.find(after);
  if (insertPos > -1) {
    this.dataStorage.splice(insertPos + 1, 0, element);
    this.listSize++;
    return true;
  }
  return false;
};

List.prototype.clear = function() {
  delete this.dataStorage;
  this.dataStorage = [];
  this.dataStorage.length = 0;
};

List.prototype.contains = function(element) {
  for (var i = 0; i < this.dataStorage.length; i++) {
    if (element === this.dataStorage[i]) {
      return true;
    }
  }
  return false;
};

// List traversals via iterators
/* Why iterators? they allow us to traverse a List without referencing the internal storage mechanism of the List class */
/* Advantages of using iterators
1. not have to worry about the underlying data structure when accessing list items
2. being able to update the list and not having tho update the iterator, where
    an index becomes invalid when a new element is added to the list
3. providing a uniform means of accessing the elements for different types of
    data stores used in the implementaion of the List class
*/
List.prototype.front = function() {
  this.position = 0;
};

List.prototype.end = function() {
  this.position = this.listSize - 1;
};

List.prototype.prev = function() {
  if (this.position > -1) this.position--;
};

List.prototype.next = function() {
  if (this.position < this.listSize) this.position++;
};

List.prototype.currPosition = function() {
  //if (this.posititon === 0) return false;
  return this.position;
};

List.prototype.moveTo = function(location) {
  this.position = location;
};

List.prototype.getElement = function() {
  return this.dataStorage[this.position];
};

var names = new List();
names;
names.append('kevin');
names.append('Ray');
names.append('heather');
names.append('chuck');
names.append('Rudy');
names;
names.front(); // iterate
names.getElement(); //kevin
names.next(); // itereate
names.getElement(); // Ray
names.next();
names.next();
names.getElement(); //chuck

traversing a List front to back
for (names.front(); names.currPosition < names.length(); names.next()) {
  console.log(names.getElement());
}

// iterate over a List back to front
for (names.end(); names.currPosition() >= 0; names.prev()) {
  console.log(names.getElement());
}

