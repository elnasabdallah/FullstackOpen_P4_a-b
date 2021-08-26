const userRouter = require("express").Router();
const User = require("./../models/users");
const bcrypt = require("bcrypt");
const userAuth = require("../utils/middleware").userAuth;

userRouter.get("/", async (req, res) => {
  //populate-synonymous to join. amking function calls to get details of a ref
  const users = await User.find({}).populate("blogs", {
    url: 1,
    author: 1,
    title: 1,
  });
  res.json(users);
});

userRouter.get("/:id", userAuth, async (req, res) => {
  const authUser = req.user;
  console.log(authUser);
  const id = req.params.id;
  const user = await User.findById(id).populate("blogs", {
    url: 1,
    author: 1,
    title: 1,
  });
  res.json(user);
});

userRouter.post("/", async (req, res, next) => {
  const user = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(user.password, saltRounds);

  const newUser = new User({
    name: user.name,
    username: user.username,
    passwordHash: passwordHash,
  });

  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
