import db from "../Config/dbconfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const register = async (req, res, next) => {
  try {
    const { username, name, password } = req.body;
    if (!username || !password || !name)
      throw new Error("Please fill all entries!!");
    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const IsUser = await db.user.findOne({ where: { username: username } });
    if (!IsUser) {
      let reguser;
      reguser = await db.user.create({
        username,
        name,
        password: hashedPassword,
      });
      if (reguser) {
        const token = jwt.sign(
          { username: reguser.username, id: reguser.id },
          process.env.JWT,
          {
            expiresIn: "10h",
          }
        );
        res.cookie("token", token);
        req.userid = reguser.id;
        res.status(200).json({
          user: reguser,
          message: "User has been signed in!",
          token: token,
        });
      } else {
        res.status(400).json({
          message: "User already exists",
        });
      }
    } else {
      res.status(400).json({
        message: "Database error",
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Please fill all entries!!");
    const user = await db.user.findOne({ where: { username: username } });
    if (!user) throw new Error("User not found!!");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password!!");
    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT,
      {
        expiresIn: "10h",
      }
    );
    res.cookie("token", token);
    req.userid = user.id;
    res.status(200).json({
      user: user,
      message: "User has been signed in!",
      token: token,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
export const getuser = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Please fill all entries!!");
    const user = await db.user.findOne({ where: { id: id } });
    if (!user) throw new Error("User not found!!");
    res.status(200).json({
      user: user,
      message: "User has been signed in!",
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
