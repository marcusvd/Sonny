import { MyUser } from "src/components/authentication/dto/my-user";

import { BudgetServiceDto } from "src/components/bench-budget-service/dto/budget-service-dto";
import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { ProductDto } from "./product-dto";

export class TrackingDto {
  id: number;
  costPrice: number;
  soldPrice: number;
  sn: string;
  nfNumber: string;
  serviceId: number;
  service: BudgetServiceDto;
  // includedService:boolean;
  productId: number;
  product: ProductDto;
  customerId: number;
  customer: CustomerDto;
  userId: number;
  user: MyUser;

}
