const express = require("express");
const route = require("express-promise-router")();
const ProjectController = require("../controllers/project");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

route
  .route("/newProject")
  .post(
    authMiddleware,
    validateBody(schemas.newProjectSchema),
    ProjectController.newProject
  );

route
  .route("/editProject/:idProject")
  .put(
    validateParam(schemas.idSchema, "idProject"),
    validateBody(schemas.newProjectSchema),
    ProjectController.editProject
  );

route
  .route("/projectList")
  .get(authMiddleware, ProjectController.getAllProjectOfUser);

route
  .route("/deleteProject/:projectId")
  .delete(authMiddleware, ProjectController.deleteProject);

route
  .route("/getProjectById/:projectId")
  .get(authMiddleware, ProjectController.getProjectById);
route
  .route("/getCollaborator/:projectId")
  .get(authMiddleware, ProjectController.getCollaborator);
module.exports = route;
