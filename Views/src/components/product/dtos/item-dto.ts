import { SegmentDto } from "./segment-dto";
import { ManufacturerDto } from "./manufacture-dto";

export class ItemDto {
  id: number;
  companyId: number;
  // company: CompanyDto;
  name: string;
  manufacturers: ManufacturerDto[];
  segments: SegmentDto[];
  // model: string;
}
