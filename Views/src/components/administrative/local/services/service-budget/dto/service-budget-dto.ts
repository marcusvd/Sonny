import { ClientDto } from "src/components/administrative/client/dto/client-dto";
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
