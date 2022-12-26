import sequelize from "./Connection.js";
import { DataTypes } from "sequelize";
const Blog = sequelize.define(
  "blogs",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    keywords: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    freezeTableName: true,
  }
);
Blog.sync({ alter: false }).then(() => {
  console.log("yes Blog schema re-sync done!");
});

export default Blog;
