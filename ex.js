//tworzymy funckję, która tworzy kolejne obiekty, które mają id większe o 1
//
//var createNextPerson = function () {
//    var id = 0;
//    return function (name) {
//        id += 1;
//        return {
//            id: id,
//            name: name
//        };
//    };
//
//}();
//var Leia = createNextPerson("Leia");
//var Anakin = createNextPerson('Anakin');
//var JarJar = createNextPerson('JarJar');
//var Spock = createNextPerson('Spock');

//funckja która jako paramtr przyjmuje tablice z liczbami, a zwraca z funkcjami które zwracają dany nr
//poniżej moje pomysły na zadanie
//function transformArray(numbersArray) {}

//var MyArray = [7,13,27,111,666];

//var transformArray = function(numbersArray) {
//    MyArray.map(callback)

//}

//var number = function transformArray(numbersArray) {
//    return numbersArray.map(function (number) {
//        return function () {
//            return number;
//        };
//    });
//}([0, 1, 2, 3, 4, 5]) [5]();


//Kolejne zadanie - gra papier kamień nożyce, 2 graczy, ruchy każdego gracza podane w tablicy na sztywno, bazować na obiegtach, gracze to obiekty


for (var i = 0; i <= 5; i++) {
    var Gracz1 = ['rock', 'paper', 'rock', 'paper', 'scissors', 'scissors'];
    var Gracz2 = ['scissors', 'paper', 'paper', 'scissors', 'rock', 'paper'];

    Gracz1.shift();
    Gracz2.shift();

    var RuchGracza1 = Gracz1.shift();
    var RuchGracza2 = Gracz2.shift();


    if (RuchGracza1 = "rock") {
        if (RuchGracza2 = 'scissors') {
            console.log('Wygrywa Gracz1');
        }
        else if (RuchGracza2 = 'paper') {
            console.log('Wygrywa Gracz2');
        }
        else {
            console.log('Remis');
        }
    }
    else if (RuchGracza1 = 'paper') {
        if (RuchGracza2 = 'rock') {
            console.log('Wygrywa Gracz1');
        }
        else if (RuchGracza2 = 'scissors') {
            console.log('Wygrywa Gracz2');
        }
        else {
            console.log('Remis');
        }
    }
    else if (RuchGracza1 = 'scissors') {
        if (RuchGracza2 = 'paper') {
            console.log('Wygrywa Gracz1');
        }
        else if (RuchGracza2 = 'rock') {
            console.log('Wygrywa Gracz2');
        }
        else {
            console.log('Remis');
        }
    }
    else {
        console.log('Remis')
    }

}


