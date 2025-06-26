import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { BackEndService } from "../../../../../../shared/services/back-end/backend.service";
import { CommunicationAlerts } from "../../../../../../shared/services/messages/snack-bar.service";
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
    this.update$<BankAccountDto>('UpdateFnBankAccount', toSave).subscribe({
      next: (checkingAccountDto: BankAccountDto) => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, '', 4);
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }
}
