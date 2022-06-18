import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientListService } from 'src/app/_components/administrative/client/services/client-list.service';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { MsgOperation } from 'src/app/_shared/services/messages/snack-bar.service';
import { ClientDto } from '../../../../client/dto/client-dto';
import { ClientCreateService } from '../../../../client/services/client-create.service';
import { DatasheetDetailsService } from '../../service-bench/datasheet/services/datasheet-details.service';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { SolutionPriceDto } from '../dto/solution-price-dto';
import { ServiceBudgetCreateComponent } from '../service-budget-create/service-budget-create.component';
import { ServicesBudgetCreateService } from '../services/services-budget-create.service';
import { ServicesBudgetInfoEditService } from '../services/services-budget-info-edit.service';
import { ServicesBudgetListService } from '../services/services-budget-list.service';

@Component({
  selector: 'service-budget-info-edit',
  templateUrl: './service-budget-info-edit.component.html',
  styleUrls: ['./service-budget-info-edit.component.css']
})
export class ServiceBudgetInfoEditComponent implements OnInit {
  nServices: number = 1;
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
    this.nServices -= 1;
    this._ServicesBudgetInfoEditService.remove(i);
  }




  save() {
    this._ServicesBudgetInfoEditService.save(this.data.id);
  }


  ngOnInit(): void {
    this._ServicesBudgetInfoEditService.formMain(this.data as ServiceBudgetDto);

  }

}
