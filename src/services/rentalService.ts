import { AxiosResponse } from "axios";
import { AddRentalRequest } from "../models/rental/request/addRentalRequest";
import { UpdateRentalRequest } from "../models/rental/request/updateRentalRequest";
import { AddRentalResponse } from "../models/rental/response/addRentalResponse";
import { GetAllRentalResponse } from "../models/rental/response/getAllRentalResponse";
import { GetByIdRentalResponse } from "../models/rental/response/getByIdRentalResponse";
import { UpdateRentalResponse } from "../models/rental/response/updateRentalResponse";
import { BaseService } from "./baseService";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

class RentalService extends BaseService<GetAllRentalResponse,
GetByIdRentalResponse,
AddRentalRequest,
AddRentalResponse,
UpdateRentalRequest,
UpdateRentalResponse
>{
  constructor() {
		super();
		this.apiUrl = "rentals";
	}
	rental(request:AddRentalRequest): Promise<AxiosResponse<string,any>>{
        return axiosInstance.post<string>(this.apiUrl, request);
    }

}

export default new RentalService();