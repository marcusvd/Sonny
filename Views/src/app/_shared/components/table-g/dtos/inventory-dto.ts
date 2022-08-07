
import { EquipamentDto } from "./equipament-dto";
import { PartnerDto } from "./partner-dto";

export class InventoryDto {

  id:number;
  equipamentId:number;
  equipament:EquipamentDto;
  cost:number;
  saleprice:number;
  isnew:boolean;
  istested:boolean;
  quantity:number;
  partnerId:number;
  partner:PartnerDto;
  warranty:number;
  today:Date;
  sn:string;
  driver:string;
  manufactorer:string;
  model:string;
  generation:string;
  capacity:string;
  speed:string;
  comment:string;
  historical:string;
  today_:Date;
  toseach:string;

}




















//The real day that record was inserted numbero database.



























