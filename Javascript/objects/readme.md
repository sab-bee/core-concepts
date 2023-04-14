<h1 align="center">Objects</h1>

_Everyting you see here are objects_

## javascript object creation

There are 4 ways we an create object in js.

1. object literal
2. new Object
3. factory function
4. es6 class

### Object literal

Unlike java or any other object oriented programming language we dont need any class to create object in JavaScript.

```js
let pizza = {
  name: "pepperoni pizza",
  cost: 20,
  deliver: function () {
    console.log(this.name, "has deliverd");
  },
};
```

created an `pizza` object using object literal.
here, `name` `cost` `deliver` are called object **properties**. we write this properties in key value pair putting (:) colon in between. their are two ways we can access the **value**.

1. using (.) dot notation
2. using square bracket [""]

```js
console.log(pizza.name); //-> pepperoni pizza
console.log(pizza["cost"]); //-> 20
```

normally we will use (.) notation all the time. But there might some case where we need to use [""] this notation. For example -
you are given the `key` by user which should be a string.

```js
let pasta = {
  name: "veg pasta",
};

let key = "name"; // provided by user
console.log(pasta[key]); //-> veg pasta
```

### new Object

```js
let pizza = new Object();
pizza.name = "chicken pizza";
pizza.deliver = function () {
  console.log(this.name, "deliverd");
};
pizza.deliver(); //-> chicken pizza deliverd
```

### constructor function

```js
function Pizza(name, cost) {
  this.name = name;
  this.cost = cost;
  this.deliver = function () {
    console.log(this.name, "has delivered");
  };
}

let pizza = new Pizza("pepperoni", 20);

console.log(pizza.name); //--> pepperoni
```

## Object method

In each of the example there is a function `deliver`. If a function is defined inside an object its called `method`. Below code shows two different syntax of creating a methods `bake` and `deliver`.

```js
let pizza = {
  bake: function () {
    console.log("bake");
  },
  deliver() {
    console.log("cook");
  },
};
```

### working with constructor function

```js
function Food(name, cost) {
  this.name = name;
  this.cost = cost;
  this.deliver = function () {
    console.log(this.name, "has deliverd");
  };
}

let pizza = new Food("pepperoni pizza", 20);
let pasta = new Food("chicken pasta", 15);

console.log(pizza.constructor); // f: Food
```

### method reference

```js
let nachos = {
  name: "bbq nachos",
  serve() {
    console.log(this.name);
  },
};

let deliver = nachos.serve;
nachos.serve(); // bbq nachos
deliver();
```

created a `nachos` object which has properties of `name` and `serve`. `deliver` is variable that assigns `serve` function. what would be the output calling `deliver`?
calling `serve` method results the name. but calling `deliver` function prints `undefined`. Because, `deliver` points to only function(serve), not the object. that means the function that `deliver` points does not belong to nachos object rather it belongs to window/global. To make this point to `nachos` object 3 built int method can be used.

1. call
2. apply
3. bind

let understand this concept with another example

```js
const pizza = {
  name: "pepperoni pizza",
  cost: 20,
};

function bake(temp) {
  console.log(`bake the ${this.name} at ${temp} deg. cel.`);
}

bake(); // bake the undefined at undefined deg. cel.
bake.call(pizza, 100); // bake the pepperoni pizza at 100 deg. cel.
```

`call` method takes `object` as first argument which is must in order to refer to the object

```js
const cake = {
  name: "chocolate cake",
  cost: 40,
};

function toppings(item1, item2, item3) {
  console.log(item1, item2, item3);
}

toppings.apply(cake, ["cherry", "fondant", "butter Cream"]); // cherry fondant butter Cream
```

`apply` is just like `call`. Difference only in parameter. Call takes multiple arguments. Where apply takes only two arguments and second one is an `array`.
Both `call` and `apply` is used for calling the function as form of property of an perticular object. Now lets see what `bind` offeres.

```js
let momos = {
  name: "chicken momos",
  cost: 20,
};

function steam() {
  console.log(this.name, "is on steam");
}

const cook = steam.bind(momos);
cook(); // chicken momos is on steam
```

### setTimeout

```js
let person = {
  name: "shazam",
  sayMyName() {
    setTimeout(function () {
      console.log(this.name);
    }, 1);
  },
};

person.sayMyName(); // undefined
```

