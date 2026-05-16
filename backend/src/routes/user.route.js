import express, { Router } from "express";
import { 
    login, 
    logout, 
    register, 
    updateProfile 
} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(upload.single("file"), register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(auth, upload.single("file"), updateProfile)

export default router