import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBenchDto } from "../dto/service-bench-dto";

@Injectable()
export class ServiceTechnicalBenchListService extends BackEndService<ServiceBenchDto, number>{

  private _serviceBenchFromDb: ServiceBenchDto[] = [];

  constructor(
    protected _Http: HttpClient,
  ) {
    super(_Http, null, environment._SERVICES_BENCH);
  }

  get serviceBenchFromDb(): ServiceBenchDto[] {
    return this._serviceBenchFromDb;
  }

  loadAllIncluded() {
    this.loadAllIncluded$<ServiceBenchDto>()
      .subscribe((serviceBenchDto: ServiceBenchDto[]) => {
        this._serviceBenchFromDb = serviceBenchDto;
      })
  }

}
