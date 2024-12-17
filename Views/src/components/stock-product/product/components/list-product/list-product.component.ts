import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { ProductDto } from '../../dtos/product';
import { ProductTypeDto } from '../../dtos/product-type-dto';
import { ProductTypeService } from '../../services/product-type.service';
import { ProductList } from './dto/product-list';
import { ImportsListProduct } from './useful/imports-list-product';
import { ListControlProduct } from './useful/list-control-product';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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

  // @Component({
  //   selector: 'list',
  //   template: `
  //   `
  // })
  showHideFilter = false;
  @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  @ViewChild('paginatorBelow') paginatorBelow: MatPaginator
  length = 0;
  startIndex = 0;
  endIndex = 0;

  onPageChange($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;


    const pageSize = $event.pageSize;
    const startIndex = $event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(startIndex)
    console.log(endIndex)

    if ($event.previousPageIndex < $event.pageIndex)
      this.entitiesFiltered$ = of(this.entitiesFiltered.slice(startIndex, endIndex));

    else if ($event.previousPageIndex > $event.pageIndex)
      this.entitiesFiltered$ = of(this.entitiesFiltered.slice(startIndex, endIndex));

    if (this.term) {
      this.entitiesFiltered$ = of(this.searchListEntities(this.entitiesFiltered, this.term).slice(startIndex, endIndex))
      this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
    }

    // if (this.term) {
    //   this.entitiesFiltered$ = of(this.searchListEntities(this.entitiesFiltered, this.term).slice(startIndex, endIndex))
    //   this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
    // }



  }




  ngOnInit(): void {
    this.productTypes();
    this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);
    this.startSubscribe();

    this.startScreen();
  }

  startSubscribe() {
    this.entities =[];
    this.entitiesFiltered$ = null;
    this._listGDataService.entities$.subscribe(
      {
        next: (x: ProductDto[]) => {
          this.length = x.length;
          // this.length = this._listGDataService.lengthPaginator.getValue();
          x.forEach(
            (y: ProductDto) => {
              this.entities = this.makeItemsGrid(y);
              this.entities$ = of(this.entities);
              // this.entitiesFiltered = this.makeItemsGrid(y)
              // this.entitiesFiltered$ = this.entities$
            })
          this.getCurrent();
        }
      }
    )
  }

  getCurrent = () => {
    this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  }

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
    if (!this.showHideFilter) {
      this.entitiesFiltered$ = null;
      this.paginatorAbove.firstPage();
      this.length = this.entities.length;
      this.entitiesFiltered = this.entities;
      this.entitiesFiltered$ = of(this.entitiesFiltered.slice(0, this.pageSize));
    }
  }

  filteredProductsList(producstListFiltered: Observable<ProductList[]>) {
    this.paginatorAbove.firstPage();
    this.length = 0;
    producstListFiltered.subscribe(x => {
      this.entitiesFiltered = x
      this.length = x.length;
    })

    this.entitiesFiltered$ = of(this.entitiesFiltered.slice(0, this.pageSize));
  }

  term: string;
  search(term: string) {
    this.term = term;

    const TERM_EMPTY = term === '';

    if (!this.showHideFilter && TERM_EMPTY) {
      this.entitiesFiltered$ = this.entities$;
      this.entitiesFiltered = this.entities;
      this.entities$.subscribe(x => {
        this.length = x.length
      })
    }
    else {
      this.entitiesFiltered$ = of(this.searchListEntities(this.entitiesFiltered, term))
      this.entitiesFiltered$.subscribe(x => {
        this.length = x.length
      })
    }
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

