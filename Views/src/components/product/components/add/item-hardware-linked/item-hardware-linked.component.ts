import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { EquipamentCreateService, ManufacturerCreateService, SegmentCreateService } from '../services/equipament-manufacturer-create.service';
import { EquipamentHelper } from '../helper/equipament-helper';
import { ManufacturerHelper } from '../helper/manufacturer-helper';
import { SegmentHelper } from '../helper/segment-helper';
import { ItemHardwareLinkedHelper } from '../helper/item-hardware-linked-helper';

@Component({
  selector: 'item-hardware-linked',
  templateUrl: './item-hardware-linked.component.html',
  styleUrls: ['./item-hardware-linked.component.css']
})
export class ItemHardwareLinkedComponent extends BaseForm implements OnInit {

  screenFieldPosition: string = 'row';

  itemHHelper = new ItemHardwareLinkedHelper(this._fb);

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }



  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    // private _equipamentCreateService: EquipamentCreateService,
    // private _manufacturerCreateService: ManufacturerCreateService,
    // private _segmentCreateService: SegmentCreateService
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
    this.items.push(this.formItem());
    this.manufacturerListLines =[];
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }

  formItemGroup: FormGroup;
  formItem() {
    return this.formItemGroup = this._fb.group({
      companyId: ['', []],
      name: ['', []],
      manufacturers: this._fb.array([this.manufacturerFormLoad()]),
      segments: this._fb.array([this.segmentFormLoad()]),
    })
  }
  // item//


  // manufacture
  get manufacturers(): FormArray {
    return <FormArray>this.formItemGroup.get('manufacturers');
  }

  addManufacture() {
    this.manufacturers.push(this.manufacturerFormLoad());
    this.manufacturerListLines.push(this.manufacturers.at(this.manufacturers.length - 2).value.name)
  }
  removeManufacture(i: number) {
    this.manufacturers.removeAt(i)
    // const index = this.manufacturers.controls.findIndex(x => x.value.name == item);
    // this.manufacturers.removeAt(index);

    // const indexManufacturerListLines = this.manufacturerListLines.findIndex(x => x == item);
    // this.manufacturerListLines.splice(indexManufacturerListLines,1);

  }

  manufacturer: FormGroup;
  manufacturerListLines: string[];
  manufacturerFormLoad() {
    return this.manufacturer = this._fb.group({
      name: ['', []]
    })
  }
  // manufacture//

  // segment
  get Segments(): FormArray {
    return <FormArray>this.formItemGroup.get('segments');
  }
  addSegment() {
    this.items.push(this.segmentFormLoad());
  }
  removeSegment(index: number) {
    this.Segments.removeAt(index);
  }

  segment: FormGroup;
  segmentFormLoad() {
    return this.segment = this._fb.group({
      name: ['', []]
    })
  }
  // segment//

  formLoad() {
    this.manufacturerListLines =[];
    this.formMain = this._fb.group({
      items: this._fb.array([this.formItem()])
    })
  }

  ngOnInit(): void {
    this.screen();
    this.formLoad()
    // this.manufacturerFormLoad();
    // this.segmentFormLoad();

  }


}
