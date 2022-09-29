import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { environment } from "src/environments/environment";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { ValidatorsService } from "src/shared/helpers/validators.service";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";
import { ServiceBudgetDto } from "../../budget/dto/service-budget-dto";
import { SolutionPriceDto } from "../../dtos/solution-price-dto";
import { ServiceBenchDto } from "../dto/service-bench-dto";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";





@Injectable()

export class ServiceBenchCreateService extends BackEndService<ServiceBudgetDto, number>{





  constructor(
    protected _Http: HttpClient,
    private _Fb: FormBuilder,
    private _Dialog: MatDialog,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
   // private _ServicesBgtSrv: ServicesBudgetListService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);

  }


  save(id: number, form: FormGroup) {

    form.value.id = id;
    console.log(form.value)
    const toSave: ServiceBudgetDto = { ...form.value }

    console.log(toSave)

    this.update$<ServiceBudgetDto>(toSave).subscribe(
      (srvBudgetDto: ServiceBudgetDto) => {
        this._SnackBar.msgCenterTop(`Orçamento`, 0, 5);
        this._ValidationMsg.cleanAfters(['contact', 'addresss'], form);
      },
      (error) => { console.log(error) },
      () => {
        // console.log('complete')
      },

    )
  }





}
