const Blogs = require("./../models/blogs");

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

module.exports = {
  initialBlogs,
  blogsInDb,
};
