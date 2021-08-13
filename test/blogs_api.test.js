const mongoose = require("mongoose");
const superTest = require("supertest");
const app = require("../app");
const helper = require("./../utils/api_test_helper");
const Blogs = require("../models/blogs");
const Users = require("../models/users");

const api = superTest(app);

beforeEach(async () => {
  await Blogs.deleteMany({});
  await Users.deleteMany({});
});
/********************************************************/

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

/********************************************************/
describe("Addin a Blog by authorized persons", () => {
  test("Verify that a post can be added if user is authorized", async () => {
    const blogsAtStart = await helper.blogsInDb();

    //user onbject
    const newUser = {
      name: "Idris Musa",
      username: "idmaye",
      password: "1234",
    };

    //adding a user
    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    //login a user to get a token before addin a blog
    const loggedInUser = await api
      .post("/api/login")
      .send({ username: newUser.username, password: newUser.password });

    //the blog object
    const newBlog = {
      title: "I am the most used name",
      author: "John Doe",
      url: "http://complain.ng",
      likes: 19,
    };

    //send a post request to save a blog. attached with an auth token from loggedin user
    const savedBlog = await api
      .post("/api/blogs")
      .set("authorization", `bearer ${loggedInUser.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1); //check if db blocks increased

    expect(savedBlog.body.user).toBe(loggedInUser.body.id); //check if the loggedin user was added to the saved blog
  });

  test("Verify that a post addition fail if user is not authorzed", async () => {
    const blogsAtStart = await helper.blogsInDb();

    //the blog object
    const newBlog = {
      title: "I am the most used name",
      author: "John Doe",
      url: "http://complain.ng",
      likes: 19,
    };

    //send a post request to save a blog. attached with a wriong token
    const savedBlog = await api
      .post("/api/blogs")
      .set("authozation", `bearer wrongAuth`)
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);
  });
});
/********************************************************/
test("The Unique Identifier property is name id", async () => {
  const response = await api.get("/api/blogs");

  const ids = response.body.map(item => item["id"]); ///?????
  expect(ids).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
