<h1 align="center">Async-await</h1>

**_Until and unless you give me the data I won't go to next step_**

## What is an sync system?

in a synchronous system all the operation are synchronized. one will be exected after another. lets consider below code as data that are stored in a nosql database.

```js
const userDb = [
  {
    id: 001,
    name: "jonas",
    email: "jonas@gmail.com",
    age: 20,
    posts: [836561, 981630, 186751],
  },
  {
    id: 002,
    name: "andrew",
    email: "andrew@gmail.com",
    age: 22,
    posts: [868675],
  },
  {
    id: 003,
    name: "caleb",
    email: "caleb@gmail.com",
    age: 25,
    posts: [391648],
  },
];

const postDb = [
  {
    userId: 001,
    id: 836561,
    title: "cloud",
    body: "could computing is future",
  },
  {
    userId: 001,
    id: 981630,
    title: "python",
    body: "i love python",
  },
  {
    userId: 001,
    id: 186751,
    title: "aws",
    body: "has best cloud server",
  },
  {
    userId: 002,
    id: 868675,
    title: "next js",
    body: "replace react js",
  },
  {
    userId: 003,
    id: 391648,
    title: "bun",
    body: "next gen run time",
  },
];
```

now lets write some backend code to find user and post using email and id.

```js
function get_user(email) {
  const user = userDb.find((user) => user.email === email);
  return user;
}

function get_post(id) {
  const post = postDb.find((post) => post.id === id);
  return post;
}
```

And this is the front end code for fetching data from backend.

```js
const user = get_user("jonas@gmail.com");
const post = get_post(user.posts[1]);

console.log(user);
```

<details>
  <summary>click to toggle output</summary>

```
{
  "id": 1,
  "name": "jonas",
  "email": "jonas@gmail.com",
  "age": 20,
  "posts": [
      836561,
      981630,
      186751
  ]
}
```

</details>

```js
console.log(post);
```

<details>
  <summary>click to toggle output</summary>

```
{
    "userId": 1,
    "id": 981630,
    "title": "python",
    "body": "i love python"
}
```

</details>

this code is clearly `synchronous`. but working with database is not `syncronous`. lets first make the backend code **Asynchronous**

```js
function get_user(email) {
  setTimeout(() => {
    const user = userDb.find((user) => user.email === email);
    return user;
  }, 5);
}

function get_post(id) {
  setTimeout(() => {
    const post = postDb.find((post) => post.id === id);
    return post;
  }, 2);
}
```

`setTimeout` is a built in **asynchronous** function which let us set a timer. purpose of using this function here is to replicate async functionality of backend.

```js
const user = get_user("jonas@gmail.com");
console.log(user); // undefined */
```

why undefined? as mentioned data fetching is not sychronous(one after another). js compiler runs the code one after another, but data fetching required some time before you get the data from backend. in our case js compiler did not wait for the data to come from backend.

### **Fix the problem using callback**

simple point is that, data send by the backend can't be stored in variable. a way around is to pass a callback to `get_user` function.

```js
function get_user(email, callback) {
  setTimeout(() => {
    const user = userDb.find((user) => user.email === email);
    callback(user);
  }, 5);
}

function get_post(id, callback) {
  setTimeout(() => {
    const post = postDb.find((post) => post.id === id);
    callback(post);
  }, 2);
}
```

each backend function takes extra argument which is a **callback** function. when the data is ready it sends the data in callback function's parameter.

```js
get_user("jonas@gmail.com", function (user) {
  console.log(user);
});
```

<details>
  <summary>click to toggle output</summary>

```
{
  "id": 1,
  "name": "jonas",
  "email": "jonas@gmail.com",
  "age": 20,
  "posts": [
      836561,
      981630,
      186751
  ]
}
```

</details>

now question is if the data wich is `user` here can't be stored how can we then get post (`get_post` function required `postid`). we can chain, that mean call `get_post` inside the callback function has been passed to `get_user`

```js
get_user("jonas@gmail.com", (user) => {
  get_post(user.posts[0], (post) => console.log(post));
});
```

<details>
  <summary>click to toggle output</summary>

```
{
    "userId": 1,
    "id": 981630,
    "title": "python",
    "body": "i love python"
}
```

</details>

### **callback hell**

suppost there are hundreds of api call that required previous value. then it will create a phenomenon known as **callback hell**

