

import connectDB from "../DB/connection.js"
import userRouter from "./modules/user/user.router.js"
import authRouter from "./modules/auth/auth.router.js"
import taskRouter from "./modules/task/task.router.js"
import { globalErrorHandling } from "./utils/errorHandling.js"


const bootstrab= ( app , express )=>{
    app.use(express.json())
    app.use("/auth" , authRouter)
    app.use("/user" , userRouter)
    app.use("/task" , taskRouter)
    app.use("*", (req , res , next)=>{
        res.json({message:"In-valid Router"})
    })
    app.use(globalErrorHandling)
    connectDB()
}

export default bootstrab