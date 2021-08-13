const testHelper = require("../utils/blog_test_helper");

test("dummy test", () => {
  const blogs = [];
  const result = testHelper.dummy(blogs);
  expect(result).toBe(1);
});

/********************************************************/
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

describe("Total likes", () => {
  /********************************************************/

  test("totalLikes test", () => {
    const result = testHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

/********************************************************/

describe("Getting the blog with the highest likes", () => {
  test("favorite Blog", () => {
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    };
    const result = testHelper.favoriteBlog(blogs);
    expect(result).toEqual(expected);
  });
});

/********************************************************/

describe("Geting the author with the highest number of blogs", () => {
  test("Most blogs test", () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = testHelper.mostBlogs(blogs);
    expect(result).toEqual(expected);
  });
});

/********************************************************/

describe("Geting the author with the highest number of likes in all posts", () => {
  test("Most liked author test", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = testHelper.mostLikes(blogs);
    expect(result).toEqual(expected);
  });
});
