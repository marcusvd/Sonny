import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { CostFrom, ICostFrom } from '../../dto/interfaces/i-cost-from';
import { GridGHelper } from 'src/shared/components/grid-g/helpers/grid-g-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
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
import { CustomPaginator } from 'src/shared/components/paginator/custom-matpaginator-intl';
import { OpenBudgetService } from './services/open-budget.service';


@Component({
  selector: 'open-budget',
  templateUrl: './open-budget.component.html',
  styleUrls: ['./open-budget.component.css'],
  providers:[
    {provide:MatPaginatorIntl, useValue:CustomPaginator()}
  ]
})
export class OpenBudgetComponent extends BaseForm implements OnInit, AfterViewInit {

  dataAccessValidator = new BenchBudgetServiceValidators()
  customerGridGHelper = new GridGHelper(this._http, this._route);
  costs: CostFrom = new CostFrom();

  messageTooltipNameOther = 'Ao selecionar essa opção o custo com coleta e entrega será dobrado. Seja se foi selecionado no menu ou cadastrado a parte.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages;
  }

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _openBudgetService: OpenBudgetService
  ) {
    super(_breakpointObserver)

  }

  @ViewChild('customerPaginator') customerPaginator: MatPaginator

  ngAfterViewInit(): void {

    this.customerPaginator.page
      .pipe(
        tap(() => this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize))
        )).subscribe()
  }

  ngOnInit(): void {
    this.mainFormLoad();
    this.customerGridGHelper.pageSize = this.pageSize;
    this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl);
    this.customerGridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.customerGridGHelper.length;
    this.dataAccess = true;
    this.screen();
    this.dataAccessValidator.requiredSetFielInit(this.formMain);
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
  searchItensFound: number;
  getLengthCustomer($event: any) {
    this.searchItensFound = this.customerGridGHelper.searchItensFound.value
  }

  fieldsInEnglish: string[] = ['name'];
  searchInputFxFlexSize: number = 100;

  customerBackEndUrl: string = 'customers/GetAllPagedCustomersAsync';
  titlesHeaderCustomer: string[] = ['CLIENTES'];

  gridTemplateColumns: string = '800px';
  styleGridContainerHeader: string;
  styleGridContainerItem: string;
  styleGridMatCardHeader: string = "color: white; border: 1px solid rgb(0, 83, 26); background-color: rgb(8, 65, 0); box-shadow: none;";

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.styleGridContainerHeader = "margin-bottom: -15px;  display: grid; grid-template-columns:300px; grid-gap: 1px;";
            this.styleGridContainerItem = "display: grid; grid-template-columns:300px; grid-gap: 1px;";
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.styleGridContainerHeader = "margin-bottom: -15px;  display: grid; grid-template-columns:300px; grid-gap: 1px;";
            this.styleGridContainerItem = "display: grid; grid-template-columns:300px; grid-gap: 1px;";
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.styleGridContainerHeader = "margin-bottom: -15px;  display: grid; grid-template-columns:500px; grid-gap: 1px;";
            this.styleGridContainerItem = "display: grid; grid-template-columns:500px; grid-gap: 1px;";
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.styleGridContainerHeader = "margin-bottom: -15px;  display: grid; grid-template-columns:800px; grid-gap: 1px;";
            this.styleGridContainerItem = "display: grid; grid-template-columns:800px; grid-gap: 1px;";
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.styleGridContainerHeader = "margin-bottom: -15px;  display: grid; grid-template-columns:800px; grid-gap: 1px;";
            this.styleGridContainerItem = "display: grid; grid-template-columns:800px; grid-gap: 1px;";
            break;
          }
        }
      }
    })
  }

  physicallyMovingCostsDto: PhysicallyMovingCostsDto = new PhysicallyMovingCostsDto();
  urlCustomerWithTransporterCosts: string = 'customers/GetByIdIcludedPhysicallyMovingCosts';
  outSelectedEntity($event: any) {
    const selectedEntity = $event;
    this.formMain.get('customerId').setValue(selectedEntity.id);

    this.customerGridGHelper.loadById$<CustomerDto>(this.urlCustomerWithTransporterCosts, selectedEntity.id)
      .subscribe((x: CustomerDto) => {
        this.physicallyMovingCostsDto = x.physicallyMovingCosts
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

    // if (!this.physicallyMovingCostsDto.fixedCostAssured) {
    //   this.price = 0;
    // } else {

    // }


  }

  mainFormLoad() {

    return this.formMain = this._fb.group
      ({
        companyId: [localStorage.getItem("companyId"), [Validators.required]],
        userId: [localStorage.getItem("userId"), [Validators.required]],
        customerId: ['', [Validators.required]],
        problemAccordingCustomer: ['', [Validators.required]],
        isPresentVisuallyDescription: ['', []],
        isRemote: [false, []],
        dataDescription: ['', [Validators.maxLength(1000)]],
        collectsDeliversCosts: this.subFormLoad(),
        statusService:[4,[]]
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
test(){
  console.log(this.formMain)
  console.log(this.formMain.controls['customerId'].touched)
}
  save() {

    if (this.alertSave(this.formMain)) {
      this._openBudgetService.save(this.formMain);
      this.mainFormLoad();
    }

  }

}
