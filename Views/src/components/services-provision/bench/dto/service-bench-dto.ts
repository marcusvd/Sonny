import { ClientDto } from "src/components/client/dto/client-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";

export class ServiceBenchDto {
  id: number;
  client: ClientDto;
  clientId: number;
  benchStartedIn: string;
  clientProblems: string;
  status: string;
  user: string;
  visually: string;
  finished: string;
  solutionsPrices: SolutionPriceDto[]
}
