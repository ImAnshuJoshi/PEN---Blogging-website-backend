import sequelize from "./Connection.js";
import { Sequelize, DataTypes } from "sequelize";
export const Cat = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);
export const Tag = sequelize.define(
  "Tag",
  {
    b_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    c_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
  }
);
Tag.sync({ alter: true }).then(() => {
  console.log("yes re-sync done!\n\n");
});
Cat.sync({ alter: false }).then(() => {
  console.log("yes user re-sync done!\n\n");
});

// export default  Cat;
// export default Tag;
