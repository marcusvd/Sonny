import { ServiceBenchDto } from "./service-bench-dto";

export class BenchToCashBoxDto {
  id:number;
  technician:string;
  priceService:number;
  problemByTechnician:string;
  technicalSolutionApplied:string;
  // cantBeSolved:string;
  status:string;
  solved:boolean;
  // hardware:boolean;
  serviceBenchId:number;
  serviceBench:ServiceBenchDto;
}
