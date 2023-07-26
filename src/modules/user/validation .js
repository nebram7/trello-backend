import joi from "joi"
export const changPassword = joi.object({
    oldPassword:joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(), 
    newPassword:joi.string().pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(), 
        cPassword: joi.string().valid(joi.ref("newPassword")).required()
}).required()


export const updateUser = joi.object({
    age:joi.number().integer().min(22).max(80).required(),
    firstName:joi.string().min(5).max(20).required(),
    lastName:joi.string().min(5).max(20).required()
}).required()
