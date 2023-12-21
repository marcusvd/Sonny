import { MyUser } from "src/components/authentication/dto/myUser";
import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { ProductDto } from "./product-dto";

export class TrackingDto {
  id: number;
  costPrice: number;
  soldPrice: number;
  sn: string;
  nfNumber: string;
  includedService:boolean;
  productId: number;
  product: ProductDto;
  customerId: number;
  customer: CustomerDto;
  userId: number;
  user: MyUser;

}
