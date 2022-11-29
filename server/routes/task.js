const express = require("express");
// const route = express.route()
const route = require("express-promise-router")();
const TaskController = require("../controllers/task");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

route.route("/newTask").post(TaskController.newTask);

module.exports = route;
