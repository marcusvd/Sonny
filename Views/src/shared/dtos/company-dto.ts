import { StockDto } from "src/components/product/dtos/stock-dto";
import { AddressDto } from "./address-dto";
import { ContactDto } from "./contact-dto";

export class CompanyDto {
   id:number ;
   name:string ;
   stock:StockDto;
   address:AddressDto ;
   contact:ContactDto ;
}
