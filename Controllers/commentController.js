import db from "../Config/dbconfig.js";

export const getallcomments = async (req, res, next) => {
  try {
    const comments = await db.comment.findAll();
    res.status(200).json({ comments: comments });
  } catch (err) {
    res.status(200).json(err);
  }
};
export const createComment = async (req, res, next) => {
  try {
    const { uid, bid, com } = req.body;
    const user = await db.user.findOne({ where: { id: uid } });
    const blog = await db.blog.findByPk(bid);
    const comment = await db.comment.create({ content: com });
    await blog.addComment(comment);
    await comment.setCommenter(user);
    res.status(200).json({ comment: comment });
  } catch (err) {
    res.status(200).json(err);
  }
};
export const getcomment = async (req, res, next) => {
  try {
    const comment = await db.comment.findByPk(req.params.id);
    res.status(200).json({ comment: comment });
  } catch (err) {
    res.status(200).json(err);
  }
};
export const updatecomment = async (req, res, next) => {
    try {
        const comment = await db.comment.findByPk(req.params.id);
        await comment.update({ content: req.body.content });
        res.status(200).json({ comment: comment });
    } catch (err) {
        res.status(200).json(err);
    }
}
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await db.comment.findByPk(req.params.id);
    await comment.destroy();
    res.status(200).json({ message: "comment deleted" });
  } catch (err) {
    res.status(200).json(err);
  }
};
