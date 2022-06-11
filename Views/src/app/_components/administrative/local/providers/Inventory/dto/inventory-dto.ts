import { CategoryDto } from "./category-dto";
import { SupplierDto } from "../../supplier/dto/supplier-dto";
import { SubCategoryDto } from "./sub-category-dto";

export class InventoryDto {

  id:number;
  subcategoryid:number;
  subcategory:SubCategoryDto;
  cost:number;
  saleprice:number;
  isnew:boolean;
  istested:boolean;
  supplierid:number;
  supplier:SupplierDto;
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



























