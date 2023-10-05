import { ICostFrom } from "./interfaces/i-cost-from";

    export class CollectDeliverCostsDto
    {
         id:number;
         roundTrip:boolean;
         costFrom:ICostFrom;
         price:number;
    }

