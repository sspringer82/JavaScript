'use strict';

class Dog {
    constructor(name, age, type, vaccacined, wormed) {
        this.name = name;
        this.age = age;
        this.type = type;
        this.vaccacined = vaccacined;
        this.wormed = wormed;
    }

    checkDog() {
        if (this.vaccacined && this.wormed) {
            return 'Mit anderen';
        } else if (this.vaccacined || this.wormed) {
            return 'Alleine';
        } else {
            return 'Gar nicht';
        }
    }
}

var dogs = [];
dogs.push(new Dog('Brutus', 14, 'Dackel', true, true));
dogs.push(new Dog('Rex', 4, 'Schäferhund', false, true));
dogs.push(new Dog('Gustav', 8, 'Pudel', true, false));
dogs.push(new Dog('Maxl', 2, 'Dogge', false, false));

dogs.forEach(function (dog, index) {
    console.log('dog' + index + ' ' + dog.checkDog());
});