import { ServiceDto } from "./Service-dto";
import { RepairStatusEnum } from "./interfaces/i-repair-status.enum";

export class RepairDto {
  id: number;
  serviceName: string;
  priceService: number;
  serviceId: number;
  service: ServiceDto;
  added: Date;
  executedServicesComments: string
  repairStatus: RepairStatusEnum;
  executionMode:number;
}
