import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ItemCreateUpdateService } from '../services/item-create-update.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'item-hardware-linked',
  templateUrl: './item-hardware-linked.component.html',
  styleUrls: ['./item-hardware-linked.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class ItemHardwareLinkedComponent extends BaseForm implements OnInit {

  screenFieldPosition: string = 'row';

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _itemCreateUpdateService: ItemCreateUpdateService,
  ) {
    super(_breakpointObserver)
  }


  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  saveEquipament() {

  }
  // item
  get items(): FormArray {
    return <FormArray>this.formMain.get('items');
  }
  addItem() {
    this.items.push(this.formLoad());
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  // formItemGroup: FormGroup;
  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem('companyId')), []],
      // name: ['', []],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      manufacturers: this._fb.array([this.manufacturerFormLoad()]),
      segments: this._fb.array([this.segmentFormLoad()]),
    })
  }
  // item//


  // manufacture
  get manufacturers(): FormArray {
    return <FormArray>this.formMain.get('manufacturers');
  }

  addManufacture() {
    this.manufacturers.push(this.manufacturerFormLoad());
  }

  removeManufacture(i: number) {
    this.manufacturers.removeAt(i)
  }

  manufacturer: FormGroup;
  manufacturerFormLoad() {
    return this.manufacturer = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }
  // manufacture//

  // segment
  get segments(): FormArray {
    return <FormArray>this.formMain.get('segments');
  }
  addSegment() {
    this.segments.push(this.segmentFormLoad());
  }
  removeSegment(index: number) {
    this.segments.removeAt(index);
  }

  segment: FormGroup;
  segmentFormLoad() {
    return this.segment = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]]
    })
  }
  // segment//


  save() {

    if (this.alertSave(this.formMain)) {
      this._itemCreateUpdateService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.screen();
    this.formLoad();
  }


}
