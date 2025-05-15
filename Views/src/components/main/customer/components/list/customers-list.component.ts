import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of, Subscription } from 'rxjs';


import { MatPaginatorModule } from '@angular/material/paginator';


import { BtnGDynamicComponent } from 'src/shared/components/btn-g-dynamic/btn-g-dynamic.component';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { ListGComponent } from 'src/shared/components/list-g/list/list-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/default/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
import { CommunicationAlerts } from "src/shared/services/messages/snack-bar.service";
import { ListControlCustomerList } from './helpers/list-control-customer-list';
import { CustomerFilterListGComponent } from './customer-filter-list/customer-filter-list.component';
import { CustomerListService } from './services/customer-list.service';
import { FilterTerms } from '../commons-components/query/filter-terms';
import {CustomerListDto} from '../list/dto/customer-list.dto';
import { DeleteServices } from '../../../../../shared/components/delete-dialog/services/delete.services';

import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AssuredPipe } from 'src/shared/pipes/assured.pipe';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ListGComponent,
    TitleComponent,
    SubTitleComponent,
    BtnGDynamicComponent,
    BtnGComponent,
    CustomerFilterListGComponent
  ],
  providers: [
    CustomerListService,
    AssuredPipe
  ]

})
export class CustomersListComponent extends ListControlCustomerList implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    override _router: Router,
    override _http: HttpClient,
    override _dialog: MatDialog,
    override _customerServices: CustomerListService,
    override _deleteServices: DeleteServices,
    private _communicationsAlerts: CommunicationAlerts,
    override _assuredPipe: AssuredPipe,

  ) {
    super(
      _router,
      _http,
      _assuredPipe,
      _dialog,
      _customerServices,
      _deleteServices
    )
  }


  customerSubscribe: Subscription;


  ngOnDestroy(): void {
    this.customerSubscribe?.unsubscribe();
  }

  ngOnInit(): void {
    this._listGDataService.getAllEntitiesPaged(this.backEndUrl, this._listGDataService.paramsTo(1, this.pageSize));
    //this._listGDataService.getAllEntitiesInMemoryPaged(this.backEndUrl, this.companyId);
    this.customerSubscribe = this.startSupply();

  }

  // pageSize: number = 20;

  // headers: string[] = ['', '#', 'Cliente', 'Assegurado', 'Responsável', 'Contatos', 'Técnica'];

  // @Input() fieldsInEnglish: string[] = ['id', 'name', 'assured', 'responsible'];

  gridListCommonHelper = new GridListCommonHelper(this._http);
  // gridListCommonHelper = new GridListCommonHelper(this._http, this._route);

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

  // getEntity($event: IEntityGridAction) {
  //   if ($event.action == 'visibility')
  //     this.view($event.entity.id);

  //   if ($event.action == 'edit')
  //     this.edit($event.entity.id);

  //   if ($event.action == 'delete')
  //     this.delete($event.entity);
  // }

  // add() {
  //   this._router.navigateByUrl('/side-nav/create')
  // }

  // view(id: number) {
  //   this._router.navigateByUrl(`/side-nav/view/${id}`)
  // }

  // edit(id: number) {
  //   this._router.navigateByUrl(`/side-nav/edit/${id}`)
  // }





  // @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  // @ViewChild('paginatorBelow') paginatorBelow: MatPaginator


  // ngAfterViewInit(): void {
  //   this.paginatorAbove.page
  //     .pipe(
  //       tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, this.filterTerms))
  //       )).subscribe();

  //   this.paginatorBelow.page
  //     .pipe(
  //       tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, this.filterTerms))
  //       )).subscribe();

  // }

  // onPageChange($event: PageEvent) {
  //   this.paginatorAbove.pageIndex = $event.pageIndex;
  //   this.paginatorBelow.pageIndex = $event.pageIndex;
  // }

  // filterTerms: FilterTerms;
  filter(form: FormGroup) {
    this.backEndUrl = 'customers/GetAllCustomersByTermSearchPagedAsync';
    const filterTerms: FilterTerms = { ...form.value };
    // this.filterTerms = filterTerms;
    console.log(filterTerms)
    this._listGDataService.searchQueryHendler(this.backEndUrl, this._listGDataService.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, filterTerms));
  }

  // isdescending = true;
  // orderBy(field: string) {
  //   this.isdescending = !this.isdescending;
  //   this.backEndUrl = 'customers/GetAllCustomersPagedAsync';
  //   const value = field;
  //   const orderBy = new OrderBy();

  //   switch (value) {
  //     case '#':
  //       orderBy.orderbyfield = 'Id';
  //       break;
  //     case 'Cliente':
  //       orderBy.orderbyfield = 'Name';
  //       break;
  //     case 'Assegurado':
  //       orderBy.orderbyfield = 'Assured';
  //       break;
  //     case 'Responsável':
  //       orderBy.orderbyfield = 'Responsible';
  //       break;
  //   }
  //   orderBy.isdescending = this.isdescending;
  //   this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, null, orderBy));

  // }

  queryFieldOutput($event: FormControl) {
    this.paginatorBelow.pageIndex = 0;
    this.paginatorAbove.pageIndex = 0;
    this.backEndUrl = 'customers/GetAllCustomersPagedAsync';
    this._listGDataService.searchQueryHendler(this.backEndUrl, this._listGDataService.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, $event, null));
  }

  search(term: string) {
    this.term = term;

    const TERM_EMPTY = term === '';

    if (!this.showHideFilter && TERM_EMPTY) {
      this.entitiesFiltered$ = this.entities$;
      this.entitiesFiltered = this.entities;
      this.entities$.subscribe(x => {
        this.length = x.length
      })
    }
    else {
      this.entitiesFiltered$ = of(this.searchListEntities(this.entities, term))
      this.entitiesFiltered$.subscribe(x => {
        this.length = x.length
      })
    }
    // this.entitiesFiltered$ = of(this.searchListEntities(this.entities, term))
    // this.entitiesFiltered$.subscribe(x => {
    //   this.length = x.length
    // })

    // this.entitiesFiltered$ = this.entities$.pipe(
    //   map((x: CustomerListDto[]) => x.filter((y: CustomerListDto) => y. toLowerCase().includes(term.toLowerCase()))))

  }



}
