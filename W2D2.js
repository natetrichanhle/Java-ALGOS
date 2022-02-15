class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Queue
// FIFO (First in, first out)

// - enqueue
// - dequeue
// - peek
// - isEmpty
// - count

class Queue {
    constructor() {
        this.front = null; // sometimes called head "front of the line"
        this.back = null; // sometimes called rear or tail "back of the line"
        this.length = 0;
    }

    // add nodes to the back of the queue
    enqueue(node) {
        if (!this.back) {
            this.front = node;
            this.back = node;
            this.length += 1;
        }
        else {
            this.back.next = node;
            this.back = node;
            this.length += 1
        }
    }

    // remove from the front
    dequeue() {
        var temp = this.front;
        this.front = this.front.next;
        temp.next = null;
        this.length -= 1;
        return temp;
    }

    // check the front of the queue
    peek() {
        return this.front ? this.front.data : this.front;

        if (this.front) {
            return this.front.data
        } else {
            return this.front
        }
    }



    // return true / false if queue is empty
    isEmpty() {
        return this.front === null
    }

    // return length
    count() {
        return this.length;
    }


}

myQueue = new Queue();
myQueue.enqueue(new Node(11))
myQueue.enqueue(new Node(22))
myQueue.enqueue(new Node(33))
console.log(myQueue)
console.log(myQueue.count());
// NINJA BONUS:
// print every value in the queue
// you may only use one queue or stack for additional storage
// return the queue back to it's original order when you are done
// you are not allowed to linearly traverse the queue
// only use public methods enqueue(), dequeue(), peek(), isEmpty(), and count()
function readQueue(queue) {
    newQueue = new Queue();
    while (queue.front) {
        console.log(queue.front.data);
        newQueue.enqueue(queue.dequeue());
    }
    return newQueue;
}

readQueue(myQueue);