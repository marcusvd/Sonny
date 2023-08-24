import { CustomerDto } from "src/components/main/customer/dtos/customer-dto";
import { BenchToCashBoxDto } from "./bench-to-Cash-Box-Dto";

export class ServiceBenchDto {
   id:number;
   customerId:number;
   customer:CustomerDto;
   dateServiceStarted:Date;
   dateServiceFinished: Date;
   remote:boolean;
   remoteAccessData:string;
   visually:string; //localAccessData
   status:string;
   finished:boolean;
   listBenchToCashBox:BenchToCashBoxDto[];
}
