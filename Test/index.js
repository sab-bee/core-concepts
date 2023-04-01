const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

const users = [
  {
    userName: "Bret",
    userId: 11,
  },
  {
    userName: "Jack",
    userId: 12,
  },
];

const posts = [
  {
    userId: 11,
    postId: 1,
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sit!",
  },
  {
    userId: 11,
    postId: 2,
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sit!",
  },
  {
    userId: 12,
    postId: 3,
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate, sit!",
  },
];

const comments = [
  {
    postId: 1,
    commenterId: 12,
    body: "this is a comment",
  },
  {
    postId: 2,
    commenterId: 12,
    body: "this is a comment",
  },
  {
    postId: 3,
    commenterId: 13,
    body: "this is a comment",
  },
];

app.get("/users", (req, res) => {
  const userName = req.query.userName;
  const filteredUser = users.filter((user) => user.userName === userName);
  res.json(filteredUser);
});

app.get("/posts", (req, res) => {
  const userId = req.query.userId;
  const filteredPost = posts.filter((post) => post.userId === Number(userId));
  res.json(filteredPost);
});

app.get("/comments", (req, res) => {
  const postId = req.query.postId;
  const filteredComment = comments.filter(
    (comment) => comment.postId === Number(postId)
  );
  res.json(filteredComment);
});

app.listen(port, () => console.log("listening to port", port));
