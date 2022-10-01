import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ValidatorsService } from "src/shared/helpers/validators.service";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";


import { SolutionPriceDto } from "../../dtos/solution-price-dto";
@Injectable()
export class SolutionsPricesServices extends BackEndService<SolutionPriceDto, number>{

  constructor(
    protected _Http: HttpClient,
    private _SnackBar: MsgOperation,
    public _ValidationMsg: ValidatorsService,
  ) {
    super(_Http, environment._SOLUTIONS_PRICES_DELETE);
  }

  delete(solutionPriceDto: SolutionPriceDto) {

    this.delete$<SolutionPriceDto>(solutionPriceDto).subscribe(() => {
      this._SnackBar.msgCenterTop(`Orçamento foi excluido.`, 0, 5);
    },
      (error) => { console.log(error) },
      () => {
        console.log('complete')
      },
    )
  }


}
