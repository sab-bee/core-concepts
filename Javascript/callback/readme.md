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

as `getWeather` is calling an api. and api call is an async task
`printWeather` getting `undefined` because `getWeather` function
did not return the value yet.
btw we are using `setTimeOut` function to make it look like api call both api call and `setTimeout` are asynchronous task.

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

can be fixed by calling the `printWeather` function inside the async api call but the problem is we dont want to clutter the `getWeather` function with any kind of fixed operation like `printWeather`. thats where the callback comes into place

## callback

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

`getWeather` function gets a callback. it has no concern what the callback will do with the data from the api. so, we can pass different types of function . like `printEmoji` or `printWeather` whatever we want to.

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

`getArticle` function takes `id` of article to be retrived from the database as first parameter. and a callback function as second parameter. till this point everything seems fine as previous weather example. it prints the artcile as expected.

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

```output:
{ name: 'what is callback', id: 20, writer: 'sam' }
{ name: 'sam',
  age: 30,
  email: 'sam@something.com',
  designation: 'web developer'
}
```

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
