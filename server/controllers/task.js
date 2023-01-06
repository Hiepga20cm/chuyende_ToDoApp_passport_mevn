const mongoose = require("mongoose");
const Notice = require("../models/Notice");
const Project = require("../models/Project");
const Task = require("../models/Task");
const noticeController = require("./notice");

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
      if (newTask.Collaborator.length) {
        await newTask.Collaborator.map(async (e) => {
          const noticeData = new Notice({
            userId: e,
            description: `You have been assigned to task ${newTask.Name}`,
            status: "NOT_CHECKED",
            redirect: `/getProjectById/${projectId}`,
          });
          await noticeController.newNotice(noticeData);
        });
      }
      return res.status(200).json({ success: true, task: newTask });
    }
  } catch (error) {
    console.log("looix");
    return res.status(400).json({ success: false, message: error.message });
  }
};

const editTask = async (req, res, next) => {
  try {
    const newTask = req.body;

    const editTask = await Task.updateOne(
      {
        _id: req.params.TaskId,
      },
      newTask
    );
    return res
      .status(200)
      .json({ success: true, message: "update thành công", task: editTask });
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
