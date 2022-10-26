import { ITask } from "../../@types/task.interface";

export const CircleButton = (props : any , obj = {} as ITask | any)=>{
    return (
        <button
            type="button"
            onClick={() => {
            props.action(obj.uniqueid as string);
            }}
            className={`text-white bg-${props.bgColorButton}-700 hover:bg-${props.bgColorButton}-800 focus:ring-4 focus:outline-none focus:ring-${props.bgColorButton}-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-${props.bgColorButton}-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
            {props.icon}
            <span className="sr-only">see</span>
        </button>
    )
}