import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { TypePaymentDto } from '../dto/type-payment-dto';
import { TypePayCrudService } from '../services/type-pay-crud.service';

@Component({
  selector: 'type-payment-create',
  templateUrl: './type-payment-create.component.html',
  styleUrls: ['./type-payment-create.component.css']
})
export class TypePaymentCreateComponent implements OnInit {

  public _formTypePayment: FormGroup;
  public _formBankAccount: FormGroup;

  startDate: Date = new Date()

  constructor(
    private _FormBuilder: FormBuilder,
    private _TypePayCrud: TypePayCrudService,
    private _SnackBar: MsgOperation,
    // private _Route: Router,
    public _ValidationMsg: ValidatorsService,
  ) { }


  _form() {
    return this._formTypePayment = this._FormBuilder.group({
      name: ['', []],
      description: ['', []],
    })
  }

  save(){
    const typeP: TypePaymentDto = {... this._formTypePayment.value}
    this._TypePayCrud.add$<TypePaymentDto>(typeP).subscribe((x)=> {
      this._SnackBar.msgCenterTop(`Parceiro ${typeP.name}`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formTypePayment);

    });
  }


  ngOnInit(): void {
    this._form();
  }

}
