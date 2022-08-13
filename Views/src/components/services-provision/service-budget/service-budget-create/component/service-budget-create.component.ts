import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ClientDto } from 'src/components/client/dto/client-dto';
import { ClientCreateService } from 'src/components/client/client-create/services/client-create.service';

import { ServiceBudgetDto } from '../../dto/service-budget-dto';
import { ServicesBudgetCreateService } from '../../services/services-budget-create.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'service-budget-create',
  templateUrl: './service-budget-create.component.html',
  styleUrls: ['./service-budget-create.component.css']
})
export class ServiceBudgetCreateComponent extends BaseForm implements OnInit {

  collected: boolean;



  constructor(
    private _ServicesBgtSrv: ServicesBudgetCreateService,
    private _ClientService: ClientCreateService,
    private _Fb: FormBuilder

  ) { super() }

  showHide(id: number) {
    const getById = document.getElementById(id.toString());
    console.log(getById);
  }

  switchCollected() {
    this.collected = !this.collected
  }
  emailSendOnOthersBlur($event) {
  }

  // get emailField(): boolean {
  //   return this._ServicesBgtSrv.emailField;
  // }
  // set emailSend($event) {
  //   this._ServicesBgtSrv.emailSet = $event.target.value;
  // }

  // get pricesServiices(): FormArray {
  //   return this._ServicesBgtSrv.pricesServiices
  // }

  // get pricesServiices(): FormArray {
  //   return <FormArray>this._formMain.get('solutionsPrices');
  // }

  // get formMain(): FormGroup {
  //   return this._formMain;
  // }
  // add() {
  //   this._ServicesBgtSrv.add();
  // }
  // removePriceService(i: number) {
  //   this._ServicesBgtSrv.removePriceService(i);
  // }


  get clients() {
    return this._ServicesBgtSrv.clients
  }


  formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      clientId: ['', []],
      clientNoRegister: ['', []],
      clientProblems: ['', []],
      entryDate: [new Date(), []],
      // osMake: [false, []],
      // solutionsPrices: this._Fb.array([])

    })
  }

  save() {
    this._ServicesBgtSrv.save(this.formMain);
  }




  ngOnInit(): void {
    this.formLoad();
    this._ServicesBgtSrv.loadAllClients();

  }

}
