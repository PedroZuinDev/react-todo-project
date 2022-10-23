import { useEffect, useState } from "react";
import { ITask } from "../@types/task.interface";
import { ModalToSeeDetails } from "../components/Modal/ModalToSeeDetailsTask";
import { taskController } from "../controllers/task.controller";
import { validatorTask } from "../utils/validators/form-task.validator";


export const HomeScreen = ()=>{

    const [tasks , setTasks] = useState([] as Array<ITask> ) ;
    const [form , setForm] = useState({
        newTask: "",
        description : ""
    }) ;
    const [taskToShow , setTaskToShow] = useState({} as ITask);
    const [showModalDetails , setShowModalDetails] = useState(false);

    useEffect(()=>{
        taskController.readAll()
        .then((response)=>{ setTasks(response) })
        .catch((err)=>{ throw err.message})
    },[])


    const handleChange = (ev: any)=>{
        setForm({...form , [ev.target.name] : ev.target.value})
    }

    const submitForm = async ()=>{

        let formToAdd = {
            name : form.newTask,
            description : form.description,
            status : "open"
        } as ITask;

        if(!validatorTask.validateToAddNewTask(formToAdd)){
            return;
        }

        setTasks([...tasks , formToAdd]);
        const returnService = await taskController.insert(formToAdd);

        console.log("returnService > ", returnService);

    }

    const deleteItem = (id: string)=>{

    }

    const getItemByID = async (id: string)=>{
        const taskResult = await taskController.readOneByID(id);
        setTaskToShow(taskResult[0]);
        setShowModalDetails(true);
    }
    
    const showTasks = ()=> tasks.map((index: any) => {
        
        const classIfNotClose = "max-w-auto bg-white border-solid border-2 border-sky-500 mt-2 mb-2 rounded overflow-hidden shadow-lg"
        const classIfClose = "max-w-auto bg-green-500 color-white border-solid border-2 border-sky-500 mt-2 mb-2 rounded overflow-hidden shadow-lg"

        return(
            <div className={index.status === "open" ? classIfNotClose : classIfClose} >
                <ModalToSeeDetails show={showModalDetails} taskToShow={taskToShow} handleClose={()=> {setShowModalDetails(false)}}  />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{index.name}</div>
                    <div className="flex justify-between">
                        <p className="text-gray-700 text-base">
                            {index.description}
                        </p>
                        <div>
                            <button type="button" onClick={()=>{getItemByID(index.uniqueid)}} className="text-white bg-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                <span className="sr-only">see</span>
                            </button>
                            <button onClick={()=>{deleteItem(index.id)}} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                <span className="sr-only">exclude</span>
                            </button>
                            <button data-tooltip-target="tooltip-dark" type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                <span className="sr-only">check</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return(
        <div className="grid grid-cols-1 bg-white w-auto justify-center p-10 rounded">
            <div className="flex justify-center mb-6 mt-2 gap-20">
                <div className="md:w-1/2">
                    <div>
                        <span>Tarefa</span>
                    </div>
                    <input value={form.newTask} name="newTask" onChange={(ev)=> handleChange(ev)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                    <div>
                        <span>Descrição</span>
                    </div>
                    <input value={form.description} name="description" onChange={(ev)=> handleChange(ev)} className="bg-gray-200 appearance-none border-2 mt-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" />
                </div>
                <div className="md:w-2/2">
                    <button onClick={()=> submitForm()} className="bg-blue-500 mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Adicionar
                    </button>
                </div>
            </div>
                <hr className="bg-black" />
            <div>
            <div className="grid grid-cols-1 mt-2">
                {
                    showTasks()
                }
            </div>
            </div>
        </div>
    )
}