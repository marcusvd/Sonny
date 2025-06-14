import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';


import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DeleteServices } from '../../../../../shared/components/delete-dialog/services/delete.services';
import { PtBrCurrencyPipe } from '../../../../../shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from '../../../../../shared/pipes/pt-br-date.pipe';
import { ListDefaultImports, ListDefaultProviders } from '../../../../imports/components-default.imports';
import { ListCollectDeliverImports, ListCollectDeliverProviders } from '../list/imports/list-collect-deliver.imports';
import { ListControlCollectDeliver } from './helpers/list-control-collect-deliver';
import { ListCollectDeliverService } from './services/list-collect-deliver.service';
import { MatRadioChange } from '@angular/material/radio';
import { map } from 'rxjs/operators';

@Component({
  selector: 'list-collect-deliver',
  templateUrl: './list-collect-deliver.component.html',
  styleUrls: ['./list-collect-deliver.component.scss'],
  standalone: true,
  imports: [
    ListDefaultImports,
    ListCollectDeliverImports
  ],
  providers: [
    ListDefaultProviders,
    ListCollectDeliverProviders
  ]

})
export class ListCollectDeliverComponent extends ListControlCollectDeliver implements OnInit {

  listCollectDeliverByMonthId: Subscription;
  // controllerUrl: string = environment._COLLECT_DELIVER.split('/')[4];
  backEndUrl: string = `${environment._COLLECT_DELIVER.split('/')[4]}/GetAllByCompanyIdByMonthNumberCurrentYearAsync`;

  constructor(
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _deleteServices: DeleteServices,
    override _ptBrDatePipe: PtBrDatePipe,
    override _ptBrCurrencyPipe: PtBrCurrencyPipe,
    private _actRoute: ActivatedRoute,
    private _listServices: ListCollectDeliverService,
    private _fb: FormBuilder,
    private elementRef: ElementRef
  ) {

    super(
      _router,
      _http,
      _dialog,
      _deleteServices,
      _ptBrDatePipe,
      _ptBrCurrencyPipe,
    )
  }





  ngOnInit(): void {
    const monthNumber = +this._actRoute.snapshot.params['id'];
    this.listCollectDeliverByMonthId = this.startSupply(this.backEndUrl, this.paramsTo(this.companyId, monthNumber + 1));
    // this.listCollectDeliverByMonthId = this.startSupply(`${this.controllerUrl}/GetAllByCompanyIdByMonthNumberAsync`, this.companyId.toString());

  }

  ngOnDestroy(): void {
    this.listCollectDeliverByMonthId?.unsubscribe();
  }


  paramsTo(companyId: number, monthNumber: number) {
    let params = new HttpParams();
    params = params.append('companyid', companyId);
    params = params.append('monthnumber', monthNumber);
    return params;
  }

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

  // override entities: CollectDeliverListGridDto[] = [];
  // override entities$: Observable<CollectDeliverListGridDto[]>;
  // override viewUrlRoute: string = `/outsourced-dash/view-collect-deliver`;
  // override addUrlRoute: string = '/outsourced-dash/add-collect-deliver';
  //   override editUrlRoute: string = `/outsourced-dash/edit-collect-deliver`;


  // override delete(entity: CollectDeliverListGridDto) {

  //   const dialogRef = this._dialog.open(DeleteDialogComponent, {
  //     width: 'auto',
  //     height: 'auto',
  //     data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.subject}` },
  //     autoFocus: true,
  //     hasBackdrop: false,
  //     disableClose: true,
  //     panelClass: 'delete-dialog-class',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //     if (result.id != null) {
  //       const deleteFake = this._listServices.deleteFakeDisable(result.id);
  //       this.entities = this.entities.filter(y => y.id != result.id);

  //       this.entities$ = this.entities$.pipe(
  //         map(x => x.filter(y => y.id != result.id))
  //       )
  //     }
  //   })
  // }


  queryFieldOutput(field: string) {
    this.entitiesFiltered$ = of(this.searchListEntities(this.entities, field))
    console.log(field)
  }


  statusFilter(selected: MatRadioChange) {

    if (selected.value == 'expired') {
      this.entitiesFiltered$ = this.entities$.pipe(
        map(x => x.filter(y => new Date(y.wasPaid.key).getFullYear() == this.minValue.getFullYear()))
      )
    }
    if (selected.value == 'paid') {
      this.entitiesFiltered$ = this.entities$.pipe(
        map(x => x.filter(y => new Date(y.wasPaid.key).getFullYear() != this.minValue.getFullYear()))
      )
    }

    // console.log(selected.value)


    // new Date(collectDeliverDto.wasPaid).getFullYear() == this.minValue.getFullYear() ?  'text-expired':'text-paid'
  }



  getDataPagedFront(month: number) {
    // this.gridListCommonHelper.getAllEntitiesNoPagedWithParams(this.backEndUrl, this.paramsTo(this.companyId, month));
    // this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: CollectDeliverDto[]) => {
    //   this.entities = [];
    //   let viewDto: CollectDeliverListGridDto;
    //   x.forEach((xy: CollectDeliverDto) => {
    //     viewDto = new CollectDeliverListGridDto;
    //     viewDto.id = xy?.id.toString();
    //     viewDto.destiny = xy?.destiny?.customer?.name || xy?.destiny?.partner?.name || (xy?.destiny?.noRegisterAddress && xy?.destiny?.noRegisterName);
    //     viewDto.billingFrom = xy?.billingFrom?.customer?.name || xy?.billingFrom?.partner?.name || (xy?.billingFrom?.base != true ? 'Despesa' : 'Base');
    //     viewDto.start = this._ptBrDatePipe?.transform(xy?.start, 'Date');
    //     viewDto.price = this._ptBrCurrencyPipe?.transform(xy?.price);
    //     viewDto.collect = xy?.collect != this.minValue ? 'Sim' : 'Não';
    //     viewDto.deliver = xy?.deliver != this.minValue ? 'Sim' : 'Não';
    //     viewDto.other = xy?.other != this.minValue ? 'Sim' : 'Não';
    //     viewDto.wasPaid = xy?.wasPaid;
    //     viewDto.expires = xy?.wasPaid;

    //     viewDto.expiresView = this._ptBrDatePipe.transform(xy.wasPaid, 'wasPaidCollectDeliver');

    //     this.entities.push(viewDto);
    //   })
    //   this.gridListCommonHelper.lengthPaginator.next(this.entities.length);
    //   this.entities$ = of(this.entities.slice(0, this.pageSize));

    // })

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

  // ngOnInit(): void {
  // const montNhumber = parseInt(this._actRoute.snapshot.params['id']) as number;
  // // this.monthNumber = montNhumber + 1;
  // this.titleGrid = `Coletas entregas ${this.months[montNhumber].name.toLowerCase()}`
  // this.getDataPagedFront(montNhumber + 1);
  // }

}
