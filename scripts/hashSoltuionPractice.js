'use strict';

const helpers = require('./hash-table-helpers');
const Storage = helpers.Storage;
const hash = helpers.hash;



class HashTable {
  constructor (size) {
    this.size = size;
    this.storage = Storage(size);
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
    return true;
  }
  retrieve (key) {
    const newKey = hash(key, this.size);
    const hashContent = this.storage.get(newKey);
    if (!hashContent) {
      return undefined;
    }
    const node = hashContent.findNode(key);
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
      return hashContent.removeNode(key);
    } else {
      return false;
    }
  }
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
  // Look for a Node with key (parameter) - and return it if found/exists
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



module.exports = HashTable;
