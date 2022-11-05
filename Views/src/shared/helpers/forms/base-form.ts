import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { Responsive } from '../responsive/responsive';

@Component({
  selector: 'base-form',
  template: '<div></div>',
})

export class BaseForm extends Responsive implements OnInit {

  formMain: FormGroup
  subForm: FormGroup

  constructor(
    override _breakpointObserver?: BreakpointObserver
  ) { super(_breakpointObserver) }

  resetForm() {
    this.formMain.reset();
  }

  ngOnInit(): void {
  }


}
