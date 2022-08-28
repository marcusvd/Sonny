
import { ClientDto } from "../../table-g/dtos/client-dto";
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
