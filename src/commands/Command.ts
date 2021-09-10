import AccountDetailsDto from "../dtos/AccountDetailsDto";
import BaseDto from "../dtos/BaseDto";

interface Command{
    execute(dto: BaseDto): Promise<AccountDetailsDto>;
}

export default Command;
