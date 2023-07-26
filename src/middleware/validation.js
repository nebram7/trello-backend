


export const validation=(joiSchema)=>{
    return(req, res, next)=>{
        const validationResults = joiSchema.validate({...req.body , ...req.params, ...req.query} , {abortEarly : false})
        if (validationResults.error) {
            res.json({message:"validation error" , validationErr:validationResults.error.details})
        }
        return next()
    }
}



















// const dataMethods= ['body', 'params', 'query', 'headers', 'file' ]

// export const validation= (joiSchema)=>{
//     return(req , res, next)=>{
//         const validationErr=[]
//         dataMethods.forEach(key=>{
//             if (joiSchema[key]){
//                 console.log({key});
//                 const validationResults = joiSchema[key].validate(req[key] , {abortEarly : false})
//                 if (validationResults.error) {
//                     validationErr.push(validationResults.error.details)
//                 }
//             }
//         })
//         if (validationErr.length > 0) {
//             return res.json({message:"validation Error" , validationErr})
//         }
//         return next()
//     }
// }







// export const validation = (schema)=>{
//     return(req, res, next)=>{
//         const validationresult= schema.validate(req.body , {abortEarly: false})
//         if(validationresult.error){
//             return res.json({message:"validation Error" , validationErr:validationresult.error.details })
//         }
//         return next()

//     }
// }