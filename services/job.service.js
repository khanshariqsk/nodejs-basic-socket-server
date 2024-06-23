const { default: axios } = require("axios");
const JobModel = require("../models/job.model");
const schedule = require("node-schedule");
const { JSONPath } = require("jsonpath-plus");
const socketEmitter = require("./event-emitter.service");

exports.getActiveJobs = async () => {
  const activeJobs = await JobModel.find({
    isActive: true,
    scheduleId: { $exists: true },
  });

  return activeJobs;
};

exports.getAllJobs = async () => {
  const allJobs = await JobModel.find({});
  return allJobs;
};

exports.getJob = async (query) => {
  const job = await JobModel.findOne(query);
  return job;
};

exports.createJob = async (data) => {
  const job = await JobModel.create(data);
  return job;
};

exports.cancelAllJobs = async () => {
  const activeJobs = await this.getActiveJobs();

  if (activeJobs.length) {
    activeJobs.forEach((job) => {
      schedule.cancelJob(job.scheduleId);
    });
    console.log("All active scheduler closed");
  }
};

exports.startAllActiveJobs = async () => {
  const activeJobs = await this.getActiveJobs();

  if (activeJobs.length) {
    activeJobs.forEach(async (job) => {
      schedule.cancelJob(job.scheduleId);
      await this.runJob(job);
    });
    console.log("All active scheduler started");
  }
};

exports.runJob = async (job) => {
  const jobSchedule = schedule.scheduleJob("*/10 * * * * *", async () => {
    await this.runJobHandler(job);
  });

  job.set({
    isActive: true,
    scheduleId: jobSchedule.name,
  });
};

exports.cancelJob = async (job) => {
  const { scheduleId } = job;
  schedule.cancelJob(scheduleId);

  job.set({
    isActive: false,
    scheduleId: undefined,
  });
};

exports.rescheduleJob = async (job) => {
  if (job.isActive && job.scheduleId) {
    schedule.rescheduleJob(job.scheduleId, "*/1 * * * * *");
  }
};

exports.getDataFromMetricPath = (job, data) => {
  const paths = job.metrics;

  const results = {};

  for (const key in paths) {
    if (paths.hasOwnProperty(key)) {
      results[key] = JSONPath({ path: paths[key], json: data });
    }
  }

  const keys = Object.keys(paths);

  const combinedData = results[keys[0]].map((_, index) => {
    const result = {};

    keys.forEach((key) => {
      result[key] = results[key][index];
    });

    return result;
  });

  return combinedData;
};

exports.runJobHandler = async (job) => {
  try {
    const responseData = await axios[job.methodType.toLowerCase()](job.url, {
      headers: job.headers,
      params: job.queryParams,
    });
    const results = this.getDataFromMetricPath(job, responseData.data);
    console.log("results", results);
  } catch (error) {
    console.error(`Error running job for URL: ${job.url}`, error);    

    this.handleJobError(job, error);
  }
};

exports.handleJobError = async (job, error) => {
  let errorData = {};

  if (error.response) {
    errorData = {
      message: error.response.data,
      statusCode: error.response.status,
      headers: error.response.headers,
    };
  } else if (error.request) {
    console.log("Request:", error.request);
    errorData = {
      message: error.request,
    };
  } else {
    errorData = {
      message: error.message,
    };
  }
  socketEmitter.emit("event-sender", {
    eventName: "job-error",
    eventData: {
      url: job.url,
      job,
      error: errorData,
    },
  });
};
