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

  // private entitiesBehaviorSubject = new BehaviorSubject<any[]>([]);

  // public entities$ = this.entitiesBehaviorSubject.asObservable();
  public entities$ = this.gridGHelper.entities$;

  titlesHeader: string[] = ['Nome', 'Responsável'];
  fieldsInEnglish: string[] = ['name', 'responsible'];


  startDate = new Date();

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private _customers: CustomerDto[] = [];
  private _partners: PartnerDto[] = [];

  get customers() {
    return this._customers;
  }
  get partners() {
    return this._partners;// return this._partners.filter(x => x.eletronicRepair);
  }

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


  loadEntities(backEndUrl: string = "customers/GetAllPagedCustomersAsync", params: HttpParams) {
    this._eletronicRepairCreateService.loadAllPaged$<any[]>(backEndUrl, params).subscribe((response: any) => {
      this.gridGHelper.entitiesBehaviorSubject.next(response.body);
      // this.entitiesBehaviorSubject.next(response.body);
    })
  }
  // loadEntities(backEndUrl: string = "customers/GetAllPagedCustomersAsync", pageIndex: number = 0, pageSize: number = 10, filter: string = '') {
  //   this._eletronicRepairCreateService.loadAllPaged$<any[]>(backEndUrl, pageIndex, pageSize, filter).subscribe((response: any) => {
  //     this.entitiesBehaviorSubject.next(response.body);
  //   })
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadEntities("customers/GetAllPagedCustomersAsync", this.paramsTo(this.paginator.pageIndex + 1, this.paginator.pageSize)))
      ).subscribe(() => {
      })
  }

  paramsTo(pageIndex: number = 1, pageSize: number = 10) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pageSize);
    params = params.append('companyid', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', this.queryField.value);
    return params;
  }

  outputFieldSearch($event: FormControl) {
    this.queryField = $event;
    let value = this.queryField.value;
    if (value && (value = value.trim() != '')) {
      this.getPaginatedEntities(this.paramsTo()).subscribe(x => {
        this.gridGHelper.entitiesBehaviorSubject.next(x.body);
        // this.entitiesBehaviorSubject.next(x.body);
      })
    }
  }

  getPaginatedEntities(params: HttpParams) {
    this._eletronicRepairCreateService.loadAllPaged$<any[]>("customers/GetAllPagedCustomersAsync", params).subscribe(x => {
    })
    return this._eletronicRepairCreateService.loadAllPaged$<any[]>("customers/GetAllPagedCustomersAsync", params);
  }

  queryField = new FormControl()
  lengthCustomer: number;
  lengthPartner: number;
  ngOnInit(): void {

    this.formLoad();
    this.screen();

    this.gridGHelper.getAllEntitiesPaged("customers/GetAllPagedCustomersAsync");
    // this._eletronicRepairCreateService.loadAllPaged$<any[]>("customers/GetAllPagedCustomersAsync", this.paramsTo())
    //   .subscribe((entities: any) => {
    //     this.entitiesBehaviorSubject.next(entities.body);
    //   })

    this.gridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.gridGHelper.length;


    this.queryField.valueChanges.pipe(
      map(x => x.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.getPaginatedEntities(this.paramsTo())),
      tap(value => {
        this.gridGHelper.entitiesBehaviorSubject.next(value.body);
        // this.entitiesBehaviorSubject.next(value.body);
      })
    ).subscribe(
      () => {
        if (this.queryField.value === '') {
          this._eletronicRepairCreateService.loadAllPaged$<any[]>("customers/GetAllPagedCustomersAsync", this.paramsTo())
        }
      }
    );
  }
}

