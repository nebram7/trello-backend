import joi from "joi"

export const addTask=joi.object({
    title:joi.string().min(5).max(50).required(), 
    description:joi.string().min(5).max(100),
    deadline:joi.date().required(),
    assignTo:joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required()
}).required()


export const getAllTasksAssignToAnyUser = joi.object({
    assignTo:joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required()
}).required()


export const updateTask = joi.object({
    title:joi.string().min(5).max(50).required(), 
    description:joi.string().min(5).max(100),
    deadline:joi.date().required(),
    assignTo:joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required(),

    id:joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required()
}).required()


export const deleteTask= joi.object({
    id:joi.string().pattern(new RegExp(/^[0-9a-fA-F]{24}$/)).required()
}).required()

