import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ServiceBenchCreateService } from "./service-bench-create.service";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class ServicesBudgetUpdate extends BackEndService<ServiceBudgetDto, number>{

  updateGridBudgetAfterMadeBench = new BehaviorSubject<boolean>(false);

  constructor(
    protected _Http: HttpClient,
    private _snackBar: MsgOperation,
    private _serviceBenchCreateService: ServiceBenchCreateService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }


  addUpdate(form: FormGroup) {

    const toSave: ServiceBudgetDto = { ...form.value };

    if (toSave.authorized) {

      this._serviceBenchCreateService.addServiceBench(toSave).subscribe((result: boolean) => {
        if (result) {
          this.updateServiceBudget(toSave);
          this.updateGridBudgetAfterMadeBench.next(true);

        }
      })
      return this.updateGridBudgetAfterMadeBench;
    }
    else {
      this.updateServiceBudget(toSave);
    }


  }

  updateServiceBudget(serviceBudgetDto: ServiceBudgetDto) {
    this.update$<ServiceBudgetDto>(serviceBudgetDto).subscribe(() => {
      this._snackBar.msgCenterTop(`Orçamento Atualizado.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
  }



}

