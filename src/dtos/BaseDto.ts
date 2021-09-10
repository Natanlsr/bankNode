import Operation from "models/enums/Operation";

class BaseDto{
    type: string;
    tenant: string | null = null;

    constructor(type: string, tenant: string){
        this.type = type;
        this.tenant = tenant;
    }
}

export default BaseDto;
