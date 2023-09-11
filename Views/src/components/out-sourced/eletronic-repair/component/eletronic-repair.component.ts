import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { GridGHelper } from 'src/shared/components/grid-g/helpers/grid-g-helper';


@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {

  //multiples places
  customerBackEndUrl: string = 'customers/GetAllPagedCustomersAsync';

  // public _formCollectDeliver: FormGroup;

  // title: string = "transfer_within_a_station";
  // subTitle: string = 'Reparo eletrônico terceirizado';



  // radioValue: string;
  // radioValueDestinyType: string;

  // itemEntryDateCols: number;
  // itemEntryDateRowHeight: string = '200px';


  // problemSolutionCols: number;
  // problemSolutionRowHeight: string = '350px';

  // userPwdCols: number;
  // userPwdRowHeight: string = '180px';

  // partnerIdSolutionCols: number;
  // partnerIdSolutionRowHeight: string = '180px';

  // both: boolean;
  // destinyClients: boolean;
  // destinyPartners: boolean;
  // destinyOthers: boolean;


  constructor(
    private _eletronicRepairCreateService: EletronicRepairCreateService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  gridGHelper = new GridGHelper(this._http, this._route);

  public entities$ = this.gridGHelper.entities$;

  titlesHeader: string[] = ['Nome', 'Responsável'];
  fieldsInEnglish: string[] = ['name', 'responsible'];


  // startDate = new Date();

  // private valMessages = ValidatorMessages;
  // get validatorMessages() {
  //   return this.valMessages
  // }

  // private _customers: CustomerDto[] = [];
  // private _partners: PartnerDto[] = [];

  // get customers() {
  //   return this._customers;
  // }
  // get partners() {
  //   return this._partners;// return this._partners.filter(x => x.eletronicRepair);
  // }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {


            break;
          }
          case 'small': {


            break;
          }
          case 'medium': {


            break;
          }
          case 'large': {


            break;
          }
          case 'xlarge': {


            break;
          }
        }
      }
    })
  }

  formLoad() {
    return this.formMain = this._fb.group({
      customerId: ['', [Validators.required, Validators.maxLength(50)]],
      item: ['', [Validators.required, Validators.maxLength(50)]],
      // entryDate: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      problem: ['', [Validators.required, Validators.maxLength(500)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.maxLength(50)]],
      price: [0, []],
      partnerId: ['', [Validators.required]],
      solution: ['', [Validators.maxLength(1000)]],
      authorized: [false, []],
    })
  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._eletronicRepairCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  // loadEntities(backEndUrl: string = this.customerBackEndUrl, params: HttpParams) {
  //   this._eletronicRepairCreateService.loadAllPaged$<any[]>(backEndUrl, params).subscribe((response: any) => {
  //     this.gridGHelper.entitiesBehaviorSubject.next(response.body);
  //   })
  // }

  @ViewChild('customerPaginator') paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        // tap(() => this.loadEntities(this.customerBackEndUrl, this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)))
         tap(() => this.gridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridGHelper.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)))
      ).subscribe(() => {
      })
  }



  outputFieldSearch($event: FormControl) {

    const searchField = $event;

    this.gridGHelper.outputFieldSearchHelper(searchField, this.customerBackEndUrl)
    this.gridGHelper.queryField = searchField
  }

  getPaginatedEntities(params: HttpParams) {
    return this._eletronicRepairCreateService.loadAllPaged$<any[]>(this.customerBackEndUrl, params);
  }

  lengthCustomer: number;
  lengthPartner: number;
  ngOnInit(): void {

    this.formLoad();
    this.screen();

    this.gridGHelper.getAllEntitiesPaged(this.customerBackEndUrl);
    this.gridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.gridGHelper.length;
    this.gridGHelper.searchQueryHendler(this.customerBackEndUrl)

  }
}

