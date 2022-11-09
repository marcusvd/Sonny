import { BreakpointObserver } from '@angular/cdk/layout';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { ClientCreateService } from 'src/components/client/client-create/services/client-create.service';
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

  kindOfBudgetChecked: boolean = false;

  constructor(
    private _servicesBgtSrv: ServicesBudgetCreateService,
  //  private _ClientService: ClientCreateService,
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

  get clients() {
    return this._servicesBgtSrv.clients
  }

  formLoad(): FormGroup {
    return this.formMain = this._fb.group({
      clientId: ['', [Validators.required]],
      BudgetStartedIn: [new Date(), [Validators.required]],
      visually: ['', [Validators.maxLength(500)]],
      remoteAccessData: ['', [Validators.maxLength(500)]],
      clientProblems: ['', [Validators.required, Validators.maxLength(500)]],
      status: ['Aguardando avaliação do técnico.', [Validators.maxLength(100)]]
    })
}

  kindOfBudget() {
    this.kindOfBudgetChecked = !this.kindOfBudgetChecked;
  }

  save() {
    this._servicesBgtSrv.save(this.formMain);

}

  ngOnInit(): void {
    this.formLoad();
    console.log(this.formLoad())
    this._servicesBgtSrv.loadAllClients();
    setTimeout(() => {
     // this.validatorCustom.checkedBoxIfCheckedOrNot(this.formMain, false, { required: true }, ['remoteAccessData'], ['visually']);
    }, 2000)
}

}
