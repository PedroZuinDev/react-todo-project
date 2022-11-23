import { SpinnerToLoad } from "../Spinner/spinner-to-load";
import { SimpleButton } from "../Button/simple-button";
import { showModalAddNewTask } from "../Modal/add-new-task";


export const FormToAddTask = (props : any)=>{

    const addTask = async () => {
      await showModalAddNewTask({
          title : "Adicionar Tarefa"
      });
      return props.setChangedListsTasks(!props.changeListTasks);
    };

    return(
        <div className="grid grid-cols-1 bg-white w-auto justify-center p-10 rounded">
          <SpinnerToLoad showLoading={props.showLoading} />
          <div className="flex justify-center mt-5" >
            <SimpleButton title="Adicionar Tarefa" onClick={()=> {addTask()}} />
          </div>
      </div>
    )
}