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
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, keywords } = req.body;
    if (!title || !content || !keywords)
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
