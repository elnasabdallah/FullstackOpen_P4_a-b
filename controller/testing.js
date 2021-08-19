const resetRouter = require("express").Router();
const User = require("../models/users");
const Blog = require("../models/blogs");

resetRouter.post("/reset", async (req, res) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  res.status(204).send();
});

module.exports = resetRouter;
