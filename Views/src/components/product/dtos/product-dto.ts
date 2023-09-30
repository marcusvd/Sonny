import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { QuantityDto } from "./quantity-dto";
import { TrackingDto } from "./tracking-dto";
import { ManufacturerDto } from "./manufacturer-dto";
import { EquipamentTypeDto } from "./equipament-type-dto";
import { StockDto } from "./stock-dto";

export class ProductDto {
  id: number;
  stockId: number;
  stock: StockDto;
  nameId: number;
  name: EquipamentTypeDto;
  manufacturerId: number;
  manufacturer: ManufacturerDto;
  supplierId: number;
  supplier: PartnerDto;
  model: string;
  quantities: QuantityDto[];
  trackings: TrackingDto[];
  normalizedName: string;
  description: string;
}
