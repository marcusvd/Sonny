import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CategoryExpensesDto } from "../../../month-fixed-expenses/dto/category-expenses-dto";






@Injectable({providedIn:'root'})
export class CategorySubcategoryExpensesService extends BackEndService<CategoryExpensesDto> {

  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _route: Router,
  ) {
    super(_http,
      environment._CATEGORY_EXPENSES,
    );

  }

  // 


  save(form: FormGroup) {

    const toSave: CategoryExpensesDto = { ...form.value };
    // toSave.expiration = new Date(new Date().getFullYear(), new Date().getMonth(), form.get('expiration').value)
    // toSave.userId = JSON.parse(localStorage.getItem('userId'));


    this.add$<CategoryExpensesDto>(toSave, 'AddCategoryExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
          // this._route.navigateByUrl(`/side-nav/financial-dash/month-fixed-expenses-add`)
          window.history.back();
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }


  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fnBankAccount = new CategoryExpensesDto();
    fnBankAccount.id = id;

    this.deleteFake$<CategoryExpensesDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
      {
        next: () => {
          this._communicationsAlerts.defaultSnackMsg('1', 0, null, 4);
        },

        error: (error) => {
          this._communicationsAlerts.defaultSnackMsg('4', 11);
          console.log(error)
          return false;
        }

      }
    );


  }

}
