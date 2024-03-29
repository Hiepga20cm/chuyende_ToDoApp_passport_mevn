const express = require("express");
// const route = express.route()
const route = require("express-promise-router")();
const TaskController = require("../controllers/task");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");
const authMiddleware = require("../middlewares/authMiddleware");

route
  .route("/newTask/:projectId")
  .post(
    authMiddleware,
    validateParam(schemas.idSchema, "projectId"),
    validateBody(schemas.newTaskSchema),
    TaskController.newTask
  );
route
  .route("/editTask/:TaskId")
  .put(
    authMiddleware,
    validateParam(schemas.idSchema, "TaskId"),
    TaskController.editTask
  );
route
  .route("/deleteTask/:TaskId")
  .delete(
     authMiddleware,
    validateParam(schemas.idSchema, "TaskId"),
    TaskController.deleteTask
  );

module.exports = route;
