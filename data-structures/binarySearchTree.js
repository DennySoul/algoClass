/* eslint-disable max-len */
/*
BINARY SEARCH TREES

Abstract data type
A binary search tree is a tree with the additional constraints:
- each node has only two child nodes (node.left and node.right)
- all the values in the left subtree of a node are less than or equal to the value of the node
- all the values in the right subtree of a node are greater than the value of the node

*** Operations:

bsTree.insert(value)
=> bsTree (return for chaining purposes)
Insert value into correct position within tree

bsTree.contains(value)
=> true/false
Return true if value is in tree, false if not

bsTree.traverseDepthFirst_inOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first in-order (visit left branch, then current node, than right branch)
Note: In-Order traversal is most common type for binary trees. For binary search tree, this visits the nodes in ascending order (hence the name).

bsTree.traverseDepthFirst_preOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first pre-order (visits current node before its child nodes)

bsTree.traverseDepthFirst_postOrder(callback)
=> undefined
Invoke the callback for every node in a depth-first post-order (visit the current node after its child nodes)

bsTree.isValid()
=> returns true if BST is a valid BST otherwise returns false. This method is useful for checking your other methods.

bsTree.removeNode(value)
=> node
Remove node from tree.

bsTree.checkIfFull()
=> true/false
A binary tree is full if every node has either zero or two children (no nodes have only one child)

bsTree.checkIfBalanced()
=> true/false
For this exercise, let's say that a tree is balanced if the minimum height and the maximum height differ by no more than 1. The height for a branch is the number of levels below the root.


*** Additional Exercises:
A binary search tree was created by iterating over an array and inserting each element into the tree. Given a binary search tree with no duplicates, how many different arrays would result in the creation of this tree.

*/
/* eslint-enable max-len */

function BinarySearchTree(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

BinarySearchTree.prototype.insert = function(value) {
    if (this.value >= value) {
        if (this.left)
            this.left.insert(value);
        else
            this.left = new BinarySearchTree(value);
    } else {
        if (this.right)
            this.right.insert(value);
        else
            this.right = new BinarySearchTree(value);
    }

    return this;
};
// Time complexity:

BinarySearchTree.prototype.contains = function (value) {
    if (this.value === value)
        return true;

    if (this.value > value)
        return !!this.left && this.left.contains(value);

    if (this.value < value)
        return !!this.right && this.right.contains(value);

    return false;
};
// Time complexity:

BinarySearchTree.prototype.traverseDepthFirst_inOrder = function (fn) {
    if (!!this.left && !!this.right)
        return;

    if (this.left)
        this.traverseDepthFirst_inOrder(fn);

    if (this.right)
        this.traverseDepthFirst_inOrder(fn);

    fn(this.value);

    return undefined;
};
// Time complexity:

BinarySearchTree.prototype.traverseDepthFirst_preOrder = function (fn) {
    fn(this.value);

    if (!!this.left && !!this.right)
        return;

    if (this.left)
        this.traverseDepthFirst_preOrder(fn);

    if (this.right)
        this.traverseDepthFirst_preOrder(fn);

    return undefined;
};
// Time complexity:

BinarySearchTree.prototype.traverseDepthFirst_postOrder = function (fn) {
    if (!!this.left && !!this.right)
        return;

    if (this.left)
        this.traverseDepthFirst_postOrder(fn);

    if (this.right)
        this.traverseDepthFirst_postOrder(fn);

    fn(this.value);

    return undefined;
};
// Time complexity:

BinarySearchTree.prototype.checkIfFull = function () {
    // implement me...
};
// Time complexity:

BinarySearchTree.prototype.checkIfBalanced = function () {
    // implement me...
};
// Time complexity:

BinarySearchTree.prototype.traverseAndDeleteMin = (parent = this.value) => {
    if (!!this.left && !!this.right)
        parent.left = null;

    if (!this.left && this.right)
        this.left = this.right;

    if (this.left)
        this.traverseAndDeleteMin(parent);
};

BinarySearchTree.prototype.traverseAndDeleteMax = (parent = this.value) => {
    if (!!this.left && !!this.right)
        parent.right = null;

    if (!this.right && this.left)
        this.right = this.left;

    if (this.right)
        this.traverseAndDeleteMax(parent);
};

BinarySearchTree.prototype.deleteNode = (value) => {
    if (this.value === value) {
        this.value = this.right;
        this.right = this.left;
        this.left = null;
    }

    let parent = this.value;

    if (value === parent.left || value === parent.right) {
        const pointer = value === parent.left ? 'left' : 'right';
        parent[pointer] = null;
    }


};
