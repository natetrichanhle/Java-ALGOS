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
    delete(val, current) {
        // edge case to set current to root
        if (current === undefined) {
            current = this.root;
        }
        // check if the node equals current node's value, then this is the node to delete
        if (val === current.val) {
            // check to see if node has no child leaf
            if (!current.left && !current.right) {
                return null;
            }
            // check to see if node has one child leaf (either side)
            else if (!current.left) {
                return current.right;
            }
            else if (!current.right) {
                return current.left;
            } else {
                // check to see if node has two child leaves and assign temp to smallest value
                let temp = this.getSmallestFromSubtree(current);
                // swap current and temp
                current.val = temp.val;
                // return the node being deleted
                return this.delete(temp.val, current.right);
            }
            // keep going down the tree (since there are more than one child leaf)
        } else if (val < current.val) {
            return this.delete(val, current.left)
        } else {
            return this.delete(val, current.right)
        }

    }

    // * delete
    // size
    // height

    /* 
                      root
                  <-- 25 -->
                /            \
              15             50
            /    \         /    \
          10     22      35     70
        /   \   /  \    /  \   /  \
       4   12  18      31  44 66  90
    */

    // PreOrder (DFS - Depth First Search)
    // (Root / Parent, Left, Right)
    // 25, 15, 10, 4, 12, 22, 18, 50, 35, 31, 44, 70, 66, 90
    // optimal order for rebuilding a BST
    printPreOrder(current) {
        if (current === undefined) {
            current = this.root;
        }

        if (current) {
            // read everything, then recurse
            console.log(current.val);
            this.printPreOrder(current.left);
            this.printPreOrder(current.right);
        }
    }

    // InOrder (DFS)
    // (Left, Root / Parent, Right)
    // 4, 10, 12, 15, 18, 22, 25, 31, 35, 44, 50, 66, 70, 90
    // Sorted data!
    printInOrder(current) { 
        if (current === undefined) {
            current = this.root;
        }
        if(current) {
            this.printInOrder(current.left);
            console.log(current.val);
            this.printInOrder(current.right);
        }
    }

    // PostOrder (DFS)
    // (Left, Right, Root / Parent)
    // 4, 12, 10, 18, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25
    printPostOrder(current) { 
        if (current === undefined) {
            current = this.root;
        }
        if(current) {
            // THIS GOES LEFT
            this.printPostOrder(current.left);
            // THIS GOES RIGHT
            this.printPostOrder(current.right);
            // THEN IT PRINTS
            console.log(current.val);
        }
    }

    // LevelOrder (BFS - Breath first search)
    // Row-by-row left-right top-down
    // [25], [15, 50], [10, 22, 35, 70], [4, 12, 18, 31, 44, 66, 90]
    // hint: use a Queue!
    // don't use recursion
    printLevelOrder(current) { 
        if (current === undefined) {
            current = this.root;
        }
        
        let queue = [];
        queue && queue.push(current);
        while (queue.length > 0) {
            let temp = queue.shift();
            console.log(temp.val);
            if (temp.left) {
                queue.push(temp.left);
            }
            if (temp.right) {
                queue.push(temp.right);
            }
        }
    }


};

// Recursion is:
// - function that calls itself
// - and modifies the inputs
// - so that the inputs lead to a 'base case' and end the recursive call


var myBST = new BST();
myBST.insert(new BSTNode(25))
myBST.insert(new BSTNode(15))
myBST.insert(new BSTNode(50))
myBST.insert(new BSTNode(10))
myBST.insert(new BSTNode(22))
myBST.insert(new BSTNode(35))
myBST.insert(new BSTNode(70))
myBST.insert(new BSTNode(4))
myBST.insert(new BSTNode(12))
myBST.insert(new BSTNode(18))
myBST.insert(new BSTNode(31))
myBST.insert(new BSTNode(44))
myBST.insert(new BSTNode(66))
myBST.insert(new BSTNode(90))
console.log(myBST);
/* BST
                  root
              <-- 25 -->
            /            \
          15             50
        /    \         /    \
      10     22      35     70
    /   \   /  \    /  \   /  \
   4   12  18      31  44 66  90
*/
myBST.print();
console.log("********** InOrder **********");
myBST.printInOrder();
console.log("********** PostOrder **********");
myBST.printPostOrder();
console.log("********** LevelOrder **********");
myBST.printLevelOrder();
