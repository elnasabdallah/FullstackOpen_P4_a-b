const blogsRouter = require("express").Router();
const User = require("../models/users");
const Blog = require("../models/blogs");
const userAuth = require("../utils/middleware").userAuth;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", userAuth, async (request, response, next) => {
  const authUser = request.user;

  const user = await User.findById(authUser.id);

  request.body.user = user.id;
  try {
    const blog = new Blog(request.body);

    const result = await blog.save();

    user.blogs = user.blogs.concat(result._id); //adding blog id to users list of blogs
    await user.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const obj = await Blog.findById(request.params.id);
  if (!obj) {
    return response.status(400).send({ message: "Invalid id" });
  }
  const tokenUser = request.user;
  if (obj.user.toString() !== tokenUser.id.toString()) {
    return response
      .status(401)
      .send({ error: "Not authorized to delete this blog" });
  }
  const user = await User.findById(tokenUser.id);
  await Blog.findByIdAndRemove(request.params.id);
  user.blogs.splice(obj.id, 1); //remove blog id from user's list
  await user.save(); //save

  response.status(204).send();
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedPost = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedPost, {
    new: true,
  });
  response.json(result);
});

module.exports = blogsRouter;
