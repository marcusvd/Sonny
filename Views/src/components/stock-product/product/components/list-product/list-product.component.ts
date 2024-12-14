import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ImportsListProduct } from './useful/imports-list-product';
import { ListControlProduct } from './useful/list-control-product';
import { ProductDto } from '../../dtos/product';
import { Observable, of } from 'rxjs';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { ProductList } from './dto/product-list';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  standalone: true,
  imports: [ImportsListProduct],
  providers: [PtBrCurrencyPipe, PtBrDatePipe],
  styleUrls: ['./list-product.component.css']
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

  onClickButton(field: string) {
    console.log(field)
  }
  onClickIcons(field: string) {
    console.log(field)
  }

  showHideFilter = false;

  showHideFilterMtd($event: boolean) {
    if (!$event)
      this.entitiesFiltered$ = this.entities$

    this.showHideFilter = $event

  }

  filteredProductsList(producstListFiltered: Observable<ProductList[]>) {

    this.entitiesFiltered$ = producstListFiltered;
  }

  ngOnInit(): void {


    this.productsTypes$ = this._productTypeService.getAllIncluded$(this.companyId.toString());
    this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);
    this._listGDataService.entities$.subscribe(
      {
        next: (x: ProductDto[]) => {
          x.forEach(
            (y: ProductDto) => {
              this.entities$ = of(this.makeItemsGrid(y))
              this.entitiesFiltered$ = this.entities$
            })

        }
      }
    )

  }


}

