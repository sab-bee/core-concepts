<h1 align="center">Function</h1>

**_Functions are spectial kinda objects_**

## _function declaration vs expression_

```js
function fun() {}
```

this is function decleration. Begins with the function keyword and includes the name of the function immediately following it. The contents of the function are enclosed in braces.

```js
let fun = function () {};
```

this is function expression, which doesn’t require a name after
function. These functions are considered anonymous because the function object itself has no name. Instead, function expressions are typically referenced via a variable or property, as in this expression.

The function expression is almost identical to the function declaration except for the missing name and the semicolon at the end. Assignment expressions typically end with a semicolon, just as if you were assigning any other value. These two form of function are quite similar, they differ in terms of hoiting. Function declaration are **hoisted** to top of the context (either in gobal scope or the parent scope) when the code is executed. Thats why calling function before **defining** works fine.

```js
hey(); // hello

function hey() {
  console.log("hello");
}
```

they was javascript see the code is-

```
function hey() {
  console.log("hello");
}

hey()
```

function expression can not be hoisted because the functions can be referenced only through a variable.

```js
hey(); // ReferenceError
const hey = function () {
  console.log("hello");
};
```

## _Function as value_

functions are actually objects in JavaScript. JavaScript functions are a special type of objects, called function objects. Let us check whether I am telling you the truth or not.

```js
function foo() {}
console.log(foo instanceof Object); // true
```

Whatever can be done with object is also applicable for function.
You can assign them to variables, add them to objects, pass them
to other functions as arguments, and return them from functions. Basically, you can use a function anywhere you would use any other reference value.

```js
// assign/declaration
let pizza = {
  name: "pizza",
  price: 250,
  slice: 8,
};

// re-assign
let chickenPizza = pizza;

// adding to another object
let fastFood = {
  chickenPizza,
};

console.log(chickenPizza);
/* 
{
    "name": "pizza",
    "price": 250,
    "slice": 8
} 
*/
console.log(fastFood);
/* 
{
  "chickenPizza": {
      "name": "pizza",
      "price": 250,
      "slice": 8
    }
} 
*/

// as argument
function getPizza(fastFood) {
  return fastFood; // return as value
}
```

now lets see what we can do with functions.

```js
// declaration
function vegPizza() {
  console.log("this is my pizza");
}

// re-assign
let myPizza = vegPizza;
myPizza(); // this is my pizza

// as argument
function getPizza(myPizza) {
  return myPizza; // return as value
}

getPizza(myPizza)(); // back to back call
// -> this is my pizza
```

## _function overloading_

javascript does not support function overloading. You may heard the term `method overloading` in programming language like java. Where multiple function with same name can be differ based on their function signatures(parameter, type of parameter). JS does not have any function signature, a function can take any number of and any type of arugment. Thats why multiple function with same in a codebase the bottom one will be counted. Understand this with an example.

```js
let sayMyName = new Function("console.log('billie')");
sayMyName(); // -> billie

sayMyName = new Function("name", "console.log(name)");
sayMyName(); // -> undefined
```
here we have created a function using __Function__ constructor. That makes more sense why function is object in js. A function object includes a string which holds the actual code of the function. The code is literally just a string. Although its not recommended to create function like this. Anyway,
if it was java it would have print __billie__ again. But here `sayMyName` get reassign with new function that takes __name__ in parameter then console logs it.

## _Object method_
A function is called `method` when it belongs to an actual object. In other work when an object has property value that actually a function, the property is considered a method.

```js
let pizza = {
  name: 'chicken pizza',
  price: 250,
  bake: function () {
    console.log('bake', pizza.name)
  }
}

pizza.bake() // -> bake chicken pizza
```
here `pizza` variable is assigned an object literal. `bake` property which has a value of an anonymous function is known as `method`

in console.log we directly refering to the object itself, which creates tight coupling between the method and the object. that can be problematic if we change the name of the object. Then we have to chage the name inside console.log also. Using `this` keyword this problem can be solved. We will know more about it in object note.

[next topic (objects) >>](https://github.com/sabbir-dcy/core-concepts/tree/main/Javascript/objects)