import { collection, getDocs , setDoc , doc, query , where , deleteDoc , updateDoc} from "firebase/firestore/lite";
import { ITask } from "../@types/task.interface";
import { databseInstance } from "../firebase/configuration";



class TaskService{

    private collectionQuery = collection(databseInstance , "task");

    async insert(task : ITask){
       return await setDoc(doc(this.collectionQuery) , task , { merge : true });
    }
    async readAll(){
        const getSnapShot = await getDocs(this.collectionQuery);
        return getSnapShot.docs.map(doc => doc.data()) as Array<ITask>;
    }
    async readOneByID(id: string){
        const queryToExecute = query(this.collectionQuery, where("uniqueid" , "==" , id))
        const collectionQuerys = await getDocs(queryToExecute);
        return collectionQuerys.docs.map(doc => doc.data()) as Array<ITask>;
    }
    async delete(id: string){
        const queryToExecute = query(this.collectionQuery, where("uniqueid" , "==" , id))
        const collectionQuerys = await getDocs(queryToExecute);
        return Promise.all(collectionQuerys.docs.map(async (doc) => {
            return await deleteDoc(doc.ref)
        }));
    }
    async checkOrUncheckTask(idtask: string){
        const queryToExecute = query(this.collectionQuery, where("uniqueid" , "==" , idtask));
        const collectionQuerys = await getDocs(queryToExecute);
        return Promise.all(collectionQuerys.docs.map(async (doc) => await updateDoc(doc.ref , {status : doc.data().status === "open" ? "close" : "open"})));
    } 
}
export const taskService = new TaskService();