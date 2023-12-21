import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';
import { QuantityDto } from '../dtos/quantity-dto';
import { environment } from 'src/environments/environment';
import { ProductReserveSellService } from './services/product-reserve-sell.service';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { MatPaginator } from '@angular/material/paginator';
import { filter, tap } from 'rxjs/operators';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { TrackingDto } from '../dtos/tracking-dto';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'reserve-sell-confirm',
  templateUrl: './reserve-sell-confirm.component.html',
  styleUrls: ['./reserve-sell-list.component.css']
})
export class ReserveSellConfirmComponent extends BackEndService<CustomerDto> implements OnInit, AfterViewInit {


  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: CustomerGridDto[] = [];
  entities$: Observable<CustomerGridDto[]>;
  btnsDisabled: boolean = true;
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']


  headers: string[] = ['', 'Nome', 'Atividade'];

  @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];

  constructor(
    private _DialogRef: MatDialogRef<ReserveSellConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private _SnackBar: MsgOperation,
    private _route: ActivatedRoute,
    override _http: HttpClient,
    private _productReserveSellService: ProductReserveSellService
  ) { super(_http, environment.backEndDoor) }

  lengthCustomer: number = 0;
  pageSize: number = 20;

  @ViewChild('includedService') check:MatCheckbox

  clickedYes(yes: string) {
    this.saveEquipament(this.data.entities as QuantityDto[], this.check.checked)
    this._DialogRef.close(yes);
  }

  clickedNo(no: string) {
    this._DialogRef.close(no);
  }

  saveEquipament(quantities: QuantityDto[], check:boolean) {

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
          trakingAlone.nfNumber = x.nfNumber;
          trakingAlone.productId = x.productId;
          trakingAlone.sn = x.sn;
          trakingAlone.soldPrice = x.soldPrice;
          trakingAlone.userId = x.reservedOrSoldByUserId;
          trakingAlone.includedService = check;
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

  radioAloneMtd(obj: any) {

    const customer: CustomerDto = obj.entity;
    let quantities: QuantityDto[] = this.data.entities;

    quantities.forEach(x => {
      x.customerId = customer.id;
    })

    this.data.entities = quantities;

    if (customer)
      this.btnsDisabled = false;

  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter((xy: CustomerGridDto) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    ))

  }


  ngOnInit(): void {
    this.gridListOptsGHelper.getAllEntitiesPaged('customers/GetAllCustomersPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null))
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

    this.loadById$<number>('customers/LengthAsync', JSON.parse(localStorage.getItem('companyId')))
      .subscribe(
        (x: number) => {
          this.lengthCustomer = x;
        }
      )
    this.entities$ = of(this.entities);
    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

}
