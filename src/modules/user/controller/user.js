import userModel from "../../../../DB/model/User.model.js"
import { asyncHandler } from "../../../utils/errorHandling.js"
import CryptoJS from "crypto-js"
import bcrypt from "bcrypt"

export const getUsers=asyncHandler(
    async (req, res, next)=>{
        const user = await userModel.findById(req.user._id)
        const decPhone=CryptoJS.AES.decrypt(user.phone , "Ebram")
        user.phone=decPhone.toString(CryptoJS.enc.Utf8)
        return res.json({message:"Done"  , user})
    }
)

export const changPassword= asyncHandler(
    async(req , res , next)=>{
        const {oldPassword , newPassword , cPassword}= req.body
        console.log({oldPassword , newPassword , cPassword});
        if (cPassword != newPassword) {
            next(new Error("cPassword Mismatch newPassword" , {cause:400}))
        }
        const match = bcrypt.compareSync(oldPassword , req.user.password)
        if (! match) {
            next(new Error ("the oldPassword Mismaych the password" , {cause:400}))
        }
        const hashPassword=bcrypt.hashSync(newPassword , 9)
        const user = await userModel.findByIdAndUpdate(req.user._id,{password:hashPassword})
        return res.json({message:"Done" , user})
    }
)

export const updateUser= asyncHandler(
    async(req , res , next)=>{
        const {age , firstName , lastName}= req.body
        console.log({age , firstName , lastName})
        const user = await userModel.findByIdAndUpdate(req.user._id ,
                           {age , firstName , lastName} , {new:true})
        return res.json({message:"Done" , user})
    }   
)


export const deleteUser= asyncHandler(
    async(req , res , next)=>{
        const user = await userModel.findByIdAndDelete(req.user._id )
        return res.json({message:"Done" , user})
    }   
)

export const logout= asyncHandler(
    async(req , res , next)=>{
        const{isOnline}=req.user
        const user = await userModel.findByIdAndUpdate(req.user._id ,{isOnline:false})
        res.json({message:"Done"})
    }
)

export const softDelete= asyncHandler(
    async(req , res , next)=>{
        const{isDeleted}=req.user
        const user = await userModel.findByIdAndUpdate(req.user._id ,{isDeleted:true})
        res.json({message:"the account is deleted"})
    }
)