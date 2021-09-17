import Operation from "../../models/enums/Operation";
import BaseDto from "../BaseDto";

class CreateAccountDto extends BaseDto{
    document?: string;
    balance?: number;

    constructor(document: string, balance: number, type: Operation, tenant: string) {
        super(type, tenant);
        this.document = document;
        this.balance = balance;
    }
}

export default CreateAccountDto;
