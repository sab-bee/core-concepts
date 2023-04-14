<h1 align="center">Prototype</h1>
prototype holo JS er one of the most important concept. Javascript language tar ashol moja nite hole prototype er concept bujhte hobe. JS e amra joto function create kori each function er ekta built in object thake jeta holo `prototype`. Lets check is it true or not.
```js
function fun() {}
console.dir(fun);
```
![[Pasted image 20230406224032.png]]
As function is a special types of object, so object also has this `prototype` .

__`Prototype` keno dorkar?__
In simple word, memory save korar jonne.
Amra jodi java or c++ er kotha chinta kori tahole dekhte parbo ei language gula object oriented paradigm follow kore. Tai eshob language by default `inheritance` support kore. Kintu javascript er khetre `inheritance` support kore kina ask korle ans both __no__ and __yes__ . Karon, java or c++ er moto ekhane `classical` inheritance support kore na. Ekhane `prototype` use kore inheritance achieve kora jaay.

```java
class Veyron {
  String engine = "w-16";
  void racingMode() {
    System.out.println("racing mode enabled");
  }
}

class Chiron extends Veyron {
  void offRodeMode() {
    System.out.println("going offroad");
  }
}

class Main {
  public static void main(String[] args) {
    var chiron = new Chiron();
    System.out.println(chiron.engine); // w-16
    chiron.racingMode(); // racing mode enabled
  }
}
```

uporer Java code er example ta jodi dekhi.  Java object oriented language. Tar mane eta by default inheritance support kore. Kheyal kori, `Veyron` er **engine** ar **racingMode** functionality `Chiron` inherit kore. Tai `chiron` e egula alada bhabe implement korar dorkar hoy na. 

erokom similar example javascript e kibhabe achieve kora jaay prototype use kore sheta dekhar aage amra dekhbo prototype kivabe ashlo.
```js
function Food(name, cost) {
  let food = {
    name: name,
    cost: cost,
  };

  return food;
}

let pizza = Food("pepperoni", 15);

console.dir(pizza);
```

![[Pasted image 20230407032057.png]]
`Food` function create korlam jaa ekta object return kore. Jotbor e function ta call kora hobe totobar e notun notun object create hobe. Ekhon jodi `momos` naam e arekta object create kori.
```js
let momos = Food("chicken momo", 20);
console.dir(momos);
```

![[Pasted image 20230407032351.png]]
ekhane `pizza` and `momos` duita object er jonnei `cost` and `name` er  alada alada copy create hoyeche memory te sheta amra dekhtei parchi. Eta make sense kore karon different food er name and cost alada hotei pare. But jodi duita object e emon ekta method ke hold kore jar purpose same . i.e `serve` 

```js
function Food(name, cost) {
  let food = {
    name: name,
    cost: cost,
    serve: function () {
      console.log(this.name, "is being served");
    },
  };

  return food;
}

let pizza = Food("pepperoni", 15);
let momos = Food("chicken momo", 20);

console.dir(pizza);
console.dir(momos);
```

![[Pasted image 20230407032743.png]]
duita object e same `serve` function er alada alada copy memory te create kore. Eta mainly redundant . As purpose same so alada alada copy create kore space nosto korar kono mane hoy na. Lets fix it.
```js
function Food(name, cost) {
  let food = {
    name: name,
    cost: cost,
    serve: method.serve,
  };

  return food;
}

let method = {
  serve: function () {
    console.log(this.name, "is being served");
  },
};

let pizza = Food("pepperoni", 15);
let momos = Food("chicken momo", 20);

console.dir(pizza);
console.dir(momos);
```

ekhane `serve` function alada ekta object er moddhe rakha hoyeche. And `Food` constructor er `food` object er property te refer kora hoyeche.  So `pizza` ar `momos` instance jokhon create kora hoy tokhon `serve` er alada alada copy create hobe na rather ektai copy thakbe jetake both `pizza` and `momos` er `food` property refer korte pare.
<h3 align="center">Object.create</h3>
__Object.create__ kono ekta object er prototype use kore new ekta object create kore return kore. For example - 
```js
let smoothie = {
  name: 'fruit smoothie',
  price: 20,
}

let shake = Object.create(smoothie)
console.log(shake)
console.log(shake.name);
```
![[Pasted image 20230413181546.png]]
console.log kore dekha gelo ekta empty object. Othocho `shake.name` correct output dicche. Eta tahole kibhabe hocche. Ektu aagei bollam eta object er prototype use kore.
![[Pasted image 20230413181638.png]]
object empty holeo er prototype er moddhe properties gula thie e ache.

