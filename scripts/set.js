'use strict';

class Set {
  constructor () {
    this.storage = {};
  }
  add (value, sets) {
    this.storage[value] = value;
    if (sets) {
      for (let i = 0; i < sets.length; i++) {
        let set = sets[i];
        if (set instanceof Set) {
          set.add(value);
        }
      }
    } 
    return true;
  }
  contains (value) {
    for (let key in this.storage) {
      if (this.storage[key] === value) {
        return true;
      }
    }
    return false;
  }
  remove (value) {
    if (this.contains(value)) {
      delete this.storage[value];
    }
    return true;
  }
}

// let students = new Set();
// let juniors = new Set();
// let americasTimeZone = new Set();
// let seniors = new Set();

// students.add('Juan', [ juniors, americasTimeZone ]);
// console.log('!!!!!!!!!!!!@$#@$%%^%#$%$@##@!#@%^&^%@#$!@#')
// console.log(students);
// console.log(juniors);
// console.log(americasTimeZone);

module.exports = Set;
