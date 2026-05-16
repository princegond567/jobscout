import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message: "User not logged in",
                success: false
            })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        };

        req.id = decode.userId
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth