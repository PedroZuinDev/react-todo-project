import { ITask } from "../@types/task.interface";

export const mockedTasks = [
    {
        name: "Tarefa 1",
        description : "tarefa teste 01",
        status: "open"
    },
    {
        name: "Tarefa 2",
        description : "tarefa teste 02",
        status: "open"
    },
    {
        name: "Tarefa 3",
        description : "tarefa teste 03",
        status: "closed"
    },
    {
        name: "Tarefa 4",
        description : "tarefa teste 04",
        status: "closed"
    },
    {
        name: "Tarefa 5",
        description : "tarefa teste 05",
        status: "open"
    },
    {
        name: "Tarefa 6",
        description : "tarefa teste 06",
        status: "open"
    }
] as Array<ITask>