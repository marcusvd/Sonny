import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, UntypedFormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { FinancialBankAccountDto } from "../components/bank-account-cards/dto/financial-bank-account-dto";
import { FinancialCardDto } from "../components/bank-account-cards/dto/financial-card-dto";


@Injectable()
export class BankAccountService extends BackEndService<FinancialBankAccountDto> {

  // private _pixArray: any[] = [
  //   { id: 0, kindPix: 'CEL' },
  //   { id: 1, kindPix: 'E-MAIL' },
  //   { id: 2, kindPix: 'CPF' },
  //   { id: 3, kindPix: 'CNPJ' }
  // ];

  // get pixArray(): any[] {
  //   return this._pixArray
  // }

  private _typeAccounts: any[] = [
    { id: 0, typeAccount: 'POUPANÇA' },
    { id: 1, typeAccount: 'CORRENTE' },
    // { id: 2, typeAccount: 'SALÁRIO' },
  ];

  get typeAccounts(): any[] {
    return this._typeAccounts
  }

  private _typeCards: any[] = [
    { id: 0, typeCard: 'CRÉDITO' },
    { id: 1, typeCard: 'DÉBITO' },
    { id: 2, typeCard: 'CRÉDITO E DÉBITO' },
  ];

  get typeCards(): any[] {
    return this._typeCards
  }


  //
  private _cards: FinancialCardDto[] = [];
  private _addCard: boolean = false;
  private _today = new Date();

  constructor(
    private _communicationsAlerts: CommunicationAlerts,
    override _http: HttpClient
  ) { super(_http, environment.backEndDoor) }

  get getDate(): Date {
    return this._today
  }
  get addCardBool(): boolean {
    return this._addCard
  }

  set addCardBool(c: boolean) {
    this._addCard = c
  }

  save(form: FormGroup) {

    const toSave: FinancialBankAccountDto = { ...form.value };

    toSave.cards.forEach(x => {
      switch (x.type.toString()) {
        case 'DÉBITO': {
          x.type = 0;
          break;
        }
        case 'CRÉDITO': {
          x.type = 1;
          break;
        }
        case 'CRÉDITO E DÉBITO': {
          x.type = 2;
          break;
        }
      }
    })

    if (toSave.type.toString() == 'CORRENTE')
      toSave.type = 0;
    else
      toSave.type = 1;

    this.add$<FinancialBankAccountDto>(toSave, 'financialBankAccounts/AddABankAccount').subscribe({
      next: (checkingAccountDto: FinancialBankAccountDto) => {
        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        form.reset();
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })
  }
}
