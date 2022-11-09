const Node = (d) => {
    const data = d;
    const left = null;
    const right = null;
    return { data, left, right }
}

const Tree = (array) => {
    const sortedArray = removeDuplicates(array.sort());
    const root = buildTree(sortedArray, 0, sortedArray.length-1);
    return {root};
}

function buildTree(array, start, end) {
    if (start > end) return null;

    const midpoint = parseInt((start + end) / 2);
    const node = Node(array[midpoint]);
    
    node.left = buildTree(array, start, midpoint-1);
    node.right = buildTree(array, midpoint+1, end);

    return node;
}

function removeDuplicates(sortedArray) {
    let reducedArray = [];

    for (value of sortedArray) {
        if (value in reducedArray) continue;
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
let newTree = Tree(array);
prettyPrint(newTree.root);