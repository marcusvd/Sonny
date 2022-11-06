import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { InventoryEquipamentService } from '../../../services/inventory-equipament.service';


@Component({
  selector: 'inventory-equipament-create',
  templateUrl: './inventory-equipament-create.component.html',
  styleUrls: ['./inventory-equipament-create.component.css']
})
export class InventoryEquipamentCreateComponent extends BaseForm implements OnInit {


  constructor(
    private _equipamentServices: InventoryEquipamentService,
    private _fb:FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


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

  save() {
    this._equipamentServices.save(this.formMain);
  }

  formLoad() {
    return this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [ Validators.maxLength(160)]],
    })
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
