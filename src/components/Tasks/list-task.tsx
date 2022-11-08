import { ITask } from "../../@types/task.interface";
import { taskController } from "../../controllers/task.controller";
import { CircleButton } from "../Button/circle-button";
import { CheckIcon, EyeIcon, PenIcon, TrashIcon } from "../Icons/svg/icons";
import { showModalSeeDetailsTaskEdit } from "../Modal/edit-details-task.modal";
import { showGenericToast } from "../Toast/success.toast";

export const ShowListTask = (props: any)=>{


        const showItemDetail = async (id: string) => {
            const taskSelected = props.tasks.find((task: ITask) => task.uniqueid === id) as ITask;
            showModalSeeDetailsTaskEdit(taskSelected , {
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
            const returnModalValue = await showModalSeeDetailsTaskEdit(taskSelected , {
                title : "Editar Tarefa"
            });
            let cloneTasks = props.tasks;
            const indexObject = cloneTasks.indexOf((row: ITask) => row.uniqueid === returnModalValue?.uniqueid);
            cloneTasks[indexObject] = returnModalValue;
            return props.setTasks(cloneTasks);
        };

        const showTasks = () =>
            props.tasks.map((index: ITask) => {
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
                        <p className="text-gray-700 text-base">{index.description}</p>
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
        return(
        <div>
            <div className="grid grid-cols-1 mt-2">{showTasks()}</div>
        </div>
        )
}