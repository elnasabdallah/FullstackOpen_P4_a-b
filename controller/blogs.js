const blogsRouter = require("express").Router();

const Blog = require("../models/blogs");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    //if title or url is missing return bad request
    return response.status(400).send();
  }
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  const obj = await Blog.findById(request.params.id);
  if (!obj) {
    return response.status(400).send({ message: "Invalid id" });
  }
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).send();
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedPost = request.body;
  const result = await Blog.findByIdAndUpdate(request.params.id, updatedPost, {
    new: true,
  });
  response.status(204).json(result);
});

module.exports = blogsRouter;
