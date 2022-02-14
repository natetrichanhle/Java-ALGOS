/* Stacks
A stack is a LIFO data structure
LAST IN, FIRST OUT
LIFO / FILO
push - add to top
pop - remove from top
peek - check the top
isEmpty - check if the stack is empty, true/false
length - return size of stack
*/

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class slStack {
    constructor() {
        this.top = null; // this.head, this.end
    }

    // add to top
    push(newNode) {
        if (this.top) {
            newNode.next = this.top;
            this.top = newNode;
        } else {
            this.top = newNode;
        }
    }

    // remove from top
    pop() {
        if (this.top == null)
            return null;
        // this is an else LOL 
        var temp = this.top; // store the previous top
        this.top = this.top.next; // move top pointer to the next node
        return temp;
    }

    // aka check top
    peek() {
        return this.top;
    }

    // check if empty
    isEmpty() {
        return this.top === null;
        // if (this.top == null){
        //     return true;
        // } else {
        //     return false;
        // }
    }

    // "1" == 1 true
    // "1" === 1 false

    // length getter
    getLength() {
        var counter = 0;
        while (this.top) {
            counter++;
            this.top = this.top.next
        } 
        return counter;
        // return this.length;
    }
}

// don't forget to instantiate the slStack!
// add a few nodes first
var stack1 = new slStack();
// var stack2 = new slStack();
stack1.push(new Node(10));
stack1.push(new Node(20));
stack1.push(new Node(30));
stack1.push(new Node(40));
stack1.push(new Node(50));
// console.log(stack1.peek());
// stack1.pop()
// stack1.isEmpty();
// console.log(stack2.isEmpty());
console.log(stack1.getLength());
// console.log(stack2.getLength());
// console.log(stack1);
