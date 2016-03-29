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

var a = {}, b = {}, c = {}; // a,b,c odnoszą sie do niezależnych pustych obiektów

a = b = c = {}; // odnosza się do tego samego pustego obiektu

//PROTOTYP

//Metoda beget tworzy nowy obiekt używając starego obiektu jako prototypu:
if (typeof Object.beget !== 'function') {
    Object.beget = function (o) {
        var F = function () {
        };
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

// RODZIAŁ 4 - FUNKCJE

// LITERAŁ FUNKCJI

var add = function (a, b) {           //funckja anonimowa - nie ma nazwy
    return a + b;
};

//WZORZEC WYWOŁANIA METODY

//Metoda increment pobiera opcjonalny parametr. Jeśli argument nie jest liczbą, wówczas używana jest domyślna wartośc 1.
var myObject = {
    value: 0,
    increment: function (inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment();
//document.writeln(myObject.value);
myObject.increment(2);
//document.writeln(myObject.value);
//myObject.increment(3);
//document.writeln(myObject.value);


//WZORZEC WYWOŁANIA FUNKCJI

var sum = add(3, 4);

//Jeśli metoda definiuje zmienną i przypisuje jej wartość this, wówczas funkcja wewnętrzna będzie miała
// dostęp do this poprzez tą zmienną. Zwyczajowo nazywa się taką zmienną that:

myObject.double = function () {
    var that = this;

    var helper = function () {
        that.value = add(that.value, that.value);
    };
    helper();
};

myObject.double();
//document.writeln(myObject.value);

//WZIRZEC WYWOŁANIA KONSTRUKTORA

//Jeśli funkcja jest wywołana przy użyciu słowa new, tworzony jest nowy obiekt z ukrytym łącznikiem do wartości właściwości prototype tej funkcji

//Tworzymy konstruktor o nazwie Quo. Konstruuje on obiekt posiadający właściwość status.

var Quo = function (string) {
    this.status = string;
};

//Dodajemy wszystkim instancjom Quo metodę publiczną get-status.

Quo.prototype.get_status = function () {
    return this.status;
};

//Tworzymy instancję Quo.

var myQuo = new Quo("zdezorientowany");

//document.writeln(myQuo.get_status());

//FUNKCJE ZAPROJEKTOWANE DO UŻYCIA ZE SŁOWEM NEW TO KONSTRUKTORY
// ICH NAZWY ZACZYNAJĄ SIĘ Z WIELKIEJ LITERY

//WZORZEC ZASTOSOWANIA WYWOAŁANIA

//funkcje mogą posiadać metody np: apply(), call(), bind();

var array = [3, 4];
var sum = add.apply(null, array);

var statusObject = {
    status: 'A-OK'
};

//statusObject nie dziedziczy z Quo.prototype, ale możemy wywołać (zastosować) metodę get-status na obiekcie statusObject,
// mimio, że sam nie ma metody get_status.

var status = Quo.prototype.get_status.apply(statusObject);

//console.log(status);

// ARGUMENTY

//Wewnątrz funkcji mamy także dostęp do specjalnej zmiennej arguments, która jest podobna do tablicy
//    ale tablicą nie jest. Dzięki niej mamy dostęp do wszystkich argumentów wywołanej funkcji,
//    dzięki czemu możemy tworzyć funkcje ze zmienną liczbą argumentów.

var sum = function () {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
};
//document.writeln(sum(4,8,15,16,23,42,113));

//WYJĄTKI

//JS posiada mechanizm obsługi wyjatków - niepożądanych zdarzeń

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw   {
            name: 'TypeError',
            message: 'funkcja add wymaga przekazania liczb'
        }
    }
    return a + b;
};

//instrukcja throw przerywa wykonywanie funkcji.

//Tworzymy funkcję try_it, którea wywołuje funkcję add nieprawidłowo

var try_it = function () {
    try {
        add("siedem");
    } catch (e) {
        //document.writeln(e.name + ': ' + e.message);
    }
};
try_it();


//ROZSZERZANIE TYPÓW

//Dodanie metody do Object.prototype czyni ją dostępną we wszystkich obiektach


Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

//Poprzez rozszerzenie Function.prototype nową metodą method, nie musimy już więcej wpisywać nazwy właściwości prototype.

//Inne przydatne rozszerzenia:

//Metoda integer - do wydobycia liczby całkowitej

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});

