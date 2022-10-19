import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ClientCreateService } from 'src/components/client/client-create/services/client-create.service';
import { ServicesBudgetCreateService } from 'src/components/services-provision/budget/services/services-budget-create.service';


import { BaseForm } from 'src/shared/helpers/forms/base-form';

@Component({
  selector: 'service-budget-create',
  templateUrl: './service-budget-create.component.html',
  styleUrls: ['./service-budget-create.component.css']
})
export class ServiceBudgetCreateComponent extends BaseForm implements OnInit {

  kindOfBudgetChecked: boolean = false;

  constructor(
    private _servicesBgtSrv: ServicesBudgetCreateService,
    private _ClientService: ClientCreateService,
    private _Fb: FormBuilder

  ) { super() }

  get clients() {
    return this._servicesBgtSrv.clients
  }

  formLoad(): FormGroup {
    return this.formMain = this._Fb.group({
      clientId: ['', []],
      BudgetStartedIn: [new Date(), []],
      visually: ['', []],
      remoteAccessData: ['', []],
      clientProblems: ['', []],
      status: ['Aguardando avaliação do técnico.', []]
    })
  }

  kindOfBudget() {
    this.kindOfBudgetChecked = !this.kindOfBudgetChecked;
  }

  save() {
    this._servicesBgtSrv.save(this.formMain);
    this.formLoad();
  }

  ngOnInit(): void {
    this.formLoad();
    this._servicesBgtSrv.loadAllClients();
  }

}
