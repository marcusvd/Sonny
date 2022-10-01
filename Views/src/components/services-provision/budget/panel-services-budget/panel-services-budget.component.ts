import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { DialogQuizComponent } from 'src/shared/components/dialog-quiz/dialog-quiz.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';
import { SolutionsPricesServices } from '../services/solutions-prices.service';



@Component({
  selector: 'panel-services-budget',
  templateUrl: './panel-services-budget.component.html',
  styleUrls: ['./panel-services-budget.component.css'],
  providers: [SolutionsPricesServices]
})

export class PanelServicesBudgetComponent extends BaseForm implements OnInit {

  private _formChildPriceService: FormGroup;

  nServices: number = 0;


  @Input() entity: ServiceBudgetDto;

  constructor(
    private _servicesBudgetUpdate: ServicesBudgetUpdate,
    private _solutionsPricesServices: SolutionsPricesServices,
    private _Fb: FormBuilder,
    private _dialog: MatDialog,
  ) {
    super()
  }

  get getForm() {
    return this.formMain
  }

  get pricesServices(): FormArray {
    return <FormArray>this.formMain.get('solutionsPrices');
  }

  addPriceService() {
    this.nServices += 1;
    this.pricesServices.push(this.formPricesServices())
  }

  removePriceService(solutionPriceForm: FormGroup) {

    const solutionPrice:SolutionPriceDto = {...solutionPriceForm.value}
    console.log(solutionPrice)

    this.nServices -= 1;
    const dialogRef = this._dialog.open(DialogQuizComponent, {
      width: '500px;',
      height: '300px;',
      data: {
        title: 'Deleção de orçamento',
        messageBody: 'Tem certeza que deseja deletar esse serviço?',
        btn1: 'Sim',
        btn2: 'Cancelar',
      }
    })
    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'Sim')
        this._solutionsPricesServices.delete(solutionPrice);
    })
    this.pricesServices.removeAt(solutionPrice.id)
  }




  formLoad() {
    this.formMain = this._Fb.group({
      id: [this.entity.id, []],
      clientId: [this.entity.clientId, []],
      budgetStartedIn: [this.entity.budgetStartedIn, []],
      visually: [this.entity.visually, []],
      remoteData: [this.entity.remoteData, []],
      clientProblems: [this.entity.clientProblems, []],
      status: [this.entity.status, []],
      finished: ['', []],
      solutionsPrices: this._Fb.array([])
    })
    this.seedingForm(this.entity.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      technician: ['RESPONSÁVEL PELO REPARO', []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      dateService: [new Date(), []],
      priceService: ['', []],
    })
  }

  seedingForm(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
    this.nServices = loaded.length;
  }

  save() {
    this._servicesBudgetUpdate.update(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
