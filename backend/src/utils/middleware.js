import jwt from "jsonwebtoken";
import { models } from "../db/models/index.js";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const VerifyToken = async (req, res, next) => {

  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({
      error: true,
      msg: "Token not found"
    })
  }
  let user;
  try {

    user = jwt.verify(token, TOKEN_SECRET);
  }
  catch (err) {
    return res.status(400).json({
      error: true,
      msg: "Invalid token"
    });
  }

  try {
    user = await models.User.findById(user.id);
    if (!user) {
      return res.status(400).json({ error: true,
        msg: "User not found" });
    }

    req.user = user;
    next();
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true,
      msg: "Internal Server Error" });
  }
}

export { VerifyToken }