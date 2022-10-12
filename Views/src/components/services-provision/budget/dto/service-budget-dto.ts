import { ClientDto } from "src/components/client/dto/client-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";

export class ServiceBudgetDto {
  id: number;
  clientId: number;
  client: ClientDto;
  budgetStartedIn: Date;
  visually: string;
  remoteAccessData: string;
  clientProblems: string;
  benchStartedIn: Date;
  status: string;
  authorized:boolean;
  solutionsPrices: SolutionPriceDto[]
}
