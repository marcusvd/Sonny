import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';



import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { ProductTypeService } from '../../services/product-type.service';
import { ListControlProduct } from './helpers/list-control-product';
import { ImportsListProduct } from './useful/imports-list-product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  standalone: true,
  imports: [ImportsListProduct],
  providers: [PtBrCurrencyPipe, PtBrDatePipe],
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent extends ListControlProduct implements OnInit {

  constructor(
    override _router: Router,
    private _productTypeService: ProductTypeService,
    override _http: HttpClient,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {

    super(
      _router,
      _http,
      _ptBrDatePipe,
      _ptBrCurrencyPipe
    )
  }

  ngOnInit(): void {
    //start responsive screen
    const event = { target: window } as unknown as Event;
    this.responsive(event);
    //get and make entities to filter
    this.productTypes();
    //get entities to show grid
    this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);
    //subscribe entities and make grid list
    this.startSupply();
  }


  productTypes() {
    this._productTypeService.getAllIncluded$(this.companyId.toString()).subscribe((x: ProductTypeDto[]) => {
      this.productsTypes$ = of(x);
      x.forEach(y => {
        y.segments.forEach(h => {
          this.segments.push(h)
          h.manufacturers.forEach(y => this.manufacturers.push(y))
        })

      })
    });
  }


}

