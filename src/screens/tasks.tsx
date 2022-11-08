import { useEffect, useState } from "react";
import { ITask } from "../@types/task.interface";
import { taskController } from "../controllers/task.controller";
import { FormToAddTask } from "../components/Tasks/create-task-form";
import { ShowListTask } from "../components/Tasks/list-task";

export const TasksScreen = () => {
  const [tasks, setTasks] = useState([] as Array<ITask>);
  const [showLoading, setShowLoading] = useState(false);
  const [changeListTasks , setChangedListsTasks] = useState(false);

  useEffect(() => {
    setShowLoading(true);
    taskController
      .readAll()
      .then((response) => {
        setShowLoading(false);
        setTasks(response);
      })
      .catch((err) => {
        setShowLoading(false);
        throw err.message;
      });
  }, [changeListTasks]);

  return (
    <>
      <FormToAddTask showLoading={showLoading} setShowLoading={setShowLoading} tasks={tasks} setTasks={setTasks} />
      <ShowListTask setChangedListsTasks={setChangedListsTasks} tasks={tasks} setTasks={setTasks} showLoading={showLoading} setShowLoading={setShowLoading} />
    </>
  );
};