```
get_user("jonas@gmail.com", (user) => {
  get_post(user.posts[0], (post) => {
    get_comment({
      get_commenter({
        get_user({
          get_post({
            ...
          })
        })
      })
    })
  });
});
```

like we can get post from user, comment from that post, the commenter, user info of commenter, also post of that commenter. this downward structure is known as **callback hell** or **pyramid of doom**. for complex application this is pain in the ass to maintain code base and understand code.

### **promise ....then**

to solve readability issue promise comes in handy.
`promise` is a built in js object whats functionality is also built upon callbacks.

```js
function get_user(email) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = userDb.find((user) => user.email === email);
      resolve(user);
    }, 5);
  });
}

function get_post(id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const post = postDb.find((post) => post.id === id);
      res(post);
    }, 2);
  });
}
```

instead of taking callbacks this time backend function are returning promise. Like, `get_user` saying, I am doing a `promise` that as soon as I get the data from database I will send the data, `then` you can do whatever the f\*\*\* you want.

```js
console.log(get_user("jonas@gmail.com"));
```

```
output:
> Promise {<pending>}
```

`get_user` returns a promise which is pending. That mean you did'nt do anything with the promise yet. Using `then` method call you can get the data.

```js
const userPromise = get_user("jonas@gmail.com");
userPromise.then((user) => console.log(user));
```

<details>
  <summary>click to toggle output</summary>

```
{
    "id": 1,
    "name": "jonas",
    "email": "jonas@gmail.com",
    "age": 20,
    "posts": [
        836561,
        981630,
        186751
    ]
}
```

</details>

lets see how chaining will work in terms of promise in order to get post.

```js
get_user("jonas@gmail.com")
  .then((user) => {
    return get_post(user.posts[0]);
  })
  .then((post) => console.log(post));
```

<details>
  <summary>click to toggle output</summary>
  
```
{
    "userId": 1,
    "id": 836561,
    "title": "cloud",
    "body": "could computing is future"
}
```

</details>

as per arrow function we can remove braces and return keyword. now it has more readability than callback hell.

```js
get_user("jonas@gmail.com")
  .then((user) => get_post(user.posts[0]))
  .then((post) => console.log(post));
```

> Takeaway:

get_user returns a promise from backend which status is `pending` initially. Then it will be either get `resolved` or `rejected`. `then` is a method of `Promise` object. calling this method we can get resolved data. `then` takes a callback function that returns another promise once the current data(user) gets resolved. And the second `then` used for resolving next data(post)

`then` method can take two arguments in its parameter. see the example below-

```js
let bool = true;

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (bool) resolve([1, 2, 3]);
    else reject("an error occured");
  });
});

function isFullfiled(data) {
  console.log(data);
}
function isRejected(error) {
  console.log(error);
}

promise.then(isFullfiled, isRejected);
```

```
output:
[
    1,
    2,
    3
]
```

> Takeaway:

changing `bool` to false results `an error occured`. In short, for resolved, promise `then` method calls first argument function and for rejected promise calls second argument function.

**Error Handle**

Second callback function that `then` takes can be used as error handler or by convention we can use `catch`

```js
promise.then(isFullfiled).catch((error) => {
  console.log(error);
});
```

just like `then` also `catch` takes a callback function to pass error message.

```
get_user("jonas@gmail.com")
  .then((user) => get_post(user.posts[0]))
  .then((post) => get_comment());
  .then((comment) => get_commenter())
  .then((commenter) => get_user())
  .then((user) => get_post())
  .then((post) => ....)
```

Though its more convenient structure some may call it a `promise hell`. Then our last method comes into place **aync-await**

## **Async-await**

Remember the first example where we pretended api call as **synchronous** action and the code was at is best structure where we could store the data inside a variable.

```
const user = get_user("jonas@gmail.com");
const post = get_post(user.posts[1]);
```

Unfortunalely api call is not **synchronous**. But this structure is achieveable with `await`.
just put `await` keyword before the api function and wrap the code with a **asynchronous** function scope. example below-

```js
async function getData() {
  const user = await get_user("jonas@gmail.com");
  const post = await get_post(user.posts[1]);
  console.log(post);
}

getData();
```

<details>
  <summary>click to toggle output</summary>
  
```
{
    "userId": 1,
    "id": 981630,
    "title": "python",
    "body": "i love python"
}
```

</details>

if you feel like an extra function call is annoying use IEFE

```js
(async function () {
  const user = await get_user("jonas@gmail.com");
  const post = await get_post(user.posts[1]);
  console.log(post);
})();
```
