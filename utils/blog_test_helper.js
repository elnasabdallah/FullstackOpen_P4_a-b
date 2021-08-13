const lodash = require("lodash");

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((likes, blog) => {
    return likes + blog.likes;
  }, 0);
};

const favoriteBlog = blogs => {
  const favBlog = blogs.reduce((acc, current) =>
    acc.likes > current.likes ? acc : current
  );
  const result = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes,
  };
  return result;
};

const mostBlogs = blogs => {
  const groupedBlogs = lodash.groupBy(blogs, item => item.author);
  const groupedBlogsLength = {}; //grouped blogs by authors with lenth of associated grouped array {"nasr":3}

  for (let property in groupedBlogs) {
    groupedBlogsLength[property] = groupedBlogs[property].length;
  }
  const max = Math.max.apply(null, Object.values(groupedBlogsLength)); //return max value in the object

  //function to return key associated to a value
  function getKeyByValue(obj, max) {
    return Object.keys(obj).find(key => obj[key] === max);
  }
  const final = { author: getKeyByValue(groupedBlogsLength, max), blogs: max };
  return final;
};

const mostLikes = blogs => {
  const groupedBlogs = lodash.groupBy(blogs, item => item.author);
  const groupedBlogsLength = {}; //grouped blogs by authors with lenth of associated grouped array

  for (let property in groupedBlogs) {
    groupedBlogsLength[property] = groupedBlogs[property].reduce(
      (acc, value) => {
        return acc + value.likes;
      },
      0
    );
  }
  const max = Math.max.apply(null, Object.values(groupedBlogsLength)); //return max value in the object

  //function to return key associated to a value
  function getKeyByValue(obj, max) {
    return Object.keys(obj).find(key => obj[key] === max);
  }
  const final = { author: getKeyByValue(groupedBlogsLength, max), likes: max };
  return final;
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
