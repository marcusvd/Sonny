import { EquipamentFillDto } from "./equipament-fill-dto";
import { ManufacturerFillDto } from "./manufacturer-fill-dto";
import { SegmentFillDto } from "./segment-fill-dto";

export class GetTogetherDto {
  equipaments_Fill: EquipamentFillDto[];
  manufacturers_Fill: ManufacturerFillDto[];
  segments_Fill: SegmentFillDto[];
}
