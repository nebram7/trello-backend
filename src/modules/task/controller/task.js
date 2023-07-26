import userModel from "../../../../DB/model/User.model.js";
import taskModel from "../../../../DB/model/task.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const addTask = asyncHandler(
    async(req, res, next)=>{
        const {title , description , deadline  ,assignTo}=req.body;
        console.log({title , description , deadline  ,assignTo});
        const task= await taskModel.create({title , description 
                        , deadline  ,assignTo , userId:req.user._id})
        if(task.deadline < task.createdAt){
            return next(new Error("Enter valid date") , {cause:400})
        }
        const user = await userModel.findById(assignTo)
        if(!user){
            return next (new Error("This user you want to assign this task not exist "))
        }
        return res.json({message:"Done" , task})
    }
)

export const getAllTasks = asyncHandler(
    async(req , res , next)=>{
        const allTasks = await taskModel.find().populate([{
            path:"userId",
            select:"userName email"
        },
        {
            path:"assignTo",
            select:"userName email"
        }])
        return res.json({message:"Done" ,allTasks })
    }
)


export const getAllCreatedTasks = asyncHandler(
    async(req , res , next)=>{
        const tasks = await taskModel.find({userId:req.user._id}).populate([{
            path:"userId" , 
            select:"userName email"
        },{
            path:"assignTo",
            select:"userName email"
        }])
        return res.json({message:"Done" ,tasks })
    }
)

export const getAllTasksAssignToMe = asyncHandler(
    async(req , res , next)=>{
       const tasks = await taskModel.find({assignTo:req.user._id}).populate([{
        path:"userId" , 
        select:"userName email"
       },{
        path:"assignTo",
        select:"userName email"
       }])
        return res.json({message:"Done" ,tasks })
    }
)

export const getAllTasksAssignToAnyUser = asyncHandler(
    async(req , res , next)=>{
        const {assignTo} = req.params
        const tasks = await taskModel.find({userId:req.user._id , assignTo}).populate([{
            path:"userId" , 
            select:"userName email"
        },{
            path:"assignTo",
            select:"userName email"
        }])
        return res.json({message:"Done" ,tasks })
    }
)

export const allLateTasks = asyncHandler(
    async(req , res , next)=>{
        const currentDate = new Date();
        const tasks = await taskModel.find({userId:req.user._id, deadline: { $lte: currentDate } }).populate([{
            path:"userId",
            select:"userName email"
        },
        {
            path:"assignTo",
            select:"userName email"
        }])
        return res.json({message:"Done" , tasks})
    }
)

export const updateTask =asyncHandler(
    async(req, res , next)=>{
        const {id}= req.params
        const {title , description,deadline, status, assignTo} = req.body
        console.log({title , description,status , assignTo , id});
        const task= await taskModel.findOneAndUpdate({_id:id , userId:req.user._id} ,{title , description,status, deadline, assignTo}, {new:true})
        if(!task){
            return next(new Error("you ara not allowed to update this task"))
        }
        return res.json({message:"Done" , task})
    }
)

export const deleteTask =asyncHandler(
    async(req, res , next)=>{
        const {id}= req.params
        const task= await taskModel.findOneAndDelete({_id:id , userId:req.user._id})
        if(!task){
            return next(new Error("you ara not allowed to delete this task"))
        }
        return res.json({message:"Done" , task})
    }
)

