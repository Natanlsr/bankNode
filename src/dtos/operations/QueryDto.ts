import Operation from "models/enums/Operation";
import BaseDto from "../BaseDto";

class QueryDto extends BaseDto{
    document?: string;

    constructor(document: string, type: Operation, tenant: string){
        super(type, tenant);
        this.document = document;
    }
}

export default QueryDto;
