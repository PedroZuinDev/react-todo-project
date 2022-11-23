import { ITask } from "../@types/task.interface";
import { taskService } from "../service/task.service";

class TaskController {

    async insert(task : ITask){
        return await taskService.insert(task);
    }
    async readAll():Promise<Array<ITask>>{
        return await taskService.readAll();
    }
    async readOneByID(id : string){
        return await taskService.readOneByID(id);
    }
    async delete(id: string){
        return await taskService.delete(id);
    }
    async checkOrUncheckTask(idtask : string){
        return await taskService.checkOrUncheckTask(idtask);
    }
    async readAllByStatus(statusToFilterSelected: string){
        if(statusToFilterSelected === ""){
            return await taskService.readAll();
        }
        return await taskService.readAllByStatus(statusToFilterSelected);
    }

}

export const taskController = new TaskController();