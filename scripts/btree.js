

class BTree {
  constructor () {
    this.root = null;
  }
  addNode (value) {
    const newNode = new Bnode(value);    
    if (!this.root) {
      this.root = newNode; 
      return true;
    } 
    let currentNode = this.root; 
    let more = false;
    while (more == false) {
      if (newNode.value >= currentNode.value) {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          // newNode's parent is currentNode
          return true;
        } else {
          // ??? what does this do???  TO THE RIGHT of Current Node, AND 
          currentNode = currentNode.right;
        }
      } else {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return true;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
  }
  findNode (value) {
    let currentNode = this.root;
    let found = false;
    while (!found) {
      if (!currentNode) break; 
      if (currentNode.value === value) { 
        found = true; break;
      }
      if (value < currentNode.value)
        // get the left pointer
        currentNode = currentNode.left; //null
      else
        // get the right pointer  
        currentNode = currentNode.right;
    }
    if (found) return currentNode;
    else return false;
  }
  deleteNode (value) {
    const deleting = this.findNode(value);
    let found = false;
    while (!found) {
      if (!deleting) return false;
      
      if (deleting.right === null && deleting.left === null) {
        //delete deleting;
        found = true;
      } else if (deleting.right && deleting.left) {
        
        deleting.left = deleting;
      } else if (deleting.right === null && deleting.left) {
        deleting.left = deleting;
      } else if (deleting.left === null && deleting.right) {
        
        deleting.right = deleting;
      } 
    }
  }
}

class Bnode {
  constructor (value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.dateTimeCreated = new Date().toString(); 
    this.parent = null;

  }
}

module.exports = BTree;