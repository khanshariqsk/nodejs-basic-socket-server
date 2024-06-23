const {
  InternalServerError,
  HttpBadRequestError,
} = require("../services/error.service");

const {
  HttpSuccessCreated,
  HttpSuccess,
} = require("../services/success.service");
const { getURLandSearchParams } = require("../utils/common.util");
const {
  rescheduleJob,
  cancelJob,
  runJob,
  getAllJobs,
  getJob,
  createJob,
} = require("../services/job.service");

exports.saveJob = async (req, res, next) => {
  try {
    const { url, queryParams, interval, methodType, headers, metrics } =
      req.body;

    const { urlWithoutQuery, updatedQueryParams } = getURLandSearchParams(
      url,
      queryParams
    );

    const foundJob = await getJob({ url: urlWithoutQuery, methodType });

    if (foundJob) {
      foundJob.set({
        url: urlWithoutQuery,
        queryParams: updatedQueryParams,
        interval,
        methodType,
        headers,
        body: req.body,
        metrics,
      });

      await rescheduleJob(foundJob);
      await foundJob.save();

      return HttpSuccess(res, foundJob, "job updated successfully!");
    }

    const createdJob = await createJob({
      url: urlWithoutQuery,
      queryParams: updatedQueryParams,
      interval,
      methodType,
      headers,
      body: req.body,
      metrics,
    });

    return HttpSuccessCreated(res, createdJob, "job saved successfully!");
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};

exports.startJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await getJob({ _id: jobId });
    if (!job) {
      return next(new HttpBadRequestError("Job not found"));
    }

    if (job.isActive) {
      return next(new HttpBadRequestError("Job is already active"));
    }

    await runJob(job);
    await job.save();

    return HttpSuccess(res, null, "Job started successfully!");
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};

exports.stopJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await getJob({ _id: jobId });

    if (!job) {
      return next(new HttpBadRequestError("Job not found"));
    }
    if (!job.isActive) {
      return next(new HttpBadRequestError("Job is not active"));
    }

    await cancelJob(job);
    await job.save();

    return HttpSuccess(res, null, "Job stopped successfully!");
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};

exports.getJobs = async (req, res, next) => {
  try {
    const allJobs = await getAllJobs();

    return HttpSuccess(res, allJobs, "Jobs fetched successfully!");
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};

exports.getJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const job = await getJob({ _id: jobId });
    return HttpSuccess(res, job, "Job fetched successfully!");
  } catch (error) {
    return next(new InternalServerError(error.message));
  }
};
