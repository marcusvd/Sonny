import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { EquipamentDto } from "../../items-services/dto/equipament-dto";
import { SolutionPriceDto } from "./solution-price-dto";

export class ServiceBudgetDto {
  id: number;
  client: ClientDto;
  clientId: number;
  entryDate: Date;
  entryDateOs: Date;
  clientProblems: string;
  status: string;
  visually: string;
  osMake: boolean;
  finished: boolean;
  solutionsPrices: SolutionPriceDto[]
}
