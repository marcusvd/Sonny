import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { EssentialExpenseDto } from "../dto/essential-expense-dto";

@Injectable()
export class EssentialExpensesService extends BackEndService<EssentialExpenseDto> {

  get EssentialExpensesArray(): any[] {
    return this._essentialExpensesArray
  }

  private _essentialExpensesArray: any[] = [
    { id: 0, expense: 'SELECIONE UMA OPÇÃO' },
    { id: 1, expense: 'ALUGUEL' },
    { id: 2, expense: 'ÁGUA' },
    { id: 3, expense: 'LUZ' },
    { id: 4, expense: 'TELEFONE' },
    { id: 5, expense: 'INTERNET' },
    { id: 6, expense: 'CONDOMÍNIO' },
    { id: 7, expense: 'ALIMENTAÇÃO' },
    { id: 8, expense: 'TRANSPORTE' },
    { id: 9, expense: 'SEGUROS' },
    // { id: 10, expense: 'SAÚDE' },
    // { id: 11, expense: 'HIGIENE' },
    { id: 10, expense: 'GÁS' },
    { id: 11, expense: 'IMPOSTOS' },
    { id: 12, expense: 'OUTROS' },

  ];

  get expirationCycleArray(): any[] {
    return this._expirationCycleArray
  }

  private _expirationCycleArray: any[] = [
    { id: 0, expiration: 'MENSAL' },
    { id: 1, expiration: 'ANUAL' },
    { id: 2, expiration: 'DIÁRIO' },
  ];

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    override _http: HttpClient
  ) { super(_http, environment._ESSENTIALS_EXPENSES) }

  save(form: UntypedFormGroup) {

    if (form.get('name').value.toLocaleLowerCase() === 'outros') {
      form.get('name').setValue(form.get('nameOther').value);
      form.controls['nameOther'].disable();
    }

    const toSave: EssentialExpenseDto = { ...form.value };
    console.log(toSave)
    this.add$<EssentialExpenseDto>(toSave, '').subscribe({
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
