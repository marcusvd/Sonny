import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { EquipamentDto } from "../components/inventory-equipament/dto/equipament-dto";


export class InventoryDto {

  id:number;
  equipamentId:number;
  equipament:EquipamentDto;
  cost:number;
  saleprice:number;
  isnew:boolean;
  istested:boolean;
  sold:boolean;
  partnerId:number;
  partner:PartnerDto;
  warranty:number;
  entryDate:Date;
  soldDate:Date;
  sn:string;
  driver:string;
  manufactorer:string;
  model:string;
  generation:string;
  capacity:string;
  speed:string;
  comment:string;
  historical:string;
}




















//The real day that record was inserted numbero database.



























