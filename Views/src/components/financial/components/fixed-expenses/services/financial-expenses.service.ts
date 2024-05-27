import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { FixedExpensesTranckingDto } from "../../fixed-expenses-trancking/dto/fixed-expenses-trancking-dto";
import { FixedExpensesDto } from "../dto/fixed-expenses-dto";

@Injectable()
export class FixedExpensesService extends BackEndService<FixedExpensesDto>
{
  constructor(
    override _http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment.backEndDoor)
  }

  outstandingsDebts:FixedExpensesTranckingDto[]=[];

  save(form: FormGroup) {

    if (form.get('nameOther').value)
      form.get('name').setValue(form.get('nameOther').value)

    switch (<string>form.get('cyclePayment').value) {
      case 'DIÁRIO': {
        form.get('cyclePayment').setValue(0);
        break;
      }
      case 'MENSAL':{
        form.get('cyclePayment').setValue(1);
        break;
      }
      case 'ANUAL':{
        form.get('cyclePayment').setValue(2);
        break;
      }
    }

    const toSave: FixedExpensesDto = { ...form.value };
   const FixedExpensesTrancking = new FixedExpensesTranckingDto()
    this.outstandingsDebts.push()
    console.log(toSave)
    this.add$<FixedExpensesDto>(toSave, 'FnFixedExpenses/AddFixedExpenses').subscribe({
      next: () => {
            this._communicationsAlerts.defaultSnackMsg('0', 0, null, 4);
        //  this._route.navigateByUrl(`/side-nav/financial-dash/list-bank-account-cards`)

      },
      error: (erroCode) => {
        console.log(erroCode)
              this._communicationsAlerts.defaultSnackMsg(erroCode, 1);
      }
    })
  }

  // save(form: FormGroup) {
  //   const resultReturn = new BehaviorSubject<boolean>(false)

  //   const toSave: FinancingLoanDto = { ...form.value };

  //   this.add$<FinancingLoanDto>(toSave)
  //     .subscribe(_monthlyOutFlow => {
  //       this._SnackBar.msgCenterTop(`Despesa mensal ${toSave.name} ${toSave.value} Cadastrado com sucesso.`, 0, 5);
  //       resultReturn.next(true);
  //       //CLEAN Fields and forms for the next new insertion
  //       // this._ValidationMsg.cleanAfters(['contact', 'address'], this.formMain)
  //     });
  //   return resultReturn;
  // }

}
