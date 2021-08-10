const mongoose = require("mongoose");
const superTest = require("supertest");
const app = require("../app");
const helper = require("./../utils/api_helper");
const Blogs = require("../models/blogs");

const api = superTest(app);

beforeEach(async () => {
  await Blogs.deleteMany({});

  const blogObjects = helper.initialBlogs.map(blog => new Blogs(blog));
  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});
/********************************************************/

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

/********************************************************/
test("The Unique Identifier property is name id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map(item => item["id"]); ///?????
  expect(ids).toBeDefined();
});

/********************************************************/

test("Verify that a post can be added", async () => {
  const newBlog = {
    title: "I am the most used name",
    author: "John Doe",
    url: "http://complain.ng",
    likes: 19,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsInDb = await helper.blogsInDb();

  expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);
  const title = blogsInDb.map(blog => blog.title);
  expect(title).toContain("I am the most used name");
});

/********************************************************/

test("Verify that if like is missing 0 is return", async () => {
  const newBlog = {
    title: "I am the most used name",
    author: "John Doe",
    url: "http://complain.ng",
  };

  const result = await api.post("/api/blogs").send(newBlog);

  expect(result.body.likes).toBe(0);
});
/********************************************************/

test("Verify wether url/title are missing", async () => {
  const newBlog = {
    author: "John Doe",
  };

  const result = await api.post("/api/blogs").send(newBlog);
  console.log(result);
});

/********************************************************/

test("Deleting a blog post", async () => {
  const initialBlogs = helper.initialBlogs;
  const blogsInDb = await helper.blogsInDb();

  const blogTodelete = blogsInDb[0]; //post to delete

  await api.delete(`/api/blogs/${blogTodelete.id}`).expect(204); //delete

  const dbEnd = await helper.blogsInDb(); //fetch final db

  expect(dbEnd).toHaveLength(initialBlogs.length - 1);
});

/********************************************************/

test("Updating a blog post", async () => {
  const updatedBlogPost = {
    title: "Dev life is boring",
    author: "Isa ",
    url: "http://check.com",
    likes: 18,
  };

  const blogsInDb = await helper.blogsInDb();

  const blogToUpdate = blogsInDb[0]; //post to delete

  blogToUpdate.likes = 29;

  const updated = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(204); //delete

  expect(updated.body.likes).toBe(blogToUpdate.likes);
});

afterAll(() => {
  mongoose.connection.close();
});
