import { BreakpointObserver } from '@angular/cdk/layout';
import { Component,  OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicesBudgetCreateService } from 'src/components/services-provision/budget/services/services-budget-create.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'service-budget-create',
  templateUrl: './service-budget-create.component.html',
  styleUrls: ['./service-budget-create.component.css']
})
export class ServiceBudgetCreateComponent extends BaseForm implements OnInit {


  constructor(
    private _servicesBgtSrv: ServicesBudgetCreateService,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  get customers() {
    return this._servicesBgtSrv.customers
  }

  // formLoad(): FormGroup {
    //TESTS
  //   return this.formMain = this._fb.group({
  //     customerId: ['', []],
  //     budgetStartedIn: [new Date(), []],
  //     visually: ['', []],
  //     remoteAccessData: ['', []],
  //     remote: ['', []],
  //     customerProblems: ['', []],
  //     status: ['Aguardando avaliação do técnico.', []]
  //   })
  // }

  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      customerId: ['', [Validators.required]],
      budgetStartedIn: [new Date(), [Validators.required]],
      visually: ['', [Validators.maxLength(500)]],
      remoteAccessData: ['', [Validators.maxLength(500)]],
      remote: ['', []],
      customerProblems: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['Aguardando avaliação do técnico.', [Validators.maxLength(100)]]
    })
  }

  localRemoteValidation(){
    this._servicesBgtSrv.localRemoteValidation(this.formMain);
  }


  save() {
    this._servicesBgtSrv.localRemoteValidation(this.formMain);
    if (this.alertSave(this.formMain)) {
      this._servicesBgtSrv.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this._servicesBgtSrv.loadAllClients();
  }

}
