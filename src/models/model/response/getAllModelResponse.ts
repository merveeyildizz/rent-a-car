import { GetByIdBrandResponse } from "../../brands/response/getByIdBrandResponse";

export interface GetAllModelResponse{
    id: number;
    name:string;
    brandResponse: GetByIdBrandResponse;
}