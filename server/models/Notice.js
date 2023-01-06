const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoticeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    redirect: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["CHECKED", "NOT_CHECKED"],
      default: "NOT_CHECKED",
    },
  },
  {
    timestamps: true,
  }
);

const Notice = mongoose.model("Notice", NoticeSchema);
module.exports = Notice;
