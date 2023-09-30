import { ServiceDto } from "./Service-dto";

    export class PriceDto
    {
        id:number;
        serviceName:string;
        priceService:number;
        serviceId:number;
        service:ServiceDto;
    }
