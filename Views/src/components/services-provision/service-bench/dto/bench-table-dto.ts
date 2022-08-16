import { ClientDto } from "src/components/client/dto/client-dto";
import { SolutionPriceDto } from "../../service-budget/dto/solution-price-dto";

export class BenchTableDto {
  id: number;
  client: string;
  entryDateOs: Date;
  clientProblems: string;
  status: string;

}
