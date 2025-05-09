
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../../../src/shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../../../src/shared/components/list-g/list/data/list-g-data.service';
import { CustomerListDto } from '../dto/customer-list.dto'
import { CustomerDto } from '../../commons-components/dtos/customer-dto'
import { OnClickInterface } from 'src/shared/components/list-g/list/interfaces/on-click-interface';
import { PageEvent } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

export class ListControlCustomerList extends BaseList {

  entities$: Observable<CustomerListDto[]>;
  entities: CustomerListDto[] = [];
  entitiesFiltered$: Observable<CustomerListDto[]>;
  entitiesFiltered: CustomerListDto[] = [];
  length = 0;
  showHideFilter = false;
  term: string;
  controllerUrl: string = environment._CUSTOMERS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetAllCustomersPagedAsync`;

  constructor(
    override _router: Router,
    public _http: HttpClient,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }

  supplyItemsGrid = (customerList: CustomerListDto[], customer: CustomerDto) => {

    const items: CustomerListDto = new CustomerListDto();

    Object.assign(items, {

      id: {
        key: customer.id.toString(),
        display: 'icons',
        icons: ['list', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: '',
        route: ''
      },

      name: {
        key: customer.name,
        styleCell: 'width:100%;',

      },

      assured: {
        key: customer.assured,
        styleCell: 'width:100%;',
      },

      responsible: {
        key: customer.responsible,
        styleCell: 'width:100%;',
      }
    })

    customerList.push(items);

    return customerList;
  }

  labelHeadersMiddle = () => {
    return [
      { key: '', style: 'cursor: pointer;' },
      { key: 'Nome', style: 'cursor: pointer;' },
      { key: 'Assegurado', style: 'cursor: pointer;' },
      { key: 'Responsável', style: 'cursor: pointer;' }
    ]
  }

  fieldsHeadersMiddle = () => {
    return [
      { key: 'id', style: '' },
      { key: 'name', style: '' },
      { key: 'assured', style: '' },
      { key: 'responsible', style: '' }
    ]
  }

  onPageChange($event: PageEvent) {

    if ($event.previousPageIndex < $event.pageIndex)
      this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

    else if ($event.previousPageIndex > $event.pageIndex)
      this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

    if (this.term) {
      this.entitiesFiltered$ = of(this.pageChange(this.searchListEntities(this.entitiesFiltered, this.term), $event))
      this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
    }

  }

  onClickOrderByFields(field: string, entities$: Observable<CustomerListDto[]>) {

    switch (field) {
      case 'name':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<CustomerListDto[]>;
        break;

      case 'assured':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<CustomerListDto[]>;
        break;

      case 'responsible':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) as Observable<CustomerListDto[]>;
        break;
    }

  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {
    console.log(obj.action)
    console.log(obj.entityId)
    // ex_callRouteWithObject('/side-nav/stock-product-router/detailed-product', this.products.find(x => x.id == obj.entityId), this._router)
  }

  startSupply(): Subscription {

    let entities: CustomerListDto[] = [];

    return this._listGDataService?.entities$.subscribe(
      {
        next: (x: CustomerDto[]) => {
          x.forEach(
            (y: CustomerDto) => {
              this.entities$ = of(this.supplyItemsGrid(entities, y));
            })
          this.getCurrent();
        }
      }
    )

  }


  getCurrent = () => {
    this.entitiesFiltered$ = of(this.entities.slice(0, this.pageSize));
  }
}

