import type DataRequest from "./DataRequest";

export default abstract class Service<IN = any> {
    
    dataRequest: DataRequest<IN>;

    constructor(dataRequest: DataRequest<IN>) {
        this.dataRequest = dataRequest;
    }
}