//document.writeln((-15430/3.89).integer());

//Metoda trim do usuwania spacji z początku i końca stringów

String.method('trim', function () {
    return this.replace(/^\s+|\s+$/g, ' ');
});

//document.writeln('"'+ "   oczyszczony   ".trim() +'"');

//Prototypy typów podstawowych są strukturami publicznymi - trzeba uważać przy korzystaniu z wielu bibliotek
//Metoda ochronna - dodawanie metody tylko wówczas, gdy inna o takiej samej nazwie nie istnieje

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
    }
};

//REKURENCJA

//Funkcja rekurencyjna to taka, która wywołuje samą siebie.
//Funkcje rekurencyjne mogą być efektowne przy manipulacji strukturami drzewiastymi np. DOM.

//Przykład factorial = silnia

function factorial(n) {
    if (n <= 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
factorial(10);
// ==> 3628800

//ZASIĘG - SCOPE

var foo = function () {
    var a = 3, b = 5;

    var bar = function () {
        var b = 7, c = 11;
        //    w tym punkcie a wynosi 3, b- 7, c - 11
        a += b + c;
        //w tym punkcie a wynosi 21, b-7, c-11
    };
//    w tym punkcie a wynosi 3, b-5, c- nie jest zdefiniowane
    bar();
//    w tym punkcie a wynosi 21, b - 5
};

//JavaScript nie ma zasięgu blokowego - ma zasię funkcji.
//A więc parametry i zmienne zdefiniowane wewnątrz funkcji nie są widoczne na zewnątrz.
//W JS najlepiej jest deklarowac wszystkie zmienne używane w ramach funkcji na samym jej poczatku.

//DOMKNIĘCIA
//
//Domknięcia leksykalne (ang. closures) są to funkcje, wewnątrz których mamy dostęp do zmiennych,
//    które zostały zadeklarowane na zewnątrz funkcji mimo że zakres ich istnienia się już zakończył.
//    Istnieją one w środowisku, które jest “doczepione” do funkcji.

var myObject = function () {
    var value = 0;

    return {
        increment: function (inc) {
            value += typeof inc === 'number' ? inc : 1;
        },
        getValue: function () {
            return value;
        }
    }
}();

//Powyżej - nie przypisujemy funckji do obiektu myOjbct, lecz wynik jej wywoałania.
//funkcja zwraca obiekt, zawierający dwie metody, z których każda ma dostęp do zmiennej value.


//Tworzymy funkcję quo, która tworzy obiekt posiadający metodę get_status oraz prywatną właściwość status.

var quo = function (status) {
    return {
        get_status: function () {
            return status;
        }
    };
};
//Tworzymy instancję quo

var myQuo = quo("zdumiony");
//document.writeln(myQuo.get_status());

//nasza nowa funkcja quo powinna być użyta bez slowa new, więc jej nazwa zaczyna się od małej litery.

//Funkcja ma dostęp do kontekstu, w którym została utworzona - nazywa się to domknięciem.

//Inny przykład:

//Definiujemy funkcję, która ustawia kolor węzła DOM na żółty, a następnie rozjaśnia go do białego.

var fade = function (node) {
    var level = 1;
    var step = function () {
        var hex = level.toString(16);
        node.style.background = '#FFFF' + hex + hex;

        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};
fade(document.body);


//MODUŁ

// Moduł jest to funkcja (lub obiekt), która prezentuje pewien interfejs,
// ale ukrywa wewnętrzny stan i implementację. Uzywając funkcji do tworzenia modułów,
// możemy niemal całkowicie wyeliminować użycie zmiennych globalnych.

//tworzymy metodę, która wyszuka encje HTML w stringu i zastąpi je znakami.

String.method('deentityify', function () {
//    Tabela encji. Mapujem nazwy encji na odpowiadajace im znaki.
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
//    zwraca metodę deentityify
    return function () {
        //    To jest metoda deentityify. Wywołuje ona standardową metodę replace, wyszukując fragmentów
        //    tekstu zaczynających się od '&' a kończących na ';'.
        //    jeśli znaki zawarte wewnątrz takeigo fragmentu znajdują się w tabeli encji,
        // cała encja jest zastępowana znakiem z tabeli. Funckcja używa wyrażeń regularnych.

        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());

//document.writeln('&lt;&quot;&gt;'.deentityify());

// Ogólny wzorzec modułu to funkcja, która definiuje swoje prywatne zmienne i funkcje,
// następnie tworzy uprzywilejowane funkcje, które poprzez domknięcia, mają dostęp do zmiennych
// i funckji prywatnych, a na koniec zwraca owe uprzywilejowane fukncje, bądź też przechowuje je w ogólnie dostępnym miejscu.

//KASKADOWE ŁĄCZENIE WYWOŁAŃ

//Kaskadowe łączenie wyowałń pozwala na kolejne wywołania wielu metod na tym samym obiekcie w ramach jednej instrukcji.


//FUNCKJA CURRY

//Pozwala na utworzenie nowej funkcji poprzez łączenie funkcji z jej argumentem:


//JavaScript nie ma metody curry, ale możemy ją łatwo utworzyć przez rozszerzenie Function.prototype:

Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});

var add1 = add.curry(1);

//document.writeln(add1(6));

//SPAMIĘTYWANIE - MNEMONIZATION

//Funkcje mogą używać obiektów so zapamiętywania rezultatów poprzednich operacji, oszczędzając niepotrzebnej pracy.
//Optymalizacja taka nazywa się spamiętywaniem.

//Przydatne np. przy wyliczaniu ciągu Fibonacciego

var fibonacci = function () {
    var memo = [0, 1];
    var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
}();

//funckja, która będzie ułatwiać pisanie funkcji ze spamiętywaniem:

//Funkcja memoizer będzie pobierać wejściową tablicę memo oraz funkcję podstawową (nazwaną fundamental,
// zwracać zaś będzie funkcję pomocnicza(nazwaną shell),

var memoizer = function (memo, fundamental) {
    var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
            result = fundamental(shell, n);
            memo[n] = result;
        }
        return result;
    };
    return shell;
};

//Używając powyższej funkcji:

var fibonacci = memoizer([0, 1], function (shell, n) {
    return shell(n - 1) + shell(n - 2);
});


//ROZDZIAŁ 5 - DZIEDZICZENIE

//DZIEDZICZENIE PSEUDOKLASYCZNE

var Mammal = function (name) {
    this.name = name;
};

Mammal.prototype.get_name = function () {
    return this.name;
};

Mammal.prototype.says = function () {
    return this.saying || '';
};

//Tworzymy instancję

var myMammal = new Mammal('Mój ssak');
var name = myMammal.get_name();

//Następnie możemy utworzyć inną pseudoklasę dziedziczącą z Mammal,
// definiując jej konstruktor i zastępując jej prototyp instancją Mammal

var Cat = function (name) {
    this.name = name;
    this.saying = 'miau';
};

//Zastępujemy Cat.prototype instancją Mammal

Cat.prototype = new Mammal();

//Rozszerzamy nowy prototyp metodami purr i get_name

Cat.prototype.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
Cat.prototype.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Kicia');
var says = myCat.says();
var purr = myCat.purr(5);
var name = myCat.get_name();

//DZIEDZICZENIE PROTOTYPOWE

var myMammal = {
    name: "Mój ssak",
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || ' ';
    }
};

