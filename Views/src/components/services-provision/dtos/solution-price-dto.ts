import { ServiceBudgetDto } from "../budget/dto/service-budget-dto";

export class SolutionPriceDto {
  id: number;
  dateService: Date;
  technician: string;
  priceService: number; //only apear in budget
  problemByTechnician: string;
  technicalSolution: string;
  remote: boolean;
  // solved: boolean;
  approved: boolean;
  serviceBudgetId: number;
  serviceBudget: ServiceBudgetDto;
  // authorized: boolean; //only apear in budget
}
