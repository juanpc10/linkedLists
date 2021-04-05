'use strict';
const helpers = require('./hash-table-helpers');
const Storage = helpers.Storage;
const hash = helpers.hash;


class HashTable {
  constructor (size) {
    this.size = size;
    this.storage = Storage(size);
    //this.counter = 0;
  }
  insert (key, value) {
    const newKey = hash(key, this.size);
    const hashContent = this.storage.get(newKey);
    if (!hashContent) {
      const newLinkedList = new DoubleLinkedList();
      newLinkedList.addToHead(key, value);
      this.storage.set(newKey, newLinkedList);
    } else {
      let node = hashContent.findNode(key);
      if (node) {
        node.value = value;
      } else {
        hashContent.addToHead(key, value);
      }
    }
    //this.counter++;
    //this.resize();
    return true;
  }
  retrieve (key) {
    const newKey = hash(key, this.size);
    const hashContent = this.storage.get(newKey);
    if (!hashContent) {
      return undefined;
    }
    const node = hashContent.findNode (key);
    if (node) {
      return node.value;
    } else {
      return undefined;
    }
  }
  remove (key) {
    const newKey = hash(key, this.size);
    const hashContent = this.storage.get(newKey);
    if (hashContent) {
      //this.counter--;
      //this.resize();
      return hashContent.removeNode(key);
    } else {
      return false;
    }
  }
  // resize () {
  //   let percentage = Math.round( (this.counter / this.size) * 100);
  //   let resizedStorage;
  //   let counterOriginal = this.counter;
  //   if (percentage >= 75 || percentage < 25) {
  //     let newSize;
  //     if (percentage >= 75) {
  //       newSize = this.size * 2;
  //       resizedStorage = Storage(newSize);
  //     } else if (percentage < 25) {
  //       newSize = Math.round(this.size / 2);
  //       resizedStorage = Storage(newSize);
  //     }
  //     for (let i = 0; i < this.size; i++) {
  //       let element = this.storage.get(i);
  //       if (element) {
  //         resizedStorage.set(i, element);
  //       }
  //     }
  //     this.storage = resizedStorage;
  //     this.counter = counterOriginal;
  //     this.size = newSize;
  //   }
  // }
}
function LinkedList () {
  this.head = null;
  this.tail = null;
}
function LinkedListNode (key, value) {
  this.value = value;
  this.next = null;
  this.key = key;
}
LinkedList.prototype.addToHead = function (key, value) {
  const newNode = new LinkedListNode(key, value);
  if (!this.head) this.head = this.tail = newNode;
  else {
    const prevHead = this.head;
    this.head = newNode;
    this.head.next = prevHead;
  }
  return true;
};
LinkedList.prototype.addToTail = function (key, value) {
  const newNode = new LinkedListNode(key, value);
  if (!this.head) this.head = this.tail = newNode;
  else {
    const prevTail = this.tail;
    this.tail = prevTail.next = newNode;
  }
  return true;
};
LinkedList.prototype.removeHead = function () {
  if (this.head) {
    const prevHead = this.head;
    if (prevHead.next) this.head = prevHead.next;
    else this.head = this.tail = null;
    return prevHead.value;
  }
  return null;
};
LinkedList.prototype.contains = function (key) {
  let current = this.head;
  while (current) {
    if (current.key === key) return true;
    current = current.next;
  }
  return false;
};
LinkedList.prototype.findNode = function (key) {
  let foundNode = null;
  let current = this.head;
  while (current) {
    if (current.key === key) {
      foundNode = current;
      break;
    }
    current = current.next;
  }
  return foundNode;
};
LinkedList.prototype.removeNode = function (key) {
  const current = this.findNode(key);
  if (!current) {
    return false;
  }
  if (current === this.head) {
    this.removeHead();
  } else if (current === this.tail) {
    this.removeTail();
  } else {
    current.prev.next= current.next;
    current.next.prev = current.prev;
  }
  return true;
};
class DoubleLinkedList extends LinkedList {
  addToHead (key, value) {
    const prevHead = this.head;
    super.addToHead(key, value);
    if (prevHead) prevHead.prev = this.head;
    return true;
  }
  addToTail (key, value) {
    const prevTail = this.tail;
    super.addToTail(key, value);
    if (prevTail) this.tail.prev = prevTail;
    return true;
  }
  removeHead () {
    const res = super.removeHead();
    if (this.head && this.head.prev) this.head.prev = null;
    return res;
  }
  removeTail () {
    if (this.tail) {
      const prevTail = this.tail;
      if (prevTail.prev) {
        this.tail = prevTail.prev;
        this.tail.next = null;
      } else this.tail = this.head = null;
      return prevTail.value;
    }
    return null;
  }
}


let hashTable = new HashTable(3);
hashTable.insert('hello', '1'); // hash 0
hashTable.insert('world', '1'); // hash 0
hashTable.insert('today', '1'); // hash 0
//console.log(hashTable.size)

module.exports = HashTable;