// SIMPLE HASHING FUNCTION
function simpleHash(str, tableSize) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i) * (i + 1);
  }
  return hash % tableSize;
}

// source: http://pmav.eu/stuff/javascript-hashing-functions/source.html

function HashTable(tableSize) {
  this._size = tableSize;
  this._storage = [];
  this._count = 0;
}

// find is a helper method
HashTable.prototype.find = function(key) {
  var hash = simpleHash(key, this._size);
  this._storage[hash] = this._storage[hash] || [];
  var bucket = this._storage[hash];
  // iterate through bucket and check if key is present
  var match;
  var matchIndex;
  bucket.forEach(function(item, index) {
    if (item.hasOwnProperty(key)) {
      match = item;
      matchIndex = index;
    }
  });
  return {match: match, bucket: bucket, matchIndex: matchIndex};
};

// O(1)
HashTable.prototype.set = function(key, value) {
  var match = this.find(key).match;
  var bucket = this.find(key).bucket;
  // if match exists, update value;
  if (match) {
    match[key] = value;
  }
  // if not, add new object with key/value pair
  else {
    var newItem = {};
    newItem[key] = value;
    this._count++;
    bucket.push(newItem);
    if (this._count > 0.75 * this._size) {
      this.resize(2 * this._size);
    }
  }
  return this;
};

var myMap = new HashTable(10);
console.log(myMap.set('key', 'value'), 'should be HT object');

// O(1)
HashTable.prototype.get = function(key) {
  var match = this.find(key).match;
  // if key is found, match is an object {key: value}
  // if not, match is undefined
  return match && match[key];
};

console.log(mayMap.get('key'), 'should be value');
// value asscoiated with key or undefined if none

// O(1)
HashTable.prototype.has = function(key) {
  return !!this/find(key).match;
  // !! does type conversion to boolean
  // !!{} => true
  // !!undefined => false
};

console.log(myMap.has('key'), 'should be true');
console.log(myMap.has('foo'), 'should be false');
// true false depending if value has been associated with the key

// O(1)
HashTable.prototype.delete = function(key) {
  var match = this.find(key).match;
  if (match) {
    var bucket = this.find(key).bucket;
    var matchIndex = this.find(key).matchIndex;
    bucket.splice(matchIndex, 1);
    this._count--;
    if (this._count < .025 * this._size) {
      this.resize(0.5 * this._size);
    }
  }
  return !!match;
};

console.log(myMap.delete('key'), 'should be true');
console.log(myMap.delete('foo'), 'should be false');
console.log(myMap, 'should have no elements');
// true if a value was associated with the key
// false if a value was never associated with  the key
// Remove any value associated to the key

// O(1)
HashTable.prototype.count = function() {
  return this._count;
};

console.log(myMap.count(), 'should be 0');
// integer number of key/value pairs in hash table

// O(n)
HashTable.prototype.forEach = function(callback) {
  this._storage.forEach(function(bucket) {
    bucket = bucket || [];
    bucket.forEach(function(item) {
      callback(item);
    });
  });
};

// O(n)
HashTable.prototype.resize = function(newSize) {
  var oldStorage = this._storage;
  this._size = newSize;
  this._count = 0;
  this._storage = [];
  var that = this; // i hate this hack
  oldStorage.forEach(function(bucket) {
    bucket.forEach(function(item) {
      var key = Object.keys(item)[0];
      that.set(key, item[key]);
    });
  });
};















