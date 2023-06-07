import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {  UntypedFormGroup } from "@angular/forms";
import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { CustomerDto } from "src/components/customer/dto/customer-dto";
import { ValidatorsCustom } from "src/shared/helpers/validators/validators-custom";


@Injectable()

export class ServicesBudgetCreateService extends BackEndService<ServiceBudgetDto, number>{

  private _customer: CustomerDto[] = [];
  // private _send: boolean;
  // private _emailField: boolean;

  constructor(
    override _http: HttpClient,
    private _SnackBar: MsgOperation,
    private _communicationsAlerts: CommunicationAlerts,
  ) {
    super(_http, environment._SERVICES_BUDGET);
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  get customers() {
    return this._customer;
  }

  // loadAllClients() {
  //   this._Http get<>(environment._CUSTOMERS).subscribe({
  //     next: (customer: CustomerDto[]) => {
  //       this._customer = customer;
  //     },
  //     error:()=>{}
  //   })
  // }


  localRemoteValidation(form:UntypedFormGroup) {
    if (form.get('remote').value) {
      this.validatorCustom.blurValidator(form, [{ required: true }], 'remoteAccessData')
      form.get('visually').clearValidators();
      form.get('visually').reset();
      form.get('visually').updateValueAndValidity();
    }
    else {
      this.validatorCustom.blurValidator(form, [{ required: true }], 'visually')
      form.get('remoteAccessData').clearValidators();
      form.get('remoteAccessData').reset();
      form.get('remoteAccessData').updateValueAndValidity();
    }
  }

  save(form: UntypedFormGroup) {

    const toSave: ServiceBudgetDto = { ...form.value }
     console.log(toSave)
    this.add$<ServiceBudgetDto>(toSave, '').subscribe({
      next: () => {

        this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
        // form.reset();
        // this._route.navigateByUrl('/clientlist').then((item) => {
        //   if (!item) {
        //     this._route.navigateByUrl('create');
        //   }
        // });
        // this._Route.navigate(['/clientmain/clientlist']);
      },
      error: (errors) => {
        console.log(errors)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      }
    })

  }


}
