<h1 align="center">Callback</h1>

_Call me back when you are prepared_

## What is a Callback Function?

As I said earlier function are basically object. All the operation we just did above with object can be done with a functions as well.

see the example below -

```js
function makeFood(foodName) {
  console.log("making", foodName);
}

let makePizza = makeFood;

function eatPizza(make_pizza) {
  make_pizza("pizza");
  console.log("will eat pizza");
}

eatPizza(makePizza);
```

<details>
  <summary>click to toggle output</summary>

```
output:
making pizza
will eat pizza
```

</details>

> takeout

created a function `makeFood` that takes one argument. Reassignning this function to `makePizza` variable. Now both `makeFood` and `makePizza` points to the same memory location in stack. Created another function named `eatPizza`. Here is the thing, `eatPizza` takes a function in its parameter. In this case it is `makePizza`. And `makePizza` is the **callback** function which is getting called by `eatPizza`

now lets see a use case of callback -
suppose you have ordered a pizza. for that you have a `getPizza` function which take `payment` as argument.

```js
function getPizza(paid = false) {
  if (paid) return "12 inch pizza default decoration";
}

let pizza = getPizza(true);
console.log(pizza); // 12 inch pizza default decoration
```

you got the pizza. but you actually did not like how they customized it with optional ingredients. so, you want the control over customization or decoration.

```js
function getPizza(paid = false, callback_customize) {
  if (paid) return callback_customize("sauce", "cheese", "spice");
}

function myCustomize(item1, item2, item3) {
  return `pizza with lots of ${item2} on top of ${item1} and add some ${item3}`;
}

let pizza = getPizza(true, myCustomize);
console.log(pizza); // pizza with lots of cheese on top of sauce and add some spice
```

you have your own `customize` function that helps you to customize the pizza as you want with the optional items they provide. while ordering the pizza that's mean calling the `getPizza` function you pass the `customize` function with it, so that they can call your `customize` function back for further customization as the pizza gets ready.

to summarize things, you don't know how the pizza will be made. functionality of `getPizza` is not your concern, but you have control over how it will be customized after. and here, `customize` is known as `callback` function.It can also be passed as antonymous function.

```js
let pizza = getPizza(true, function (item1, item2, item3) {
  return `use lots of ${item1} on top of ${item2} and pack ${item3}`;
});
```

```js
button.addEventListener("onclick", function () {
  // do something
});
```

as the click event happens the interpreter will execute the callback function. How event is happening is not our concern but what to do when the event get triggered we can define it.

## Asynchronous callback

imagine you are fetching some data from a data base. Fetch operation may take some time to response. Reason could be anything, internet connection or slow database. Remember JS interpreter executes code top to bottom in a synchronous manner (one after another). If fetch was a synchronous operation you won't get any data. Because it could not have waited for the response. As a result will get `undefined` every time. see the example below.

```js
// api call
function getWeather() {
  setTimeout(function () {
    return "sunny";
  });
}

function printWeather() {
  const weather = getWeather();
  console.log(weather);
}

printWeather();
```

as `getWeather` is trying to fetch data calling an api. And it is an async task.
`printWeather` gets the value `undefined` because `getWeather` function
did not return any response yet. `printWeather` for being a sync function it is getting called by interpreter before the database even sends any response.

> _btw we are using `setTimeOut` function to imitate the real fetch operation_

```js
function getWeather() {
  setTimeout(() => {
    printWeather("sunny");
  }, 0);
}

function printWeather(data) {
  console.log(data);
}

getWeather();
```

so, how can we get weather data then? we can put `printWeather` function inside the async `getWeather` function, it will work. But we don't want to clutter the `getWeather` function with any kind of fixed operation like `printWeather`. that's where the callback comes into place.

## fix with callback

```js
function getWeather(callback) {
  setTimeout(function () {
    callback("sunny");
  });
}

function printWeather(data) {
  console.log(data);
}

function printEmoji(data) {
  switch (data) {
    case "sunny":
      console.log("☀️");
      break;
    case "cloudy":
      console.log("🌧️");
      break;
    default:
      console.log("no emoji found");
  }
}
getWeather(printEmoji);
```

`getWeather` function takes a callback. But It has no concern about what the callback will do with the data. so, we can pass different types of function. like `printEmoji` or `printWeather` whatever we want to.

