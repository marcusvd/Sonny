import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule as MatPaginatorModule } from '@angular/material/paginator';
import { map } from 'rxjs/operators';
import { BtnGDynamicComponent } from 'src/shared/components/btn-g-dynamic/btn-g-dynamic.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';


import { environment } from 'src/environments/environment';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
import { CollectDeliverDto } from '../../dto/collect-deliver-dto';
import { CollectDeliverListFilterComponent } from './collect-deliver-filter-list/collect-deliver-list-filter.component';
import { CollectDeliverListGridDto } from './dto/collect-deliver-list-grid.dto';
import { FrontEndListFilterCollectDeliver } from './filter-list/front-end-list-filter-collect-deliver';
import { CollectDeliverListService } from './services/collect-deliver-list.service';

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

    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    CollectDeliverListFilterComponent,
    BtnGDynamicComponent,
    BtnGComponent
  ],
  providers: [
    CollectDeliverListService, PtBrDatePipe, PtBrCurrencyPipe
  ]

})
export class CollectDeliverListComponent extends FrontEndListFilterCollectDeliver implements OnInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,

    override _listServices: CollectDeliverListService,
    private elementRef: ElementRef
  ) {

    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['', 'Cobrança', 'Valor'],
      ['billingFrom', 'price'],

      _listServices
    )
  }

  controllerUrl: string = environment._COLLECT_DELIVER.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllByCompanyIdByMonthNumberAsync`;
  override entities: CollectDeliverListGridDto[] = [];
  override entities$: Observable<CollectDeliverListGridDto[]>;
  override viewUrlRoute: string = `/outsourced-dash/view-collect-deliver`;
  override addUrlRoute: string = '/outsourced-dash/add-collect-deliver';
    override editUrlRoute: string = `/outsourced-dash/edit-collect-deliver`;


  override delete(entity: CollectDeliverListGridDto) {

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


  queryFieldOutput($event: FormControl) {
    this.entities$ = this.query($event);
  }




  paramsTo(companyId: number, monthNumber: number) {
    let params = new HttpParams();
    params = params.append('companyid', companyId);
    params = params.append('monthnumber', monthNumber);
    return params;
  }
  getDataPagedFront(month: number) {
    this.gridListCommonHelper.getAllEntitiesNoPagedWithParams(this.backEndUrl, this.paramsTo(this.companyId, month));
    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {
      this.entities = [];
      let viewDto: CollectDeliverListGridDto;
      x.forEach((xy: CollectDeliverDto) => {
        viewDto = new CollectDeliverListGridDto;
        viewDto.id = xy?.id.toString();
        viewDto.destiny = xy?.destiny?.customer?.name || xy?.destiny?.partner?.name || (xy?.destiny?.noRegisterAddress && xy?.destiny?.noRegisterName);
        viewDto.billingFrom = xy?.billingFrom?.customer?.name || xy?.billingFrom?.partner?.name || (xy?.billingFrom?.base != true ? 'Despesa' : 'Base');
        viewDto.start = this._ptBrDatePipe?.transform(xy?.start, 'Date');
        viewDto.price = this._ptBrCurrencyPipe?.transform(xy?.price);
        viewDto.collect = xy?.collect != this.minValue ? 'Sim' : 'Não';
        viewDto.deliver = xy?.deliver != this.minValue ? 'Sim' : 'Não';
        viewDto.other = xy?.other != this.minValue ? 'Sim' : 'Não';
        viewDto.wasPaid = xy?.wasPaid;
        viewDto.expires = xy?.wasPaid;

        viewDto.expiresView = this._ptBrDatePipe.transform(xy.wasPaid, 'wasPaidCollectDeliver');

        this.entities.push(viewDto);
      })
      this.gridListCommonHelper.lengthPaginator.next(this.entities.length);
      this.entities$ = of(this.entities.slice(0, this.pageSize));

    })

  }
  // getDataPagedFront() {

  //   this.gridListCommonHelper.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId.toString());
  //   this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {

  //     this.entities = [];
  //     let viewDto: CollectDeliverListGridDto;
  //     x.forEach((xy: CollectDeliverDto) => {
  //       console.log(xy)
  //       viewDto = new CollectDeliverListGridDto;
  //       viewDto.id = xy?.id.toString();
  //       viewDto.destiny = xy?.destiny?.customer?.name || xy?.destiny?.partner?.name || (xy?.destiny?.noRegisterAddress && xy?.destiny?.noRegisterName);
  //       viewDto.billingFrom = xy?.billingFrom?.customer?.name || xy?.billingFrom?.partner?.name || (xy?.billingFrom?.base != true ? 'Despesa' : 'Base');
  //       // viewDto.subject = xy.subjectReason;
  //       viewDto.start = this._ptBrDatePipe?.transform(xy?.start, 'Date');
  //       viewDto.price = this._ptBrCurrencyPipe?.transform(xy?.price);
  //       viewDto.collect = xy?.collect != this.minValue ? 'Sim' : 'Não';
  //       viewDto.deliver = xy?.deliver != this.minValue ? 'Sim' : 'Não';
  //       viewDto.other = xy?.other != this.minValue ? 'Sim' : 'Não';
  //       viewDto.wasPaid = xy?.wasPaid;
  //       viewDto.expires = xy?.wasPaid;

  //       viewDto.expiresView = this._ptBrDatePipe.transform(xy.wasPaid, 'wasPaidCollectDeliver');

  //       this.entities.push(viewDto);
  //     })
  //     this.entities$ = of(this.entities.slice(0, this.pageSize));

  //   })

  // }
  // monthNumber: number = 0;
  titleGrid = '';
  ngOnInit(): void {
    const montNhumber = parseInt(this._actRoute.snapshot.params['id']) as number;
    // this.monthNumber = montNhumber + 1;
    this.titleGrid = `Coletas entregas ${this.months[montNhumber].name.toLowerCase()}`
    this.getDataPagedFront(montNhumber + 1);
  }

}
