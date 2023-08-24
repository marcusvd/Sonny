import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { ProductDto } from "./product-dto";
import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { MyUser } from "src/components/authentication/dto/myUser";

    export class QuantityDto
    {
        Id:number;
         Sn:string;
         NfNumber:string;
         CostPrice:number;
         SoldPrice:number;
         EntryDate:Date;
         SoldDate:Date;
         WarrantyEnd:Date;
         IsUsed:boolean;
         IsTested:boolean;
         IsReserved:Date;
         UsedHistorical:string;
         CustomerId:number;
         Customer:CustomerDto;
         ProductId:number;
         Product:ProductDto;
         SupplierId:number;
         Supplier:PartnerDto;
         ReservedByUserId:number;
         ReservedByUser:MyUser;
    }
