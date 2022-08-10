export class SolutionPriceDto {
  id: number;
  dateService: Date;
  technician: string;
  priceService: number;
  technicalSolution: string;
  authorized: boolean;
  solved: boolean;
  remote: boolean;
  comment:string;
}
