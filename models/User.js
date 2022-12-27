import bcrypt from "bcrypt";
import sequelize from "./Connection.js";
import { Sequelize, DataTypes } from "sequelize";
const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
User.sync({ alter: false }).then(() => {
  console.log("User re-sync done!\n\n");
});

export default User;
