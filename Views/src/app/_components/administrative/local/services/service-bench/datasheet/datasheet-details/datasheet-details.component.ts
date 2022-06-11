import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';


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
    // private _DialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) public sss: ServiceBudgetDto,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,


    private _DatasheetDetailsService: DatasheetDetailsService,
    // private _ServicesBudgetListService: ServicesBudgetListService,

    // private _Route: Router,
    public _ValidationMsg: ValidatorsService,
  ) {
    this._DatasheetDetailsService.formPrincipal();
  }



  get getForm() {
    return this._DatasheetDetailsService.formMain
  }

  get pricesServiices(): FormArray {
    return this._DatasheetDetailsService.pricesServiices
  }

  add() {
    this.nServices += 1;
    this._DatasheetDetailsService.add();
  }
  removePriceService(i: number) {
    this.nServices -= 1;
    this._DatasheetDetailsService.remove(i);
  }




  test() {
    //return this.data.solutionsPrices;
  }
  save() {

  }

  formPrincipal(): FormGroup {
    return this._mainForm = this._Fb.group({
      equipament: ['', []],
      manufacturer: ['', []],
      model: ['', []],
      collected: [false, []],
      solutionsPrices: this._Fb.array([this.formPricesServices()])

    })
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

    // this._DatasheetDetailsService.formPrincipal();
    //this._DatasheetDetailsService.loadAllFromDb();
    // this._DatasheetDetailsService.formPrincipal();
    //this._DatasheetDetailsService.formLoad();
  }

}
