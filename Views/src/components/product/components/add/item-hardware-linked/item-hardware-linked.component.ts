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
  get manufactures(): FormArray {
    return <FormArray>this.formItemGroup.get('manufacturers');
  }
  fillLineManufacture(value: string){
    this.line = value;
  }
  addManufacture() {
    this.manufactures.push(this.manufacturerFormLoad());
    // console.log(this.manufactures.at(0).get('name').value)
    // console.log(value)

    this.manufacturerListLines.push(this.line)
    this.line = null;
    //  this.manufacturerListLines.push(this.manufactures.at(0).get('name').value)

  }
  removeManufacture(index: number) {
    this.manufactures.removeAt(index);
  }
  manufacturer: FormGroup;
  line: string = null;
  manufacturerListLines: string[] = [];
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
    this.formMain = this._fb.group({
      items: this._fb.array([this.formItem()])
    })
  }

  ngOnInit(): void {
    this.screen();
    this.formLoad()
    this.manufacturerFormLoad();
    this.segmentFormLoad();
  }


}
