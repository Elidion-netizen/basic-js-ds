const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const _add = (data, node) => {
      if (!node) return new Node(data);
      if (data < node.data) {
        node.left = _add(data, node.left);
      } else if (data > node.data) {
        node.right = _add(data, node.right);
      }
      return node;
    };

    this.rootNode = _add(data, this.rootNode);
  }

  has(data) {
    let node = this.rootNode;
    while (node) {
      if (data === node.data) return true;
      node = data < node.data ? node.left : node.right;
    }
    return false;
  }

  find(data) {
    const _find = (data, node) => {
      if (!node) return null;
      if (node.data === data) return node;
      return data < node.data
        ? _find(data, node.left)
        : _find(data, node.right);
    };

    return _find(data, this.rootNode);
  }

  remove(data) {
    const _remove = (data, node) => {
      if (!node) return null;

      if (data < node.data) {
        node.left = _remove(data, node.left);
        return node;
      }
      if (data > node.data) {
        node.right = _remove(data, node.right);
        return node;
      }

      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minRightNode = node.right;
      while (minRightNode.left) {
        minRightNode = minRightNode.left;
      }
      node.data = minRightNode.data;
      node.right = _remove(minRightNode.data, node.right);
      return node;
    };

    this.rootNode = _remove(data, this.rootNode);
  }

  min() {
    let node = this.rootNode;
    if (!node) return null;

    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this.rootNode;
    if (!node) return null;

    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
