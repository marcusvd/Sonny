import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { ProductDto } from "./product-dto";

    export class TrackingDto
    {
        id:number;
        productId:number;
        product:ProductDto;
        costPrice:number;
        soldPrice:number;
        sn:string;
        nfNumber:string;
        customerId:number;
        customer:CustomerDto;
        userId:number;
        user:MyUser;

    }
