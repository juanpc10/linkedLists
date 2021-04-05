
'use strict';


class Tree {
  constructor (value) {
 
    this.value = value;
    this.children = [];
  }
  addChild (node) {
    this.children.push(node);
    return true;
  }
  // method 1
  contains (value) {
    if (this.value === value) return true;
    if (!this.children.length) return false;
    for (let i = 0; i < this.children.length; i++) {
      return this.children[i].contains(value);
    }
  }
  // method 2
  // contains (value) {
  //   if (this.value === value) return true;
  //   return this.children.some((child) => child.contains(value));
  // }
  //method 3
  // contains (value, childrenArr) {
  //   if (!childrenArr) {
  //     let node = this;
  //     if (node.value === value) return true;
  //     if (node.children.length == 0) {
  //       return false;
  //     } else {
  //       let res = this.contains(value, node.children);
  //       return res ? true : false;
  //     }
  //   } else {
  //     for (let n = 0; n < childrenArr.length; n++) {
  //       let nextNode = childrenArr[n];
  //       if (nextNode.value === value) return true;
  //       if (nextNode.children.length > 0) {
  //         let res = this.contains(value, nextNode.children);
  //         return res ? true : false;
  //       }
  //     }
  //   }
  // };
}


////check length in stack


module.exports = Tree;
