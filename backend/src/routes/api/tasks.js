import { models } from "../../db/models/index.js";
import { Router } from "express";
import { VerifyToken } from "../../utils/middleware.js";

const r = Router();
const { Task } = models;


// GET all tasks
r.get('/',VerifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.send({ tasks, error: false, msg: "Tasks found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});


// GET the task
r.get('/:task_id',VerifyToken, async (req, res) => {
  try {
    if (!req.params.task_id) {
      return res.status(400).json({ error: true, msg: "Task id not valid" });
    }

    const task = await Task.findOne({ user: req.user.id, _id: req.params.task_id });
    if (!task) {
      return res.status(400).json({ error: true, msg: "No task found.." });
    }
    res.send({ task, error: false, msg: "Task found successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});



// POST the task
r.post('/',VerifyToken, async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: true, msg: "Description of task not found" });
    }
    const task = await Task.create({ user: req.user.id, description });
    res.send({ task, error: false, msg: "Task created successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
})


// UPDATE the task
r.put('/:task_id',VerifyToken,  async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ error: true, msg: "Description of task not found" });
    }

    if (!req.params.task_id) {
      return res.status(400).json({ error: true, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.task_id);
    if (!task) {
      return res.status(400).json({ error: true, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(400).json({ error: true, msg: "You can't update task of another user" });
    }

    task = await Task.findByIdAndUpdate(req.params.task_id, { description }, { new: true });
    res.send({ task, error: false, msg: "Task updated successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
})



// DELETE the task
r.delete('/:task_id', VerifyToken, async (req, res) => {
  try {
    if (!req.params.task_id) {
      return res.status(400).json({ error: true, msg: "Task id not valid" });
    }

    let task = await Task.findById(req.params.task_id);
    if (!task) {
      return res.status(400).json({ error: true, msg: "Task with given id not found" });
    }

    if (task.user != req.user.id) {
      return res.status(400).json({ error: true, msg: "You can't delete task of another user" });
    }

    await Task.findByIdAndDelete(req.params.task_id);
    res.send({ error: false, msg: "Task deleted successfully.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, msg: "Internal Server Error" });
  }
});

export default r;