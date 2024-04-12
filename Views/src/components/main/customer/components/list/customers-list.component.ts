import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';


import { CustomerDto } from '../../dtos/customer-dto';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { CustomerListGridDto } from './dto/customer-list-grid.dto';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BtnAddGComponent } from 'src/shared/components/btn-add-g/btn-add-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { DeleteDialogComponent } from 'src/shared/components/delete-dialog/delete-dialog.component';
import { CustomerListService } from '../services/customer-list.service';
import { BtnFilterGComponent } from 'src/shared/components/btn-filter-g/btn-filter-g.component';
import { CustomerFilterListGComponent } from './customer-filter-list/customer-filter-list.component';
import { SearchTerms } from 'src/shared/helpers/search/SearchTerms';

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
    FlexLayoutModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    SubTitleComponent,
    BtnAddGComponent,
    BtnFilterGComponent,
    CustomerFilterListGComponent
  ],

})
export class CustomersListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _customerServices: CustomerListService,

  ) { }

  pageSize: number = 20;

  headers: string[] = ['', '#', 'Cliente', 'Assegurado', 'Responsável', 'Contatos', 'Técnica'];

  @Input() fieldsInEnglish: string[] = ['id', 'name', 'assured', 'responsible'];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

  showHideFilter: boolean;

  showHideFilterMtd($event: boolean) {
    this.showHideFilter = $event
  }

  getIdEntity($event: { entity: CustomerListGridDto, id: number, action: string }) {
    if ($event.action == 'visibility')
      this.view($event.id);

    if ($event.action == 'edit')
      this.edit($event.id);

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
    const companyId: number = JSON.parse(localStorage.getItem('companyId'));

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
        // this.test();
        this.getData();
        this._router.navigate([`/side-nav/customer-dash/list/${companyId}`]);
      }
    })

  }

  backEndUrl: string = 'customers/GetAllCustomersPagedAsync';

  @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  @ViewChild('paginatorBelow') paginatorBelow: MatPaginator


  ngAfterViewInit(): void {
    this.paginatorAbove.page
      .pipe(
        tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, this.searchTerm))
        )).subscribe()

    this.paginatorBelow.page
      .pipe(
        tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, this.searchTerm))
        )).subscribe()
  }


  onPageChange($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;
  }

  searchTerm: SearchTerms;
  filter(form: FormGroup) {
    this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';
    const searchTerm: SearchTerms = { ...form.value };
    this.searchTerm = searchTerm;
    this.gridListCommonHelper.searchQueryHendler(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, searchTerm));
  }

  getColumnEntityName(field: string) {
    console.log(field)
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
