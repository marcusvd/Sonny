import { CostFromEnumDto } from "./enums/cost-from-enum-dto";

    export class CollectDeliverCostsDto
    {
         Id:number;
         IsHaveCost:boolean;
         RoundTrip:boolean;
         CostFrom:CostFromEnumDto;
         Price:number;
         ApartPrice:number;
    }

