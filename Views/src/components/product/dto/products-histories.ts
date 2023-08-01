import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { ProductDto } from "./product-dto";
import { StatusEnum } from "./status-enum";

export class ProductHistoriesDto {
  id: number;
  productId: number;
  product: ProductDto;
  supplierId: number;
  suppliers: PartnerDto;
  sn: string;
  nfNumber: string;
  manufacturer: string;
  model: string;
  status: StatusEnum;
  quantity: number;
  quantityReserved: number;
  entryDate: Date;
  soldDate: Date;
  warranty: Date;
  costPrice: number;
  salePrice: number;
}














//The real day that record was inserted numbero database.



























