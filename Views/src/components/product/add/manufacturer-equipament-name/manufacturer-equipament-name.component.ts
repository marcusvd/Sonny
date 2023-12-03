import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { EquipamentCreateService, ManufacturerCreateService, SegmentCreateService } from '../services/equipament-manufacturer-create.service';
import { EquipamentHelper } from '../helper/equipament-helper';
import { ManufacturerHelper } from '../helper/manufacturer-helper';
import { SegmentHelper } from '../helper/segment-helper';

@Component({
  selector: 'manufacturer-equipament-name',
  templateUrl: './manufacturer-equipament-name.component.html',
  styleUrls: ['./manufacturer-equipament-name.component.css']
})
export class ManufacturerEquipamentNameComponent extends BaseForm implements OnInit {

  screenFieldPosition: string = 'row';

  eqpHelper = new EquipamentHelper(this._fb);
  manHelper = new ManufacturerHelper(this._fb);
  segHelper = new SegmentHelper(this._fb);

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  entitiesRegister: IRadiosDictionary<string> =
    { "B,Fabricante": "manufacturer", "A,Equipamento": "equipament", "C,Segmento": "segment" }

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _equipamentCreateService: EquipamentCreateService,
    private _manufacturerCreateService: ManufacturerCreateService,
    private _segmentCreateService: SegmentCreateService
  ) {
    super(_breakpointObserver)
  }

  ngOnInit(): void {
    this.hideShow = 'equipament';
    this.manHelper.formLoadManufacturer();
    this.eqpHelper.formLoadEquipament();
    this.segHelper.formLoadSegment();
    this.eqpHelper.addEquipament();
    this.screen();
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

  hideShow: string;
  radioSelectedStart: string = 'equipament';

  radioSelected($event: any) {
    const entity: string = $event;
    if (entity === 'equipament') {
      this.hideShow = 'equipament';
      this.manHelper.manufacturers.clear();
      this.segHelper.segments.clear();
      this.eqpHelper.addEquipament();
    }

    if (entity === 'manufacturer') {
      this.hideShow = 'manufacturer';
      this.eqpHelper.equipaments.clear();
      this.segHelper.segments.clear();
      this.manHelper.addManufacturer();
    }

    if (entity === 'segment') {
      this.hideShow = 'segment';
      this.manHelper.manufacturers.clear();
      this.eqpHelper.equipaments.clear();
      this.segHelper.addSegment();
    }
  }



  saveEquipament() {

    if (this.eqpHelper.formEquipament.value.equipaments.length === 0) {
      alert('É necessário pelo menos um equipamento para o cadastro.')
    } else {
      if (this.alertSave(this.eqpHelper.formEquipament)) {
        this._equipamentCreateService.save(this.eqpHelper.formEquipament);
        this.eqpHelper.equipaments.clear();
        this.eqpHelper.formLoadEquipament();
        this.eqpHelper.addEquipament();
      }
    }

  }

  saveManufacturer() {
    if (this.manHelper.formManufacturer.value.manufacturers.length === 0) {
      alert('É necessário pelo menos um fabricante para o cadastro.')
    } else {
      if (this.alertSave(this.manHelper.formManufacturer)) {
        this._manufacturerCreateService.save(this.manHelper.formManufacturer);
        this.manHelper.manufacturers.clear();
        this.manHelper.formLoadManufacturer();
        this.manHelper.addManufacturer();
      }
    }

  }
  saveSegment() {
    if (this.segHelper.formSegment.value.segments.length === 0) {
      alert('É necessário pelo menos um segmento para o cadastro.')
    } else {
      if (this.alertSave(this.segHelper.formSegment)) {
        this._segmentCreateService.save(this.segHelper.formSegment);
        this.segHelper.segments.clear();
        this.segHelper.formLoadSegment();
        this.segHelper.addSegment();
      }
    }

  }
}