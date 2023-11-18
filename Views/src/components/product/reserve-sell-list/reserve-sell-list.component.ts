import { Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { HttpClient } from '@angular/common/http';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductDto } from '../dtos/product-dto';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuantityDto } from '../dtos/quantity-dto';
import { QuantityGridDto } from './Dtos/quantity-grid-dto';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { CurrencyPipe } from '@angular/common';

import { ReserveSellConfirmComponent } from './reserve-sell-confirm.component';



@Component({
  selector: 'reserve-sell-list',
  templateUrl: './reserve-sell-list.component.html',
  styleUrls: ['./reserve-sell-list.component.css']

})
export class ReserveSellListComponent extends BaseForm implements OnInit {

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);
  gridChecks = {'reserve':'Reservar','sell':'Vender'};
  gridIcons = {'move_down':'Reservar','handshake':'Vender'};
  cssColumns: string[] = ['width: 100px;', 'width: 100px;', 'width: 100px;', 'max-width: 100px;', '', '', 'max-width: 100px;']
  headers: string[] = ['Opções','NFiscal', 'Preço', 'Garantia', 'Usado', 'Testado'];


  @Input() fieldsInEnglish: string[] = ['nfNumber', 'soldPrice', 'warrantyEnd', 'isUsed', 'isTested'];

  entities: QuantityGridDto[];
  entities$: Observable<QuantityGridDto[]>;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: ProductDto,
    private _dialog: MatDialog,
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

    this.entities$ = of(this.entities.filter(x => x.nfNumber.includes(term.value)))

  }

  getEntityEvent(entity: any) {

    if (entity.opt.value === 'Vender')
      this._dialog.open(ReserveSellConfirmComponent, {
      data:{title:'Venda', messageBody:'Clique em sim e confirme a venda, o item não mais será listado nesta parte do sistema, podemos continuar?', btn1:'Sim', btn2:'Não' }
      });

    if (entity.opt.value === 'Reservar')
    this._dialog.open(ReserveSellConfirmComponent, {
      data:{title:'Titulo', messageBody:'Se confirmado o item será armazenado por 7 dias sem que esteja disponível para venda que não seja para o cliente ao qual ele foi reservado.', btn1:'Sim', btn2:'Não' }
      });

  }

}
