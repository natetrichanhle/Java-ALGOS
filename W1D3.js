class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class SLL {
    constructor() {
            this.head = null;
        }
        // return true or false if this.head is null
    isEmpty() {
        return this.head == null;
    }

    // add given node to the head, if it exists. return void
    addToFront(node) {
        node.next = this.head; // set the new node's next to the head
        this.head = node; // move the head to the new node
    }

    // when a pointer is to the LEFT of an equal sign, we are CHANGING it
    // when a pointer is to the RIGHT of an equal sign, we are READING it

    // create a new node with given data, add it to the head. return void
    addDataToFront(data) { // 10
        var newNode = new Node(data); // create a new node with the data
        newNode.next = this.head; // set the new node's next to the head
        this.head = newNode; // move the head to the new node
    }

    // ---------------------------------
    // console log (print) the data of every node in the current list
    // traversal
    read() {
        var runner = this.head;
        while(runner){
            console.log(runner.data);
            runner = runner.next;
        }
    }

    // find: return true / false if current list contains a data equal to data
    contains(data) {
        var runner = this.head;
        if (!this.head)
            return false;
        // !this.head && false;
        while (runner){
            runner = runner.next;
            if(runner.data == data){
                return true;
            }
        }
    }

    // Remove from front: remove and return the first node in the SLL
    removeFromFront() {
        var temp = this.head;
        // if (this.head) this.head = this.head.next;
        // this.head && this.head.next;
        if (!this.head)
            return null;
        else {
            this.head = this.head.next;
            temp.next == null;
        }
        return temp;
    }
}

// ⚠ don't forget to instantiate the Singly Linked List
var myList = new SLL();

myList.read(new Node(10));
myList.contains(new Node(20));
myList.removeFromFront(new Node(30));

console.log(myList);

