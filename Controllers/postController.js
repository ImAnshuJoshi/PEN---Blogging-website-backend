import db from "../Config/dbconfig.js";

export const getBlog = async (req, res, next) => {
  try {
    const blog = await db.blog.findOne({
      where: { id: req.params.id },
    });
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(400).json({
        error: "No blog Found!",
      });
    }
  } catch (e) {
    console.log(e);
    res.send(400).json(e);
  }
};
export const getfilteredBlog = async (req, res, next) => {
  try {
    let Allblogs = await db.blog.findAll({ where: {} });
    let textSearchedblogs;
    if (req.query.textSearch) {
      textSearchedblogs = Allblogs.filter((blog) => {
        return (
          blog.title
            .toLowerCase()
            .includes(req.query.textSearch.toLowerCase()) ||
          blog.content
            .toLowerCase()
            .includes(req.query.textSearch.toLowerCase()) ||
          blog.keywords
            .toLowerCase()
            .includes(req.query.textSearch.toLowerCase()) ||
          blog.category
            .toLowerCase()
            .includes(req.query.textSearch.toLowerCase())
        );
      });
    }
    let filteredblogs = textSearchedblogs.filter((user) => {
      let isValid = true;
      for (var key in req.query) {
        if (key == "limit" || key == "textSearch") {
          continue;
        }
        isValid = isValid && user[key] == req.query[key];
      }
      return isValid;
    });
    let paginatedBlogs;
    if (req.query.limit) {
      paginatedBlogs = filteredblogs.slice(0, req.query.limit);
    } else {
      paginatedBlogs = filteredblogs;
    }
    let sortedBlogs = paginatedBlogs.sort((a, b) => {
      if (b.likes - a.likes == 0) {
        if (b.comments - a.comments == 0) {
          return b.createdAt - a.createdAt;
        }
        return b.comments - a.comments;
      }
      return b.likes - a.likes;
    });
    res.status(200).json(sortedBlogs);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: "Database error occurred!",
    });
  }
  // try {
  // console.log(req.query);
  // const blogs = await db.blog.findAll({ where: {} });
  // console.log(blogs);
  // if (!blogs) {
  //   res.status(400).json({
  //     error: "No blogs Found",
  //   });
  // }
  // console.log(blogs);
  // const filteredblogs = blogs.filter((user) => {
  //   let isValid = true;
  //   for (key in filters) {
  //     console.log(key, user[key], filters[key]);
  //     isValid = isValid && user[key] == filters[key];
  //   }
  //   return isValid;
  // });

  // //filter and sort by likes, comments, createdAt
  // console.log(filteredblogs);
  // res.status(200).json(
  //   blogs.sort((a, b) => {
  //     b.likes - a.likes;
  //     if (b.likes - a.likes == 0) {
  //       b.comments - a.comments;
  //       if (b.comments - a.comments == 0) {
  //         b.createdAt - a.createdAt;
  //       }
  //     }
  //   })
  // );
  // res.status(200).send(blogs);
  // } catch (e) {
  //   console.log(e);
  //   res.status(400).json(e);
  // }
};
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, keywords, category } = req.body;
    if (!title || !content || !keywords || !category)
      throw new Error("Please fill all entries!!");
    const user = await db.user.findOne({ where: { id: req.query.id } });
    if (!user) {
      res.status(400).json({
        error: "No user Found!",
      });
    }
    const blog = await db.blog.create({
      title,
      content,
      keywords,
      category,
      WriterId: req.query.id,
    });
    if (blog) {
      await user.addPost(blog);
      res.status(200).json({
        blog,
        message: "Blog has been created!",
      });
    } else {
      res.status(400).json({
        message: "Blog already exists",
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};
export const updateBlog = async (req, res, err) => {
  try {
    // let {title,content,keywords}=req.body;
    const updatedBlog = await db.blog.update(
      {
        title: req.body.title,
        content: req.body.content,
        keywords: req.body.keywords,
      },
      { where: { id: req.params.id } }
    );
    res.status(200).json({ updatedBlog, message: "Blog has been updated!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
export const deleteBlog = async (req, res, err) => {
  try {
    const deletedBlog = await db.blog.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ deletedBlog, message: "Blog has been deleted!" });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
