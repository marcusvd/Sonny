import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CustomerDto } from '../../dtos/customer-dto';
import { FormControl } from '@angular/forms';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonTitleComponent } from 'src/shared/components/grid-list-common/grid-list-common-title.component';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { CustomerListGridDto } from './dto/customer-list-grid.dto';
import { TestsComponent } from 'src/shared/tests/tests.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './CustomMatPaginatorIntl';
@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    GridListCommonTitleComponent,
    TestsComponent
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ]
})
export class CustomersListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient
  ) { }




  headers: string[] = ['', '#', 'Cliente', 'Assegurado', 'Responsável', 'Contatos', 'Técnica'];


  @Input() fieldsInEnglish: string[] = ['id', 'name', 'assured', 'responsible'];
  // headers: string[] = ['','#', 'Cliente','Responsável', 'CNPJ / CPF','Entidade', 'Atividade','Assegurado'];


  // @Input() fieldsInEnglish: string[] = ['id', 'name', 'responsible', 'cnpj', 'entityType',  'bussinesLine', 'assured'];

  gridListCommonHelper = new GridListCommonHelper(this._http, this._route);





  pageSize: number = 20;
  lengthCustomer: number = 0;
  // pageSizeOptions: number[] = [5, 10, 20];
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']

  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';
  // @ViewChild('customerPaginator') customerPaginator: MatPaginator
  // ngAfterViewInit(): void {

  //   this.customerPaginator.page
  //     .pipe(
  //       tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListCommonHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize))
  //       )).subscribe()
  // }


  customerId: string;
  radioCustomerGrid($event: any) {
    const selectedEntity = $event;
    // this.formMain.get('customerId').setValue(selectedEntity.entity.id);
    // this.customerId = selectedEntity.entity.id;
  }

  queryFieldOutput($event: FormControl) {

    // const term = $event;

    // this.entities$ = of(this.entities.filter((xy: CustomerListGridDto) =>

    //   xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    //   ||
    //   xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    // ))

  }




  entities: CustomerListGridDto[] = [];
  entities$: Observable<CustomerListGridDto[]>;
  ngOnInit(): void {

    this.gridListCommonHelper.pageSize = this.pageSize;
    this.gridListCommonHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));

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
    this.gridListCommonHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.gridListCommonHelper.length;
    // this.dataAccess = true;
    // this.screen();
    // this.dataAccessValidator.requiredSetFielInit(this.formMain);
  }

}
