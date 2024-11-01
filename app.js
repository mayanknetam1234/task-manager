const express=require("express");
const app=express();
const task=require("./routes/task")
const connectDb=require("./db/connect");
const notFound=require("./middleware/not_found")
const errorHandlerMiddleware=require("./middleware/errorHandler");
require("dotenv").config();

//middle ware
app.use(express.static("./public2"));

app.use(express.urlencoded({extended:false}));

app.use(express.json());

//routes
app.use("/api/v1/tasks",task);

app.use(notFound);

app.use (errorHandlerMiddleware)
// app.get("/api/v1/tasks")
// app.post("/api/v1/tasks")
// app.get("/api/v1/tasks/:id")
// app.patch("/api/v1/taks/:id")
// app.delete("/api/v1/taks/:id")

const port=process.env.PORT || 3000;
const start=async()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        console.log("connected to db");
        app.listen(port,()=>{
            console.log(`server listening at http://localhost:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();