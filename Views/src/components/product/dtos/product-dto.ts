import { PartnerDto } from "src/components/main/partner/dto/partner-dto";
import { QuantityDto } from "./quantity-dto";
import { TrackingDto } from "./tracking-dto";
import { ManufacturerDto } from "./manufacturer-dto";
import { EquipamentTypeDto } from "./equipament-type-dto";
import { StockDto } from "./stock-dto";

export class ProductDto {
  Id: number;
  StockId: number;
  Stock: StockDto;
  NameId: number;
  Name: EquipamentTypeDto;
  ManufacturerId: number;
  Manufacturer: ManufacturerDto;
  SupplierId: number;
  Supplier: PartnerDto;
  Model: string;
  Quantities: QuantityDto[];
  Trackings: TrackingDto[];
  NormalizedName: string;
  Description: string;
}
