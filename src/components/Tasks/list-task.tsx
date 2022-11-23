import { ITask } from "../../@types/task.interface";
import {useState} from "react";
import { taskController } from "../../controllers/task.controller";
import { CircleButton } from "../Button/circle-button";
import { CheckIcon, EyeIcon, PenIcon, TrashIcon } from "../Icons/svg/icons";
import { showModalSeeDetailsTaskEdit } from "../Modal/edit-details-task.modal";
import { showGenericToast } from "../Toast/success.toast";

export const ShowListTask = (props: any)=>{

        const [selectedFilter, setSelectedFilter] = useState("");

        const showItemDetail = async (id: string) => {
            const taskSelected = props.tasks.find((task: ITask) => task.uniqueid === id) as ITask;
            await showModalSeeDetailsTaskEdit(taskSelected , {
                title : "Visualizar Tarefa"
            });
        }

        const checkTask = async (id: string) => {
            props.setShowLoading(true);
            for (let index = 0; index < props.tasks.length; index++) {
                const element = props.tasks[index];
                if (element.uniqueid === id)
                    props.tasks[index].status = props.tasks[index].status === "open" ? "close" : "open";
            }
            await taskController.checkOrUncheckTask(id);
            props.setShowLoading(false);
            return props.setTasks(props.tasks);
        };
        
        const deleteItem = async (id: string) => {
            props.setShowLoading(true);
            await taskController.delete(id);
            const immutableTasks = props.tasks.filter((index : ITask) => index.uniqueid !== id) as ITask[];
            props.setShowLoading(false);
            await showGenericToast({icon : "success" , title : "Deletado com Sucesso"});
            return props.setTasks(immutableTasks);
        };
        
        const editItem = async (id: string) => {
            const taskSelected = props.tasks.find((task : ITask) => task.uniqueid === id) as ITask;
            await showModalSeeDetailsTaskEdit(taskSelected , {
                title : "Editar Tarefa"
            });
            return props.setChangedListsTasks(true);
        };

        const showTasks = () =>{
            if(props.tasks.length === 0){
                return(<span>Sem Tarefas</span>)
            }
            return props.tasks.map((index: ITask) => {
                const classIfNotClose =
                    "max-w-auto bg-white border-solid border-2 border-sky-500 mt-2 mb-2 rounded overflow-hidden shadow-lg";
                const classIfClose =
                    "max-w-auto bg-green-500 color-white border-solid border-2 border-sky-500 mt-2 mb-2 rounded overflow-hidden shadow-lg";
    
                return (
                    <div
                    key={index.uniqueid}
                    className={index.status === "open" ? classIfNotClose : classIfClose}
                    >
                        <div className="px-6 py-4"> 
                            <div className="font-bold text-xl mb-2">{index.name}</div>
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-700 text-base">{index.description}</p>
                                </div>
                                <div>
                                    <p className="text-gray-700 text-base"> DeadLine : <strong>{new Date(index.dateEnd).toLocaleString()}</strong></p>
                                </div>
                                <div>
                                    <CircleButton action={()=>showItemDetail(index.uniqueid as string)} bgColorButton={"blue"} icon={<EyeIcon />} />
                                    <CircleButton action={()=>editItem(index.uniqueid as string)} bgColorButton={"blue"}  icon={<PenIcon />} />
                                    <CircleButton action={()=>deleteItem(index.uniqueid as string)} bgColorButton={"red"}  icon={<TrashIcon />} />
                                    <CircleButton action={()=>checkTask(index.uniqueid as string)} bgColorButton={"green"}  icon={<CheckIcon />} />
                                </div>
                            </div>
                        </div>
                    </div>
            );
            });
        }

        const returnFilterSelected = ()=>{
            if(selectedFilter === ""){return "Todos os Registros"}
            if(selectedFilter === "open"){return "ABERTAS"}
            if(selectedFilter === "close"){return "FECHADAS"}
        }


        const changeSelectedFilter = async (statusToFilter: string)=>{
           setSelectedFilter(statusToFilter);
           const returnController = await taskController.readAllByStatus(statusToFilter);
           return props.setTasks(returnController);
        }
        return(
        <div>
            <div className="grid grid-cols-2 mt-2">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button"onClick={()=> changeSelectedFilter("open")} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-l-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Abertas
                    </button>
                    <button type="button"onClick={()=> changeSelectedFilter("close")} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Finalizadas
                    </button>
                    <button type="button"onClick={()=> changeSelectedFilter("")} className="py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-r-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        Todas
                    </button>
                </div>
                <div className="inline-flex rounded-md shadow-sm justify-end" role="group">
                    <span>Filtrando por: {returnFilterSelected()} </span>
                </div>
            </div>
            <div className="grid grid-cols-1 mt-2">{showTasks()}</div>
        </div>
        )
}