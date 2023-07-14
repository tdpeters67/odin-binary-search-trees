class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value);
    this.count = 0;
  }
  size() {
    return this.count;
  }
  insert(value) {
    this.count++;

    let newNode = new Node(value);

    const searchTree = (node) => {
      //if value < node.value, go left
      if (value < node.value) {
        //if no left child, append node here
        if (!node.left) {
          node.left = newNode;
        } else {
          //if there is a left child, look left
          searchTree(node.left);
        }
        //if value > node.value, go right
      } else if (value > node.value) {
        //if no right child, append node here
        if (!node.right) {
          node.right = newNode;
        } else {
          //if there is a right child, look right
          searchTree(node.right);
        }
      }
    };
  }
}
