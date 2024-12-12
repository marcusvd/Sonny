import { Component, OnInit } from '@angular/core';
import { ImportsListProduct } from './useful/imports-list-product';
import { ListControlProduct } from './useful/list-control';
import { ListGDataService } from 'src/shared/components/list-g/data/list-g-data.service';
import { HttpClient } from '@angular/common/http';
import { BaseList } from 'src/shared/components/list-g/extends/base-list';
import { ProductList } from './dto/product-list';
import { Observable, of } from 'rxjs';
import { ProductDto } from '../../dtos/product';
import { Router } from '@angular/router';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  standalone: true,
  imports: [ImportsListProduct],
  providers: [PtBrCurrencyPipe, PtBrDatePipe],
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent extends BaseList implements OnInit {


  entities: ProductList[] = [];
  entities$: Observable<ProductList[]>;

  constructor(
    protected _http: HttpClient,
    override _router: Router,
    public listControl: ListControlProduct,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
  ) {
    super(
      new ListGDataService(_http),
      _router,
      ['', 'ITEM', 'SEGMENTO', 'MODELO', 'FABRICANTE', 'PREÇO', 'RESERVADO', 'TESTADO', 'USADO'],
      ['id','productType', 'segment', 'model', 'manufacturer', 'soldPrice', 'isReservedByUser', 'isTested', 'isUsed'],
    )
  }


  ngOnInit(): void {
    console.log(this.listControl.backEndUrl)
    this._listGDataService.getAllEntitiesInMemoryPaged(this.listControl.backEndUrl, this.companyId);
    this._listGDataService.entities$.subscribe(
      {
        next: (x: ProductDto[]) => {
          console.log(x)
          x.forEach(
            (y: ProductDto) => {
              this.entities.push(
                {
                  id: 'icon|list|color:red;',
                  productType: y?.productType?.name.toUpperCase(),
                  segment: y?.segment?.name,
                  model: y?.model?.name,
                  manufacturer: y?.manufacturer?.name,
                  soldPrice: this._ptBrCurrencyPipe.transform(y?.soldPrice) +'|'+'color:red;',
                  isReservedByUser: y?.isReservedByUser?.userName ?? 'Não Reservado',
                  isTested: this._ptBrDatePipe.transform(y?.isTested,'Date'),
                  isUsed: y?.isUsed ? 'Sim' : 'Não'
                }
              )
            })

            this.entities$ = of(this.entities)
        }
      }
    )
  }

}

