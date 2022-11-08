import Swal from "sweetalert2"
import { ITask } from "../../@types/task.interface"
import { taskService } from "../../service/task.service";
import { showGenericToast } from "../Toast/success.toast";

export const showModalSeeDetailsTaskEdit = async (taskSelected: ITask , props : any) => {
    return await Swal.fire({
        title : props.title,
        backdrop : true,
        icon : "info",
        html : `
          <form>
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
                <input type="text" id="name" value="${taskSelected.name}"class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descrição</label>
                <input type="text"  id="description" value="${taskSelected.description}"class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
          </form>
        `,
        confirmButtonColor : "green",
        confirmButtonText : "Editar",
        cancelButtonColor : "red",
        showCancelButton : true,
        showLoaderOnConfirm : true,
      }).then(async (result) => {
          const taskToEdit = {
              uniqueid : taskSelected.uniqueid,
              //@ts-ignore
              description : document.getElementById("description")?.value,
              //@ts-ignore
              name : document.getElementById("name")?.value,
              //@ts-ignore
              status : taskSelected.status,
          } as ITask;

        if(result.isConfirmed){
          try{
            const returnTaskService = await taskService.update(taskToEdit);
            console.log("returnTaskService >> " , returnTaskService);
            await showGenericToast({icon : "success" , title : "Editado com Sucesso"});
            return taskToEdit;
          }catch(err: any){
            console.error(err.message);
          }
            
            
        }
      })
}