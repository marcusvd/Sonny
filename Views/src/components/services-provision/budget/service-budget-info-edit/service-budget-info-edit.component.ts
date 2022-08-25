import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClientDto } from 'src/components/client/dto/client-dto';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { ServiceBudgetDto } from '../../dtos/service-budget-dto';
import { SolutionPriceDto } from '../../dtos/solution-price-dto';
import { ServicesBudgetInfoEditService } from '../../services/budget/services-budget-info-edit.service';


@Component({
  selector: 'service-budget-info-edit',
  templateUrl: './service-budget-info-edit.component.html',
  styleUrls: ['./service-budget-info-edit.component.css']
})
export class ServiceBudgetInfoEditComponent implements OnInit {
  nServices: number = this.data.solutionsPrices.length;
  totalPriceServices: number;
  price: number;
  // currentPriceOnClick: number;

  collected: boolean;

  clients: ClientDto[] = [];

  private _mainForm: FormGroup;
  private _formPriceService: FormGroup;



  constructor(
    private _DialogRef: MatDialogRef<ServiceBudgetInfoEditComponent>, @Inject(MAT_DIALOG_DATA) private data: ServiceBudgetDto,
    private _Fb: FormBuilder,
    private _SnackBar: MsgOperation,
    private _ServicesBudgetInfoEditService: ServicesBudgetInfoEditService,
    //   private _ServiceBudgetList: ServicesBudgetListService,
    public _ValidationMsg: ValidatorsService,
  ) {

  }



  getOnChange() {
    this.price = this._ServicesBudgetInfoEditService.pricesCalc
    console.log(this._ServicesBudgetInfoEditService.pricesCalc)
  }



  get getForm() {
    return this._ServicesBudgetInfoEditService.formGet
  }

  get pricesServices(): FormArray {
    return this._ServicesBudgetInfoEditService.pricesServices
  }

  add() {
    this.nServices += 1;
    this._ServicesBudgetInfoEditService.add();
  }
  removePriceService(i: number) {
    const n: number = this.pricesServices[i].get('priceService')
    this.nServices -= 1;
    this.price -= n;
    this._ServicesBudgetInfoEditService.remove(i);
  }



  save() {
    this._ServicesBudgetInfoEditService.save(this.data.id);
  }


  ngOnInit(): void {
    this._ServicesBudgetInfoEditService.formMain(this.data as ServiceBudgetDto);
    const n: number =
   this.price =  this._ServicesBudgetInfoEditService.loadCalcs(this.data.solutionsPrices as SolutionPriceDto[]);

  }

}
