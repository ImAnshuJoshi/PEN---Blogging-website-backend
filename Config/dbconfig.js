import User from "../models/User.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
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

User.belongsToMany(Blog, {
  as: "commentedBlog",
  foreignKey: "user_id",
  through: "Comments",
}); 
Blog.belongsToMany(User, {
  as: "Commenter",
  foreignKey: "blog_id",
  through: "Comments",
});

sequelize
  .sync({ alter: true })
  .then(() => console.log("schemas updated and resynced"));

const db = { user: User, blog: Blog, comment: Comment };
export default db;
