import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';


import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { map, tap } from 'rxjs/operators';


import { BtnFilterGComponent } from 'src/shared/components/btn-filter-g/btn-filter-g.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IEntityGridAction } from 'src/shared/components/grid-list-common/interface/entity-grid-action';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { CustomerDto } from '../commons-components/dtos/customer-dto';
import { FilterTerms } from '../commons-components/query/filter-terms';
import { OrderBy } from '../commons-components/query/order-by';
import { CustomerFilterListGComponent } from './customer-filter-list/customer-filter-list.component';
import { CustomerListGridDto } from './dto/customer-list-grid.dto';
import { CustomerListService } from './services/customer-list.service';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnFilterGComponent,
    BtnGComponent,
    CustomerFilterListGComponent
  ],
  providers:[
    CustomerListService
  ]

})
export class CustomersListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _customerServices: CustomerListService,
    private _communicationsAlerts: CommunicationAlerts,

  ) { }

  pageSize: number = 20;

  headers: string[] = ['', '#', 'Cliente', 'Assegurado', 'Responsável', 'Contatos', 'Técnica'];

  @Input() fieldsInEnglish: string[] = ['id', 'name', 'assured', 'responsible'];

  gridListCommonHelper = new GridListCommonHelper(this._http);
  // gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  showHideFilter: boolean;

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

  // getEntity($event: { entity: CustomerListGridDto, id: number, action: string }) {
  //   if ($event.action == 'visibility')
  //     this.view($event.id);

  //   if ($event.action == 'edit')
  //     this.edit($event.id);

  //   if ($event.action == 'delete')
  //     this.delete($event.entity);
  // }

  getEntity($event: IEntityGridAction) {
    if ($event.action == 'visibility')
      this.view($event.entity.id);

    if ($event.action == 'edit')
      this.edit($event.entity.id);

    if ($event.action == 'delete')
      this.delete($event.entity);
  }

  add() {
    this._router.navigateByUrl('/side-nav/customer-dash/create')
  }

  view(id: number) {
    this._router.navigateByUrl(`/side-nav/customer-dash/view/${id}`)
  }

  edit(id: number) {
    this._router.navigateByUrl(`/side-nav/customer-dash/edit/${id}`)
  }

  delete(entity: CustomerListGridDto) {

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
        const deleteFake = this._customerServices.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )
      }

    })
  }

  backEndUrl: string = 'customers/GetAllCustomersPagedAsync';

  @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  @ViewChild('paginatorBelow') paginatorBelow: MatPaginator


  ngAfterViewInit(): void {
    this.paginatorAbove.page
      .pipe(
        tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, this.filterTerms))
        )).subscribe();

    this.paginatorBelow.page
      .pipe(
        tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, this.filterTerms))
        )).subscribe();

  }

  onPageChange($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;
  }

  filterTerms: FilterTerms;
  filter(form: FormGroup) {
    this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';
    const filterTerms: FilterTerms = { ...form.value };
    this.filterTerms = filterTerms;
    this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, filterTerms));
  }

  isdescending = true;
  orderBy(field: string) {
    this.isdescending = !this.isdescending;
    this.backEndUrl = 'customers/GetAllCustomersPagedAsync';
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
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, orderBy));

  }

  queryFieldOutput($event: FormControl) {
    this.paginatorBelow.pageIndex = 0;
    this.paginatorAbove.pageIndex = 0;
    this.backEndUrl = 'customers/GetAllCustomersPagedAsync';
    this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
  }

  entities: CustomerListGridDto[] = [];
  entities$: Observable<CustomerListGridDto[]>;

  getData() {

    this.backEndUrl = 'customers/GetAllCustomersPagedAsync';


    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: CustomerDto[]) => {
      this.entities = [];
      let viewDto: CustomerListGridDto;

      x.forEach((xy: CustomerDto) => {
        viewDto = new CustomerListGridDto;
        viewDto.contacts = [{}];

        viewDto.id = xy.id.toString();
        viewDto.name = xy.name;
        viewDto.responsible = xy.responsible;
        viewDto.assured = xy.assured == true ? 'Sim' : 'Não';

        if (xy.contact?.cel)
          viewDto.contacts[0] = ({ 'cel': xy.contact?.cel });
        else
          viewDto.contacts[0] = ({ 'cel': 'Não cadastrado.' });

        if (xy.contact?.zap)
          viewDto.contacts.push({ 'zap': xy.contact?.zap })
        else
          viewDto.contacts.push({ 'zap': 'Não cadastrado.' });

        if (xy.contact?.landline)
          viewDto.contacts.push({ 'landline': xy.contact?.landline })
        else
          viewDto.contacts.push({ 'landline': 'Não cadastrado.' });

        if (xy.contact?.email)
          viewDto.contacts.push({ 'email': xy.contact?.email })
        else
          viewDto.contacts.push({ 'email': 'Não cadastrado.' });

        this.entities.push(viewDto);

      })

      this.entities$ = of(this.entities)
    })

  }

  ngOnInit(): void {
    this.getData();
  }

}
