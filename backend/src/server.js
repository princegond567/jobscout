import "dotenv/config"
import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(`MongoDB connection failed`, err)
    })