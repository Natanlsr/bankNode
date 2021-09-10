import TABLE_NAME from "utils/TableNameUtil"


describe('Testing table name util', () => {
    test('Should get Table name with success', () => {
        expect(TABLE_NAME).toEqual("bank")
    })
})
