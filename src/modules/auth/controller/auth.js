import userModel from "../../../../DB/model/User.model.js"
import bcrypt from "bcrypt"
import { asyncHandler } from "../../../utils/errorHandling.js"
import jwt from "jsonwebtoken"
import CryptoJS from "crypto-js"
import sendEmail from "../../../utils/email.js"

export const signup = asyncHandler(async(req , res , next)=>{
    const {userName , email , password , cPassword, age ,phone } = req.body
    console.log({userName , email , password ,cPassword ,age , phone });
    if(password != cPassword) {
        return next(new Error("Password Mismatch cPassword" , {cause:400}))
    }
    const checkUser = await userModel.findOne({email})
    if(checkUser){
        return next(new Error("The Email is exist" , {cause:400}))
    }
    const hashPassword = bcrypt.hashSync(password , parseInt(process.env.SALT_ROUND))
    const encPhone= CryptoJS.AES.encrypt(phone , "Ebram").toString();
    const user= await userModel.create({userName ,email ,
                password :hashPassword ,age  , phone:encPhone})
    const token=jwt.sign({id:user._id , email:user.email},
                         process.env.EMAIL_SIGNATURE , {expiresIn:60*5})
    const newConfirmEmailToken=jwt.sign({id:user._id , email:user.email},
                        process.env.EMAIL_SIGNATURE , {expiresIn: 60*60*24})
    const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`
    const reqistNewConfirmEmailLink=`${req.protocol}://${req.headers.host}/auth/newConfirmEmail/${newConfirmEmailToken}`
    const html=`<a href="${link}">Confirm Email</a>
                <br>
                <br>
                <a href="${reqistNewConfirmEmailLink}}">requist new Confirm Email</a>`
    await sendEmail({to:email , subject:"Confirm Email" , html})
    return res.status(201).json({message:"Done" , user})
})

export const confirmEmail= asyncHandler(
    async(req, res, next)=>{
        const {token}= req.params
        console.log(token);
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNATURE)
        console.log(decoded);
        const user=await userModel.findByIdAndUpdate(decoded.id , {confirmEmail:true})
        return user? res.json({message:"Done"}):
        next(new Error("Email not register") , {cause: 404})
        // return user? res.redirect("http://localhost:5000/auth/login")
        // :res.send("<h2>ops looks like u don,t have account yet follow me to <a>signup</a></h2>")

    }
)

export const newConfirmEmail= asyncHandler(
    async(req, res, next)=>{
        const {token}= req.params
        console.log(token);
        const decoded = jwt.verify(token , process.env.EMAIL_SIGNATURE)
        console.log(decoded);
        const user=await userModel.findById(decoded.id)
        if(!user){
            return next(new Error("Email not register") , {cause: 404})
        }
        if(user.confirmEmail){
            return res.json({message:"The Email is already confirmed"})
        }
        const newToken=jwt.sign({id:user._id , email:user.email},
            process.env.EMAIL_SIGNATURE , {expiresIn:60*2})
        const link = `${req.protocol}://${req.headers.host}/auth/confirmEmail/${newToken}`
        const html=`<a href="${link}">Confirm Email</a>`
        await sendEmail({to:email , subject:"Confirm Email" , html})
        return res.send("check your inbox now")
    }
)

export const login = asyncHandler(async(req, res, next)=>{
    const {email , password}= req.body 
    console.log({email , password});
    const user = await userModel.findOne({email})
    if(!user){
        return next(new Error("In-valid Email or password",{cause:404}))
    }
    const match= bcrypt.compareSync(password , user.password)
    if (!match) {
        return next(new Error("In-valid Email or password",{cause:400}))
    }
    const token = jwt.sign(
        {userName:user.userName , id:user._id ,isOnline:user.isOnline},
        process.env.TOKEN_SIGNATURE,
        {expiresIn:60 * 60}
    )
    const updateOnline= await userModel.findOneAndUpdate(user._id , {isOnline:true ,isDeleted:false})
    return res.json({message:" Done" , token })
}
)
