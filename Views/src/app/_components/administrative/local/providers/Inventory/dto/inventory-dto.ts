import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { EquipamentDto } from "../../../services/service-bench/datasheet/dto/equipament-dto";
import { PartnerDto } from "../../../out-sourced/dto/partner-dto";

export class InventoryDto {

  id:number;
  equipamentId:number;
  equipamentDto:EquipamentDto;
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



























