import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { InventoryItemService } from '../../services/inventory-item.service';
import { EquipamentDto } from '../dto/equipament-dto';


@Component({
  selector: 'inventory-item-create',
  templateUrl: './inventory-item-create.component.html',
  styleUrls: ['./inventory-item-create.component.css']
})
export class InventoryItemCreateComponent implements OnInit {


  constructor(
    private _ItemRegister: InventoryItemService,
  ) { }

  get formMain() {
    return this._ItemRegister.formGet
  }

  save(){
    this._ItemRegister.save();
  }

  ngOnInit(): void {
    this._ItemRegister._form();
  }

}
