import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
})

export const Task = model("task", taskSchema);