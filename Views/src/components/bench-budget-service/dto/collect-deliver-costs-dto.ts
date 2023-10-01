import { ICostFrom } from "./interfaces/i-cost-from";

    export class CollectDeliverCostsDto
    {
         id:number;
         isHaveCost:boolean;
         roundTrip:boolean;
         costFrom:ICostFrom;
         price:number;
         apartPrice:number;
    }

