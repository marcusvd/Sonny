import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ProductListService } from './services/product-list.service';
import { HttpClient } from '@angular/common/http';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { BudgetServiceGridListDto } from 'src/components/bench-budget-service/dto/budget-service-grid-list-dto';
import { StatusService } from 'src/components/bench-budget-service/dto/interfaces/i-status-service';
import { BudgetServiceDto } from 'src/components/bench-budget-service/dto/budget-service-dto';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EquipamentDto } from '../dtos/equipament-dto';
import { ProductDto } from '../dtos/product-dto';
import { EquipamentGridDto } from '../dtos/equipament-grid-dto';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuantityDto } from '../dtos/quantity-dto';
import { QuantityGridDto } from './Dtos/quantity-grid-dto';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CurrencyPipe } from '@angular/common';



@Component({
  selector: 'reserve-sell-list',
  templateUrl: './reserve-sell-list.component.html',
  styleUrls: ['./reserve-sell-list.component.css']

})
export class ReserveSellListComponent extends BaseForm implements OnInit {

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: QuantityGridDto[];
  entities$: Observable<QuantityGridDto[]>;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto,
    private datePipe: PtBrDataPipe,
    private currency: PtBrCurrencyPipe
    // private blrCurrencyPipe: CurrencyPipe
  ) { super() }

  lengthBs: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {

    // this.gridListOptsGHelper.getAllEntitiesPaged('products/GetAllPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize))


    // this.gridListOptsGHelper.entities$.subscribe((x: ProductDto[]) => {

    let viewDto = new QuantityGridDto;
    this.entities = [];
    // this.blrCurrencyPipe.transform(xy.soldPrice,'BLR','symbol','1.2-2');
    this.data.quantities.forEach((xy: QuantityDto) => {
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
      viewDto.reservedByUserId = xy.reservedByUserId;
      viewDto.reservedByUser = xy.reservedByUser;
      this.entities.push(viewDto);

    })

    this.entities$ = of(this.entities)
    // })

    // this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('lengthProduct')

    this.lengthBs = this.data.quantities.length;

    // this.gridListOptsGHelper.pageSize = this.pageSize;

  }

  @ViewChild('pgBs') pagination: MatPaginator

  ngAfterViewInit() {

    // this.pagination.page
    //   .pipe(
    //     tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('products/GetAllPagedAsync', this.gridListOptsGHelper.paramsTo(this.pagination.pageIndex + 1, this.pagination.pageSize)))
    //   ).subscribe();

  }

  queryFieldOutput($event: FormControl) {

    const term = $event;
    console.log(term.value)
    // this.gridListOptsGHelper.searchQueryHendler(term, 'products/GetAllPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize));

    // this.gridListOptsGHelper.entities$.subscribe((x: ProductDto[]) => {

    //   let viewDto = new EquipamentGridDto;
    //   this.entities = [];

    //   x.forEach((xy: ProductDto) => {
    //     viewDto = new EquipamentGridDto();
    //     viewDto.description = xy.equipament.description
    //     viewDto.manufacturer = xy.equipament.manufacturer
    //     viewDto.model = xy.equipament.model
    //     viewDto.name = xy.equipament.name
    //     viewDto.segment = xy.equipament.segment
    //     viewDto.length = xy.quantities.length

    //     // this.entities.push(viewDto);
    //   })


    //   this.entities$ = of(this.entities)
    // })

  }

  getEntityEvent(entity: any) {
    console.log(entity.opt)
    // entity: EquipamentGridDto

    //  const entityToSend:ProductDto = entity.entity.entityComplete;

    //  const dialogRef = this.dialog.open(ReserveSellListComponent, {

    //    data:entityToSend
    //  });

    //  dialogRef.afterClosed().subscribe(result => {
    //    console.log(`Dialog result: ${result}`);
    //  });

    // const companyId = JSON.parse(localStorage.getItem('companyId'));
    // this._router.navigateByUrl(`side-nav/bench-budget-service/open-service/${serviceId}`);
  }

  cssColumns: string[] = ['width: 150px;', 'width: 70px;', 'width: 80px;', 'max-width: 150px;', '', '', 'max-width: 50px;']

  headers: string[] = ['Vender - Reservar', 'NFiscal', 'Preço', 'Término Garantia', 'Usado', 'Testado'];

  @Input() fieldsInEnglish: string[] = ['nfNumber', 'soldPrice', 'warrantyEnd', 'isUsed', 'isTested'];
}
