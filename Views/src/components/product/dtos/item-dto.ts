import { SegmentFillDto } from "./segment-fill-dto";
import { ManufacturerFillDto } from "./manufacturer-fill-dto";

export class ItemDto {
  id: number;
  companyId: number;
  // company: CompanyDto;
  name: string;
  manufacturers: ManufacturerFillDto[];
  segments: SegmentFillDto[];
  // model: string;
}
