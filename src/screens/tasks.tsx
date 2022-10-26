import { useEffect, useState } from "react";
import { ITask } from "../@types/task.interface";
import { taskController } from "../controllers/task.controller";
import { FormToAddTask } from "../components/Tasks/create-task-form";
import { ShowListTask } from "../components/Tasks/list-task";

export const TasksScreen = () => {
  const [tasks, setTasks] = useState([] as Array<ITask>);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    taskController
      .readAll()
      .then((response) => {
        setTasks(response);
      })
      .catch((err) => {
        throw err.message;
      });
  }, []);

  return (
    <>
      <FormToAddTask showLoading={showLoading} setShowLoading={setShowLoading} tasks={tasks} setTasks={setTasks} />
      <ShowListTask tasks={tasks} setTasks={setTasks} showLoading={showLoading} setShowLoading={setShowLoading} />
    </>
  );
};
