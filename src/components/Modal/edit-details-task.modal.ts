import Swal from "sweetalert2"
import { ITask } from "../../@types/task.interface"
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
              <input type="text" value="${taskSelected?.name}" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
          </div>
          <div>
              <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Descrição</label>
              <input type="text" value="${taskSelected?.description}" id="description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required>
          </div>
          <div>
              <label for="status" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
              <select id="status" value="${taskSelected?.status}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Selecione</option>
                <option value="open">Aberta</option>
                <option value="close">Fechada</option>
              </select>
              </div>
        </form>
        `,
        confirmButtonColor : "green",
        confirmButtonText : "Editar",
        cancelButtonColor : "red",
        showCancelButton : true,
        showLoaderOnConfirm : true,
      }).then(async (result) => {
        if(result.isConfirmed){
            return await showGenericToast({icon : "success" , title : "Editado com Sucesso"});
        }
      })
}