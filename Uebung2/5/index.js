'use strict';

class List {
    constructor(list) {
        this.list = list || [];
    }

    add(element) {
        this.list.push(element);
    }

    get() {
        return this.list;
    }

    remove(elements) {
        for (var i = 0; i < elements.length; i++) {
            var index = this.list.indexOf(elements[i]);
            if (index !== -1) {
                this.list.splice(index, 1);
            }
        }
    }
}

var list = new List([1,2,3,4,5]);
console.log(list.get());
list.add(6);
console.log(list.get());
list.remove([2, 4, 7]);
console.log(list.get());
