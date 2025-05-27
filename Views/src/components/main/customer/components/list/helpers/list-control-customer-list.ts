
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
import { AssuredPipe } from 'src/shared/pipes/assured.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { CustomerListService } from '../services/customer-list.service';
import { DeleteServices } from '../../../../../../shared/components/delete-dialog/services/delete.services';
import { map } from 'rxjs/operators';

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
    protected _assuredPipe: AssuredPipe,
    protected _dialog: MatDialog,
    protected _customerServices: CustomerListService,
    protected _deleteServices: DeleteServices,
  ) {
    super(
      new ListGDataService(_http),
      _router,
    )
  }


  labelHeaders = () => {
    return [
      { key: '', style: 'cursor: pointer; max-width:100px;' },
      { key: 'Nome', style: 'cursor: pointer;' },
      { key: 'Assegurado', style: 'cursor: pointer;' },
      { key: 'Responsável', style: 'cursor: pointer;' }
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
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
    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`/customer/edit/${obj.entityId}`);

    // if (obj.action.split('|')[0] == 'zoom_in') {
    //   this.callRouter(`/customer/view/${obj.entityId}`);
    // }

    if (obj.action.split('|')[0] == 'delete')
      this.deleteFake(obj.entityId);

  }

  deleteFake = (id: number) => {
    const entity = this.entities.find(x => x.id.key == id.toString());

    const result = this._deleteServices.delete(parseInt(entity.id.key), entity.name.key)
   // const result = this._deleteServices.delete(this.entities.find(x => x.id.key == id.toString()))

    result.subscribe(result => {
      if (result.id != null) {
        this._customerServices.deleteFakeDisable(result.id.key);

        this.entitiesFiltered$ = this.entitiesFiltered$.pipe(
          map(x => x.filter(y => y.id.key != result.id.key.toString()))
        )
      }

    })
  }

  supplyItemsGrid = (customerList: CustomerListDto[], customer: CustomerDto) => {

    const items: CustomerListDto = new CustomerListDto();

    Object.assign(items, {

      id: {
        key: customer.id.toString(),
        display: 'icons',
        icons: ['edit|', 'delete|color:rgb(158, 64, 64);margin-left:10px;'],
        // icons: ['zoom_in', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:100px;',
        route: ''
      },

      name: {
        key: customer.name,
        styleCell: 'width:100%;',

      },

      assured: {
        key: this._assuredPipe.transform(customer.assured),
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

  startSupply(): Subscription {

    let entities: CustomerListDto[] = [];

    return this._listGDataService?.entities$.subscribe(
      {
        next: (x: CustomerDto[]) => {
          x.forEach(
            (y: CustomerDto) => {
              this.entities = this.supplyItemsGrid(entities, y);
              this.entities$ = of(this.entities);
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

