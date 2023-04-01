/**
 * inheritance in javascript
 */
function Person() {
  this.name = "jonas";
}

function Teacher() {
  Person.call(this);
  this.course = "cse425";
}

let teacher = new Teacher();
let name = teacher.name;
console.log(teacher);
console.log(name);

// another ex
function Food(name) {
  this.name = name;
}

Food.prototype.cook = function () {
  console.log("cooking", this.name);
};

function Pizza(name, cost) {
  Food.call(this, name);
  this.cost = cost;
}

Pizza.prototype = Object.create(Food.prototype);
/**
 * without inherit the prototype cant access what inside prototype,[pizza.cook() throws error] and doing this pizzas constructor will be overriden by foods constructor [console.log(Pizza.prototype.constructor)]
 * this is not a copy. its a reference
 */
Pizza.prototype.constructor = Pizza; // fix of constructor replacement

let pizza = new Pizza("pepperoni", 20);
console.log(pizza);
pizza.cook();

// Object.setPrototypeOf(Pizza.prototype, Food.prototype) this is used rarely same effect is first onesa

console.log(pizza instanceof Pizza);
console.log(pizza instanceof Food);
