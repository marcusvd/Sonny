import { CostFromEnumDto } from "./enums/cost-from-enum-dto";

    export class CollectDeliverCostsDto
    {
         id:number;
         isHaveCost:boolean;
         roundTrip:boolean;
         costFrom:CostFromEnumDto;
         price:number;
         apartPrice:number;
    }

