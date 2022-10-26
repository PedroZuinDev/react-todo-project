import { useState } from "react"
import { ITask } from "../../@types/task.interface";
import { taskController } from "../../controllers/task.controller";
import { validatorTask } from "../../utils/validators/form-task.validator";
import { v4 as uuidv4 } from "uuid";
import { SpinnerToLoad } from "../Spinner/spinner-to-load";
import { InputWithLabel } from "../Input/input-with-label";
import { CircleButton } from "../Button/circle-button";
import { AddDocumentIcon } from "../Icons/svg/icons";

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
      return await taskController.insert(formToAdd);
    };

    return(
        <div className="grid grid-cols-1 bg-white w-auto justify-center p-10 rounded">
          <SpinnerToLoad showLoading={props.showLoading} />
          <div className="flex justify-center mb-6 mt-2 gap-20">
            <div className="md:w-1/2">
              <InputWithLabel name={"name"} value={form.name} label="Nome da Tarefa" form={form} handleChange={handleChange} />
              <InputWithLabel name={"description"} value={form.description} label="Descrição" form={form} handleChange={handleChange} />
              <CircleButton bgColorButton="green" icon={<AddDocumentIcon />} action={submitForm} />
            </div>
            <div className="md:w-2/2 flex justify-center"></div>
          </div>
          <hr className="bg-black" />
      </div>
    )
}