import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  joiningTime: {
    type: Date,
    default: Date.now(),
  }
}, {
  timestamps: true
});


export const User = model("user", userSchema);