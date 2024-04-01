import bcrypt from "bcrypt";
import { Router } from "express";

import { createAccessToken, validateEmail } from "../../utils/validation.js";
import { models } from "../../db/models/index.js";


const { User } = models;

const r = Router();

r.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }


    if (password.length < 4) {
      return res.status(400).json({ msg: "Password length must be atleast 4 characters" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
})



r.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true, msg: "Need all creds.."
      });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({
      error: true, msg: "wrong email, do sign up"
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({
      error: true, msg: "wrong password!!"
    });

    const token = createAccessToken({ id: user._id });
    delete user.password;

    res.send({
      user, token, status: true, msg: "success"
    });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({
      error: true, msg: "Internal Server Error" });
  }
})

export default r;