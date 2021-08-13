const userRouter = require("../controller/users");
const Blogs = require("../models/blogs");
const Users = require("./../models/users");

const initialBlogs = [
  {
    title: "Node is fun",
    author: "Nasir",
    url: "http://check.com",
    likes: 10,
  },
  {
    title: "I love  react",
    author: "Aminu",
    url: "http://check.com",
    likes: 14,
  },
  {
    title: "Dev life is boring",
    author: "Isa ",
    url: "http://check.com",
    likes: 11,
  },
];
const blogsInDb = async () => {
  const blogs = await Blogs.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDB = async () => {
  const users = await Users.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDB,
};
