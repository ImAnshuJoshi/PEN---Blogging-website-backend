import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import { Cat, Tag } from "../models/Category.js";
import sequelize from "../models/Connection.js";

User.hasMany(Blog, { as: "Post" });
Blog.belongsTo(User, { as: "Writer" });

Blog.hasMany(Comment, { as: "Comment" });
Comment.belongsTo(Blog, { as: "Log" });

User.hasMany(Comment, { as: "Message" });
Comment.belongsTo(User, { as: "Commenter" });

User.belongsToMany(Blog, {
  as: "likedblog",
  foreignKey: "user_id",
  through: "Likes",
});
Blog.belongsToMany(User, {
  as: "Liker",
  foreignKey: "blog_id",
  through: "Likes",
});

Cat.belongsToMany(Blog, { 
  as: "Category" ,
  foreignKey: "cat_id",
  through:"cat_blog"
});
Blog.belongsTo(Cat, { as: "Blog" });

sequelize
  .sync({ alter: true })
  .then(() => console.log("schemas updated and resynced"));

const db = { user: User, blog: Blog, comment: Comment, cat: Cat, tag: Tag };
export default db;
