import { models } from "../../db/models/index.js";
import { Router } from "express";
import { VerifyToken } from "../../utils/middleware.js";

const r = Router();
const { User } = models;

r.get( '/', VerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
});

export default r;