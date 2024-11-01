const taskModel=require("../models/taskModel")
const asyncWrapper=require("../middleware/asyncWrapper");
const {createCustomError,CustomAPIError}=require("../error/custom-error")

const getTask= asyncWrapper(async(req,res)=>{
    const tasks=await taskModel.find({})
    res.status(200).json({tasks});
})

const postTask= asyncWrapper(async(req,res)=>{
    let task=await taskModel.create(req.body);
    res.status(201).json({task});
})

const getSingleTask= asyncWrapper(async(req,res,next)=>{
    const {id:taskId}=req.params;
    const task=await taskModel.findOne({_id:taskId});
    console.log(`task:${task}`)
    if(!task){
        const error=createCustomError("Not found",404)
        return next(error);
        // return res.status(401).send("did not find task");
    }
    res.status(200).json({task:task});
})

const patchTask= asyncWrapper(async(req,res)=>{
    const {id:taskId}=req.params;
    const change=req.body;
    const task=await taskModel.findOneAndUpdate({_id:taskId},req.body,{
        new:true,
        runValidators:true
    });
    if(!task){
        const error=createCustomError("Not found",404)
        return next(error);
    }
    res.status(200).json({task:task,data:req.body});
})


const deleteTask= asyncWrapper(async(req,res)=>{
    const {id:taskId}=req.params;
    const task=await taskModel.findOneAndDelete({_id:taskId});
    if(!task){
        const error=createCustomError("Not found",404)
        return next(error);
    }
    res.status(200).json({task:task})
})

module.exports={
    getTask,
    postTask,
    getSingleTask,
    patchTask,
    deleteTask,
}
