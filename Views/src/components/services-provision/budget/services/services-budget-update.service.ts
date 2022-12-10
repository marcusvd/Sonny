import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

import { BackEndService } from "src/shared/services/back-end/backend.service";
import { CommunicationAlerts, MsgOperation } from "src/shared/services/messages/snack-bar.service";
import { environment } from "src/environments/environment";
import { ServiceBudgetDto } from "../dto/service-budget-dto";
import { ServiceBenchCreateService } from "./service-bench-create.service";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class ServicesBudgetUpdate extends BackEndService<ServiceBudgetDto, number>{

  updateGridBudgetAfterMadeBench = new BehaviorSubject<boolean>(false);

  constructor(
    protected _Http: HttpClient,
    private _communicationsAlerts: CommunicationAlerts,
    private _serviceBenchCreateService: ServiceBenchCreateService,
  ) {
    super(_Http, environment._SERVICES_BUDGET);
  }


  addUpdate(form: FormGroup) {

    const toSave: ServiceBudgetDto = { ...form.value };

    if (toSave.authorized) {

      this._serviceBenchCreateService.addServiceBench(toSave).subscribe((result: boolean) => {
        if (result) {
          this.updateServiceBudget(toSave);
          this.updateGridBudgetAfterMadeBench.next(true);

        }
      })
      return this.updateGridBudgetAfterMadeBench;
    }
    else {
      this.updateServiceBudget(toSave);
    }

  }


  alertSave(form: FormGroup) {


  }



  updateServiceBudget(serviceBudgetDto: ServiceBudgetDto) {

console.log(serviceBudgetDto)


    this.update$<ServiceBudgetDto>(serviceBudgetDto).subscribe(() => {
      this._communicationsAlerts.communication('', 2, 2, 'top', 'center');
    },
      (error) => {
        console.log(error)
        this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
      },
      () => {
        console.log('complete')
      },
    )
  }




  // save(form: FormGroup) {
  //   const toSave: CustomerDto = { ...form.value }
  //   if (!form.get('assured').value) {
  //     toSave.payment = 0;
  //     toSave.expiration = 0;
  //   }

  //   this.add$<CustomerDto>(toSave).subscribe({
  //     next: (_cli: CustomerDto) => {
  //       this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
  //       form.reset();
  //       // this._route.navigateByUrl('/clientlist').then((item) => {
  //       //   if (!item) {
  //       //     this._route.navigateByUrl('create');
  //       //   }
  //       // });
  //       // this._Route.navigate(['/clientmain/clientlist']);
  //     },
  //     error: (errors) => {
  //       this._communicationsAlerts.communicationError('', 4, 2, 'top', 'center');
  //     }
  //   })



  // }






}

