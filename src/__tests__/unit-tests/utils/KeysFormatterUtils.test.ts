import { KeysFormatterUtils } from "utils/KeysFormatterUtils";


describe('Testing Key Formatter Utils', () => {
    const tenant = "tenant-test";
    const value = "value";
    const type = "TYPE";
    const SEPARATOR = "#";
    const valueWithTenant = value + SEPARATOR + tenant;
    const valueWithType = type + SEPARATOR + value; 

    test('Should concant Tenat If Necessary with success', () => {
        const result = KeysFormatterUtils.concantTenatIfNecessary(value, tenant);
        expect(result).toEqual(valueWithTenant);
    });

    test('Shouldnt concant Tenat because it already has ', () => {
        const result = KeysFormatterUtils.concantTenatIfNecessary(valueWithTenant, tenant);
        expect(result).toEqual(valueWithTenant);
    });

    test('Should concant Tenat with success', () => {
        const result = KeysFormatterUtils.concatTenant(value, tenant);
        expect(result).toEqual(valueWithTenant);
    });


    test('Should concat Document Type with Success', () => {
        const result = KeysFormatterUtils.concatDocumentType(value, type);
        expect(result).toEqual(valueWithType);
    })

    test('Should get Document Type with Success', () => {
        const result = KeysFormatterUtils.getDocumentType(valueWithType);
        expect(result).toEqual(type);
    })
})
