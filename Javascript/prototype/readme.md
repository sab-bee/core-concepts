```js
function Person(name, age) {
  let person = {};

  person.name = name;
  person.age = age;

  person.code = function () {
    console.log("person is coding");
  };

  person.debug = function () {
    console.log("person is debugging");
  };

  return person;
}

const jonas = Person("jonas", 30);
const jack = Person("jack", 28);

console.dir(jonas);

```

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
  let person = {};

  person.name = name;
  person.age = age;
  person.code = personMethods.code;
  person.debug = personMethods.debug;

  return person;
}

const jonas = Person("jonas", 30);
const jack = Person("jack", 28);

console.dir(jonas);
```

```js

let captain = {
  name: "messi",
  age: "40",
  country: "argentina",
};

const player = Object.create(captain);
console.log(player.name)

```

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
jonas.code()

```
a better way is to use prototype. Prototype is a property of any function that points to an object.

```js
function test() {

}
console.dir(test)
```

```js
function Person(name, age) {
  let person = Object.create(Person.prototype);
  (person.name = name), (person.age = age);

  return person
}

Person.prototype = {
  code() {
    console.log('coding')
  },
  debug() {
    console.log('debugging')
  }
}

let jonas = Person('jonas', 30)
jonas.code()
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

class

```js
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  code() {
    console.log("coding");
  }
  debug() {
    console.log("debugging");
  }
}

let jonas = new Student('jonas', 30)

console.log(jonas)
```

custom array object

```js
function Arr() {
  let arr = Object.create(Arr.prototype);
  arr.len = 0;

  Object.defineProperty(Arr.prototype, "push", {
    enumerable: false,
  });
  Object.defineProperty(arr, "len", {
    enumerable: false,
  });
  
  return arr;
}

Arr.prototype = {
  push: function (val) {
    arr[arr.len++] = val;
  },
};

let arr = Arr();

arr.push("jonas");
arr.push("jacob");
arr.push("noah");

for (prop in arr) {
  console.log(arr[prop]);
}

for (let i = 0; i < arr.len; i++) {
  console.log(arr[i]);
}

console.dir(arr);
```