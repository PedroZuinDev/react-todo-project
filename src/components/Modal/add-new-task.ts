import {v4 as uuid} from "uuid";
import Swal from "sweetalert2"
import { ITask } from "../../@types/task.interface"
import { taskService } from "../../service/task.service";
import { showGenericToast } from "../Toast/success.toast";

export const showModalAddNewTask = async (props : any) => {
    return await Swal.fire({
        title : props.title,
        backdrop : true,
        icon : "info",
        html : `
          <form>
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nome</label>
                <input type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descrição</label>
                <input type="text"  id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
            <div>
                <label for="deadline" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Data de Encerramento</label>
                <input type="datetime-local" id="deadline" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
            </div>
          </form>
        `,
        confirmButtonColor : "green",
        confirmButtonText : "Adicionar",
        cancelButtonColor : "red",
        showCancelButton : true,
        showLoaderOnConfirm : true,
      }).then(async (result) => {

          const taskToAdd = {
              uniqueid : uuid(),
              //@ts-ignore
              description : document.getElementById("description")?.value,
              //@ts-ignore
              name : document.getElementById("name")?.value,
              //@ts-ignore
              status : "open",
              dateOpen : new Date().getTime(),
              //@ts-ignore
              dateEnd : new Date(document.getElementById("deadline")?.value).getTime()
          } as ITask;

        if(result.isConfirmed && isValidSchemaFormat(taskToAdd)){
          try{
            await taskService.insert(taskToAdd);
            await showGenericToast({icon : "success" , title : "Adicionado com Sucesso"});
            return taskToAdd;
          }catch(err: any){
            console.error(err.message);
          }
        }
        await showGenericToast({icon : "error" , title : "Erro de Formulário Verifique os campos"});
      })
}

const isValidSchemaFormat = (obj : ITask) : boolean =>{
    if(obj.description === "") return false;
    if(obj.name === "") return false;
    if(obj.status === "") return false;
    return true
}