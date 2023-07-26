import { auth } from "../../middleware/authentication.js"
import { validation } from "../../middleware/validation.js"
import * as taskController from "./controller/task.js"
import * as validators from "./validation.js"
import {Router} from "express"
const router = Router()

router.post("/addTask",validation(validators.addTask) ,auth, taskController.addTask)
router.get("/", taskController.getAllTasks)
router.get("/getAllCreatedTasks", auth, taskController.getAllCreatedTasks)
router.get("/getAllTasksAssignToMe", auth, taskController.getAllTasksAssignToMe)
router.get("/allLateTasks", auth, taskController.allLateTasks)
router.get("/getAllTasksAssignToAnyUser/:assignTo",validation(validators.getAllTasksAssignToAnyUser) ,auth, taskController.getAllTasksAssignToAnyUser)
router.put("/updateTask/:id",validation(validators.updateTask), auth, taskController.updateTask)
router.delete("/deleteTask/:id",validation(validators.deleteTask), auth, taskController.deleteTask)


export default router