here, `setTimeout` is a builtin function. Which takes a callback function. As callback function does not belong to person object thus `this` referse to global/window object. Thats why output is `undefined`. But sayMyName as usual points to `person` object.

```js
let person = {
  name: "shazam",
  sayMyName() {
    let name = this.name;
    setTimeout(function () {
      console.log(name);
    }, 1);
  },
};

person.sayMyName(); // shazam
```

A quick workaround to forming a `closure` we can get the name inside `setTimeout` function. A good way to fix the issue using `bind`. Lets look at an example first.

```js
let student = {
  name: "jonas",
  sayHi() {
    console.log("hi", this.name);
  },
};

student.sayHi(); // hi jonas
```

methods are showing correct output. But an inner function of this method wont point refer to the `student` object which will cause `hi undefined` in console.

```js
let student = {
  name: "jonas",
  sayHi() {
    return function () {
      console.log("hi", this.name);
    };
  },
};

student.sayHi()(); // hi undefined
```

now lets bind the inner function with `student` object.

```js
let student = {
  name: "jonas",
  sayHi() {
    return function () {
      console.log("hi", this.name);
    }.bind(this); // <--
  },
};

student.sayHi()(); // hi jonas
```

now its giving the correct outpout. now integrate this technique to our original example.

```js
person = {
  name: "shazam",
  sayMyName() {
    setTimeout(
      function () {
        console.log(this.name);
      }.bind(this), // <-- bind
      1
    );
  },
};

person.sayMyName(); // shazam
```

If we are not confused yet lets talk about `arrow function` and `this`. Arrow function react differently with `this` compare to regular function.

```js
let person = {
  name: "jacob",
  sayMyName: () => {
    console.log(this.name);
  },
};

person.sayMyName(); // undefined
```

whats happening here? Arrow function does not have its own `this` context. It inherit that from parent scope. Since sayMyName is an arrow function it inherit `this` context from its parents which is aperantly global/window object. And this arrow function (represents `sayMyName` method) can not be _**rebinded**_. So, creating method using arrow function is not a good choice. But arrow function can be useful for the `setTimeout` example.

```js
person = {
  name: "shazam",
  sayMyName() {
    setTimeout(() => {
      console.log(this.name);
    }, 1);
  },
};

person.sayMyName(); // shazam
```

as mentioned before, `this` in arrow function is lexically scoped (inherited from parent function). Here, parent function is `sayMyName` which has `this` context. thus callback in `setTimeout`'s parameter can have `this`.

let's take a look a nested function example with `bind`

```js
let student = {
  name: "jonas",
  printName() {
    return function () {
      return function () {
        console.log(this.name);
      };
    };
  },
};

student.printName()()(); // undefined
```

fix using bind

```js
let student = {
  name: "jonas",
  printName() {
    return function () {
      return function () {
        console.log(this.name);
      }.bind(this); // <--
    }.bind(this); // <--
  },
};

student.printName()()(); // jonas
```

## prototype

```js
function Hero(name, power) {
  this.name = name;
  this.power = power;
  this.attack = function (cb) {
    cb(this.name, this.power);
  };
}

let thor = new Hero("Thor", "Thunder");
let thanos = new Hero("Thanos", "Snap");
thor.attack((name, power) => {
  console.log(name, power); // thor thunder
});

thanos.attack((name, power) => {
  console.log(name, power); // thanos snap
});
```

both of the object has same `attack` function which takes a callback. we can see that by priting the objects.

```
Hero {name: 'Thor', power: 'Thunder', attack: ƒ}
```

so its repetitive. we can take out this common property function out of the object.

```js
function Hero(name, power) {
  this.name = name;
  this.power = power;
}

Hero.prototype.attack = function (cb) {
  cb(this.name, this.power);
};

let thor = new Hero("Thor", "Thunder");
let thanos = new Hero("Thanos", "Snap");

thor.attack((name, power) => {
  console.log(name, power); // thor thunder
});

thanos.attack((name, power) => {
  console.log(name, power); // thanos snap
});

console.log(thor)
```

![[Pasted image 20230414122516.png]]
you can see the `attack` function is inside the `prototype` object. Its no longer bound with any of the instances. Rather its common in both instance through the prototype.

[next topic (callback) >>](https://github.com/sabbir-dcy/core-concepts/tree/main/Javascript/callback)
