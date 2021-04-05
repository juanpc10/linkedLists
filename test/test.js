'use strict';

var should = require('chai').should();

const Set = require('../scripts/set.js');
const Tree = require('../scripts/tree.js');
const BTree = require('../scripts/btree.js');
const HashTable = require('../scripts/hash-table.js');

describe('Set', function () {

  let set;

  beforeEach(function () {
    set = new Set();
  });

  it('the class should provide an "add()" method', function () {
    set.should.not.have.ownProperty('add');
    set.add.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    set.should.not.have.ownProperty('contains');
    set.contains.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    set.should.not.have.ownProperty('remove');
    set.remove.should.be.a('function');
  });

  it('should add values, and check that the set contains them', function () {
    set.contains('hello').should.be.false;
    set.add('hello').should.be.true;
    set.contains('hello').should.be.true;
    set.add('world').should.be.true;
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
  });

  it('should remove values, and check that the set does not contain them', function () {
    set.add('hello');
    set.add('world');
    set.contains('hello').should.be.true;
    set.contains('world').should.be.true;
    set.remove('hello');
    set.contains('hello').should.be.false;
    set.contains('world').should.be.true;
  });

});

describe('Tree', function () {

  let tree;

  beforeEach(function () {
    tree = new Tree();
  });

  it('the class should provide an "addChild()" method', function () {
    tree.should.not.have.ownProperty('addChild');
    tree.addChild.should.be.a('function');
  });

  it('the class should provide a "contains()" method', function () {
    tree.should.not.have.ownProperty('contains');
    tree.contains.should.be.a('function');
  });

  it('should add values, and check that the tree contains them', function () {
    tree = new Tree('hello');
    tree.contains('hello').should.be.true;
    tree.contains('world').should.be.false;
    const subTree = new Tree('world');
    tree.addChild(subTree).should.be.true;
    tree.contains('world').should.be.true;
    const subSubTree = new Tree('today');
    subTree.addChild(subSubTree).should.be.true;
    tree.contains('today').should.be.true;
  });

});

describe('Hash table', function () {

  let hashTable;

  beforeEach(function () {
    hashTable = new HashTable(2);
  });

  it('each instance should have a "size" property', function () {
    hashTable.size.should.equal(2);
  });

  it('the class should provide an "insert()" method', function () {
    hashTable.should.not.have.ownProperty('insert');
    hashTable.insert.should.be.a('function');
  });

  it('the class should provide a "retrieve()" method', function () {
    hashTable.should.not.have.ownProperty('retrieve');
    hashTable.retrieve.should.be.a('function');
  });

  it('the class should provide a "remove()" method', function () {
    hashTable.should.not.have.ownProperty('remove');
    hashTable.remove.should.be.a('function');
  });

  it('should insert key / value pairs, and be able to retrieve them', function () {
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.insert('hello', '2').should.be.true;
    hashTable.retrieve('hello').should.equal('2');
    hashTable.insert('hello', '1').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
    hashTable.insert('world', '2');
    hashTable.insert('today', '3');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.retrieve('world').should.equal('2');
    hashTable.retrieve('today').should.equal('3');
  });

  it('should delete keys, and make sure that they return "undefined"', function () {
    hashTable.remove('hello').should.be.false;
    hashTable.insert('hello', '1');
    hashTable.insert('world', '2');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
    hashTable.remove('hello').should.be.false;
    hashTable.remove('world').should.be.true;
    should.equal(hashTable.retrieve('world'), undefined);
  });

  it('should be able to insert and delete the same key / value pair several times ', function () {
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    hashTable.insert('hello', '1');
    hashTable.retrieve('hello').should.equal('1');
    hashTable.remove('hello').should.be.true;
    should.equal(hashTable.retrieve('hello'), undefined);
  });

  describe('Binary Search Tree', function () {

    let btree;
  
    beforeEach(function () {
      btree = new BTree();
    });
  
    it('the class should provide an "addNode()" method', function () {
      btree.should.not.have.ownProperty('addNode');
      btree.addNode.should.be.a('function');
    });
  
    it('the class should provide a "findNode()" method', function () {
      btree.should.not.have.ownProperty('findNode');
      btree.findNode.should.be.a('function');
    });
  
    it('the class should provide a "deleteNode()" method', function () {
      btree.should.not.have.ownProperty('deleteNode');
      btree.deleteNode.should.be.a('function');
    });

    // it('should add values, and check that the tree contains them', function () {
    //   btree = new BTree();
    //   btree.contains().should.be.true;
    //   btree.contains('world').should.be.false;
    //   const subTree = new Tree('world');
    //   btree.addNode(subTree).should.be.true;
    //   btree.contains('world').should.be.true;
    //   const subSubTree = new Tree('today');
    //   subTree.addNode(subSubTree).should.be.true;
    //   btree.contains('today').should.be.true;
    // });
  
  });




});
