import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule as MatButtonModule } from '@angular/material/button';
import { MatCardModule as MatCardModule } from '@angular/material/card';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatMenuModule as MatMenuModule } from '@angular/material/menu';
import { MatPaginator as MatPaginator, MatPaginatorModule as MatPaginatorModule, PageEvent as PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { ListControlPartner } from '../list/helpers/list-control-partner';
import { BtnGComponent } from '../../../../shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from '../../../../shared/components/delete-dialog/delete-dialog.component';
import { ListPartnerService } from '../list/services/list-partner.service';
import { CommunicationAlerts } from "../../../../shared/services/messages/snack-bar.service";
import { PartnerBusinessEnumDto } from '../commons-components/dtos/enums/partner-business-enum-dto';
import { PartnerDto } from '../dtos/partner-dto';
import { ListPartnerDto } from '../list/dtos/list-partner-dto';
import { ListPartnerImports, ListPartnerProviders } from '../list/imports/list-partner.imports';
import { ListDefaultImports, ListDefaultProviders } from '../../../../components/imports/components-default.imports';
import { DeleteServices } from 'src/shared/components/delete-dialog/services/delete.services';


@Component({
  selector: 'list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.css'],
  standalone: true,
  imports: [
    ListPartnerImports,
    ListDefaultImports
  ],
  providers: [
    ListPartnerProviders,
    ListDefaultProviders
  ]

})
export class ListPartnerComponent extends ListControlPartner implements OnInit {

  partnerSubscribe: Subscription;

  constructor(
    override _http: HttpClient,
    override _router: Router,
    override _dialog: MatDialog,
    override _partnerServices: ListPartnerService,
    override _deleteServices: DeleteServices,
    private _communicationsAlerts: CommunicationAlerts,
  ) {

    super(
      _http,
      _router,
      _dialog,
      _partnerServices,
      _deleteServices
    )

  }





  ngOnDestroy(): void {
    this.partnerSubscribe?.unsubscribe();
  }

  ngOnInit(): void {
     this._listGDataService.getAllEntitiesPaged(this.backEndUrl, this._listGDataService.paramsTo(1, this.pageSize));
    //this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);
    this.partnerSubscribe = this.startSupply();

  }



  // totalEntities: number = 0;

  // gridListCommonHelper.pgIsBackEnd: boolean = false;

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

  getIdEntity($event: { entity: ListPartnerDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/partner-dash/create-partner')
  }

  view(id: number) {
    this._router.navigateByUrl(`/partner-dash/view/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/partner-dash/edit-partner/${id}`)
  }

  delete(entity: ListPartnerDto) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity.name}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        const deleteFake = this._partnerServices.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )
      }

    })
  }

  // backEndUrl: string = 'partners/GetAllPartnersPagedAsync';

  // @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  // @ViewChild('paginatorBelow') paginatorBelow: MatPaginator


  // ngAfterViewInit(): void {
  //   if (this.gridListCommonHelper.pgIsBackEnd) {
  //     this.paginatorAbove.page
  //       .pipe(
  //         tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, {}))
  //         )).subscribe();

  //     this.paginatorBelow.page
  //       .pipe(
  //         tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, {}))
  //         )).subscribe();
  //   }
  // }

  // onPageChange($event: PageEvent) {
  //   // if (this.gridListCommonHelper.pgIsBackEnd)
  //   //   this.onPageChangeBack($event);
  //   // else
  //   //   this.onPageChangeFront($event);
  // }

  onPageChangeBack($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;
  }

  onPageChangeFront(event: PageEvent) {
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (event.previousPageIndex < event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    else if (event.previousPageIndex > event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));
  }


  filter(form: FormGroup) {
    // this.backEndUrl = 'TEST';
    // this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';


    // this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, {}));
  }

  // isdescending = true;
  // orderBy(field: string) {
  //   this.isdescending = !this.isdescending;
  //   this.backEndUrl = 'partners/GetAllPartnersPagedAsync';
  //   const value = field;

  //   // this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, {}));

  // }

  queryFieldOutput($event: FormControl) {
    this.paginatorBelow.pageIndex = 0;
    this.paginatorAbove.pageIndex = 0;
    this.backEndUrl = 'partners/GetAllPartnersPagedAsync';
    // this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
  }

  // entities: ListPartnerDto[] = [];
  // entities$: Observable<ListPartnerDto[]>;


  getData() {
    // if (this.gridListCommonHelper.pgIsBackEnd)
    //   this.getPagedBackEnd();
    // else
    //   this.getPagedFrontEnd();
  }

  getPagedBackEnd() {
    // this.backEndUrl = 'partners/GetAllPartnersPagedAsync';
    // this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    // this.gridListCommonHelper.entities$.subscribe((x: PartnerDto[]) => {

    //   x.forEach((xy: PartnerDto) => {
    //     this.entities.push(this.makeGridItems(xy));
    //   })
    //   this.entities$ = of(this.entities)
    // })
  }

  getPagedFrontEnd() {
    // const comapanyId: number = JSON.parse(localStorage.getItem('companyId'))
    // this.gridListCommonHelper.getAllEntitiesInMemoryPaged('partners/GetAllPartnersByIdCompanyAsync', comapanyId.toString());
    // this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: PartnerDto[]) => {

    //   x.forEach((xy: PartnerDto) => {
    //     this.entities.push(this.makeGridItems(xy));
    //   })
    //   this.entities$ = of(this.entities.slice(0, this.pageSize));
    // })
  }

  // makeGridItems(xy: PartnerDto) {
  //   const viewDto = new ListPartnerDto;
  //   viewDto.contacts = [{}];

  //   viewDto.id = xy.id.toString();
  //   viewDto.name = xy.name;
  //   viewDto.responsible = xy.responsible;

  //   viewDto.businessLine = this.switchPartnerBusiness(xy)

  //   if (xy.contact?.cel)
  //     viewDto.contacts[0] = ({ 'cel': xy.contact?.cel });
  //   else
  //     viewDto.contacts[0] = ({ 'cel': 'Não cadastrado.' });

  //   if (xy.contact?.zap)
  //     viewDto.contacts.push({ 'zap': xy.contact?.zap })
  //   else
  //     viewDto.contacts.push({ 'zap': 'Não cadastrado.' });


  //   if (xy.contact?.landline)
  //     viewDto.contacts.push({ 'landline': xy.contact?.landline })
  //   else
  //     viewDto.contacts.push({ 'landline': 'Não cadastrado.' });

  //   if (xy.contact?.email)
  //     viewDto.contacts.push({ 'email': xy.contact?.email })
  //   else
  //     viewDto.contacts.push({ 'email': 'Não cadastrado.' });

  //   return viewDto;
  // }

  switchPartnerBusiness(partner: PartnerDto) {
    const partnerBusinessEnum = PartnerBusinessEnumDto;
    switch (partner.partnerBusiness) {
      case partnerBusinessEnum.transporter: {
        return 'Transportador'
        break
      }
      case partnerBusinessEnum.hardwareSupplier: {
        return 'Fornecedor de Hardware'
        break
      }
      case partnerBusinessEnum.electronicRepair: {
        return 'Reparo Eletrônico'
        break
      }
      case partnerBusinessEnum.informationTechnician: {
        return 'Tecnico de Informática'
        break
      }
      case partnerBusinessEnum.physicalNetwork: {
        return 'Rede Física'
        break
      }
      case partnerBusinessEnum.others: {
        return partner.businessLine
        break
      }
    }

  }

  // ngOnInit(): void {
    //   this._actRoute.data.subscribe(x => {
    //     this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    //   })

    //   this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;

    //   this.getData();
    // }

  // }
}
