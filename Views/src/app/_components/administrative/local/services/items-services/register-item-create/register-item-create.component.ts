import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { EquipamentDto } from '../dto/equipament-dto';
import { ItemCrudService } from '../services/item-crud.service';

@Component({
  selector: 'item-register-create',
  templateUrl: './register-item-create.component.html',
  styleUrls: ['./register-item-create.component.css']
})
export class RegisterItemCreateComponent implements OnInit {

  public _formEquipament: FormGroup;
  public _formBankAccount: FormGroup;

  startDate: Date = new Date()

  constructor(
    private _FormBuilder: FormBuilder,
    private _ItemRegister: ItemCrudService,
    private _SnackBar: MsgOperation,
    // private _Route: Router,
    public _ValidationMsg: ValidatorsService,
  ) { }


  _form() {
    return this._formEquipament = this._FormBuilder.group({
      name: ['', []],
      description: ['', []],
    })
  }

  save(){
    const typeP: EquipamentDto = {... this._formEquipament.value}
    this._ItemRegister.add$<EquipamentDto>(typeP).subscribe((x)=> {
      this._SnackBar.msgCenterTop(`Parceiro ${typeP.name}`, 0, 5);
      this._ValidationMsg.cleanAfters(['contact', 'addresss'], this._formEquipament);

    });
  }


  ngOnInit(): void {
    this._form();
  }

}
