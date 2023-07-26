import dotenv from "dotenv"
dotenv.config()
import express from "express"
import bootstrab from "./src/index.router.js"
import sendEmail from "./src/utils/email.js"
const app= express()
const port =5000


bootstrab(app, express)
app.listen(port,()=>{
    console.log(`The server is running on Port..${port}`);
})






