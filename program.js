document.writeln('Hello, world!');

// ROZDZIAŁ 3 - OBIEKTY

//LITERAŁY OBIEKTOWE

var empty_object = {};
var stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};
// Jeśli nazwa właściwości jest poprawną nazwą JavaScriptu i nie jest słowem zastrzeżonym,
// to nie musi być pisana w cudzysłowiu.

var flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2008-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2008-09-23 10:42",
        city: "Los Angeles"
    }
};

//POBIERANIE

//console.log(stooge["first-name"]);
//console.log(flight.departure.IATA); // notacja kropkowa jest czytelniejsza
//console.log(stooge["middle-name"]); // próba pobrania nieistniejącej właściwości - zwróci undefined

// w takim wypadku możemy użyć operatora || do ustawienia wartości domyslnej:
var middle = stooge["middle-name"] || "brak";
var status = flight.status || "nieznany";

//console.log(flight.equipment); //undefined
//console.log(flight.equipment.model); // TypeError - próba pobrania wartości z undefined.
//console.log(flight.equipment && flight.equipment.model); // undefined - dzięki operatorowi && unikamy TypeError

//MODYFIKACJA

stooge['first-name'] = "Jerome";

stooge['middle-name'] = 'Lester';
flight.equimpment = {
    model: 'Boeing 777'
};
flight.status = 'spóźniony';

//REFERENCJA

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
//console.log(nick); // nick ma wartość 'curly', ponieważ x oraz stooge odnosza się do tego samego obiektu

var a ={}, b = {}, c={}; // a,b,c odnoszą sie do niezależnych pustych obiektów

a = b = c = {}; // odnosza się do tego samego pustego obiektu

//PROTOTYP

//Metoda beget tworzy nowy obiekt używając starego obiektu jako prototypu:
if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.beget(stooge);

//Gdy wprowadzamy jakiekolwiek zmiany do obiektu, prototyp tego obiektu pozostaje niezmienienony:

another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

//Jeśli chcemy odczytać właściwości obiektu, a obiekt nie ma właściwości o tej nazwie, JavaScript spróbuje pobrać wartość z prototypu,
// jeśli on nie ma, to jego prototyp itd, aż do Object.prototype - jeśli nadal nic zostanie zwrócone undefined.

//Jeśli dodamy nową właściwość do prototypu, będzie ona widoczna natychmist we wszystkich obiektach,
// które zostały utworzone w oparciu o ten prototyp:

stooge.profession = 'actor';
//console.log(another_stooge.profession);


//REFLEKSJA

//console.log(typeof flight.number);
//console.log(typeof flight.status);
//console.log(typeof flight.arrival);
//console.log(typeof flight.manifest);
//
//console.log(typeof flight.toString);
//console.log(typeof flight.constructor);

// funkcje składowe zazwyczaj nas nieinteresują, możemy więc użyć meotdy hasOwnProperty aby sprawdzić,
// czy obiekt posiada interesującą nas właściwość. METODA TA NIE PRZESZUKUJE ŁAŃCUCHA PROTOTYPÓW

//console.log(flight.hasOwnProperty('number'));
//console.log(flight.hasOwnProperty('constructor'));

//WYLICZANIE

// Instrukcja for in może iterować po wszystkich nazwach właściwości obiektu.
//ALE zazwyczaj wszystkich nie potrzebujemy - w związku z tym filtrujemy je za pomocą typeof i hasOwnProperty:

//var name;
//for (name in another_stooge)    {
//    if (typeof another_stooge[name] !== 'function') {
//        document.writeln(name + ': ' +another_stooge[name]);
//    }
//}

// Uwaga - w powyższym przypadku kolejnośc zwracanych nazw będzie dowolna, więc zamiast for in stworzyć tablicę:

//var i;
//var properties = [
//    'first-name',
//    'middle-name',
//    'last-name',
//    'profession'
//];
//
//for (i=0; i < properties.length; i+=1)  {
//    document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
//}

//USUWANIE

//Operator delete może być użyty do usunięcia właściwości z obiektu - nie modyfikuje prototypu.
//Uwaga - usunięcie właściwości z obiektu może sprawić, że właściwość o tej samej nazwie z prototypu stanie się nagle widoczna:

//console.log(another_stooge.nickname);
delete another_stooge.nickname;
//console.log(another_stooge.nickname);

//OGRANICZANIE LICZBY ZMIENNYCH GLOBALNYCH

//Jednym ze sposobów zminimalizowania użycia zmiennych globalnych jest utworzenie jednej zmiennej globalnej dla aplikacji:

var MYAPP = {};

//Zmienna ta staje się następnie kontenerem dla całej aplikacji:

MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

MYAPP.flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2008-09-22 14:55",
        city: "Sydney"
    },
    arrival: {
        IATA: "LAX",
        time: "2008-09-23 10:42",
        city: "Los Angeles"
    }

};