## callback hell

with callback there is a huge problem known as callback hell. see the example below-
suppose we have a database name `articleBase`. multiple articles are stored in this database.

```js
const articleBase = {
  // articles database
  name: "what is callback",
  id: 20,
  writer: "sam",
};

const writerBase = {
  // writers database
  name: "sam",
  age: 30,
  email: "sam@something.com",
  designation: "web developer",
};

function getArticle(id, callback) {
  // article api call
  setTimeout(function () {
    if (id === articleBase.id) callback(articleBase);
  }, 2000);
}

function printArticle(data) {
  console.log(data);
}

getArticle(20, printArticle);
```

`output: { name: 'what is callback', id: 20, writer: 'sam' }`

`getArticle` function takes `id` of article to be retrieved from the database as first parameter. and a callback function as second parameter. till this point everything seems fine as previous weather example. it prints the article as expected.

suppose we want to find the information of the writer from the article we have from previous api call. we can get it using the output we have got from api call.

`writer: sam` see the output above

```js
function getWriter(writerName, callback) {
  // writer api call
  setTimeout(function () {
    if (writerName === writerBase.name) callback(writerBase);
  }, 2000);
}

function printWriter(data) {
  console.log(data);
}
getWriter("sam", printWriter);
```

ok..so we want to find the information of `sam`. but the prblm is sam is hardcoded here. we should have passed the `articleBase.writer` which basically means `sam`. we could have done that if have stored the `article` object somewhere in global scope. lets try this.

```js
let article = {};
function printArticle(data) {
  article = data;
  console.log(data);
}
```

we stored in global variable before printing the article. lets pass the name to get writer's information. it should work.

```js
getWriter(article.writer, printWriter);
```

however it did not work. the reason is again we can't actually store the data we get from api call. here the global variable `article` remains empty. which means `article.writer` is `undefined`. the solution is chainning api call. calling the `getWriter` api just after the `getArticle` api call. we can do that inside `printArticle` function

whole code below-

```js
const articleBase = {
  name: "what is callback",
  id: 20,
  writer: "sam",
};

const writerBase = {
  name: "sam",
  age: 30,
  email: "sam@something.com",
  designation: "web developer",
};

function getArticle(id, callback) {
  setTimeout(function () {
    if (id === articleBase.id) callback(articleBase);
  }, 2000);
}

function printArticle(data) {
  console.log(data);
  getWriter(data.writer, printWriter);
}

function getWriter(writerName, callback) {
  setTimeout(function () {
    if (writerName === writerBase.name) callback(writerBase);
  }, 2000);
}

function printWriter(data) {
  console.log(data);
}

getArticle(20, printArticle);
```

<details>
  <summary>click to toggle output</summary>

```output:
{ name: 'what is callback', id: 20, writer: 'sam' }
{ name: 'sam',
  age: 30,
  email: 'sam@something.com',
  designation: 'web developer'
}
```

</details>

lets simplify the codes using anonymous callback function

```js
const articleBase = {
  name: "what is callback",
  id: 20,
  writer: "sam",
};

const writerBase = {
  name: "sam",
  age: 30,
  email: "sam@something.com",
  designation: "web developer",
};

function getArticle(id, callback) {
  setTimeout(function () {
    if (id === articleBase.id) callback(articleBase);
  }, 2000);
}

function getWriter(writerName, callback) {
  setTimeout(function () {
    if (writerName === writerBase.name) callback(writerBase);
  }, 2000);
}

getArticle(20, function (data) {
  console.log(data);
  getWriter(data.writer, function (data) {
    console.log(data);
  });
});
```

we can see both of the api call takes callback function in second parameter. here we passing anonynous callback function instead of expicitly writing `print` functions then passing it. this nested api calling is forming a chain. imagine more api calls like -

```
getArticle(20, function (data) {
  console.log(data);
  getWriter(data.writer, function (data) {
    console.log(data);
    getSomethingElse(data.someValue, function (data) {
      console.log(data);
      andSomethingElse(data.otherValue, function (data) {
        console.log(data);
    });
    });
  });
});
```

and this one after another chainning is known as callback hell or `pyramid of the doom`. which is lot harder to maintain and debug.

[next topic (promises) >>](https://github.com/sabbir-dcy/core-concepts/tree/main/Javascript/promise)
