import { useState } from "react"
import { ITask } from "../../@types/task.interface";
import { taskController } from "../../controllers/task.controller";
import { validatorTask } from "../../utils/validators/form-task.validator";
import { v4 as uuidv4 } from "uuid";
import { SpinnerToLoad } from "../Spinner/spinner-to-load";
import { InputWithLabel } from "../Input/input-with-label";
import { CircleButton } from "../Button/circle-button";
import { AddDocumentIcon } from "../Icons/svg/icons";
import { SimpleButton } from "../Button/simple-button";


export const FormToAddTask = (props : any)=>{

    const [form, setForm] = useState({} as ITask);
    const handleChange = (ev: any)=> setForm({...form , [ev.target.name] : ev.target.value});

    const submitForm = async () => {
      props.setShowLoading(true);
      let formToAdd = {
        name: form.name,
        description: form.description,
        status: "open",
        uniqueid: uuidv4(),
      } as ITask;
  
      if (!validatorTask.validateToAddNewTask(formToAdd)) {
        return;
      }
  
      props.setTasks([...props.tasks, formToAdd]);
      props.setShowLoading(false);
      clearForm();
      return await taskController.insert(formToAdd);
    };

    const clearForm = ()=>{
      let cloneForm = form;
      cloneForm = {description : "", name : "" , status : "" , uniqueid : ""}
      setForm(cloneForm);
    }

    return(
        <div className="grid grid-cols-1 bg-white w-auto justify-center p-10 rounded">
          <SpinnerToLoad showLoading={props.showLoading} />
          <div className="flex justify-center mb-6 mt-2 gap-20">
            <div className="md:w-100 lg:w-100 sm:w-100">
              <InputWithLabel name={"name"} value={form.name} label="Nome da Tarefa" form={form} handleChange={handleChange} />
              <InputWithLabel name={"description"} value={form.description} label="Descrição" form={form} handleChange={handleChange} />
              <div className="flex justify-between mt-5" >
                <div>
                  <label>
                    Data de Criação
                  </label>
                  <input type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <div>
                  <label>
                      DeadLine
                  </label>
                  <input type="datetime-local" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5" >
                <div>
                  <InputWithLabel name={"tag"} value={form.name} label="Tags ( Dividir com # )" form={form} handleChange={handleChange} />
                </div>
          </div>
          <div className="flex justify-center mt-5" >
            <SimpleButton title="Adicionar Tarefa" onClick={()=> submitForm()} />
          </div>
          <hr className="bg-black" />
      </div>
    )
}