import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts} from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { EssentialExpenseDto } from "../dto/essential-expense-dto";
import { FinancialBankAccountDto } from "../../bank-account-cards/dto/financial-bank-account-dto";
import { FinancialExpensesDto } from "../../financial-expenses/dto/financial-expenses-dto";

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

  private _bankAccountsArray() {
    return this.loadAll$
  }

  constructor(
    override _http: HttpClient
  ) { super(_http, environment.backEndDoor) }

  save(form: FormGroup) {
    const toSave: EssentialExpenseDto = { ...form.value };
   return this.add$<EssentialExpenseDto>(toSave, 'FinancialEssentialExpenses/AddEssentialExpenses');
  }

  getBackAccounts() {
    const companyId = JSON.parse(localStorage.getItem('companyId'))
   return this.loadAll$<FinancialBankAccountDto>(`FinancialBankAccounts/GetAllFinancialBankAccount/${companyId}`)
  }

  getAllExpenses() {
    const companyId = JSON.parse(localStorage.getItem('companyId'))
   return this.loadAll$<FinancialExpensesDto>(`FinancialExpenses/GetAllExpenses/${companyId}`)
  }


}
