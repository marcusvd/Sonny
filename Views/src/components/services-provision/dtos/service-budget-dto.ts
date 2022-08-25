import { ClientDto } from "src/components/client/dto/client-dto";
import { SolutionPriceDto } from "./solution-price-dto";

export class ServiceBudgetDto {
  id: number;
  client: ClientDto;
  clientId: number;
  budgetStartedIn: Date;
  benchStartedIn: Date;
  clientProblems: string;
  status: string;
  visually: string;
  osMake: boolean;
  finished: boolean;
  solutionsPrices: SolutionPriceDto[]
}
