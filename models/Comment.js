import sequelize from "./Connection.js";
import { DataTypes } from "sequelize";

export const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  }
);
Comment.sync({ alter: false }).then(() => {
  console.log("yes re-sync done!");
});

// module.exports = Comment;
export default Comment;
