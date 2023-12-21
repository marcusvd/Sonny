import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { BenchBudgetServiceValidators } from '../../validators/bench-budget-service-validators';

import { Observable, of } from 'rxjs';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { OpenBudgetService } from './services/open-budget.service';

@Component({
  selector: 'open-budget',
  templateUrl: './open-budget.component.html',
  styleUrls: ['./open-budget.component.css'],
})
export class OpenBudgetComponent extends BaseForm implements OnInit, AfterViewInit {

  constructor(
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    override _breakpointObserver: BreakpointObserver,
    private _http: HttpClient,
    private _openBudgetService: OpenBudgetService
  ) {
    super(_breakpointObserver)
  }

  ngOnInit(): void {
    this.formLoad();
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


  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: CustomerGridDto[] = [];
  entities$: Observable<CustomerGridDto[]>;
  btnsDisabled: boolean = true;

  radioExecutionMode: { [key: string]: number } = { Remoto: 0, Presencial: 1, Misto: 2 }

  sort = () => {
    return 0
  }

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

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';
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

  pageSize: number = 5;
  lengthCustomer: number;
  pageSizeOptions: number[] = [5, 10, 20];

  searchInputFxFlexSize: number = 100;


  customerId: string;
  radioCustomerGrid($event: any) {
    const selectedEntity = $event;
    this.formMain.get('customerId').setValue(selectedEntity.entity.id);
    this.customerId = selectedEntity.entity.id;
  }


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

  formLoad() {

    return this.formMain = this._fb.group
      ({
        companyId: [localStorage.getItem("companyId"), [Validators.required]],
        userId: [localStorage.getItem("userId"), [Validators.required]],
        customerId: ['', [Validators.required]],
        problemAccordingCustomer: ['', [Validators.required, Validators.maxLength(1000)]],
        isPresentVisuallyDescription: ['', [Validators.maxLength(1000)]],
        executionMode: ['0', [Validators.required]],

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
      this.formLoad();

    }
  }

}