Ekhon ekhane jodi server er moto aro kichu method thakto tahole amra obossjoi chai na ebhabe individually `method` gulo property hishebe assign korte. Er jonne amra **Object.create** use korbo.
```js
function Food(name, cost) {
  let food = Object.create(method);
  food.name = name;
  food.cost = cost;

  return food;
}

let method = {
  serve: function () {
    console.log(this.name, "is being served");
  },
};

let pizza = Food("pepperoni", 15);
let momos = Food("chicken momo", 20);

console.dir(pizza);
console.dir(momos);
```

![[Pasted image 20230412181440.png]]

Notice that `server` method ta ekhon ar object er part na, eta ekhon `prototyper` er moddhe chole geche. Ei way te joto khushi toto method create kora jabe ja prototype er moddhe thakbe.

object.create giving blank object but can access properties. It inherits from parent object

```js
let personMethods = {
  code: function () {
    console.log("person is coding");
  },
  debug: function () {
    console.log("person is debugging");
  },
};

function Person(name, age) {
  let person = Object.create(personMethods);

  person.name = name;
  person.age = age;

  return person;
}

const jonas = Person("jonas", 30);
const jack = Person("jack", 28);

console.dir(jonas);
jonas.code();
```

a better way is to use prototype. Prototype is a property of any function that points to an object.

```js
function test() {}
console.dir(test);
```

```js
function Person(name, age) {
  let person = Object.create(Person.prototype);
  (person.name = name), (person.age = age);

  return person;
}

Person.prototype = {
  code() {
    console.log("coding");
  },
  debug() {
    console.log("debugging");
  },
};

let jonas = Person("jonas", 30);
jonas.code();
```

new keyword

```js
function Person(name, age) {
  // let this = Object.create(Person.prototype)

  this.name = name;
  this.age = age;

  // return this
}

Person.prototype = {
  code() {
    console.log("coding");
  },
  debug() {
    console.log("debugging");
  },
};

let jonas = new Person("jonas", 30);

jonas.code();
```

We have already stated that everything is object in js. In javascript `array` is also object. Lets try to understand this how does it work.

```js
function List() {
  this.len = 0;
  Object.defineProperty(this, "len", {
    enumerable: false,
  });
}

List.prototype = {
  push(value) {
    this[this.len] = value;
    this.len++;
  },
};

const list = new List();

list.push("mercedes");
list.push("ferrari");
list.push("mclaren");

for (let i = 0; i < list.len; i++) {
  console.log(list[i]); // mercedes, ferrari, mclaren
}

console.dir(list);
```

![[Pasted image 20230406222832.png]]

notice `len` is little bit off color. Because we have defined this property as non-enumerable. That mean if we enumerate through `list` object then we wont get `len`

```js
for (let prop in list) {
  console.log(prop);
}
```

```
0
1
2
push
```

## Es6 classes

JavaScript introduced class in ES6(2015). Under the hood it uses prototype. Its just a syntax that mimic other object oriented language.

lets replicate one of prototype example with classes.

```js
function Car(brand, model) {
  this.brand = brand;
  this.model = model;
}

Car.prototype = {
  start() {
    console.log(`${this.model} burning fuel`);
  },
  stop() {
    console.log(`${this.model} push break`);
  },
};

let meredes = new Car("mercedes", "benz S");
let pagani = new Car("pagani", "huayra");

meredes.start(); // benz S burning fuel
pagani.stop(); // huayra push break

console.dir(pagani);
```

![[Pasted image 20230406223013.png]]

now lets take a look how we can convert this constructor function to es6 classes.

```js
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  start() {
    console.log(`${this.model} burning fuel`);
  }

  stop() {
    console.log(`${this.model} push break`);
  }
}

let bugatti = new Car("bugatti", "veron");

bugatti.start(); // veron burning fuel
console.dir(bugatti);
```

![[Pasted image 20230406223101.png]]