var myCat = Object.beget(myMammal);
myCat.name = 'Kicia';
myCat.saying = 'miau';
myCat.purr = function (n) {
    var i, s = ' ';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
};


//DZIEDZICZENIE FUNKCYJNE

//Szablon pseudokodu do tworzenia konstruktora funkcyjnego

//var constructor = function (spec, my)   {
//    var that, unne prywatne zmienne instancyjne;
//    my= my || {};
////tu dodajemy do obiektu zmienne i funkcje współdzielone
//    that = nowy obiekt;
////    tu dodajemy do obiektu that metody uprzywilejowane
//
//    return that;
//}

//Obiekt spec zawiera wszystkie informacje niezbędne konstruktorowi do utworzenia instancji.
//Może też być pojedynczą wartością.

//Obiekt my służy do przechowywania chronionych danych, użycie tego obiektu jest opcjonalne.

//Zmienne i funkcje wewnetrzbne utworzone wewnątrz konstruktora stają się zmiennymi i funkcjami prywatnymi instancji.

//Przykład:

var mammal = function (spec) {
    var that = {};
    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || ' ';
    };
    return that;
};
var myMammal = mammal({name: 'Mój ssak'});


var cat = function (spec) {
    spec.saying = spec.saying || 'miau';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = ' ';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says();
    };
    return that;
};

