import { EquipamentDto } from "../../items-services/dto/equipament-dto";

export class SolutionPriceDto {
  id: number;
  dateService: Date;
  technician: string;
  priceService: number;
  technicalSolution: string;
  authorized: boolean;
  remote: boolean;
  comment:string;
}
