import  jwt  from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";
import { asyncHandler } from "../utils/errorHandling.js";



export const auth =asyncHandler(
    async(req , res , next)=>{
        const {authorization}=req.headers
        console.log(authorization);
        if (! authorization?.startsWith(process.env.TOKEN_BEARER)) {
            return next(new Error("authorization is required or in-valid Bearer key" , {cause:400}))
        }
        console.log(authorization.startsWith(process.env.TOKEN_BEARER));
        const token= authorization.split(process.env.TOKEN_BEARER)[1]
        if (!token ) {
            return next(new Error("token is required" , {cause:400}))
        }
        const decoded = jwt.verify(token , process.env.TOKEN_SIGNATURE)
        console.log(decoded);
        if (!decoded?.id) {
            return next(new Error("In-valid token payload" , {cause:400}))
        }
        const user= await userModel.findById(decoded.id)
        if (!user) {
            return next(new Error("Not register account" , {cause:404}))
        }
        const checkOnline=await userModel.findOne({isOnline:true , _id:decoded.id})
        if(!checkOnline){
            return next(new Error("Please login first" , {cause:400}))
        }
        const checkDeleted=await userModel.findOne({isDeleted:true ,_id:decoded.id })
        if(checkDeleted){
            return next(new Error("The Email is deleted Please login again" , {cause:400}))
        }
        req.user=user
        return next()
    }
)