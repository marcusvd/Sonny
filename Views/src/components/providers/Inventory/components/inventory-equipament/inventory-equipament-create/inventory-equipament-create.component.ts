import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { InventoryEquipamentService } from '../../../services/inventory-equipament.service';


@Component({
  selector: 'inventory-equipament-create',
  templateUrl: './inventory-equipament-create.component.html',
  styleUrls: ['./inventory-equipament-create.component.css']
})
export class InventoryEquipamentCreateComponent extends BaseForm implements OnInit {


  constructor(
    private _EquipamentServices: InventoryEquipamentService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {


            break;
          }
          case 'small': {

            break;
          }
          case 'medium': {


            break;
          }
          case 'large': {


            break;
          }
          case 'xlarge': {

            break;
          }
        }
      }
    })
  }

  get formMainTmp() {
    return this._EquipamentServices.formGet
  }

  save() {
    this._EquipamentServices.save();
  }

  ngOnInit(): void {
    this._EquipamentServices._form();
  }

}
