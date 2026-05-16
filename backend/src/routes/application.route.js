import express, { Router } from "express";
import auth from "../middlewares/auth.middleware.js"
import { 
    applyJob, 
    getApplicants, 
    getAppliedJobs, 
    updateStatus
} from "../controllers/application.controller.js";

const router = Router();

router.route("/apply/:id").post(auth, applyJob)
router.route("/get").get(auth, getAppliedJobs)
router.route("/:id/applicants").get(auth, getApplicants)
router.route("/status/:id").patch(auth, updateStatus)

export default router