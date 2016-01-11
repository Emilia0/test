var Environment = Environment || {};
// powyżej stworzenie przestrzeni nazw dla funckji które były napisane przez Bartka, np: (poniżej)
Environment.Animal = function () {
    this.eat = function () {
        console.log('omnomnom');
    };
    thsi.run = function () {
        console.log('kickic');
    };
};

Environment.Dog = function () {
    Animal.apply(this, arguments);
    this.makeNoise = function () {
        console.log('bark');
    };
};

Environment.Cat = function () {
    Animal.apply(this, arguments);
    this.makeNoise = function () {
        console.log('meow');
    };
};

Environment.makeALotOfNoise = function () {
    var animalns = [
        new Dog(),
        new Cat(),
        new Dog(),
        new Dog(),
        new Dog();
    ];
    animals.forEach(function(animal)    {
        animal.makeNoise();
        animal.eat();
    });
}