const Notice = require("../models/Notice");

const newNotice = async (data) => {
  try {
    const newNotice = new Notice(data);
    await newNotice.save();
    return json({ success: true, message: "successfully" });
  } catch (error) {
    console.log(error);
  }
};
const getNoticeByUserId = async (req, res, next) => {
  try {
    const listNotify = await Notice.find({ userId: req.params.userId });
    return res.status(200).json({ success: true, data: listNotify });
  } catch (error) {
    console.log(error);
  }
};
const updateStatusById = async (req, res, next) => {
  try {
    console.log(req.params.noticeId);
    const check = await Notice.find({
      _id: req.params.noticeId,
      status: "NOT_CHECKED",
    });

    if (check.length > 0) {
      const notification = await Notice.findByIdAndUpdate(req.params.noticeId, {
        status: "CHECKED",
      }).exec();

      return res.status(200).json({ success: true, data: notification });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
};
const deletaNotification = async (req, res, next) => {
  try {
    const notice = await Notice.deleteOne({
      _id: req.params.noticeId,
    });
    if (notice) {
      return res.status(200).json({ success: true, message: "Xóa thành công" });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  newNotice,
  getNoticeByUserId,
  deletaNotification,
  updateStatusById,
};
