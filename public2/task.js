console.log("hiiii");
//elements
//alias:
//el- html element
const bottom_el=document.querySelector(".bottom");
const submitBtn=document.querySelector(".submit");
const inputBox=document.querySelector(".inputName");
const taskMsg=document.querySelector(".taskMsg");
//functions

//show all task

const showAllTask=async()=>{
    try {
        
        const {data:{tasks}}=await axios.get("/api/v1/tasks");//task will be an array of object with object the documents
        
        const AllTask=tasks.map((element)=>{
            const {_id,name,completed}=element;
            return `<div class="task">
                <div class="first">
                    <i class="fa-regular fa-square-check fa-xl ${(completed)? 'showCheckbox':'hideCheckbox'}"></i>
                    <span class="taskName ${completed?'completed':''} ">${name}</span>
                </div>
                <div class="edit">
                    <button class="delete point" data-id="${_id}">
                        <i class="fa-solid fa-trash fa-xl "></i>
                    </button>
                    <a href="./index.html?id=${_id}">
                        <i class="fa-solid fa-pen-to-square fa-xl point"></i>
                    </a>
                    
                </div>
                </div>`;
        }).join(" ");
    
        //putting all the tasks in the div all task
    
        bottom_el.innerHTML=AllTask;
    } catch (error) {
       taskMsg.innerHTML="There was an error please try again later..."
        
    }

}




showAllTask();
//deletetask

bottom_el.addEventListener("click",async(e)=>{
    const el=e.target;
    console.log(el);
    try {
        
        if(el.parentElement.classList.contains("delete")){
            console.log("yaaa");
            const id=el.parentElement.dataset.id;
            const task=await axios.delete(`/api/v1/tasks/${id}`);
            showAllTask();
    
        }
    } catch (error) {
       taskMsg.innerHTML="There was an please try deleting it again..."
    }
})



//create a new task


submitBtn.addEventListener("click",async(e)=>{
    e.preventDefault();
    const taskName=inputBox.value;
    console.log(taskName);
    try {
        const {data:{task}}=await axios.post('/api/v1/tasks',{name:taskName});
        showAllTask();
        taskMsg.innerHTML="Task added successfully"
    } catch (error) {
        taskMsg.innerHTML="error, please try again";
    }
    inputBox.value="";
    setTimeout(()=>{
        taskMsg.innerHTML="";
    },2000)
})




