import express from "express";
import dotenv from "dotenv";
import Connection from "./models/Connection.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoute from "./Routes/authRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import commentRoute from "./Routes/commentRoute.js";
import likeRoute from "./Routes/likeRoute.js";
import unlikeRoute from "./Routes/unlikeRoute.js";

dotenv.config();
const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", (req, res) => {
  res.json("Hello World");
});
app.use("/api/", authRoute);
app.use("/api/posts", blogRoute);
app.use("/api/comments", commentRoute);
app.use("/api/like", likeRoute);
app.use("/api/unlike", unlikeRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  Connection;
});
