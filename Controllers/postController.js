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
    console.log(req.query);
    const { keywords, category, id } = req.query;
    // keywords
    // const blogs = await db.blog.filter((user) => {
    //   let isValid = true;
    //   for (key in filters) {
    //     console.log(key, user[key], filters[key]);
    //     isValid = isValid && user[key] == filters[key];
    //   }
    //   return isValid;
    // });
    // res.send(blogs);

    //filter and sort by likes, comments, createdAt
    const blogs = await db.blog.findAll({
      
    });
    console.log(blogs);
    res.status(200).json(
      blogs.sort((a, b) => {
        b.likes - a.likes;
        if (b.likes - a.likes == 0) {
          b.comments - a.comments;
          if (b.comments - a.comments == 0) {
            b.createdAt - a.createdAt;
          }
        }
      })
    );
  } catch (e) {
    // blogs = blogs.sort((a, b) => {
    //   a.likes - b.likes;
    //   if (a.likes - b.likes == 0) {
    //     a.comments - b.comments;
    //     if (a.comments - b.comments) {
    //       a.createedAt - b.createedAt;
    //     }
    //   }
    // });
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
    //   console.log(db.blog);
    //   const filters = req.query;
    //   const filteredBlogs = db.blog.filter((blog) => {
    //     let isValid = true;
    //     for (key in filters) {
    //       console.log(key, blog.key, filters.key);
    //       isValid = isValid && blog.key == filters.key;
    //     }
    //     return isValid;
    //   });
    //   console.log(filteredBlogs);
    //   res.send(filteredBlogs);
    console.log(e);
    res.send(400).json(e);
  }
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