var myCat = cat({name: 'Kicia'});

//Wzorzec funkcyjny umożliwia również wywołanie metod z obiektów nadrzędnych.
//metoda superior pobierać będize nazwę metody i zwracać funkcję wywołująca tą metodę.

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});

var coolcat = function(spec)    {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function (n)    {
        return 'Teraz ' + super_get_name() + ' w nowej, lepszej wersji';
    };
    return that;
};
var myCoolCat = coolcat({name: 'Kocur'});
var name = myCoolCat.get_name();

// Części
//Obiekty da się tworzyć ze zbiorów częśći.

//ROZDZIAŁ 6 - TABLICE

//JS dostarcza obiekt, który ma charakterystykę częściowo zbliżoną do tablicy.

var empty = [];
var numbers = ['zero', 'jeden','dwa', 'trzy', 'cztery', 'pięć', 'sześć', 'siedem', 'osiem', 'dziewięć'];

//console.log(empty[1]);
//console.log(numbers[1]);

//DŁUGOŚĆ TABLICY

var myArray = [];
//console.log(myArray.length);


//Wartość length jest równa najwyższemu numerowi oznaczającemu jedną z właściwości tablicy, powiększonemu o jeden.
myArray[1000000] = true;
//console.log(myArray.length);


//Bezpośrednie ustawienie właściwości length na mniejszą, spowoduje usunięcie wszystkich właściwości, których indeks jest większy lub równy nowej długości:
numbers.length = 3;
//console.log(numbers);


//Nowy element może być dołączony do końca tablicy przez przypisanie go na pozycji równej długości tablicy:

numbers[numbers.length]= 'shi';

//console.log(numbers);

//To samo robi metoda push

numbers.push('go');

//console.log(numbers);

//USUWANIE ELEMENÓW"

//możemy użyć operatora delete do usunięcia elementu z tablicy - ale jego miejsce zajmie undefined, a pozostałe elementy 'nie przesuną się'

delete numbers[2];

//console.log(numbers);

//Metoda splice - pierwszy argument to liczba porządkowa określająca punkt początkow w tablicy, drugi określa liczbę argumentów do usunięcia.
// Każdy dodatkowy argument zostanie umieszczony w tablicy w miejsce usuniętych:

numbers.splice(2,1);

console.log(numbers);

//Operacja ta może być czasochłonna w wypadku bardzo dużych tablic.



//WYLICZANIE

//Petla for

var i;
for (i=0; i<numbers.length; i +=1) {
    document.writeln(numbers[i]);
}

//Problem z rozpoznawaniem typu

//Operator typeof zapytany o tablicę zwraca wartość 'object'.

//Własna funkcja sprawdzająca czy coś jest array:

var is_array = function(value)  {
    return value &&
            typeof value === 'object' &&
            typeof value.length === 'number' &&
            typeof value.splice === 'function' &&
            !(value.propertyIsEnumerable('length'));
};
 //console.log(is_array(numbers));

//oczywiście jest jeszcze metoda:

//console.log(Array.isArray(numbers));

//METODY

//Tak jak do obiektów, tak też do Array.prototype możemy dodawac własne metody np:

Array.method('reduce', function (f, value)  {
    var i;
    for (i=0; i<this.length; i +=1) {
        value = f(this[i], value);
    }
    return value;
});

//Metoda reduce pobiera funckję i wartość początkową; dla każdego elementu tablicy wywołuje ową funckję,
// przekazując jej dany element i wartość i wylicza nową wartość.

var data = [4,8,15,16,23,42];

var add = function (a,b)    {
    return a+b;
};
var mult = function(a,b)    {
    return a*b;
};

//Wywołujemy metodę reduce, przekazując funckję add.

var sum = data.reduce(add,0);

//Wywołujemy metodę reduce, przekazując funkcję mult

var product = data.reduce(mult,1);


//Tablice akceptują dowolne łańcuchy jako nazwy właściwości.

//WYMIARY

//Możemy napisać funkcję, która będzie inicjalizować wszystkie elementy tablicy ustaloną wartośćią

Array.dim = function (dimension, initial)   {
    var a = [], i;
    for (i=0; i<dimension; i+= 1)   {
        a[i]= initial;
    }
    return a;
}

//Teraz tworzymy tablicę zawierającą 10 zer.
var myArray = Array.dim(10,0);


