import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { TypePayCrudService } from 'src/components/financial/services/type-pay-crud.service';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
@Component({
  selector: 'type-payment-create',
  templateUrl: './type-payment-create.component.html',
  styleUrls: ['./type-payment-create.component.css']
})
export class TypePaymentCreateComponent extends BaseForm implements OnInit {

  constructor(
    private _Fb: FormBuilder,
    private _TypePayCrud: TypePayCrudService,
  ) { super() }

  formLoad() {
    return this.formMain = this._Fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.maxLength(500)]],
    })
  }

  save(){
   this._TypePayCrud.save(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
