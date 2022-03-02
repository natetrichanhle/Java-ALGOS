// https://www.cs.usfca.edu/~galles/visualization/BST.html
// http://btv.melezinek.cz/binary-search-tree.html
class BSTNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
};

class BST {
    constructor() {
        this.root = null;
    }

    isEmpty() {
        return this.root === null;
    };

    insert(node, current) {
        // default current to root if no current exists
        if (current === undefined) {
            current = this.root;
        };

        // if empty tree, new node becomes root
        if (current === null) {
            this.root = node;
            return;
        };

        if (current.val > node.val) { // go left
            // check if null and insert
            if (current.left === null) { // <-- base case for inserting left
                current.left = node;
                return;
            } else {
                // otherwise recurse left
                return this.insert(node, current.left); // <-- move current to current.left
            }
        } else if (current.val < node.val) { // go right
            // check if null and insert
            if (current.right === null) { // <-- base case for inserting left
                current.right = node;
                return;
            } else {
                // otherwise recurse right
                return this.insert(node, current.right);
            }
        }
    };

    // recursive
    getLargestFromSubtree(current) {
        // if no tree, tree is root
        if (current === undefined) {
            current = this.root;
        }

        // if tree becomes null, return null
        if (current === null) {
            return null;
        }

        // if there is no further nodes, return tree
        if (current.right === null) {
            return current.val;
        }

        // else recurse to the right and try again
        return this.getLargestFromSubtree(current.right);
    }

    // iterative
    getSmallestFromSubtree() {
        // create runner
        var runner = this.root;

        // return if root is null
        if (!runner) return;

        // loop to the left if it exists
        while (runner.left) {
            runner = runner.left;
        }
        // when the while ends, return runner.val
        return runner.val;
    }

    // return true or false is val exists within the current tree
    // if current is undefined, current = this.root
    find(val, current) {
        if (current === undefined) {
            current = this.root;
        }

        // base cases

        // if current is null, return false up the call stack
        if (current == null) {
            return false;
        }

        // because current is certain to be not null, check val vs val
        // if equal, return true up the call stack
        if (current.val === val) {
            return true;
        }

        // otherwise we need to recurse

        // decide on which direction
        if (current.val > val) {
            current = current.left;
        } else {
            current = current.right;
        }

        // recurse now that current is moved, return the result
        return this.find(val, current); // true / false up the call stack
    }

    // -------------- WEDNESDAY 🐸 -----------------  
    removeSmallest(current = this.root) {
        if (current === null) {
            return;
        }
        if (current.left.left === null) {
            let tempNode = current.left;
            if (current.left.right) {
                if (current.left.right.val < current.val) {
                    current.left = current.left.right;
                    return tempNode;
                }
                else {
                    current.right = current.left.right;
                    current.left = null;
                    return tempNode;
                }
            }
            current.left = null;
            return tempNode;
        }
        return this.removeSmallest(current.left);
    }

    removeLargest(current = this.root) {
        if (current === null) {
            return;
        }
        if (current.right.right === null) {
            let tempNode = current.right;
            if (current.right.left) {
                if (current.right.left.val < current.val) {
                    current.left = current.right.left;
                    current.right = null;
                    return tempNode;
                }
                else {
                    current.right = current.right.left;
                    return tempNode;
                }
            }
            current.right = null;
            return tempNode;
        }
        return this.removeLargest(current.right);
    }

    // --- HELPER METHOD for printing the BST ---
    // Logs this tree horizontally with the root on the left.
    print(node = this.root, spaceCnt = 0, spaceIncr = 10) {
        if (!node) {
          return;
        }
    
        spaceCnt += spaceIncr;
        this.print(node.right, spaceCnt);
    
        console.log(
          " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
            `${node.val}`
        );
    
        this.print(node.left, spaceCnt);
      }
};

// Recursion is:
// - function that calls itself
// - and modifies the inputs
// - so that the inputs lead to a 'base case' and end the recursive call

// instantiate the BST class
var myBST = new BST();

// add nodes to it...
myBST.insert(new BSTNode(25));
myBST.insert(new BSTNode(15));
myBST.insert(new BSTNode(50));
myBST.insert(new BSTNode(10));
myBST.insert(new BSTNode(22));
myBST.insert(new BSTNode(35));
myBST.insert(new BSTNode(70));
myBST.insert(new BSTNode(12));
// console.log(myBST);
myBST.print();

// ...resulting in the following tree
/*
                BST
                root
             <-- 25 -->
            /          \
          15           50
        /    \       /    \
      10     22     35     70
     /  \   /  \   /  \   /  \
       12        

  */

console.log(myBST.removeSmallest());
// console.log("LARGEST ==>", myBST.removeLargest());
// console.log(myBST);
// myBST.print();  // <- uncomment this line

