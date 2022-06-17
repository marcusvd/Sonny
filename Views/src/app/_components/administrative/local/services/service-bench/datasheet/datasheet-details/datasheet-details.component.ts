import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { ServiceBudgetDto } from '../../../service-budget/dto/service-budget-dto';
import { SolutionPriceDto } from '../../../service-budget/dto/solution-price-dto';


import { DatasheetDetailsService } from '../services/datasheet-details.service';


@Component({
  selector: 'datasheet-details',
  templateUrl: './datasheet-details.component.html',
  styleUrls: ['./datasheet-details.component.css']
})
export class DatasheetDetailsComponent implements OnInit {

  nServices: number = 1;
  private _mainForm: FormGroup;
  private _formPriceService: FormGroup;


  constructor(
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _DatasheetDetailsService: DatasheetDetailsService,

    private _DialogRef:MatDialogRef<DatasheetDetailsComponent>, @Inject(MAT_DIALOG_DATA) private data: ServiceBudgetDto,
    public _ValidationMsg: ValidatorsService,

  ) {
  }

  get getForm() {
    return this._DatasheetDetailsService.formMain
  }

  get pricesServiices(): FormArray {
    return this._DatasheetDetailsService.pricesServices
  }

  add() {
    this.nServices += 1;
    this._DatasheetDetailsService.add();
  }
  removePriceService(i: number) {
    this.nServices -= 1;
    this._DatasheetDetailsService.remove(i);
  }

  save() {
    this._DatasheetDetailsService.save(this.data.id);
  }

  formPricesServices(): FormGroup {
    return this._formPriceService = this._Fb.group({
      visually: ['', []],
      dateService: [new Date(), []],
      technician: ['', []],
      priceService: ['', []],
      technicalSolution: ['', []],
      authorized: [false, []],
    })
  }
  ngOnInit(): void {
    this._DatasheetDetailsService.formLoad(this.data as ServiceBudgetDto);
  }
}
