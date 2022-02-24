// DLLNodes have a .next and .prev
class DLLNode {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// DLLists have both a .head and .tail pointer
class DLList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    // == Main Methods ==

 // add node before target
    // target is the value of a node in the list
    // consider the edge case where you may have to move the head
    // consider the edge case where you do not find the target
    prepend(target, node) {
      let runner = this.head;
      if (runner.data == target) {
        node.next = runner;
        runner.prev = node; 
        this.head = node;
      }
      while (runner.next) {
        runner = runner.next;
        if (runner.data == target) {
          node.prev = runner.prev;
          node.next = runner;
          runner.prev.next = node;
          runner.prev = node;
        }
      }
    }

    // return true or false if a node exists with data === val
    exists(val) {
      let runner = this.head;
      while(runner){
        if(runner.data == val){
          return true;
        }
        runner = runner.next;
      }
      return false;
    }

    // push to head
    addHead(node) {
        if (!this.head) { // empty list
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
    }

    // pop from tail
    removeTail() {
        if (this.head == null) return; // empty list
        if (this.head === this.tail) { // one node
            var temp = this.tail; // set a temp
            this.head = null; // disconnect the head
            this.tail = null; // disconnect the tail
            return temp;
        }
        var temp = this.tail; // set a temp
        this.tail = tail.prev; // move the tail back
        this.tail.next = null; // null out the new tail's next
        temp.prev = null; // null out the temp's prev
        return temp;
    }

    // return is empty
    isEmpty() {
        return this.head === null;
    }

    // == Bonus Methods, just inverted versions of the first set ==

    // push to tail
    addTail(node) { }

    // pop from head
    removeHead() { }
}

node1 = new DLLNode(50);
node2 = new DLLNode(60);
node3 = new DLLNode(70);
node4 = new DLLNode(80);

list = new DLList();
list.addHead(node1);
list.addHead(node2);
list.addHead(node3);

list.prepend(70, node4)
console.log(list);

// instantiate the DLL
// add a few nodes
// test!