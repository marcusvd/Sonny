import { ClientDto } from "src/components/client/dto/client-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";

export class ServiceBudgetDto {
  id: number;
  clientId: number;
  client: ClientDto;
  budgetStartedIn: Date;
  visually: string;
  remoteData: string;
  clientProblems: string;
  benchStartedIn: Date;
  status: string;
  solutionsPrices: SolutionPriceDto[]
}
