## promise
imagine you went to iMax to watch newly released film  `avatar: way of water` 

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

before jumping into more realistic example with promise lets recall the callback hell we learned during the api call.

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

here both `getPost` and `getUser` returns promises. in this lines code `getPost` returns a `new promise object` . we are accessing the `then` function of this new pomise object using (.) operator. the `then` function takes a `callback` function which returning aother `new promise object` returned via `getUser` function
```
getPost(1001)
  .then(function (post) {
    return getUser(post.userId);
  })
```

and the last  accessed `then` function is basically a function of latest `promise object` we have just got. 
```
getPost(1001)
  .then(function (post) {
    return getUser(post.userId);
  })
  .then(function (user) {
    console.log(user);
  });
```

## promise implementation
promise is nothing but some structural implementation of callback functions. lets we want to make our own promise object. we name it `Assure`
```js
function Assure(callback) {
  // we call after instead of then
  this.after = function (cb) {
    callback((data) => cb(data));
  };
}

const assure = new Assure(function (resolve) {
  resolve("some data");
});

assure.after((data) => {
  console.log(data);
});
```

**testing with api like fetch**
```js
const comment = {
  title: "nice dp",
  commentId: 01,
  commenter: "user002",
};

function getComments() {
  return new Assure(function (keep) {
    setTimeout(function () {
      keep(comment);
    }, 2000);
  });
}

getComments().after((data) => console.log(data));
```
output:
```
{
    "title": "nice dp",
    "commentId": 1,
    "commenter": "user002"
}
```