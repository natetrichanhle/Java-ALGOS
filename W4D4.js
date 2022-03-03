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

    removeSmallest(current) {
        if (current === undefined) {
            current = this.root;
        }


        // first iteration possibly move the root
        if (current.left === null) {
            this.root = current.right;
            current.right = null;
            return current;
        }

        // base case

        // look ahead
        if (current.left && (current.left.left === null)) {
            var smallest = current.left;
            current.left = smallest.right;
            smallest.right = null;
            return smallest;
        }

        // otherwise recurse

        return this.removeSmallest(current.left);
    }

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
    getSmallestFromSubtree(current) {
        // create runner
        var runner = current;

        // return if root is null
        if (!runner) return;

        // loop to the left if it exists
        while (runner.left) {
            runner = runner.left;
        }
        // when the while ends, return runner.val
        return runner;
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
            " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) + `${node.val}`
        );

        this.print(node.left, spaceCnt);
    }

    /* alt tree
                  root
              <-- 25 -->
            /            \
          15             44 <---
        /    \         /    \
      10     22      35     70
    /   \   /  \    /  \   /  \
   4    12     24         66  90
*/
    // - does it exist?
    // AND
    // - is it the root?
    // AND
    // - does it have one child?
    // - does it have two children?
    // - does it have no children?
    // hints: - try swapping with the smallest of the right subtree or the largest of the left subtree.
    //        - you may use helper functions like this.getSmallestFromSubtree(current)
    //        - you may swap values 👈👀  
    // look for largest of the left OR smallest of the right - to preserve the order of the BST
    // -- GOAL -> boil down the node to delete into a single leaf => solved!

    // findAndDelete
    delete(val, current= this.root) {

        if (current === null ){
            return null;
        }

        if (current.val > val) {
            return this.delete(val, current.left);
        } else if (current.val < val) {
            return this.delete(val, current.right);
        }

        if (current.val == val){
            let temp = this.getSmallestFromSubtree(current);//55
            let tempswap = current;//60
            current.val = temp.val;//55
            current.left = null;
            console.log(tempswap);
            return tempswap;
        }
    }
};

// Recursion is:
// - function that calls itself
// - and modifies the inputs
// - so that the inputs lead to a 'base case' and end the recursive call


//               root
//          <-- 50 -->
//         /          \
//       40           60 <---
//     /    \        /    \
//   20     45     55     70
var myBST = new BST();
myBST.insert(new BSTNode(50))
myBST.insert(new BSTNode(40))
myBST.insert(new BSTNode(60))
myBST.insert(new BSTNode(20))
myBST.insert(new BSTNode(45))
myBST.insert(new BSTNode(55))
myBST.insert(new BSTNode(70))
// console.log(myBST);
myBST.print();
console.log("*".repeat(30));
myBST.delete(60);
myBST.print();