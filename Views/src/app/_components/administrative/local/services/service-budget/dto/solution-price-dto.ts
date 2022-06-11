import { EquipamentDto } from "../../items-services/dto/equipament-dto";

export class SolutionPriceDto {
  id: number;
  dateservice: Date;
  technician: string;
  priceService: number;
  technicalsolution: string;
  authorized: boolean;
  remote: boolean;
}
