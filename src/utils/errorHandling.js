export const asyncHandler= (fn)=>{
    return(req, res, next)=>{
        fn(req , res , next).catch(error=>{
            return next(new Error(error),{cause:500})
        })
    }
}

export const globalErrorHandling=(error , req, res, next)=>{
    res.status(error.cause|| 400).json({ msgError:error.message, stack:error.stack})
}
