import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { of } from 'rxjs';

import { SolutionPriceDto } from 'src/components/services-provision/dtos/solution-price-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsService } from 'src/shared/helpers/validators/validators.service';
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
  problemByTechnicianTechnicalSolutionRowHeightDefault = '350px';

  remoteApprovedRowHeightDefault = '140px';
  @Input() remoteApprovedCols: number;
  remoteApprovedRowHeight: string = this.remoteApprovedRowHeightDefault;

  problemByTechnicianTechnicalSolutionCols: number = 2;
  problemByTechnicianTechnicalSolutionRowHeight: string = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

  solutionPriceCols: number = 2;
  solutionPriceRowHeight: string = '200px';



  @Input() entity: ServiceBudgetDto;
  @Input() showServicePrice: boolean = false;
  @Input() pricePerService: boolean = false;
  @Input() isApproved: boolean = false;
  @Input() isAuthorized: boolean = false;
  @Output() updateGridBudgetNeeded = new EventEmitter<boolean>(false);

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
    override _validatorsService: ValidatorsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_validatorsService, _breakpointObserver) }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.problemByTechnicianTechnicalSolutionCols = 1;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            this.remoteApprovedCols = 1;
            this.remoteApprovedRowHeight = this.remoteApprovedRowHeightDefault;

            this.solutionPriceCols = 1;
            this.solutionPriceRowHeight = '200px';
            break;
          }
          case 'small': {
            this.problemByTechnicianTechnicalSolutionCols = 1;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;


            this.remoteApprovedCols = 1;
            this.remoteApprovedRowHeight = this.remoteApprovedRowHeightDefault;

            this.solutionPriceCols = 1;
            this.solutionPriceRowHeight = '200px';
            break;
          }
          case 'medium': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            if (this.isApproved) {
              this.remoteApprovedCols = 2;
            }
            else {
              this.remoteApprovedCols = 1;
            }
            this.remoteApprovedRowHeight = this.remoteApprovedRowHeightDefault;

            this.solutionPriceCols = 2;
            this.solutionPriceRowHeight = '200px';
            break;
          }
          case 'large': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            if (this.isApproved) {
              this.remoteApprovedCols = 2;
            }
            else {
              this.remoteApprovedCols = 1;
            }
            this.remoteApprovedRowHeight = this.remoteApprovedRowHeightDefault;

            this.solutionPriceCols = 2;
            this.solutionPriceRowHeight = '200px';
            break;
          }
          case 'xlarge': {
            this.problemByTechnicianTechnicalSolutionCols = 2;
            this.problemByTechnicianTechnicalSolutionRowHeight = this.problemByTechnicianTechnicalSolutionRowHeightDefault;

            if (this.isApproved) {
              this.remoteApprovedCols = 2;
            }
            else {
              this.remoteApprovedCols = 1;
            }
            this.remoteApprovedRowHeight = this.remoteApprovedRowHeightDefault;

            this.solutionPriceCols = 2;
            this.solutionPriceRowHeight = '200px';
            break;
          }
        }
      }
    })




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
    this._servicesBudgetUpdate.addUpdate(this.formMain).subscribe((result: boolean) => {
      if (result) {
        this.updateGridBudgetNeeded.emit(true);
      }
    })

  }

  ngOnInit(): void {
    this.formLoad();
  }

}
