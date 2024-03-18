import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/shared/modules/material.module';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CustomerGridDto } from '../../dtos/customer-grid-dto';
import { CustomerDto } from '../../dtos/customer-dto';
import { GridListModule } from 'src/shared/components/grid-list-opts/modules/grid-list.module.module';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
  standalone: true,
  imports: [CommonModule, MaterialModule, GridListModule]
})
export class CustomersListComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _http: HttpClient
  ) { }

  headers: string[] = ['', 'Nome', 'Atividade'];


  @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);





  pageSize: number = 5;
  // lengthCustomer: number = 0;
  pageSizeOptions: number[] = [5, 10, 20];
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']

  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';
  // @ViewChild('customerPaginator') customerPaginator: MatPaginator
  // ngAfterViewInit(): void {

  //   this.customerPaginator.page
  //     .pipe(
  //       tap(() => this.gridListOptsGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListOptsGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize))
  //       )).subscribe()
  // }


  customerId: string;
  radioCustomerGrid($event: any) {
    const selectedEntity = $event;
    // this.formMain.get('customerId').setValue(selectedEntity.entity.id);
    // this.customerId = selectedEntity.entity.id;
  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter((xy: CustomerGridDto) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    ))

  }




  entities: CustomerGridDto[] = [];
  entities$: Observable<CustomerGridDto[]>;
  ngOnInit(): void {

    // this.gridListOptsGHelper.pageSize = this.pageSize;
    // this.gridListOptsGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.gridListOptsGHelper.paramsTo(1, this.pageSize));

    // this.gridListOptsGHelper.entities$.subscribe((x: CustomerDto[]) => {

    //   let viewDto = new CustomerGridDto;
    //   this.entities = [];
    //   x.forEach((xy: CustomerDto) => {
    //     viewDto = new CustomerGridDto();
    //     viewDto.id = xy.id;
    //     viewDto.name = xy.name;
    //     viewDto.bussinesLine = xy.businessLine;
    //     this.entities.push(viewDto);

    //   })

    //   this.entities$ = of(this.entities)
    // })
    // this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('customersLength');
    // this.lengthCustomer = this.gridListOptsGHelper.length;
    // this.dataAccess = true;
    // this.screen();
    // this.dataAccessValidator.requiredSetFielInit(this.formMain);
  }

}
