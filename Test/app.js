//* defining properties

// object literal
let pizza1 = {
  name: "pepperoni pizza",
  price: 560,
};

// object constructor
let pizza2 = new Object();

pizza2.name = "bbq pizza";
pizza2["price"] = 600;

console.log(pizza1);
console.log(pizza2);

//detecting properties

// wrong way
console.log("name" in pizza1); // true
console.log("toString" in pizza1); // true

// correct way
console.log(pizza1.hasOwnProperty("name")); // true
console.log(pizza1.hasOwnProperty("toString")); // false

// remove property
delete pizza2.price;
console.log(pizza2); // {"name": "bbq pizza"}

// Enumeration

for (let property in pizza1) {
  console.log("key ->", property);
  console.log("value ->", pizza1[property]);
}

/* 
  key -> price
  value -> 560
*/

// es5
let arr = Object.keys(pizza1);
console.log(arr);

/**
 * Keep in mind that not all properties are enumerable. In fact, most of the native methods on objects have their [[Enumerable] attribute set to false.
 *
 */

let pasta = {
  name: "mashroom pasta",
  price: 120,
};

console.log(pasta.propertyIsEnumerable("name"));
console.log(pasta.propertyIsEnumerable("price"));

let array = [1, 2, 3, 4];
console.log(array.propertyIsEnumerable("length"));
/**
 * length is a built in property of  Array.prototype
 * which is not enumerable thats why while traversing
 * array we dont get length property
 */

for (let key in array) {
  console.log(key);
}

// here only getting the index property

/* 
object properties and types

1. data properties -> contains value
2. accessor properties -> dont contain a value but instead define a function to call when the property is read(called a getter). Accessor properties only require either a getter or a setter, though they can have both. 
There is a special syntax to define an accessor property using an object literal
*/

let person = {
  _name: "jonas",
  get name() {
    console.log("reading name");
    return this._name;
  },
  set name(value) {
    console.log("setting name to ", value);
    this._name = value;
  },
};

console.log(person.name);

/**
 * this example defines an accessor property called name. here _name is a data property that contains actual value for the property. underscore is a common convention to indicate private property though its public in real.
 * The special keywords get and set are used before the accessor property name, followed by parentheses and a function body.
 * getter are expected to return value, and setters are tend to receive value.
 * array.length is a perfect reference
 */

// Property Attributes
// common attributes
let student = {
  name: "nick",
  age: 20,
};

// enumerable
console.log(student.propertyIsEnumerable("name"));
Object.defineProperty(student, "name", {
  enumerable: false,
});
console.log(student.propertyIsEnumerable("name"));

for (let prop in student) {
  console.log(prop); // only age
}

let len = Object.keys(student).length;
console.log(len); // 1

// configurable attributes
Object.defineProperty(student, "name", {
  configurable: false,
});

delete student.name;
console.log("name" in student); // true

/* Object.defineProperty(student, "name", {
  configurable: true, // error

  cant make non-config property to config again
}); */

// data property
let employee = {};

Object.defineProperty(employee, "name", {
  value: "jocob",
  enumerable: true,
  configurable: true,
  writable: true,
});

console.log(employee);

/**
 * value and writable is special to data property
 * accessor property dont have these two unlike it has get and set attribute
 */

// !If you try to create a property with both data and accessor attributes, you will get an error

