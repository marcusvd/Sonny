import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dto/customer-dto";
import { ProductDto } from "./product-dto";

    export class TrackingDto
    {
        Id:number;
        ProductId:number;
        Product:ProductDto;
        CostPrice:number;
        SoldPrice:number;
        Sn:string;
        NfNumber:string;
        CustomerId:number;
        Customer:CustomerDto;
        UserId:number;
        User:MyUser;

    }
