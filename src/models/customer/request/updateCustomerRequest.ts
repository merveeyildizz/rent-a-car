export interface UpdateCustomerRequest{
    id: number;
    userId: number;
    nationalityId: string;
    firstName: string;
    lastName: string;
    gsm: string;
    birthDate: string;
}