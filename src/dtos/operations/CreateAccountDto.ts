import BaseDto from "dtos/BaseDto";
import Operation from "models/enums/Operation";
import Account from "../../models/Account";

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
