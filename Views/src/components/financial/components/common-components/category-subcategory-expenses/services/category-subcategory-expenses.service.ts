import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CategoryExpenseDto } from "../dto/category-expense-dto";


@Injectable({ providedIn: 'root' })
export class CategorySubcategoryExpensesService extends BackEndService<CategoryExpenseDto> {

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


  updateOrSave(form: FormGroup) {
    if (form.get('id').value != 0)
      this.update(form);
    else
      this.save(form);
  }


  save(form: FormGroup) {

    const toSave: CategoryExpenseDto = { ...form.value };

    this.add$<CategoryExpenseDto>(toSave, 'AddCategoryExpenses').subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        // this._route.navigateByUrl(`/side-nav/financial/month-fixed-expenses-add`)
        window.history.back();
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }

  update(form: FormGroup) {

    const toUpdate: CategoryExpenseDto = { ...form.value };

    this.update$<CategoryExpenseDto>('UpdateCategoryExpenses', toUpdate).subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('2', 0, null, 4);
        // this._route.navigateByUrl(`/side-nav/financial/month-fixed-expenses-add`)
        window.history.back();
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }

  delete(form: FormGroup) {

    const toUpdate: CategoryExpenseDto = { ...form.value };
    console.log(toUpdate)
    this.deleteFake$<CategoryExpenseDto>('DeleteFakeCategoryExpenses', toUpdate).subscribe({
      next: () => {
        this._communicationsAlerts.defaultSnackMsg('1', 1, null, 4);
        // this._route.navigateByUrl(`/side-nav/financial/month-fixed-expenses-add`)
        // window.history.back();
      },
      error: (erroCode) => {
        console.log(erroCode)
        this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })

  }

  getFillers() {
    return this.loadById$<CategoryExpenseDto[]>('GetAllCategoryExpensesByCompanyId', this.companyId.toString());
  }

  deleteFakeDisable(id: number) {
    if (id == 0) throw new Error('Id não pode ser 0');

    const fnBankAccount = new CategoryExpenseDto();
    fnBankAccount.id = id;

    this.deleteFake$<CategoryExpenseDto>('DeleteFakeFnBankAccount', fnBankAccount).subscribe(
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
