import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { BtnFilterGComponent } from 'src/shared/components/btn-filter-g/btn-filter-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { FilterTerms } from 'src/shared/helpers/query/filter-terms';
import { OrderBy } from 'src/shared/helpers/query/order-by';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CollectDeliverDto } from '../../dto/collect-deliver-dto';
import { CollectDeliverListFilterComponent } from './collect-deliver-filter-list/collect-deliver-list-filter.component';
import { CollectDeliverListGridDto } from './dto/collect-deliver-list-grid.dto';
import { CollectDeliverListService } from './services/collect-deliver-list.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'collect-deliver-list',
  templateUrl: './collect-deliver-list.component.html',
  styleUrls: ['./collect-deliver-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    FlexLayoutModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnAddGComponent,
    BtnFilterGComponent,
    CollectDeliverListFilterComponent
  ],
  providers: [
    CollectDeliverListService, PtBrDatePipe, PtBrCurrencyPipe
  ]

})
export class CollectDeliverListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _datePipe: PtBrDatePipe,
    private _ptBrCurrency: PtBrCurrencyPipe,
    private _listServices: CollectDeliverListService,
    private elementRef: ElementRef

  ) { }

  pageSize: number = 20;
  comapanyId: number = JSON.parse(localStorage.getItem('companyId'))
  headers: string[] = ['', '#', 'Destino', 'Data', 'Valor', 'Coleta', 'Entrega', 'Serviço'];

  @Input() fieldsInEnglish: string[] = ['id', 'destiny', 'start', 'price', 'collect', 'deliver', 'other'];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  showHideFilter: boolean;

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

  getIdEntity($event: { entity: CollectDeliverListGridDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/side-nav/partner-dash/create-collect-deliver')
  }

  view(id: number) {
    this._router.navigateByUrl(`/side-nav/partner-dash/view-collect-deliver/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/side-nav/partner-dash/edit-collect-deliver/${id}`)
  }

  delete(entity: CollectDeliverListGridDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.subject}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        const deleteFake = this._listServices.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )

      }

    })
  }

  backEndUrl: string = 'CollectsDelivers/GetAllByCompanyIdCollectDeliverAsync';

  // @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  // @ViewChild('paginatorBelow') paginatorBelow: MatPaginator
  onPageChange(event: PageEvent) {

    // this.paginatorAbove.pageIndex = event.pageIndex;
    // this.paginatorBelow.pageIndex = event.pageIndex;

    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (event.previousPageIndex < event.pageIndex) {
      this.entities$ = of(this.entities.slice(startIndex, endIndex));
    } else if (event.previousPageIndex > event.pageIndex) {
      this.entities$ = of(this.entities.slice(startIndex, endIndex));
    }

  }

  filterTerms: FilterTerms;
  filter(form: FormGroup) {
    this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';
    const filterTerms: FilterTerms = { ...form.value };
    this.filterTerms = filterTerms;
    // this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, filterTerms));
  }

  isdescending = true;
  orderBy(field: string) {
    this.isdescending = !this.isdescending;
    this.backEndUrl = 'CollectsDelivers/GetAllByCompanyIdCollectDeliverAsync';
    const value = field;
    const orderBy = new OrderBy();

    switch (value) {
      case '#':
        orderBy.orderbyfield = 'Id';
        break;
      case 'Cliente':
        orderBy.orderbyfield = 'Name';
        break;
      case 'Assegurado':
        orderBy.orderbyfield = 'Assured';
        break;
      case 'Responsável':
        orderBy.orderbyfield = 'Responsible';
        break;
    }
    orderBy.isdescending = this.isdescending;
    // this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, orderBy));

  }

  queryFieldOutput($event: FormControl) {
    // this.paginatorBelow.pageIndex = 0;
    // this.paginatorAbove.pageIndex = 0;
    this.backEndUrl = 'CollectsDelivers/GetAllByCompanyIdCollectDeliverAsync';
    // this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
  }

  entities: CollectDeliverListGridDto[] = [];
  entities$: Observable<CollectDeliverListGridDto[]>;
  // entitiesToView$: Observable<CollectDeliverListGridDto[]>;



  getDataPagedFront() {

    this.backEndUrl = 'CollectsDelivers/GetAllByCompanyIdCollectDeliverAsync';


    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(this.backEndUrl, this.comapanyId.toString());
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {


      this.entities = [];
      let viewDto: CollectDeliverListGridDto;
      x.forEach((xy: CollectDeliverDto) => {
        viewDto = new CollectDeliverListGridDto;
        viewDto.id = xy?.id.toString();
        viewDto.destiny = xy?.destiny?.customer?.name || xy?.destiny?.partner?.name || (xy?.destiny?.noRegisterAddress && xy?.destiny?.noRegisterName);
        viewDto.subject = xy.subjectReason;
        viewDto.start = this._datePipe.transform(xy?.start, 'Date');
        viewDto.price = this._ptBrCurrency.transform(xy?.price);
        viewDto.collect = xy?.collect == true ? 'Sim' : 'Não';
        viewDto.deliver = xy?.deliver == true ? 'Sim' : 'Não';
        viewDto.other = xy?.other == true ? 'Sim' : 'Não';

        this.entities.push(viewDto);
      })
      this.entities$ = of(this.entities.slice(0, this.pageSize));

    })

  }

  ngOnInit(): void {

    this.getDataPagedFront();
  }

}
