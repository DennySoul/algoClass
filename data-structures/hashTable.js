/* eslint-disable max-len */
/*

HASH TABLE

Collection of key-value pairs.
Map keys to values for efficient lookup.
Use an array as the underlying data structure.
Hash table should have a size - this will be used by the hashing function to determine what index to map the key to.
A hashing function is used to map the key to an integer, which is the index that the value is to be stored at.
Since our hashing function might map multiple keys to the same integer, we have to deal with collisions by creating buckets at each index of the storage array. These buckets can be arrays or linked lists.


*** Note:

ES6 includes a Map data structure. It differs from the JavaScript object because the keys can be any value (not just strings like for objects), there is a size property, and there is a guaranteed order (the insertion order).

Hash tables are also referred to as hash mapse or dictionaries.


*** Operations:

myMap.set(key, value)
=> myMap object
Store the key-value pair in the storage array.
If the key already exists, replace stored value with new value.
Use the hashing function to map the key to an integer and store the value at the corresponding index.
Account for the possibility of collisions.

myMap.get(key)
=> value associated with key, or undefined if none

myMap.has(key)
=> true/false depending on if a value has been associated with the key

myMap.delete(key)
=> true if a value was associated with the key
=> false if a value was never associated with the key
Remove any value associated to the key

myMap.count()
=> integer number of key/value pairs in hash table

myMap.forEach(callbackFn)
=> no returned value
Invokes callback function once for each key-value pair in the hash table


*** Additional Exercises:

Resize the hash table:
- if the count becomes greater than 75% of the table size, double the table size and redistribute the key/value pairs
- if the count becomes less than 25% of the table size, cut the table size in half and redistribute the key/value pairs

*/

/* eslint-enable max-len */

// Simple hashing function to use in your implementation
function simpleHash(str, tableSize) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) * (i + 1);
    }
    return hash % tableSize;
}

// source: http://pmav.eu/stuff/javascript-hashing-functions/source.html

function HashTable(size = 5) {
    this.cells = [];
    this.count = 0;
    this.size = size;
}

// This is a helper method that you may want to implement to help keep your code DRY
// You can implement the hash table methods without it.
// I recommend skipping it and coming back if you find that it will be useful
HashTable.prototype.find = function (key) {
    const hash = simpleHash(key, this.size);

    this.cells[hash] = this.cells[hash] || [];

    const bucket = this.cells[hash];
    let match;
    let matchIndex;

    bucket.forEach((item ,i) => {
        if (item.hasOwnProperty(key)) {
            match = item;
            matchIndex = i;
        }
    });
    return { match, bucket, matchIndex };
};

HashTable.prototype.set = function (key, value) {
    const { match, bucket } = this.find(key);

    if (match) {
        match[key] = value;
    } else {
        const newItem = {};
        newItem[key] = value;
        this.count++;
        bucket.push(newItem);

        if (this.count > 0.75 * this.size) {
            this.resize(2 * this.size);
        }
    }

    return this;
};
// Time complexity:

HashTable.prototype.get = function (key) {
    return this.find(key);
};
// Time complexity:

HashTable.prototype.has = function (key) {
    return !!this.find(key).match;
};
// Time complexity:

HashTable.prototype.delete = function (key) {
    if (!this.has(key))
        return false;
    //TODO
    const { bucket } = this.find(key);

    delete this.cells[this.count];
};
// Time complexity:

HashTable.prototype.count = function () {
    return this.cells.length;
};
// Time complexity:

HashTable.prototype.forEach = function (callback) {
    this.cells.forEach(x => Object.values(x).forEach(v => callback(v)));
};
// Time complexity:

/*
*** Exercises:

1. Implement a hash table with a binary search tree.

2. Given two arrays with values, return the values that are present in both. Do this in linear time.

3. Implement a hash table using linked lists for collision-handling. Why might this be preferable to using arrays.

*/
