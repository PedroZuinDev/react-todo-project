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
    update(){}
    delete(){}

}

export const taskController = new TaskController();