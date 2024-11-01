//----/api/v1/task===/

const express=require("express");
const router=express.Router();
const {
    getTask,
    postTask,
    getSingleTask,
    patchTask,
    deleteTask,
}=require("../controllers/task")

// router.get("/",getTasks);

// router.post("/",postTask);

// router.get("/:id",getSingleTask);

// router.patch("/:id",patchTask);

// router.delete("/:id",deleteTask);

router.route("/").get(getTask).post(postTask);

router.route("/:id").get(getSingleTask).patch(patchTask).delete(deleteTask);

module.exports=router;