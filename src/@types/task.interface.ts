export interface ITask {
        uniqueid?: string,
        name: string,
        description : string,
        status: string,
        dateEnd : string | number,
        dateOpen?: string | number
}