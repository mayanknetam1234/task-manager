const {CustomAPIError}=require("../error/custom-error")

const errorHandlerMiddleware=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({msg:err.message,err:err})
    }
    return res.status(500).json({msg:"Something went wrong",err:err});
}

module.exports=errorHandlerMiddleware;