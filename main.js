class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.sort(array);
    this.root = this.buildTree(this.array);
  }

  sort(array) {
    array = array.filter((value, index, self) => self.indexOf(value) === index);
    return array.sort(function (a, b) { return a - b });
  }

  buildTree(array) {
    if (!array.length) {
      return null;
    }
    let middle = Math.floor(array.length / 2);
    let node = new Node(array[middle]);
    node.left = this.buildTree(array.slice(0, middle));
    node.right = this.buildTree(array.slice(middle + 1));
    return node;
  }

  insert(node) {
    let newNode = new Node(node)
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    let currentNode = this.root;
    while (true) {
      if (node < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = newNode;
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = newNode;
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }
  
  delete(node) {
    if (this.root === null) {
      return null;
    }
    let currentNode = this.root;
    let parentNode = null;
    while (true) {
      if (!currentNode) {
        return;
      }
      if (node < currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else if (node > currentNode.data) {
        parentNode = currentNode;
        currentNode = currentNode.right;
      } else {
        if (currentNode.left === null && currentNode.right === null) { // No 'childs'
          if (parentNode === null) {
            this.root = null;
          } else if (parentNode.left === currentNode) {
            parentNode.left = null;
          } else if (parentNode.right === currentNode) {
            parentNode.right = null;
          }
        } else if (currentNode.left === null || currentNode.right === null) { // One 'child'
          let childNode = currentNode.left ? currentNode.left : currentNode.right;
          if (parentNode === null) { // Check if it is root of the tree
            this.root = childNode;
          } else if (parentNode.left === currentNode) {
            parentNode.left = childNode;
          } else if (parentNode.right === currentNode) {
            parentNode.right = childNode;
          }
        } else if (currentNode.left !== null && currentNode.right !== null) { // Two 'childs'
          let nextParent = currentNode;
          let next = currentNode.right;
          while (next.left !== null) {
            nextParent = next;
            next = next.left;
          }
          currentNode.data = next.data;
          if (nextParent.left === next) {
            nextParent.left = next.right;
          } else {
            nextParent.right = next.right;
          }
        } else {
          console.error("Node not found");
        }
        return;
      }
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let tree = new Tree([4, 3, 2, 4, 5, 5, 6]);
tree.insert(54);
prettyPrint(tree.root);
tree.delete(4);
prettyPrint(tree.root);