import express, { Router } from "express";
import { 
    getCompany, 
    getCompanyById, 
    registerCompany, 
    updateCompany 
} from "../controllers/company.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(auth, registerCompany);
router.route("/").get(auth, getCompany);
router.route("/:id").get(auth, getCompanyById);
router.route("/update/:id").put(auth, upload.single("file"), updateCompany)

export default router