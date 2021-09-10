export namespace KeysFormatterUtils{
    const SEPARATOR = "#";

    export function concantTenatIfNecessary(value: string, tenant: string): string{
        var valueWithTenant = value;

        if(!value.includes(tenant)){
            valueWithTenant = concatTenant(value, tenant);
        }

        return valueWithTenant;
    }

    export function concatTenant(value: string, tenant: string): string{
        return value + SEPARATOR + tenant;
    }

    export function concatDocumentType(value:string, type: string): string{
        return type + SEPARATOR + value;
    }

    export function getDocumentType(type: string): string{
        return type.split(SEPARATOR)[0];
    }
}
