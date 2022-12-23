const mongoose = require("mongoose");
const Project = require("../models/Project");
const Task = require("../models/Task");

const newTask = async (req, res, next) => {
  try {
    const newTask = new Task(req.value.body);
    const id = new mongoose.Types.ObjectId();
    newTask._id = id;
    const projectId = req.params.projectId;
    newTask.ProjectId = projectId;
    const checkNameTask = await Task.find({
      ProjectId: projectId,
      Name: newTask.Name,
    });
    if (checkNameTask.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "tên đã tồn tại" });
    } else {
      await newTask.save();
      await Project.findByIdAndUpdate(projectId, {
        $push: { TaskList: id },
      });
      return res.status(200).json({ success: true, task: newTask });
    }
  } catch (error) {
    console.log("looix");
    return res.status(400).json({ success: false, message: error.message });
  }
};

const editTask = async (req, res, next) => {
  try {
    const newTask = req.value.body;
    console.log(req.body);
    console.log("be asdasd", req.value.body);
    const checkNameTask = await Task.find({
      Name: newTask.Name,
    });
    if (checkNameTask.length > 0) {
      return res
        .status(200)
        .json({ success: false, message: "Tên đã tồn tại" });
    } else {
      const editTask = await Task.updateOne(
        {
          _id: req.params.TaskId,
        },
        newTask
      );
      console.log(editTask);
      return res
        .status(200)
        .json({ success: true, message: "update thành công", task: editTask });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const deleteTask = await Task.deleteOne({ _id: req.params.TaskId });
    if (deleteTask) {
      return res
        .status(200)
        .json({ success: true, message: "xóa Tash thành công" });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "xóa Tash không thành công" });
    }
  } catch (error) {
    return ré.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  newTask,
  editTask,
  deleteTask,
};
