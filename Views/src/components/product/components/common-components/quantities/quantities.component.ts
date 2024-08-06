import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'quantities',
  templateUrl: './quantities.component.html',
  styleUrls: ['./quantities.component.css'],
  standalone:true,
  imports:[
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule
  ]
})
export class QuantitiesComponent extends BaseForm implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup;

  fxLayoutAlign: string = 'center center'
  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            this.fxLayoutAlign = 'start start';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            this.fxLayoutAlign = 'start start';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            this.fxLayoutAlign = 'center center';
            break;
          }
        }
      }
    })
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  get quantities() {
    return <FormArray>this.formMain.get('quantities')
  }

  addQuantity() {
    this.quantities.push(this.formLoadQuantities())
  }

  removeQuantity(index: number) {
    this.quantities.removeAt(index)
  }

  isUsed: boolean = false;
  isReserved() {
    const now = new Date().toJSON();
    this.subForm.get('isReserved').setValue(now);
  }
  oneYear(index: number) {
    const year = new Date().getFullYear() + 1;
    const currentDate = new Date();
    const oneYearDate = currentDate.setFullYear(year)
    this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(oneYearDate));
  }

  threeMonths(index: number, $event?: MatCheckbox) {
    const month = new Date().getMonth() + 3;
    const currentDate = new Date();
    const threeMnth = currentDate.setMonth(month);
    if (this.formMain.get('quantities').get(index.toString()).get('isUsed').value) {
      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(threeMnth));
    }
    else {

      this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(null);
    }
    this.isUsed = $event.checked;

    // this.prodValidators.requiredIfBool(this.formMain,'quantities', index, this.isUsed,'usedHistorical');
  }

 threeMonthsBtn(index: number) {
    const month = new Date().getMonth() + 3;
    const currentDate = new Date();
    const threeMnth = currentDate.setMonth(month);

    this.formMain.get('quantities').get(index.toString()).get('warrantyEnd').setValue(new Date(threeMnth));
  }


  formLoadQuantities() {
    return this.subForm = this._fb.group({
      sn: ['', [Validators.required]],
      nfNumber: ['', [Validators.required]],
      costPrice: ['', [Validators.required]],
      soldPrice: ['', [Validators.required]],
      warrantyEnd: ['', [Validators.required]],
      isUsed: [false, []],
      isTested: [false, []],
      usedHistorical: ['', []],
      supplierId: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.addQuantity();
  }

}
