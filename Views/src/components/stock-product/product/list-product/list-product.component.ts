import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';



import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { TruncatePipe } from 'src/shared/pipes/truncate.pipe';
import { ProductTypeDto } from '../dtos/product-type-dto';
import { ProductTypeService } from '../list-product/services/product-type.service';
import { ListControlProduct } from './helpers/list-control-product';
import { ImportsListProduct } from './imports/imports-list-product';
import { MatDialog as MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  standalone: true,
  imports: [ImportsListProduct],
  providers: [PtBrCurrencyPipe, PtBrDatePipe, TruncatePipe],
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends ListControlProduct implements OnInit, OnDestroy {

  constructor(
    override _router: Router,
    private _productTypeService: ProductTypeService,
    override _http: HttpClient,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _truncatePipe: TruncatePipe,
    override _dialog: MatDialog
  ) {

    super(
      _router,
      _http,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
      _truncatePipe,
      _dialog
    )
  }


  productsTypesUnsubscribe: Subscription | undefined;
  productsUnsubscribe: Subscription | undefined;

  ngOnInit(): void {

    //get and make entities to filter
    this.productTypes();
    //get entities to show grid
    this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);

    //subscribe entities and make grid list
    this.productsUnsubscribe = this.startSupply();
  }


  productTypes() {
    this.productsTypesUnsubscribe = this._productTypeService.getAllIncluded$(this.companyId.toString()).subscribe((x: ProductTypeDto[]) => {
      this.productsTypes$ = of(x);
      x.forEach(y => {
        y.segments.forEach((h: any) => {
          this.segments.push(h)
          h.manufacturers.forEach((y: any) => this.manufacturers.push(y))
        })

      })
    });
  }

  ngOnDestroy(): void {
    this.productsTypesUnsubscribe?.unsubscribe();
    this.productsUnsubscribe?.unsubscribe();
  }

}

