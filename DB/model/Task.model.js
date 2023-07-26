import mongoose, {Schema , Types, model} from "mongoose"
const taskSchema = new Schema({
    title:{type: String , required: true},
    description:{type:String , required: true},
    status:{type:String , default:"todo" , enum:["todo" , "doing" , "done"]},
    isDeleted:{type:Boolean  , default:false},
    userId :{type:Types.ObjectId, ref:'User' , required:true},
    assignTo:{type:Types.ObjectId , ref:'User', required:true} ,
    deadline:{type:Date , required:true}
},{
    timestamps:true
})
const taskModel= model('Task' , taskSchema)
export default taskModel