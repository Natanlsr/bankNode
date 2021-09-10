import DepositCommand from "commands/write-commands/DepositCommand";
import TransferCommand from "commands/write-commands/TransferCommand";
import WithdrawCommand from "commands/write-commands/WithdrawCommand";
import { toAccountDetailsDto } from "dtos/AccountDetailsDto";
import AccountOperationDto from "dtos/operations/AccountOperationDto";
import TransferDto from "dtos/operations/TransferDto";
import Account from "models/Account";
import AccountStatus from "models/enums/AccountStatus";
import Operation from "models/enums/Operation";

jest.mock('commands/write-commands/WithdrawCommand');
jest.mock('commands/write-commands/DepositCommand');

describe('Testing transfer command', () => {
    test('Do transfer command with success', async () => {
        const transferDto = getTransferDto();
        
        const withdrawCommandSpy = jest.spyOn(WithdrawCommand, 'execute').mockImplementation(async () => getAccountDetailsDto());
        const depositCommandSpy = jest.spyOn(DepositCommand, 'execute').mockImplementation(async () => getAccountDetailsDto());

        await TransferCommand.execute(transferDto);

        const withdrawCommandReceived: AccountOperationDto = withdrawCommandSpy.mock.calls[0][0];
        const depositCommandReceived: AccountOperationDto = depositCommandSpy.mock.calls[0][0];

        expect(withdrawCommandSpy).toHaveBeenCalledTimes(1);
        expect(depositCommandSpy).toHaveBeenCalledTimes(1);
        expect(withdrawCommandReceived.amount).toEqual(transferDto.transaction?.amount);
        expect(withdrawCommandReceived.receiver).toEqual(transferDto.transaction?.receiver);
        expect(withdrawCommandReceived.payer).toEqual('');
        expect(depositCommandReceived.amount).toEqual(transferDto.transaction?.amount);
        expect(depositCommandReceived.payer).toEqual(transferDto.transaction?.payer);
        expect(depositCommandReceived.receiver).toEqual('');
    })

    test('Throw error because transaction is invalid', () => {
        const transferDto = getTransferDto();
        transferDto.transaction = undefined;
        
        TransferCommand.execute(transferDto).catch(e =>
            expect(e).toEqual({
              error: 'Command invalid',
            }),
        );
    })

    test('Throw error because transaction receiver is invalid', () => {
        const transferDto = getTransferDto();
        transferDto.transaction!!.receiver = null;
        
        TransferCommand.execute(transferDto).catch(e =>
            expect(e).toEqual({
              error: 'Command invalid',
            }),
        );
    })

    test('Throw error because transaction payer is invalid', () => {
        const transferDto = getTransferDto();
        transferDto.transaction!!.payer = null;
        
        TransferCommand.execute(transferDto).catch(e =>
            expect(e).toEqual({
              error: 'Command invalid',
            }),
        );
    })
})

function getTransferDto(): TransferDto{
    return {
        type: Operation.TRANSFER,
        tenant: "tenant-test",
        transaction:{
            id: "id-test",
            payer: "payer-test",
            receiver: "receiver-test",
            amount: 100
        }
    }
}

function getAccount(){
    return {
        id: "id-test",
        document: "doc-test",
        type: Account.name.toUpperCase(),
        balance: 100,
        status: AccountStatus.ACTIVE,
        creationDate: (new Date()).toString()
    }
}

function getAccountDetailsDto(){
    return toAccountDetailsDto(getAccount())
}
