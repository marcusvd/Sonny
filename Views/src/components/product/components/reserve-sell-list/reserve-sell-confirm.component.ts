import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckbox, MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CommonService } from 'src/components/bench-budget-service/commons-components/services/common.service';
// import { any } from 'src/components/main/dtos/customer-grid-dto';
import { CommonModule, NgIf } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { CustomerDto } from 'src/components/main/customer/components/commons-components/dtos/customer-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { QuantityDto } from '../../dtos/quantity-dto';
import { TrackingDto } from '../../dtos/tracking-dto';
import { HardwareIncludedComponent } from './hardware-included.component';
import { ProductReserveSellService } from './services/product-reserve-sell.service';

@Component({
  selector: 'reserve-sell-confirm',
  templateUrl: './reserve-sell-confirm.component.html',
  styleUrls: ['./reserve-sell-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
    NgIf,
    HardwareIncludedComponent,
    MatCheckboxModule,
    MatDialogModule,
  ]
})
export class ReserveSellConfirmComponent implements OnInit, AfterViewInit {


  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: any[] = [];
  entities$: Observable<any[]>;
  btnsDisabled: boolean = true;
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']
  headers: string[] = ['', 'Nome', 'Atividade'];

  @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];

  constructor(
    private _DialogRef: MatDialogRef<ReserveSellConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _commonService: CommonService,
    private _route: ActivatedRoute,
    private _http: HttpClient,
    private _productReserveSellService: ProductReserveSellService
  ) { }

  lengthCustomer: number = 0;
  hasServices: number;
  customerId: number;
  pageSize: number = 20;

  service: boolean = false;

  serviceIncluded(event: MatCheckbox) {
    this.service = event.checked
  }


  clickedYes(yes: string) {
    this.saveEquipament(this.data.entities as QuantityDto[])
    this._DialogRef.close(yes);
  }

  clickedNo(no: string) {
    this._DialogRef.close(no);
  }

  idServiceHardwareIncluded: number;
  serviceHardwareIncludedId($event: number) {
    const id = $event
    this.idServiceHardwareIncluded = id;
  }

  saveEquipament(quantities: QuantityDto[]) {
    if (quantities.length === 0) {
      alert('É necessário pelo menos um equipamento para o cadastro.')
    } else {
      this._productReserveSellService.save(quantities)
      if (this.data.action === 'sell') {

        const tracking: TrackingDto[] = [];

        quantities.forEach(x => {
          const trakingAlone = new TrackingDto();
          trakingAlone.costPrice = x.costPrice;
          trakingAlone.customerId = x.customerId;
          trakingAlone.serviceId = this.idServiceHardwareIncluded;
          trakingAlone.nfNumber = x.nfNumber;
          trakingAlone.productId = x.productId;
          trakingAlone.sn = x.sn;
          trakingAlone.soldPrice = x.soldPrice;
          trakingAlone.userId = x.reservedOrSoldByUserId;
          tracking.push(trakingAlone);
        })
        this._productReserveSellService.saveTraking(tracking)
      }

    }

  }

  @ViewChild('pag') pagination: MatPaginator
  ngAfterViewInit() {

    this.pagination.page
      .pipe(
        tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('customers/GetAllCustomersPagedAsync', this.gridListOptsGHelper.paramsTo(this.pagination.pageIndex + 1, this.pagination.pageSize, null)))
      ).subscribe();
  }

  quantities: CustomerDto[] = [];
  services: boolean = false;
  @ViewChild('serviceCheck') serviceCheck: MatCheckbox;
  radioAloneMtd(obj: any) {

    this.services = false;

    const customer: CustomerDto = obj.entity;

    let quantities: QuantityDto[] = this.data.entities;

    quantities.forEach(x => {
      x.customerId = customer.id;
    })

    this.data.entities = quantities;

    if (customer)
      this.btnsDisabled = false;

    this.services = true;
    this.customerId = obj.entity.id
    this._commonService.loadById$<number>('BudgetsServices/GetCountByCustomerIdAsync', obj.entity.id)
      .subscribe(
        (x: number) => {
          this.hasServices = x
          let emitTrue = new MatCheckboxChange();
          if (x > 0) {
            this.serviceCheck.checked = true;
            emitTrue.checked = true
            this.serviceCheck.change.emit(emitTrue)
          }
          else {
            this.serviceCheck.checked = false;
            emitTrue.checked = false;
            this.serviceCheck.change.emit(emitTrue)
          }
        }
      )


  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter((xy: any) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    ))

  }

  ngOnInit(): void {

    this.gridListOptsGHelper.getAllEntitiesPaged('customers/GetAllCustomersPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null))
    this.gridListOptsGHelper.entities$.subscribe((x: CustomerDto[]) => {

      // let viewDto = new any;
      // this.entities = [];
      // x.forEach((xy: CustomerDto) => {
      //   viewDto = new any();
      //   viewDto.id = xy.id.toString();
      //   viewDto.name = xy.name;
      //   viewDto.bussinesLine = xy.businessLine;
      //   this.entities.push(viewDto);

      // })

      this.entities$ = of(this.entities)
    })

    this._commonService.loadById$<number>('customers/LengthAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe(
        (x: number) => {
          this.lengthCustomer = x;
        }
      )

    this.entities$ = of(this.entities);
    this.gridListOptsGHelper.pageSize = this.pageSize;
    this.hasServices = 0;
  }

}
