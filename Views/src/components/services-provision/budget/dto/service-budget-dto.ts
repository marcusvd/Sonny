import { CustomerDto } from "src/components/main/customer/dto/customer-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";

export class ServiceBudgetDto {
  id: number;
  customerId: number;
  customer: CustomerDto;
  budgetStartedIn: Date;
  visually: string;
  remoteAccessData: string;
  customerProblems: string;
  benchStartedIn: Date;
  status: string;
  authorized:boolean;
  solutionsPrices: SolutionPriceDto[]
}
