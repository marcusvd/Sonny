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
    protected _Http: HttpClient,
    private _snackBar: MsgOperation,
  ) {
    super(_Http,environment._SERVICES_BENCH, environment._SERVICES_BENCH);
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

  update(form: UntypedFormGroup) {
    const toUpdate: ServiceBenchDto = { ...form.value }
    this.update$<ServiceBenchDto>(toUpdate).subscribe(() => {
      this._snackBar.msgCenterTop(`Bancada Atualizada.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
}
}
