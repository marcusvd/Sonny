import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../../budget/dto/service-budget-dto';
import { ServicesBudgetToBenchUpdate } from '../services/services-budget-to-bench-update.service';

@Component({
  selector: 'panel-services-bench',
  templateUrl: './panel-services-bench.component.html',
  styleUrls: ['./panel-services-bench.component.css'],
  providers: [ServicesBudgetToBenchUpdate]
})

export class PanelServicesBenchComponent extends BaseForm implements OnInit {

  private _formChildPriceService: FormGroup;

  nServices: number = 0;

  status: string[] = [
  'Aguardando autorização para execução.',
  'Sem reparo.',
  'Nenhum problema encontrado.',
  'Duvida, necessário conversar com o cliente.',
  'Problema físico (Hardware), troca de peça.',
];

  @Input() entity: ServiceBudgetDto;

  constructor(
    private _servicesBudgetToBenchUpdate: ServicesBudgetToBenchUpdate,
    private _Fb: FormBuilder
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

  removePriceService(i: number) {
    this.nServices -= 1;
    this.pricesServices.removeAt(i);
  }

  formLoad() {
    this.formMain = this._Fb.group({
      id: [this.entity.id, []],
      clientId: [this.entity.clientId, []],
      budgetStartedIn: [this.entity.budgetStartedIn, []],
      visually: [this.entity.visually, []],
      remoteData: [this.entity.remoteData, []],
      clientProblems: [this.entity.clientProblems, []],
      status : [this.entity.status, []],
      solutionsPrices: this._Fb.array([])
    })
    this.seedingForm(this.entity.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      technician: ['', []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
    })
  }

  seedingForm(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
    this.nServices = loaded.length;
  }

  save() {

    this._servicesBudgetToBenchUpdate.update(this.formMain);
  }



  ngOnInit(): void {
    this.formLoad();
  }

}
