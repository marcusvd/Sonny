import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { ProductDto } from '../dtos/product-dto';
import { QuantityDto } from '../dtos/quantity-dto';
import { QuantityGridDto } from './Dtos/quantity-grid-dto';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { ReserveSellConfirmComponent } from './reserve-sell-confirm.component';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'reserve-sell-list',
  templateUrl: './reserve-sell-list.component.html',
  styleUrls: ['./reserve-sell-list.component.css']

})
export class ReserveSellListComponent extends BackEndService<ProductDto> implements OnInit {

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);
  gridChecks = { 'reserve': 'Reservar', 'sell': 'Vender' };
  gridIcons = { 'move_down': 'Reservar', 'handshake': 'Vender' };
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 100px;', 'max-width: 100px;', 'max-width: 100px;', '', '', 'max-width: 100px;']
  headers: string[] = ['NFiscal', 'Preço', 'Garantia', 'Usado', 'Testado'];

  @Input() fieldsInEnglish: string[] = ['nfNumber', 'soldPrice', 'warrantyEnd', 'isUsed', 'isTested'];

  entities: QuantityGridDto[];
  entitiesToCompare: QuantityDto[];
  entities$: Observable<QuantityGridDto[]>;
  product: ProductDto;
  btnsDisabled: boolean = true;
  constructor(
    override _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private datePipe: PtBrDataPipe,
    private currency: PtBrCurrencyPipe
  ) { super(_http, environment.backEndDoor) }

  lengthBs: number = 0;
  pageSize: number = 20;

  ngOnInit(): void {

    this.callBackEnd();

    this.gridListOptsGHelper.entities$.subscribe((x: QuantityDto[]) => {
      this.entitiesToCompare = x;
      let viewDto = new QuantityGridDto;
      this.entities = [];
      x.forEach((xy: QuantityDto) => {
        viewDto = new QuantityGridDto();
        viewDto.id = xy.id;
        viewDto.sn = xy.sn;
        viewDto.nfNumber = xy.nfNumber;
        viewDto.costPrice = xy.costPrice;
        viewDto.soldPrice = this.currency.transform(xy.soldPrice.toString());
        viewDto.entryDate = xy.entryDate;
        viewDto.soldDate = xy.soldDate;
        viewDto.warrantyEnd = this.datePipe.transform(xy.warrantyEnd, 'Date');
        viewDto.isUsed = xy.isUsed ? 'Sim' : 'Não';
        viewDto.isTested = xy.isTested ? 'Sim' : 'Não';
        viewDto.isReserved = xy.isReserved;
        viewDto.usedHistorical = xy.usedHistorical;
        viewDto.customerId = xy.customerId;
        viewDto.customer = xy.customer;
        viewDto.productId = xy.productId;
        viewDto.product = xy.product;
        viewDto.supplierId = xy.supplierId;
        viewDto.supplier = xy.supplier;
        viewDto.reservedByUserId = xy.reservedOrSoldByUserId;
        viewDto.reservedByUser = xy.reservedOrSoldByUser;
        this.entities.push(viewDto);
      })

      this.entities$ = of(this.entities)
    })

    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

  @ViewChild('pgBs') pagination: MatPaginator

  ngAfterViewInit() {
    this._route.params.subscribe(x => {
      this.pagination.page
        .pipe(
          tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('QuantitiesProduct/GetAllQuantitiesByProductIdAsync', this.gridListOptsGHelper.paramsTo(this.pagination.pageIndex + 1, this.pagination.pageSize, x['id'])))
        ).subscribe();
    })

  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter(x => x.nfNumber.includes(term.value)))

  }

  resultToFinish: QuantityDto[] = [];
  resultHandled: QuantityDto[] = [];

  toReserve(answer: string) {

    this.resultHandled = [];
    this.resultToFinish.forEach(x => {
      x.isReserved = new Date();
      x.reservedOrSoldByUserId = JSON.parse(localStorage.getItem('userId'));
      this.resultHandled.push(x)
    })



    this._dialog.open(ReserveSellConfirmComponent, {
      data: { title: this.product.equipament, entities: this.resultHandled, action: 'reserve' },
      height: '80%',
    }).afterClosed().subscribe(x => {

      if (x === 'yes') {
        this.callBackEnd();
        this.gridListOptsGHelper.entities$.subscribe((x: QuantityDto[]) => {
          if (x == undefined || x.length <= 0)
            this.navigate();
        })
      }

    }
    )
  }

  toSell(answer: string) {

    this.resultHandled = [];
    this.resultToFinish.forEach(x => {
      x.soldDate = new Date();
      x.reservedOrSoldByUserId = JSON.parse(localStorage.getItem('userId'));
      this.resultHandled.push(x)
    })


    this._dialog.open(ReserveSellConfirmComponent, {
      data: { title: this.product.equipament, entities: this.resultHandled, action: 'sell' },
      height: '80%',
    }).afterClosed().subscribe(x => {
      if (x === 'yes') {
        this.callBackEnd();
        this.gridListOptsGHelper.entities$.subscribe((x: QuantityDto[]) => {
          if (x == undefined || x.length <= 0)
            this.navigate();
        })
      }
    }
    )

  }

  quantities: QuantityGridDto[] = [];
  checkAloneMtd(obj: any) {

    this.resultToFinish = [];

    const elementAdd: QuantityGridDto = obj.entity;

    if (obj.$event.checked)
      this.quantities.push(elementAdd)
    else {

      const indexOfObj = this.quantities.findIndex((qtgDto: QuantityGridDto) => {
        return qtgDto.id === obj.entity.id;
      })

      if (indexOfObj !== -1)
        this.quantities.splice(indexOfObj, 1);

    }

    this.entitiesToCompare.forEach(x => {
      this.quantities.filter(xy => {
        if (x.id === xy.id)
          this.resultToFinish.push(x)
      })
    })

    if (this.resultToFinish.length > 0)
      this.btnsDisabled = false;
    else {
      this.btnsDisabled = true;
    }
  }

  callBackEnd() {
    this._route.params.subscribe(x => {
      const productId: string = x['id'];
      this.gridListOptsGHelper.getAllEntitiesPaged('QuantitiesProduct/GetAllQuantitiesByProductIdAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, x['id']))
      this.loadById$<ProductDto>('products/GetProductByIdAsync', x['id']).subscribe((x: ProductDto) => {
        this.product = x;
        this.loadById$<number>('quantitiesProduct/LengthQuantitiesAsync', productId).subscribe((length: number) => {
          this.lengthBs = length;
        });
      })
    })

    this.gridListOptsGHelper.pageSize = this.pageSize;
    this.btnsDisabled = true;
  }

  navigate() {
    this._router.navigateByUrl(`/side-nav/product-dash/list-product/${JSON.parse(localStorage.getItem('companyId'))}`)
  }

  back() {
    window.history.back();
  }

}
