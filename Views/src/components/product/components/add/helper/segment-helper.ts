import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRadiosDictionary } from 'src/shared/components/radio-button-g/interfaces/Iradios-dictionary';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
// import { EquipamentCreateService } from '../services/equipament-manufacturer-create.service';


export class SegmentHelper {

  constructor(private _fb: FormBuilder) { }



  formSegment: FormGroup;
  formLoadSegment() {
    this.formSegment = this._fb.group({
      segments: this._fb.array([])
    })
  }

  subFormGroupsegment: FormGroup;
  subFormMakersegment() {
    return this.subFormGroupsegment = this._fb.group({
      segment: ['', [Validators.required]],
      companyId: [JSON.parse(localStorage.getItem('companyId')), [Validators.required]],
    })
  }

  addSegment() {
    this.segments.push(this.subFormMakersegment())
  }

  removeSegment(index: number) {
    this.segments.removeAt(index);
  }

  get segments(): FormArray {
    return <FormArray>this.formSegment.get('segments');
  }


}
