import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { CostFrom, ICostFrom } from '../../dto/interfaces/i-cost-from';
import { GridGHelper } from 'src/shared/components/grid-g/helpers/grid-g-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { PhysicallyMovingCostsDto } from 'src/components/main/inheritances/PhysicallyMovingCosts';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MatCheckbox } from '@angular/material/checkbox';
import { BenchBudgetServiceValidators } from '../../validators/bench-budget-service-validators';
import { ToolTips } from 'src/shared/services/messages/snack-bar.service';

import { OpenBudgetService } from './services/open-budget.service';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'open-budget',
  templateUrl: './open-budget.component.html',
  styleUrls: ['./open-budget.component.css'],
})
export class OpenBudgetComponent extends BaseForm implements OnInit, AfterViewInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    override _breakpointObserver: BreakpointObserver,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _openBudgetService: OpenBudgetService
  ) {
    super(_breakpointObserver)

  }

  ngOnInit(): void {
    this.mainFormLoad();
    this.gridListOptsGHelper.pageSize = this.pageSize;
    this.gridListOptsGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListOptsGHelper.paramsTo(1, this.pageSize));

    this.gridListOptsGHelper.entities$.subscribe((x: CustomerDto[]) => {

      let viewDto = new CustomerGridDto;
      this.entities = [];
      x.forEach((xy: CustomerDto) => {
        viewDto = new CustomerGridDto();
        viewDto.id = xy.id;
        viewDto.name = xy.name;
        viewDto.bussinesLine = xy.businessLine;
        this.entities.push(viewDto);

      })

      this.entities$ = of(this.entities)
    })
    this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.gridListOptsGHelper.length;
    this.dataAccess = true;
    this.screen();
    this.dataAccessValidator.requiredSetFielInit(this.formMain);
  }

  dataAccessValidator = new BenchBudgetServiceValidators()
  costs: CostFrom = new CostFrom();
  companyId: string = JSON.parse(localStorage.getItem('companyId'));
  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: CustomerGridDto[] = [];
  entities$: Observable<CustomerGridDto[]>;
  btnsDisabled: boolean = true;
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']


  headers: string[] = ['', 'Nome', 'Atividade'];

  @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter((xy: CustomerGridDto) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    ))

  }

  physicallyMovingCostsDto: PhysicallyMovingCostsDto = new PhysicallyMovingCostsDto();
  urlCustomerWithTransporterCosts: string = 'customers/GetByIdIcludedPhysicallyMovingCosts';

  radioAloneMtd(obj: any) {

    const selectedEntity = obj.entity;
    this.formMain.get('customerId').setValue(selectedEntity.id);

    this.gridListOptsGHelper.loadById$<CustomerDto>(this.urlCustomerWithTransporterCosts, selectedEntity.id)
      .subscribe((x: CustomerDto) => {
        this.physicallyMovingCostsDto = x.physicallyMovingCosts
      })

  }

  messageTooltipNameOther = 'Ao selecionar essa opção o custo com coleta e entrega será dobrado. Seja se foi selecionado no menu ou cadastrado a parte.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  @ViewChild('customerPaginator') customerPaginator: MatPaginator

  ngAfterViewInit(): void {

    this.customerPaginator.page
      .pipe(
        tap(() => this.gridListOptsGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListOptsGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize))
        )).subscribe()
  }

  dataAccess: boolean;
  dataAccessShowHideInput($event: MatCheckbox) {
    const dataAccessCheckBox = $event;
    this.dataAccess = dataAccessCheckBox.checked;
  }

  screenFieldPosition: string = 'row';
  hideShowPaymentKind: boolean = false;
  pageSize: number = 5;
  lengthCustomer: number;
  pageSizeOptions: number[] = [5, 10, 20];

  searchInputFxFlexSize: number = 100;

  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  paymentKindSelect($event: MatSelect) {
    this.hideShowPaymentKind = false;
    const selectedData = $event;

    switch (selectedData.value) {
      case 0:
        if (!this.physicallyMovingCostsDto.fixedCostAssured) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.fixedCostAssured);
        }
        break;
      case 1:
        if (!this.physicallyMovingCostsDto.fuel) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.fuel);
        }
        break;
      case 2:
        if (!this.physicallyMovingCostsDto.apps) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.apps);
        }
        break;
      case 3:
        if (!this.physicallyMovingCostsDto.publicTransport) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.publicTransport);
        }
        break;
      case 4:
        if (!this.physicallyMovingCostsDto.motoBoy) {
          this.subForm.get('price').setValue(0);
        }
        else {
          this.subForm.get('price').setValue(this.physicallyMovingCostsDto.motoBoy);
        }
        break;
      case 5:
        this.subForm.get('price').setValue(0);
        break;
      case 6:
        this.hideShowPaymentKind = true;
        this.subForm.get('price').setValue(0);
        break;
    }




  }

  mainFormLoad() {

    return this.formMain = this._fb.group
      ({
        companyId: [localStorage.getItem("companyId"), [Validators.required]],
        userId: [localStorage.getItem("userId"), [Validators.required]],
        customerId: ['', [Validators.required]],
        problemAccordingCustomer: ['', [Validators.required, Validators.maxLength(1000)]],
        isPresentVisuallyDescription: ['', [Validators.maxLength(1000)]],
        isRemote: [false, []],
        dataDescription: ['', [Validators.maxLength(1000)]],
        collectsDeliversCosts: this.subFormLoad(),
        statusService: [4, []]
      })
  }

  subFormLoad() {
    return this.subForm = this._fb.group
      ({
        roundTrip: [false, []],
        costFrom: ['', [Validators.required]],
        price: [0, []],
      })
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._openBudgetService.save(this.formMain);
      this.mainFormLoad();
      this._router.navigateByUrl(`/side-nav/bench-budget-service-dash/list-budgets/${this.companyId}`)
    }
  }

}
