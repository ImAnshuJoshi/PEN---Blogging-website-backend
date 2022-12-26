import db from "../Config/dbconfig.js";

export const unlikeBlog = async (req, res, next) => {
  const { uid, bid } = req.body;
  try {
    const blog = await db.blog.findOne({ where: { id: bid } });
    const user = await db.user.findOne({ where: { id: uid } });
    const upblog = await db.blog.update(
      {
        likes: blog.likes - 1,
      },
      {
        where: {
          id: bid,
        },
      }
    );
    await blog.removeLiker(user);
    console.log(blog);
    res.status(200).send("Downblog");
  } catch (err) {
    res.status(200).json(err);
  }
};
