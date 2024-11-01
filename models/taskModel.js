const mongoose=require("mongoose")
const {Schema,model}=mongoose;

//creating a schema for the document
const taskSchema=new Schema({
    name:{
        type:String,
        required:[true,"please provide the name"],
        trim:true,
        maxlength:[20,"name cannot be more than 20 characters"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//creating the model which is similar to collection

const taskModel=new model("Task",taskSchema);

module.exports=taskModel;
