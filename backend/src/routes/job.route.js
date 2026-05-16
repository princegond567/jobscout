import express, { Router } from "express";
import auth from "../middlewares/auth.middleware.js";
import { getAdminJobs, getJob, getJobById, postJob, updateJob } from "../controllers/job.controller.js";

const router = Router();

router.route("/").post(auth, postJob);
router.route("/").get(auth, getJob);
router.route("/adminjob").get(auth, getAdminJobs);
router.route("/:id").get(auth, getJobById);
router.route("/update/:id").put(auth, updateJob);

export default router