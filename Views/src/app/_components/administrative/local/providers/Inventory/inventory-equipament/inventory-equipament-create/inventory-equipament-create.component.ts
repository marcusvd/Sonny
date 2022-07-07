import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { InventoryEquipamentService } from '../../services/inventory-equipament.service';
import { EquipamentDto } from '../dto/equipament-dto';


@Component({
  selector: 'inventory-equipament-create',
  templateUrl: './inventory-equipament-create.component.html',
  styleUrls: ['./inventory-equipament-create.component.css']
})
export class InventoryEquipamentCreateComponent implements OnInit {


  constructor(
    private _EquipamentServices: InventoryEquipamentService,
  ) { }

  get formMain() {
    return this._EquipamentServices.formGet
  }

  save(){
    this._EquipamentServices.save();
  }

  ngOnInit(): void {
    this._EquipamentServices._form();
  }

}
