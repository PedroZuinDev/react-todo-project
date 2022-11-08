import { ITask } from "../../@types/task.interface";

export const SimpleButton = (props : any , obj = {} as ITask | any)=>{
    return (
        <button onClick={props.onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            {props.title}
        </button>
    )
}