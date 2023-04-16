import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { ServiceBenchDto } from "../dto/service-bench-dto";
import { UntypedFormGroup } from "@angular/forms";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";

@Injectable()
export class ServiceTechnicalBenchListService extends BackEndService<ServiceBenchDto, number>{

  private _serviceBenchFromDb: ServiceBenchDto[] = [];

  constructor(
    override _http: HttpClient,
    private _snackBar: MsgOperation,
  ) {
    super(_http,environment._SERVICES_BENCH);
  }

  get serviceBenchFromDb(): ServiceBenchDto[] {
    return this._serviceBenchFromDb;
  }

  loadAllIncluded() {
    this.loadAll$<ServiceBenchDto>('GetServiceBench')
      .subscribe((serviceBenchDto: ServiceBenchDto[]) => {
        this._serviceBenchFromDb = serviceBenchDto;
      })
  }

  update(form: UntypedFormGroup) {
    const toUpdate: ServiceBenchDto = { ...form.value }
    this.update$<ServiceBenchDto>(null, toUpdate).subscribe(() => {
      this._snackBar.msgCenterTop(`Bancada Atualizada.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
}
}
