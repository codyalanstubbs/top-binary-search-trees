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
        let foundRoot;
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

    return {root, insert, deleteValue, find};
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

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let array = [1, 3,4,6,7,8,10,13,14];
let newTree = Tree(array);
prettyPrint(newTree.root);
console.log(newTree.find(newTree.root,67));
