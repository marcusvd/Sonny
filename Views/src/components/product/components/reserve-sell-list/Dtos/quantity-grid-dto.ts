
import { MyUser } from "src/components/authentication/dto/my-user";
import { CustomerDto } from "src/components/main/customer/components/commons-components/dtos/customer-dto";
import { PartnerDto } from "src/components/main/partner/commons-components/dtos/partner-dto";
import { ProductDto } from "../../../dtos/product-dto";

export class QuantityGridDto {
  id: number;
  sn: string;
  nfNumber: string;
  costPrice: number;
  soldPrice: string;
  entryDate: Date;
  soldDate: Date;
  warrantyEnd: Date;
  isUsed: string;
  isTested: string;
  isReserved: Date;
  usedHistorical: string;
  customerId: number;
  customer: CustomerDto;
  productId: number;
  product: ProductDto;
  supplierId: number;
  supplier: PartnerDto;
  reservedByUserId: number;
  reservedByUser: MyUser;
}
