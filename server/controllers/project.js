const Project = require("../models/Project");
const JWT = require("jsonwebtoken");
const Task = require("../models/Task");
const Notice = require("../models/Notice");
const noticeController = require("./notice");
const mongoose = require("mongoose");
const newProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    const id = new mongoose.Types.ObjectId();
    newProject._id = id;
    const checkNameProject = await Project.find({
      Name: newProject.Name,
      Owner: newProject.Owner,
    });

    if (checkNameProject.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "tên đã tồn tại" });
    } else {
      await newProject.save();

      if (newProject.Collaborator.length) {
        await newProject.Collaborator.map(async (e) => {
          const noticeData = new Notice({
            userId: e,
            description: `You have been assigned to ${newProject.Name}`,
            status: "NOT_CHECKED",
            redirect: `/getProjectById/${id}`,
          });
          await noticeController.newNotice(noticeData);
        });
      }
      return res.status(201).json({ success: true, project: newProject });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllProjectOfUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    // console.log(process.env.JWT_SECRET);
    const decodeToken = JWT.verify(token, process.env.JWT_SECRET);
    //console.log(decodeToken);
    const id = decodeToken.sub;
    const projects = await Project.find({
      $or: [{ Owner: id }, { Collaborator: { $in: [id] } }],
    })
      .populate({
        path: "Owner",
        select: "-password",
      })
      .populate({
        path: "Collaborator",
        select: "-password",
      })
      .populate({
        path: "TaskList",
        populate: { path: "Collaborator", select: "-password" },
      });
    return res.status(200).json({ success: true, data: projects });
  } catch (error) {
    console.log(error);
  }
};

const editProject = async (req, res, next) => {
  try {
    const newProject = req.value.body;
    const edit = await Project.updateOne(
      {
        _id: req.params.idProject,
      },
      newProject
    );
    if (edit) {
      return res
        .status(200)
        .json({ success: true, message: "sửa thành công", project: edit });
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteProject = async (req, res, next) => {
  try {
    const deleteProject = await Project.deleteOne({
      _id: req.params.projectId,
    });
    if (deleteProject) {
      const deleteTask = await Task.deleteMany({
        ProjectId: req.params.projectId,
      });
      if (deleteTask) {
        return res
          .status(200)
          .json({ success: true, message: "Xóa thành công" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate({
        path: "Owner",
        select: "-password",
      })
      .populate({
        path: "Collaborator",
        select: "-password",
      })
      .populate({
        path: "TaskList",
        populate: { path: "Collaborator", select: "-password" },
      });
    if (project) {
      return res.status(200).json({ success: true, project: project });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "khong thay project" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ success: false, message: "khong thay project" });
  }
};
const getCollaborator = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.projectId).populate({
      path: "Collaborator",
      select: "-password",
    });
    if (project) {
      console.log(project);
      return res
        .status(200)
        .json({ success: true, data: project.Collaborator });
    } else {
      return res.status(404).json({ success: false });
    }
  } catch (error) {
    return res.status(404).json({ success: false });
  }
};
module.exports = {
  getCollaborator,
  deleteProject,
  newProject,
  editProject,
  getAllProjectOfUser,
  getProjectById,
};
