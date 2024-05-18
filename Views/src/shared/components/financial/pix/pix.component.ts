
import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


import { MatDividerModule } from '@angular/material/divider';
import { NgxMaskModule } from 'ngx-mask';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BtnAddGComponent } from '../../btn-add-g/btn-add-g.component';
import { BtnRemoveGComponent } from '../../btn-remove-g/btn-remove-g.component';
import { PixValidator } from './pix.validator';



@Component({
  selector: 'pix',
  templateUrl: './pix.component.html',
  styleUrls: ['./pix.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    FlexLayoutModule,
    NgxMaskModule,
    NgFor,
    NgIf,
    BtnAddGComponent,
    BtnRemoveGComponent

  ]
})
export class PixComponent extends BaseForm implements OnInit, OnChanges {

  // fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'column';
  // screenFieldPositionSelect: string = 'row';
  // screenFieldPositionInput: string = 'row';

  @Input() noBeneficiaryField: boolean =true;
  @Input() override formMain: FormGroup;
  @Output() addOutput = new EventEmitter<void>();
  @Output() removeOutput = new EventEmitter<number>();

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fb: FormBuilder
  ) { super(_breakpointObserver) }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log(this.formMain.value)
  }

  add() {
    this.addOutput.emit();
  }

  remove(index: number) {
    this.removeOutput.emit(index);
  }


  get pixesFormArray() {
    return this.formMain.get('pixes') as FormArray;
  }



  pixesFormGroup() {
    return this.subForm = this._fb.group({
      id: ['', []],
      key: ['', []],
      value: ['', []],
    })
  }

  // formLoad() {
  //   this.formMain = this._fb.group({
  //     pixes: this._fb.array([])
  //   })
  // }


  pixArray: any[] = [
    { id: 0, kindPix: 'CEL' },
    { id: 1, kindPix: 'E-MAIL' },
    { id: 2, kindPix: 'CPF' },
    { id: 3, kindPix: 'CNPJ' },
    // { id: 4, kindPix: 'NENHUM' }
  ];

  pixValidator(form: FormGroup, selected: string, input: string) {
    console.log(selected)
    PixValidator.pixValidator(form, selected, input);
  }

  pixValidatorSelected(form: FormGroup, selected: string) {
    PixValidator.pixValidatorSelected(form, selected);
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


  kidPixSelected: string = null;
  onPixSelected(selected: string) {
    this.kidPixSelected = selected;

    if (selected === 'NENHUM') {
      this.screenFieldPosition = 'column'
      // this.screenFieldPositionSelect = 'row'
      // this.screenFieldPositionInput = 'row'
      this.kidPixSelected = null;

    }

    if (this.kidPixSelected != null) {
      this.screenFieldPosition = 'row'
      // this.screenFieldPositionSelect = 'column'
      // this.screenFieldPositionInput = 'column'

    }

    // if (this.screenSizeReturn != null)
      // this.screen();
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // screenSizeReturn: string = null;
  screen() {

    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            // this.screenSizeReturn = 'xsmall';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            // this.screenSizeReturn = 'small';
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
    // this.formLoad()
  }



}
