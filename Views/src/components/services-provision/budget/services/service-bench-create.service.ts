import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ClientListService } from "src/components/client/client-list/services/client-list.service";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ServiceBenchDto } from "../../bench/dto/service-bench-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { BenchToCashBoxDto } from "../../bench/dto/bench-to-Cash-Box-Dto";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class ServiceBenchCreateService extends BackEndService<ServiceBenchDto, number>{

  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
  ) {
    super(_Http, environment._SERVICES_BENCH);
  }
  buildServiceBenchDto(serviceBudgetDto: ServiceBudgetDto) {

    const serviceBenchDto = new ServiceBenchDto();

    serviceBenchDto.clientId = serviceBudgetDto.clientId;
    serviceBenchDto.dateServiceStarted = new Date();

    if (serviceBudgetDto.remoteAccessData) {
      serviceBenchDto.remote = true;
    }

    serviceBenchDto.remoteAccessData = serviceBudgetDto.remoteAccessData;
    serviceBenchDto.visually = serviceBudgetDto.visually;
    serviceBenchDto.status = 'Em execução...';
    serviceBenchDto.finished = false;

    return serviceBenchDto;
  }

  buildBenchToCashBoxDto(solutionPriceDto: SolutionPriceDto[]) {

    const benchToCashBoxDtoArray: BenchToCashBoxDto[] = [];

    solutionPriceDto.forEach((sp: SolutionPriceDto) => {

      const benchToCashBoxDto = new BenchToCashBoxDto();

      if (sp.approved) {
        benchToCashBoxDto.priceService = sp.priceService;
        benchToCashBoxDto.problemByTechnician = sp.problemByTechnician;
        // benchToCashBoxDto.serviceBenchId = this.buildServiceBenchDto().id;
        benchToCashBoxDto.solved = false;
        benchToCashBoxDto.technician = sp.technician;
      }

      benchToCashBoxDtoArray.push(benchToCashBoxDto)

    });
    return benchToCashBoxDtoArray;
  }

  addServiceBench(serviceBudgetDto: ServiceBudgetDto) {
    let created = new BehaviorSubject<boolean>(false);

    let serviceBenchDto = new ServiceBenchDto();

    serviceBenchDto = this.buildServiceBenchDto(serviceBudgetDto);

    serviceBenchDto.listBenchToCashBox = this.buildBenchToCashBoxDto(serviceBudgetDto.solutionsPrices)


    this.add$<ServiceBenchDto>(serviceBenchDto).subscribe(() => {
      this._SnackBar.msgCenterTop(`Serviço adicionado a bancada.`, 0, 5);
      created.next(true);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
    return created;
  }

}
