const mongoose = require("mongoose");
const superTest = require("supertest");
const app = require("../app");
const helper = require("./../utils/api_test_helper");
const Blogs = require("../models/blogs");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const api = superTest(app);

describe("When there is inintially no one in user  database", () => {
  beforeEach(async () => {
    await Users.deleteMany({});
    const salt = 10;
    const passwordhash = await bcrypt.hash("password", salt);
    const newUser = new Users({
      name: "Nasir",
      username: "elnasbdllah",
      passwordHash: passwordhash,
    });
    await newUser.save();
  });

  /********************************************************/

  test("adding a user", async () => {
    const usersAtStart = await helper.usersInDB();

    const newUser = {
      name: "Idris Musa",
      username: "idmaye",
      password: "1234",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDB();

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map(user => user.username);
    expect(usernames).toContain(newUser.username);
  });
});
afterAll(() => {
  mongoose.connection.close();
});
