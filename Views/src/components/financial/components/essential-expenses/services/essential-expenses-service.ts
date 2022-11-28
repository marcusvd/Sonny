import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { EssentialExpenseDto } from "../dto/essential-expense-dto";

@Injectable()
export class EssentialExpensesService extends BackEndService<EssentialExpenseDto, number> {

  get EssentialExpensesArray(): any[] {
    return this._essentialExpensesArray
  }

  private _essentialExpensesArray: any[] = [
    { id: 0, expense: 'ALUGUEL' },
    { id: 1, expense: 'ÁGUA' },
    { id: 2, expense: 'LUZ' },
    { id: 3, expense: 'TELEFONE' },
    { id: 4, expense: 'INTERNET' },
    { id: 5, expense: 'CONDOMÍNIO' },
    { id: 7, expense: 'ALIMENTAÇÃO' },
    { id: 8, expense: 'TRANSPORTE' },
    { id: 9, expense: 'SEGUROS' },
    // { id: 10, expense: 'SAÚDE' },
    // { id: 11, expense: 'HIGIENE' },
    { id: 6, expense: 'GÁS' },
    { id: 12, expense: 'IMPOSTOS' },
    { id: 13, expense: 'OUTROS' },
  ];

  get expirationCycleArray(): any[] {
    return this._expirationCycleArray
  }

  private _expirationCycleArray: any[] = [
    { id: 0, expiration: 'MENSAL' },
    { id: 1, expiration: 'ANUAL' },
    // { id: 2, expiration: 'DIÁRIO' },
  ];

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    protected _Http: HttpClient
  ) { super(_Http, environment._ESSENTIALS_EXPENSES) }

  save(form: FormGroup) {

    if (form.get('name').value.toLocaleLowerCase() != 'outros') {
      form.value.nameOther = '';
    }
    const toSave: EssentialExpenseDto = { ...form.value };
    console.log(toSave)
    this.add$<EssentialExpenseDto>(toSave).subscribe({
      next: (EssentialExpensesDto: EssentialExpenseDto) => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
        form.controls['nameOther'].disable();
      },
      error: (errors) => {
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
        form.controls['nameOther'].disable();
      }
    })
  }
}
