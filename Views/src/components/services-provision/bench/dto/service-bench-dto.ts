import { ClientDto } from "src/components/client/dto/client-dto";
import { BenchToCashBoxDto } from "./bench-to-Cash-Box-Dto";

export class ServiceBenchDto {
   id:number;
   clientId:number;
   client:ClientDto;
   dateServiceStarted:Date;
   dateServiceFinished: Date;
   remote:boolean;
   remoteAccessData:string;
   visually:string; //localAccessData
   status:string;
   finished:boolean;
   listBenchToCashBox:BenchToCashBoxDto[];
}
