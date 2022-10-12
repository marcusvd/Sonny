import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { InventoryDto } from "src/components/providers/Inventory/dto/inventory-dto";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ClientDto } from "src/components/client/dto/client-dto";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { ServiceBenchDto } from "../../bench/dto/service-bench-dto";
import { BenchToCashBoxDto } from "../../bench/dto/bench-to-Cash-Box-Dto";
import { ServiceBenchCreateService } from "./service-bench-create.service";
@Injectable()
export class ServicesBudgetUpdate extends BackEndService<ServiceBudgetDto, number>{

  constructor(
    protected _Http: HttpClient,
    private _snackBar: MsgOperation,
    private _serviceBenchCreateService: ServiceBenchCreateService,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }


  addUpdate(form: FormGroup) {

    const toSave: ServiceBudgetDto = { ...form.value };

    if (toSave.authorized) {

      if (this._serviceBenchCreateService.addServiceBench(toSave)) {
        this.updateServiceBudget(toSave);
      }

    }
    else{
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

