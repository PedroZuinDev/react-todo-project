import { ITask } from "../../@types/task.interface";

class ValidatorTask { 
    validateToAddNewTask(task : ITask): Boolean{
        if(!task.name) return false;
        if(!task.description) return false;
        if(!task.status) return false;

        return true;
    }
}


export const validatorTask = new ValidatorTask();