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

  find(node) {
    let currentNode = this.root
    while (true) {
      if (currentNode === null) return false;
      if (currentNode.data === node) return true;
      if (node < currentNode.data) {
        currentNode = currentNode.left
      }
      if (node > currentNode.data) {
        currentNode = currentNode.right
      }
    }
  }

  levelOrder(callback) {
    if (this.root === null) {
      return;
    }
    let queue = [this.root];
    let result = []
    let currentNode;
    while (queue.length > 0) {
      currentNode = queue[0];
      queue.shift();
      if (callback) {
        callback(currentNode);
      } else {
        result.push(currentNode.data);
      }
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
    if (!callback) {
      return result;
    }
  }

  inOrder(callback) {
    let result = [];
    function recursive(node) {
      if (node === null) return;
      recursive(node.left)
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      recursive(node.right)
    }
    recursive(this.root);
    if (!callback) {
      return result;
    }
  }

  preOrder(callback) {
    let result = [];
    function recursive(node) {
      if (node === null) {
        return;
      }
      if (callback) {
        callback(node)
      } else {
        result.push(node.data)
      }
      recursive(node.left)
      recursive(node.right)
    }
    recursive(this.root)
    if (!callback) {
      return result;
    }
  }

  height() {
    function recursive(node) {
      if (node === null) return 0;
      let left = recursive(node.left);
      let right = recursive(node.right);
      return Math.max(left, right) + 1;
    }
    return recursive(this.root);
  }

  postOrder(callback) {
    let result = [];
    function recursive(node) {
      if (node === null) return;
      recursive(node.left)
      recursive(node.right)
      if (callback) {
        callback(node)
      } else {
        result.push(node.data);
      }
    }
    recursive(this.root);
    if (!callback) return result;
  }

  depth(value) {
    let current = this.root;
    let depth = 0;
    while (current !== null) {
      if (current.data === value) return depth;
      if (current.data > value) {
        current = current.left;
        depth++;
      } else if (current.data < value) {
        current = current.right;
        depth++;
      }
    }
    console.error("Value not found")
    return false;
  }

  isBalanced() {
    function recursive(node) {
      if (node === null) return 0;
      let left = recursive(node.left);
      if (left === -1) return -1;
      let right = recursive(node.right);
      if (right === -1) return -1;
      if (Math.abs(left - right > 1)) {
        return -1;
      } else return Math.max(left, right) + 1;
    }
    return recursive(this.root) !== -1;
  }

  rebalance() {
    let newArray = this.inOrder();
    this.root = this.buildTree(newArray);
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

function testBST() {
  let numbers = [];
  for (let i = 0; i < 15; i++) {
    let number = Math.floor(Math.random() * (100 - 1) + 1);
    numbers.push(number);
  }
  let tree = new Tree(numbers);
  prettyPrint(tree.root)
  console.log(tree.isBalanced())
  console.log(tree.preOrder())
  console.log(tree.postOrder())
  console.log(tree.inOrder())
  for (let i = 0; i < 5; i++) {
    let number = Math.floor(Math.random() * (1000 - 100) + 100);
    tree.insert(number);
  }
  console.log(tree.isBalanced())
  prettyPrint(tree.root)
  tree.rebalance()
  console.log(tree.isBalanced())
  prettyPrint(tree.root)
  console.log(tree.preOrder())
  console.log(tree.postOrder())
  console.log(tree.inOrder())
}