***You have promised me you would do that, then I will do this***

## promise
imagine you went to iMax to watch newly released film `avatar: way of water`

```js
function ticket() {
  return "avatar: way of water";
}

function watchMovie() {
  console.log("watching", ticket());
}

watchMovie(); // watching avatar: way of water
```

ok thats fine. you bought a ticket for morning show. that ticket returns the movie. and u watched the movie.
some time there might be a case where no seat available for morning show and the cashier promises you that if you come back later at evening u will sure get ticket for evening show.

```js
function ticket(paid = false) {
  return new Promise(function (resolve, reject) {
    if (paid) resolve("avatar: way of water");
  });
}

console.log(ticket()); // Promise {<pending>}
```

so u get a pending promise for evening show ticket. if u go back at evening again and pay for the ticket he will keep his promise of giving u a ticket for the show.

```js
function watchMovie() {
  ticket(true).then(function (movie) {
    console.log("watching", movie);
  });
}

watchMovie(); // watching avatar: way of water
```

before jumping into more realistic example with promise lets recall the callback hell we learned in callback lecture.

```js
const post = {
  title: "first post",
  postId: 1001,
  userId: "user001",
};

const user = {
  name: "lucas",
  email: "lucas@proton.me",
  age: 20,
  userId: "user001",
};

function getPost(postId, callback) {
  setTimeout(function () {
    if (postId === post.postId) {
      callback(post);
    }
  }, 500);
}

function getUser(userId, callback) {
  setTimeout(function () {
    if (userId === user.userId) {
      callback(user);
    }
  }, 500);
}

getPost(1001, function (post) {
  getUser(post.userId, function (user) {
    console.log(user);
  });
});
```

output :

```
{
    "name": "lucas",
    "email": "lucas@proton.me",
    "age": 20,
    "userId": "user001"
}
```

so, its creating a callback hell. which we don't like. let's see if `promise` makes any difference.

```js
function getPost(postId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (postId === post.postId) {
        resolve(post);
      }
    }, 500);
  });
}

function getUser(userId) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (userId === user.userId) {
        resolve(user);
      }
    }, 500);
  });
}

getPost(1001)
  .then(function (post) {
    return getUser(post.userId);
  })
  .then(function (user) {
    console.log(user);
  });
```

not much but it is little bit convinient. here both `getPost` and `getUser` returns promises. in this lines code `getPost` returns a `new promise object` . we are accessing the `then` function of this new pomise object using (.) operator. the `then` function takes a `callback` function which returning aother `new promise object` returned via `getUser` function

```
getPost(1001)
  .then(function (post) {
    return getUser(post.userId);
  })
```

and the last accessed `then` function is basically a function of latest `promise object` we have just got.

```
getPost(1001)
  .then(function (post) {
    return getUser(post.userId);
  })
  .then(function (user) {
    console.log(user);
  });
```

instead of returning the new promise object (one that got return by `getUser`) we can directly pass the `getUser` function as callback. look at the changes we make inside `getUser` function and first `.then`

```js
function getPost(postId) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (postId === post.postId) {
        resolve(post);
      }
    }, 500);
  });
}

function getUser(post) {
  // change here in argument
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      if (post.userId === user.userId) {
        // change here [post.userId]
        resolve(user);
      }
    }, 500);
  });
}

getPost(1001)
  .then(getUser) // change here
  .then(function (user) {
    console.log(user);
  });
```

instead of passing an anonymous callback function (which returns a promise eventually) we can directly pass the `getUser` as a callback function which will later get `post` in its parameter by the `then` function.

## promise implementation

promise is nothing but some structural implementation of callback functions. lets say we want to make our own promise object. we can name our `constructor` function is `Assure`

### step-1

```js
function Assure() {
  this.after = function () {
    console.log("similar to then");
  };
}

const assure = new Assure();
assure.after(); // similar to then
```

### step-2

```js
function Assure(data) {
  this.after = function () {
    console.log(data);
  };
}

const assure = new Assure("some data");
assure.after(); // some data
```

### step-3

```js
function Assure(data) {
  this.after = function (cb) {
    cb(data);
  };
}

const assure = new Assure("data through callback");
assure.after(function (data) {
  console.log(data); // data through callback"
});
```

### step-4

```js
function Assure(callback) {
  callback(function (data) {
    console.log(data); // callback in constructor
  });
  this.after = function (cb) {
    cb(data);
  };
}

const assure = new Assure(function (resolve) {
  resolve("callback in constructor");
});

assure.after(function (data) {
  console.log(data); // error for now
});
```

### step-5

```js
function Assure(callback) {
  this.after = function (cb) {
    callback(function (data) {
      cb(data);
    });
  };
}

const assure = new Assure(function (resolve) {
  resolve("callback in constructor");
});

assure.after(function (data) {
  console.log(data); //callback in constructor
});
```

## step-6

```js
function Assure(callback) {
  let obj = {};
  this.after = function (cb) {
    callback(function (data) {
      obj = cb(data);
    });
    return obj;
  };
}

const assure = new Assure(function (resolve) {
  resolve("callback in constructors");
});
const obj = assure.after(function (data) {
  console.log(data);
});
console.log(obj); // undefined
```

### step-7

```js
function Assure(callback) {
  this.after = function (cb) {
    let obj = {};
    callback(function (data) {
      obj = cb(data);
    });
    return obj;
  };
}

const assure = new Assure(function (resolve) {
  resolve("callback in constructors");
});

assure
  .after(function () {
    return new Assure(function (resolve) {
      resolve("another new assure");
    });
  })
  .after(function (data) {
    console.log(data); // another new assure
  });
```

### testing

```js
function getFirst() {
  return new Assure(function (resolve) {
    resolve("first api call");
  });
}

function getSecond(data) {
  return new Assure(function (resolve) {
    resolve(`${data} + second api call`);
  });
}
```

```js
getFirst()
  .after((data) => {
    console.log(data); // first api call
    return getSecond(data);
  })
  .after((data) => console.log(data)); // first api call + second api call

// or

getFirst()
  .after(getSecond)
  .after((data) => console.log(data)); // first api call + second api call
```

to keep it less complex we just implemented resolve function

[next topic (async-await) >>](https://github.com/sabbir-dcy/core-concepts/tree/main/Javascript/async-await)