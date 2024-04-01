import jwt from "jsonwebtoken"

const TOKEN_SECRET = process.env.TOKEN_SECRET;

const createAccessToken = (payload) => {
  return jwt.sign(payload, TOKEN_SECRET);
}

// /^\S+@\S+\.\S{3}$/
const validateEmail = (email) => {
  return /^\S+@\S+\.\S{3}$/.test(email)
};


export {
  createAccessToken,
  validateEmail,
}