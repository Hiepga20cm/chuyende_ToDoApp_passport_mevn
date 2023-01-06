const express = require("express");
const route = require("express-promise-router")();
const NoticeController = require("../controllers/notice");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  validateBody,
  validateParam,
  schemas,
} = require("../helpers/routerHelpers");

route
  .route("/getNoticeByUserId/:userId")
  .get(authMiddleware, NoticeController.getNoticeByUserId);
route
  .route("/changeStatus/:noticeId")
  .patch(authMiddleware, NoticeController.updateStatusById);
module.exports = route;
