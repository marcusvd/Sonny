import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { BankAccountDto } from "../../dto/bank-account-dto";


@Injectable({ providedIn: 'root' })
export class BankAccountCardsEditService extends BackEndService<BankAccountDto> {

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    override _http: HttpClient,
    private _route: Router,
  ) { super(_http, environment._BANKSACCOUNTS) }

  update(form: FormGroup) {
    const toSave: BankAccountDto = { ...form.value };
    console.log(toSave)
    this.update$<BankAccountDto>('UpdateFnBankAccount', toSave).subscribe({
      next: (checkingAccountDto: BankAccountDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
        // this._route.navigateByUrl(`/list/${this.companyId}`)
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }
}
