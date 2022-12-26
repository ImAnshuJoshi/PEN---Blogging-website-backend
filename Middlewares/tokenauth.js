import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.token;
    if (!token) {
      //if no token is present
      throw new { error: "User not Signed in, Sign in First." }();
    }
    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        //If some error occurs
        res.status(400).json({
          error: "Blog cannot be created, Error while signing in!",
        });
      } else {
        console.log(decoded);
      }
    });
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "A Miscellaneous error occurred while signing in!",
    });
  }
};

export default auth;
