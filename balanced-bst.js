const Node = (d) => {
    const data = d;
    const left = null;
    const right = null;
    return { data, left, right }
}

const Tree = (array) => {
    const sortedArray = array.sort(function(a, b){return a-b});
    const sortedArrayNoDups = removeDuplicates(sortedArray);
    const root = buildTree(sortedArrayNoDups, 0, sortedArrayNoDups.length-1);
    return {root};
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

// let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let array = [1, 3,4,6,7,8,10,13,14];
let newTree = Tree(array);
prettyPrint(newTree.root);
// let sortedArray = array.sort(function(a, b){return a-b});
// console.log(removeDuplicates(sortedArray));