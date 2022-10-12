import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ServiceBudgetDto } from '../dto/service-budget-dto';
import { ServiceBenchCreateService } from '../services/service-bench-create.service';
import { ServicesBudgetUpdate } from '../services/services-budget-update.service';
import { SolutionsPricesServices } from '../services/solutions-prices.service';



@Component({
  selector: 'panel-services-budget',
  templateUrl: './panel-services-budget.component.html',
  styleUrls: ['./panel-services-budget.component.css'],
  providers: [SolutionsPricesServices]
})

export class PanelServicesBudgetComponent extends BaseForm implements OnInit {

  @Input() entity: ServiceBudgetDto;
  @Input() showServicePrice: boolean = false;
  @Input() pricePerService: boolean = false;
  @Input() isApproved: boolean = false;
  @Input() isAuthorized: boolean = false;

  nServices: number = 0;
  status: string[] = [
    'Aguardando autorização para execução.',
    'Sem reparo.',
    'Nenhum problema encontrado.',
    'Duvida, necessário conversar com o cliente.',
    'Problema físico (Hardware), troca de peça.',
  ];

  private _formChildPriceService: FormGroup;

  constructor(
    private _servicesBudgetUpdate: ServicesBudgetUpdate,
    private _solutionsPricesServices: SolutionsPricesServices,
    private _Fb: FormBuilder,
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
    this.pricesServices.push(this.formPricesServices())
  }

  removePriceService(solutionPriceForm: FormGroup, indexArrayTemplate?: number) {
    const indexArrayTemplateNumber = indexArrayTemplate;
    const solutionPrice: SolutionPriceDto = { ...solutionPriceForm.value }

    if (solutionPrice.id) {
      this._solutionsPricesServices.dialogManager(solutionPrice).subscribe((result: boolean) => {
        if (result) {
          this.pricesServices.removeAt(indexArrayTemplateNumber);
        }
      })
    }
    else {
      this.pricesServices.removeAt(indexArrayTemplate);
    }
  }

  get solutionPricesArray() {
    return this.formMain.get('solutionsPrices').value as SolutionPriceDto[];
  }

  get numbersOfServicesObservable() {
    return of(this.solutionPricesArray.length)
  }

  get numbersOfServices() {
    this.numbersOfServicesObservable.subscribe((total: number) => {
      return this.nServices = total;
    })
    return this.nServices
  }

  pricesArrayNumber() {
    return this.solutionPricesArray.map((prices) => prices.priceService);
  }

  amountPrices() {
    const sum = this.pricesArrayNumber().reduce((total, value) => {
      return total + value;
    }, 0)
    return sum;
  }

  formLoad() {
    this.formMain = this._Fb.group({
      id: [this.entity.id, []],
      clientId: [this.entity.clientId, []],
      budgetStartedIn: [this.entity.budgetStartedIn, []],
      visually: [this.entity.visually, []],
      remoteAccessData: [this.entity.remoteAccessData, []],
      clientProblems: [this.entity.clientProblems, []],
      status: [this.entity.status, []],
      authorized: [this.entity.authorized, []],
      solutionsPrices: this._Fb.array([])
    })
    this.seedingForm(this.entity.solutionsPrices);
  }

  formPricesServices(): FormGroup {
    return this._formChildPriceService = this._Fb.group({
      dateService: [new Date(), []],
      technician: ['RESPONSÁVEL PELO REPARO', []],
      priceService: [0, []],
      problemByTechnician: ['', []],
      technicalSolution: ['', []],
      remote: [false, []],
      approved: [false, []],
    })
  }

  seedingForm(loaded?: SolutionPriceDto[]) {
    loaded?.forEach((solutionPrice?: SolutionPriceDto) => {
      this?.pricesServices?.push(this._Fb.group(solutionPrice));
    })
    this.nServices = loaded.length;
  }

  save() {
    this._servicesBudgetUpdate.addUpdate(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
  }

}
