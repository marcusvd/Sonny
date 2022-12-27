import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, Validators } from '@angular/forms';
import { TypePayCrudService } from 'src/components/financial/services/type-pay-crud.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'type-payment-create',
  templateUrl: './type-payment-create.component.html',
  styleUrls: ['./type-payment-create.component.css']
})
export class TypePaymentCreateComponent extends BaseForm implements OnInit {

  constructor(
    private _Fb: UntypedFormBuilder,
    private _TypePayCrud: TypePayCrudService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  formLoad() {
    return this.formMain = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(86)]],
    })
  }



  save() {

    if (this.alertSave(this.formMain)) {
      this._TypePayCrud.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
  }

}
