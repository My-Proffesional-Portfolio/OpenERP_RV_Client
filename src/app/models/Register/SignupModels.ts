//https://adrianwilczynski.github.io/CSharpToTypeScript/
export module SignUpModels
{
    export interface NewCompanyOrganizationModel {
        legalName: string;
        commercialName: string;
        fiscalIdentificationNumber: string;
        address: string;
        phone: string;
        userName: string;
        password: string;
        email: string;
        officeNumberId: string;
        contactName: string;
    }
}

export default SignUpModels;