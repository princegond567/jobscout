import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js"
import applicationroutes from "./routes/application.route.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());


// Routes
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/job", jobRoutes)
app.use("/api/v1/application", applicationroutes)

export default app


