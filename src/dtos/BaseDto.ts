import Operation from "models/enums/Operation";

class BaseDto{
    type: Operation

    constructor(type: Operation){
        this.type = type
    }
}

export default BaseDto;
