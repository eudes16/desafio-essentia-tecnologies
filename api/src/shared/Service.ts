export default abstract class Service<IN> {
    
    dataRequest: IN;

    constructor(dataRequest: IN) {
        this.dataRequest = dataRequest;
    }
}