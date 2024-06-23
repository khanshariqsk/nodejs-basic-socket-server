const mongoose = require("mongoose");
const { methodTypes } = require("../utils/constant.util");

const jobSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },     // needs to add in future

    metrics: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },

    interval: {
      type: String,
      default: "5 min",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      required: true,
    },
    methodType: {
      type: String,
      default: methodTypes.GET,
      enum: Object.values(methodTypes),
      required: true,
    },
    headers: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
    body: {
      type: Object,
      required: true,
    },
    queryParams: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    scheduleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const JobModel = mongoose.model("Job", jobSchema);

module.exports = JobModel;
