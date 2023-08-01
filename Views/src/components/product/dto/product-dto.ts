import { PartnerDto } from "src/components/partner/dto/partner-dto";
import { ProductHistoriesDto } from "./Products-histories";
import { StockDto } from "./stock";

export class ProductDto {
  id: number;
  stockId: number;
  stock: StockDto;
  productHistory: ProductHistoriesDto[];
  equipamentType: string;
  normalizedName: string;
  isNew: boolean;
  isTested: boolean;
  description: string;
  usedHistorical: string;
}




















//The real day that record was inserted numbero database.



























