
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { BaseList } from '../../../../../shared/components/list-g/extends/base-list';
import { ListGDataService } from '../../../../../shared/components/list-g/list/data/list-g-data.service';
import { PartnerDto } from '../../dtos/partner-dto';
import { ListPartnerDto } from '../../list/dtos/list-partner-dto';
import { OnClickInterface } from '../../../../../shared/components/list-g/list/interfaces/on-click-interface';
import { PageEvent } from '@angular/material/paginator';
import { environment } from '../../../../../environments/environment';
import { AssuredPipe } from '../../../../../shared/pipes/assured.pipe';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../../../../shared/components/delete-dialog/delete-dialog.component';
import { ListPartnerService } from '../../list/services/list-partner.service';
import { DeleteServices } from '../../../../../shared/components/delete-dialog/services/delete.services';
import { map } from 'rxjs/operators';

export class ListControlPartner extends BaseList {

  entities$: Observable<ListPartnerDto[]>;
  entities: ListPartnerDto[] = [];
  entitiesFiltered$: Observable<ListPartnerDto[]>;
  entitiesFiltered: ListPartnerDto[] = [];
  length = 0;
  showHideFilter = false;
  term: string;
  controllerUrl: string = environment._PARTNERS.split('/')[4];
  backEndUrl: string = `${this.controllerUrl}/GetAllPartnersPagedAsync`;
// partners/GetAllPartnersByIdCompanyAsync'
  constructor(
    public _http: HttpClient,
    override _router: Router,
    protected _dialog: MatDialog,
    protected _partnerServices: ListPartnerService,
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
      { key: 'Parceiro', style: 'cursor: pointer;' },
      { key: 'Área de atuação', style: 'cursor: pointer;' },
      { key: 'Responsável', style: 'cursor: pointer;' },
      { key: 'Contatos', style: 'cursor: pointer;' }
    ]
  }

  fieldsHeaders = () => {
    return [
      { key: 'id', style: 'max-width:100px;' },
      { key: 'name', style: '' },
      { key: 'businessLine', style: '' },
      { key: 'responsible', style: '' },
      { key: 'contact', style: '' }
    ]
  }


  onPageChange($event: PageEvent) {

    // if ($event.previousPageIndex < $event.pageIndex)
    //   this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

    // else if ($event.previousPageIndex > $event.pageIndex)
    //   this.entitiesFiltered$ = of(this.pageChange(this.entitiesFiltered, $event))

    // if (this.term) {
    //   this.entitiesFiltered$ = of(this.pageChange(this.searchListEntities(this.entitiesFiltered, this.term), $event))
    //   this.length = this.searchListEntities(this.entitiesFiltered, this.term).length
    // }

  }

  onClickOrderByFields(field: string, entities$: Observable<ListPartnerDto[]>) {

    switch (field) {
      case 'name':

        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListPartnerDto[]>;
        break;

      case 'assured':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: '' }) as Observable<ListPartnerDto[]>;
        break;

      case 'responsible':
        this.entities$ = this.orderByFrontEnd(entities$, { key: field, value: 0 }) as Observable<ListPartnerDto[]>;
        break;
    }

  }

  onClickButton(field: string) {
    console.log(field)
  }

  onClickIcons(obj: OnClickInterface) {
    if (obj.action.split('|')[0] == 'edit')
      this.callRouter(`/Partner/edit/${obj.entityId}`);

    // if (obj.action.split('|')[0] == 'zoom_in') {
    //   this.callRouter(`/Partner/view/${obj.entityId}`);
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
        this._partnerServices.deleteFakeDisable(result.id.key);

        this.entitiesFiltered$ = this.entitiesFiltered$.pipe(
          map(x => x.filter(y => y.id.key != result.id.key.toString()))
        )
      }

    })
  }

  supplyItemsGrid = (PartnerList: ListPartnerDto[], partner: PartnerDto) => {

    const items: ListPartnerDto = new ListPartnerDto();

    Object.assign(items, {

      id: {
        key: partner.id.toString(),
        display: 'icons',
        icons: ['edit|', 'delete|color:rgb(158, 64, 64);margin-left:10px;'],
        // icons: ['zoom_in', 'edit', 'home'],
        styleInsideCell: `color:rgb(43, 161, 168); cursor: pointer; font-size:20px;`,
        styleCell: 'max-width:100px;',
        route: ''
      },

      name: {
        key: partner.name,
        styleCell: 'width:100%;',

      },

      businessLine: {
        key: partner.businessLine,
        styleCell: 'width:100%;',
      },

      responsible: {
        key: partner.responsible,
        styleCell: 'width:100%;',
      },
      contact: {
        key: partner.contact,
        styleCell: 'width:100%;',
      }
    })

    PartnerList.push(items);

    return PartnerList;
  }

  startSupply(): Subscription {

    let entities: ListPartnerDto[] = [];

    return this._listGDataService?.entities$.subscribe(
      {
        next: (x: PartnerDto[]) => {
          x.forEach(
            (y: PartnerDto) => {
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

