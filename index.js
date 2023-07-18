class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  //function to convert an array to BST and return the root of the tree
  buildTree(sortedArray) {
    //if the array is empty return NULL
    if (sortedArray.length === 0) {
      return null;
    }

    //find root first, then later make new parents if array isn't empty
    const mid = Math.floor(sortedArray.length / 2);
    const newNode = new Node(sortedArray[mid]);

    //make children of root or new parent, recursively building children/new parents until array is empty
    newNode.left = this.buildTree(sortedArray.slice(0, mid));
    newNode.right = this.buildTree(sortedArray.slice(mid + 1));

    return newNode;
  }

  insert(value, currentNode = this.root) {
    //base case or if tree is empty
    if (currentNode === null) {
      return new Node(value);
    }
    //if new value is duplicate value, do nothing. no repeats!
    if (currentNode.value === value) {
      return;
    }

    //if new value is less than parent, go left. if it's more, go right.
    //recursviely call insert again at that point in tree, keeps going until there's an empty slot in tree appropriate for the new node
    if (currentNode.value > value) {
      currentNode.left = this.insert(value, currentNode.left);
    } else {
      currentNode.right = this.insert(value, currentNode.right);
    }
    return currentNode;
  }

  remove(value) {
    const removeNode = function (node, value) {
      //if empty tree
      if (node == null) {
        return null;
      }
      if (value == node.value) {
        //no children
        if (node.left == null && node.right == null) {
          return null;
        }
        //if no left children
        if (node.left == null) {
          return node.right;
        }
        //if no right children
        if (node.right == null) {
          return node.left;
        }
        //if two children
        var tempNode = node.right;
        //find the node reference, the minimum value decendent, that will replace removed node reference
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        //swap the values
        node.value = tempNode.value;
        //recursively call removeNode to set up removable of the node reference that was moved up the tree
        node.right = removeNode(node.right, tempNode.value);
        return node;
      } else if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        node.right = removeNode(node.right, value);
        return node;
      }
    };
    //finally, call removeNode on the root. when you add value to be deleted, it'll start at the root and search the tree for the value and then delete it.
    removeNode(this.root, value);
  }

  find(value, currentNode = this.root) {
    if (currentNode.value === value) {
      return currentNode;
    }
    if (value < currentNode.value) {
      return this.find(value, currentNode.left);
    } else {
      return this.find(value, currentNode.right);
    }
  }

  levelOrder() {
    const queue = [this.root];
    const breadthFirstArray = [];
    while (queue.length > 0) {
      const firstInQueue = queue.shift();
      breadthFirstArray.push(firstInQueue.value);
      if (firstInQueue.left !== null) {
        queue.push(firstInQueue.left);
      }
      if (firstInQueue.right !== null) {
        queue.push(firstInQueue.right);
      }
    }
    return breadthFirstArray;
  }

  inOrder() {
    if (this.root === null) {
      return null;
    }
    const inOrderArray = [];
    const traverseInOrder = function (node) {
      node.left && traverseInOrder(node.left);
      inOrderArray.push(node.value);
      node.right && traverseInOrder(node.right);
    };
    traverseInOrder(this.root);
    return inOrderArray;
  }

  preOrder() {
    if (this.root === null) {
      return null;
    }
    const preOrderArray = [];
    const traversePreOrder = function (node) {
      preOrderArray.push(node.value);
      node.left && traversePreOrder(node.left);
      node.right && traversePreOrder(node.right);
    };
    traversePreOrder(this.root);
    return preOrderArray;
  }
  postOrder() {
    if (this.root === null) {
      return null;
    }
    const postOrderArray = [];
    const traversePostOrder = function (node) {
      node.left && traversePostOrder(node.left);
      node.right && traversePostOrder(node.right);
      postOrderArray.push(node.value);
    };
    traversePostOrder(this.root);
    return postOrderArray;
  }
}
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let arrrr = [1, 2, 3, 4, 5, 6, 7, 10];
const tree = new BST(arrrr);
tree.insert(9);
tree.remove(5);
prettyPrint(tree.root);
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
