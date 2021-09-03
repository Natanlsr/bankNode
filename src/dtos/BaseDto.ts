import Operation from "models/enums/Operation";

class BaseDto{
    type: String

    constructor(type: String){
        this.type = type
    }
}

export default BaseDto;
