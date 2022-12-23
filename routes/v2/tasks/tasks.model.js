const mongoose = require("mongoose");
const { DONE, IN_PROGRESS, OPEN } = require("../../../util/constants");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [DONE, OPEN, IN_PROGRESS],
      default: OPEN,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
