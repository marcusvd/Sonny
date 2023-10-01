import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { CostFrom, ICostFrom } from '../../dto/interfaces/i-cost-from';
import { GridGHelper } from 'src/shared/components/grid-g/helpers/grid-g-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
// import { CostFromEnumDto } from '../../dto/enums/cost-from-enum-dto';

@Component({
  selector: 'open-budget',
  templateUrl: './open-budget.component.html',
  styleUrls: ['./open-budget.component.css']
})
export class OpenBudgetComponent extends BaseForm implements OnInit, AfterViewInit {

  customerGridGHelper = new GridGHelper(this._http, this._route);
  costs: CostFrom = new CostFrom();

  constructor(
    private _fb: FormBuilder,
    _breakpointObserver: BreakpointObserver,
    private _http: HttpClient,
    private _route: ActivatedRoute
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
  }

  //Only HTML every grids
  screenFieldPosition: string = 'column';
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

  styleGridContainerHeader: string = "margin-bottom: -15px;  display: grid; grid-template-columns:800px; grid-gap: 1px;";
  styleGridMatCardHeader: string = "color: white; border: 1px solid rgb(0, 83, 26); background-color: rgb(8, 65, 0); box-shadow: none;";
  styleGridContainerItem: string = 'display: grid; grid-template-columns:800px; grid-gap: 1px;';

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

  outSelectedEntity($event: any) {
    const selectedEntity = $event;
    this.formMain.get('customerId').setValue(selectedEntity.id);
  }

  paymentKind($event: MatSelect) {
    const hideShow = $event;
    this.hideShowPaymentKind = true ? hideShow.value == 6: false;


    // if (hideShow.value === 6) {
    //   this.hideShowPaymentKind = true;
    // }
    // else {
    //   this.hideShowPaymentKind = false;
    // }
    // console.log(hideShow.value)

  }

  mainFormLoad() {
    return this.formMain = this._fb.group
      ({
        companyId: [localStorage.getItem("companyId"), [Validators.required]],
        userId: [localStorage.getItem("userId"), [Validators.required]],
        customerId: ['', []],
        problemAccordingCustomer: ['', []],
        isPresentVisuallyDescription: ['', []],
        isRemote: ['', []],
        dataDescription: ['', []],
        // entryDate: ['', []],
        budgetOpen: ['', []],
        collectsDeliversCosts: this.subFormLoad(),
        statusService: ['', []]
      })
  }

  subFormLoad() {
    return this.subForm = this._fb.group
      ({
        // isHaveCost: ['', []],
        roundTrip: ['', []],
        costFrom: ['', []],
        // price: ['', []],
        apartPrice: ['', []],
      })
  }

}
