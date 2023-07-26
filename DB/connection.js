import mongoose from "mongoose"

const connectDB = async()=>{
    return await mongoose.connect(process.env.DB_URL).then(result=>{
        console.log(`DB connected........`);
        // console.log(result);
    }).catch(err=>{
        console.log(`fail to connectDB..........${err}`);
    })

}

export default connectDB