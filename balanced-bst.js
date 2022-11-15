const Node = (d) => {
    const data = d;
    const left = null;
    const right = null;
    return { data, left, right }
}

const Tree = (array) => {
    const sortedArray = array.sort(function(a, b){return a-b});
    const sortedArrayNoDups = removeDuplicates(sortedArray);
    let root = buildTree(sortedArrayNoDups, 0, sortedArrayNoDups.length-1);

    const insert = (value) => {
        root = insertRec(root, value);
    }

    const insertRec = (root, value) => {
        if (root == null) {
            root = Node(value);
            return root;
        }

        if (value < root.data) {
            root.left = insertRec(root.left, value);
        } else if (value > root.data) {
            root.right = insertRec(root.right, value);
        }
        
        return root;
    }

    const deleteValue = (value) => {
        root = deleteRec(root, value);
    }

    const deleteRec = (root, value) => {
        // Base Case - if tree empty
        if (root == null) return root;

        // Otherwise, recur down tree
        if (value < root.data) {
            root.left = deleteRec(root.left, value);
        } else if (value > root.data) {
            root.right = deleteRec(root.right, value);
        } else { // if value is same as root's value

            // for nodes with one or no child
            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            // If node has two children, then
            // get the smallest value in the right tree
            root.data = findMinValue(root.right);

            // Delete the smallest in the right tree
            root.right = deleteRec(root.right, root.data);
        }

        return root;
    }

    const find = (root, value) => {
        // Base Case - if tree empty
        if (root == null) return root;

        // Otherwise, recur down the tree
        if (value < root.data) {
            return find(root.left, value);
        } else if (value > root.data) {
            return find(root.right, value);
        } else {
            return root;
        }

    }

    const levelOrderIterative = (node = root, myFunction = (root, dataArray) => {dataArray.push(root.data)}, queue = []) => {
        if (node == null) return node;
        queue.push(node);
        let dataArray = [];
        let current;
        while (queue.length != 0) {
            current = queue.shift();
            myFunction(current, dataArray);
            if (current.left != null) queue.push(current.left);
            if (current.right != null) queue.push(current.right);
        }
        return dataArray;
    }

    const preorder = (node = root, array = [], myFunction = (root, array) => {array.push(root.data)}) => {
        if (node == null) return node;
        myFunction(node, array);
        preorder(node.left, array);
        preorder(node.right, array);
        return array;
    }

    const inorder = (node = root, array = [], myFunction = (root, array) => {array.push(root.data)}) => {
        if (node == null) return node;
        inorder(node.left, array);
        myFunction(node, array);
        inorder(node.right, array);
        return array;
    }

    const postorder = (node = root, array = [], myFunction = (root, array) => {array.push(root.data)}) => {
        if (node == null) return node;
        postorder(node.left, array);
        postorder(node.right, array);
        myFunction(node, array);
        return array;
    }

    const depth = (root, value, depthValue = 0) => {
        // Base Case - if tree empty
        if (root == null) return root;
        // Otherwise, recur down the tree
        if (value < root.data) {
            depthValue = depth(root.left, value, depthValue+1);
        } else if (value > root.data) {
            depthValue = depth(root.right, value, depthValue+1);
        } else {
            return depthValue; 
        }
        return depthValue;
    }

    const height = (node) => {
        // Base Case
        if (node == null) return 0;
        const left = height(node.left);
        const right = height(node.right);
        return Math.max(left, right) + 1;
    }

    const isBalanced = (tree) => {
        if (tree == null) return tree;
        const leftHeight = height(tree.left);
        const rightHeight = height(tree.right);
        const heightDiff = Math.abs(leftHeight - rightHeight);
        return ( heightDiff > 1) ? false : true;
    };

    const rebalance = (tree) => {
        root = buildRebalancedTree(tree);
        return root;
    }

    const buildRebalancedTree = (tree) => {
        const valuesArray = levelOrderIterative(tree);
        const sortedArray = valuesArray.sort(function(a, b){return a-b});
        const sortedArrayNoDups = removeDuplicates(sortedArray);
        return buildTree(sortedArrayNoDups, 0, sortedArrayNoDups.length-1);
    }

    return {
        root, insert, deleteValue, find, 
        levelOrderIterative, preorder, inorder,
        postorder, depth, height, isBalanced,
        rebalance
    };
}

function findMinValue(root) {
    let min = root.data;
    while (root.left != null) {
        min = root.left.data;
        root = root.left;
    }
    return min;
}

function buildTree(array, start, end) {
    if (start > end) return null;

    const midpoint = Math.ceil((start + end) / 2);
    const node = Node(array[midpoint]);
    
    node.left = buildTree(array, start, midpoint-1);
    node.right = buildTree(array, midpoint+1, end);

    return node;
}

function removeDuplicates(sortedArray) {
    let reducedArray = [];

    for (value of sortedArray) {
        if (reducedArray.includes(value)) continue;
        reducedArray.push(value);
    }

    return reducedArray;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

let array = Array.from({length: 10}, () => Math.floor(Math.random() * 15));
let newTree = Tree(array);
console.log("1)  Create BST from array with random numbers: ")
prettyPrint(newTree.root);
console.log("2)  Is tree balanced? ", newTree.isBalanced(newTree.root));
console.log("3a) Level Order: ", newTree.levelOrderIterative().toString());
console.log("3b) Preorder: ",newTree.preorder().toString());
console.log("3c) Inorder: ", newTree.inorder().toString());
console.log("3d) Postorder: ", newTree.postorder().toString());
console.log("4)  Add several numbers > 100");
newTree.insert(101);
newTree.insert(104);
newTree.insert(200);
console.log("5)  Is tree balanced? ", newTree.isBalanced(newTree.root));
newTree.root = newTree.rebalance(newTree.root);
console.log("6)  Rebalanced tree: ");
prettyPrint(newTree.root);
console.log("7)  Confirm rebalanced: ", newTree.isBalanced(newTree.root));
console.log("8a) Level Order: ", newTree.levelOrderIterative().toString());
console.log("8b) Preorder: ",newTree.preorder().toString());
console.log("8c) Inorder: ", newTree.inorder().toString());
console.log("8d) Postorder: ", newTree.postorder().toString());