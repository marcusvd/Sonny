
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgFor, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { NgxMaskModule } from 'ngx-mask';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FinancialPixValidator } from './financial-pix.validator';

@Component({
  selector: 'financial-pix',
  templateUrl: './financial-pix.component.html',
  styleUrls: ['./financial-pix.component.css'],
  standalone:true,
  imports:[
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    NgxMaskModule,
    NgFor,
    NgIf

  ]
})
export class FinancialPixComponent extends BaseForm implements OnInit, OnChanges {

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  screenFieldPositionSelect: string = 'row';
  screenFieldPositionInput: string = 'row';
  @Input() override formMain: FormGroup;
  constructor(
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formMain.value)
  }

  pixArray: any[] = [
    { id: 0, kindPix: 'CEL' },
    { id: 1, kindPix: 'E-MAIL' },
    { id: 2, kindPix: 'CPF' },
    { id: 3, kindPix: 'CNPJ' },
    { id: 4, kindPix: 'NENHUM' }
  ];

  pixValidator(form: FormGroup, selected: string, input: string) {
    FinancialPixValidator.pixValidator(form, selected, input);
  }

  pixValidatorSelected(form: FormGroup, selected: string) {
    FinancialPixValidator.pixValidatorSelected(form, selected);
  }

  pixInputMask(selected: string) {
    if (selected === 'CEL')
      return "00 0-0000-0000";

    if (selected === 'CPF')
      return "000.000.000-00";

    if (selected === 'CNPJ')
      return "00.000.000/0000-00";

    return null;
  }

  pixInputPlaceHolder(selected: string) {
    if (selected === 'CEL')
      return "Ex: (00) 0-0000-0000";

    if (selected === 'CPF')
      return "Ex: 000.000.000-00";

    if (selected === 'CNPJ')
      return "Ex: 00.000.000/0000-00";


    return null;
  }


  kifPixSelected: string = null;
  onPixSelected(selected: string) {
    this.kifPixSelected = selected;


    if (selected === 'NENHUM') {
      this.screenFieldPosition = 'column'
      this.screenFieldPositionSelect = 'row'
      this.screenFieldPositionInput = 'row'
      this.kifPixSelected = null;

    }

    if (this.kifPixSelected != null) {
      this.screenFieldPosition = 'row'
      this.screenFieldPositionSelect = 'column'
      this.screenFieldPositionInput = 'column'

    }

    if (this.screenSizeReturn != null)
      this.screen();
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screenSizeReturn: string = null;
  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.screenSizeReturn = 'xsmall';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.screenSizeReturn = 'small';
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

  ngOnInit(): void {
    this.screen();

  }



}
