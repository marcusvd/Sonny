import { AddressDto } from "./address-dto";
import { ContactDto } from "./contact-dto";

export class CompanyDto {
   id:number ;
   name:string ;
   address:AddressDto ;
   contact:ContactDto ;
}
