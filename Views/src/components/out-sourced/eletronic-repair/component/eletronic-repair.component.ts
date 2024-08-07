import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';



@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {

  //multiples places
  partnerGridGHelper = new GridListOptsGHelper(this._http, this._route);



 //START GRID
 customerGridGHelper = new GridListOptsGHelper(this._http, this._route);

 entities: any[] = [];
 entities$: Observable<any[]>;
 btnsDisabled: boolean = true;
 cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']


 headers: string[] = ['', 'Nome', 'Atividade'];

 @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];




 queryFieldOutput($event: FormControl) {

   const term = $event;

   this.entities$ = of(this.entities.filter((xy: any) =>

     xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
     ||
     xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
   ))

 }

 radioAloneMtd(obj: any) {

  const selectedEntity = obj.entity;
  this.formMain.get('customerId').setValue(selectedEntity.id);

}



 //END GRID



  constructor(
    private _eletronicRepairCreateService: EletronicRepairCreateService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  //Only HTML every grids
  screenFieldPosition: string = 'row';
  pageSize: number = 5;
  lengthCustomer: number;
  pageSizeOptions: number[] = [5, 10, 20];
  // searchItensFound: number;

  //GridCustomer Component
  //css HEADER
  //grid-template-columns:360px <= need include one for each new column
  // styleGridContainerHeader: string = "margin-bottom: -15px;  display: grid; grid-template-columns:360px; grid-gap: 1px;";
  // styleGridMatCardHeader: string = "color: white; border: 1px solid rgb(0, 83, 26); background-color: rgb(8, 65, 0); box-shadow: none;";
  //css ITEM
  //grid-template-columns:360px <= need include one for each new column
  // styleGridContainerItem: string = 'display: grid; grid-template-columns:360px; grid-gap: 1px;';

  //Multiples Places
  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';
  partnerBackEndUrl: string = 'partners/GetAllPagedPartnersAsync';
  // titlesHeaderCustomer: string[] = ['CLIENTES'];
  // titlesHeaderPartner: string[] = ['PARCEIROS'];
  searchInputFxFlexSize: number = 100;

  //GridPartner
  // lengthPartner: number;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // outSelectedEntity($event: any) {
  //   const selectedEntity = $event;
  //   this.formMain.get('customerId').setValue(selectedEntity.id);
  // }

  get partners() {
    return this._eletronicRepairCreateService.electronicRepairPartners;
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
    return this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem("companyId")), [Validators.required]],
      userId: [localStorage.getItem("userId"), [Validators.required]],
      item: ['', [Validators.required]],
      description: ['', []],
      problem: ['', [Validators.required]],
      userEquipament: ['', []],
      passwordEquipament: ['', []],
      price: [0, []],
      serviceProviderId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
    })

  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._eletronicRepairCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  // getLengthCustomer($event: any) {
  //   this.searchItensFound = this.customerGridGHelper.searchItensFound.value
  // }

  @ViewChild('customerPaginator') customerPaginator: MatPaginator;
  ngAfterViewInit(): void {
    this.customerPaginator.page
      .pipe(
        tap(() => this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize)))
      ).subscribe(() => {
      })
  }

  ngOnInit(): void {

    this.formLoad();
    this.screen();

    // this.customerGridGHelper.pageSize = this.pageSize;
    // this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl);
    //
    this.customerGridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.customerGridGHelper.length;

    this.customerGridGHelper.pageSize = this.pageSize;


    this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(1, this.pageSize));

    this.customerGridGHelper.entities$.subscribe((x: CustomerDto[]) => {

      // let viewDto = new CustomerGridDto;
      // this.entities = [];
      // x.forEach((xy: CustomerDto) => {
      //   viewDto = new CustomerGridDto();
      //   viewDto.id = xy.id.toString();
      //   viewDto.name = xy.name;
      //   viewDto.bussinesLine = xy.businessLine;
      //   this.entities.push(viewDto);

      // })

      this.entities$ = of(this.entities)
    })

    //PartnerGrid
    this._eletronicRepairCreateService.loadPartners();
  }
}
