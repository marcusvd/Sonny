import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceBudgetDto } from 'src/components/services-provision/service-budget/dto/service-budget-dto';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { DatasheetDetailsService } from '../../datasheet/services/datasheet-details.service';

@Component({
  selector: 'expansion-panel-bench',
  templateUrl: './expansion-panel-bench.component.html',
  styleUrls: ['./expansion-panel-bench.component.css']
})
export class ExpansionPanelBenchComponent implements OnInit {
  public entities = [];
  public entityToTab = {};


  constructor(
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _DatasheetDetailsService: DatasheetDetailsService,

    // private _DialogRef:MatDialogRef<DatasheetDetailsComponent>, @Inject(MAT_DIALOG_DATA) private data: ServiceBudgetDto,
    public _ValidationMsg: ValidatorsService,
  ) { }

  @Input() dataSourceInput = new Observable<any>();
  panelOpenState = false;
  grabEntityToTab(entity: any) {
    this.entityToTab = entity;
  }




  //#region SolutionsPrices

  nServices: number = 0;
  private _mainForm: FormGroup;
  private _formPriceService: FormGroup;
  data;

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

  // formPricesServices(): FormGroup {
  //   return this._formPriceService = this._Fb.group({
  //     visually: ['', []],
  //     dateService: [new Date(), []],
  //     technician: ['', []],
  //     priceService: ['', []],
  //     technicalSolution: ['', []],
  //     authorized: [false, []],
  //   })
  // }
  //#endregion






  ngOnInit(): void {

    this.dataSourceInput?.subscribe(
      toView => {
        this.entities = toView;
        console.log(toView)
      }
    )

    this._DatasheetDetailsService?.formLoad(this.data as ServiceBudgetDto);

  }








}
