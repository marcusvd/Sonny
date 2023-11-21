import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { TypeCustomerEnumDto } from 'src/components/main/customer/dtos/enums/type-customer.enum-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { MsgOperation } from 'src/shared/services/messages/snack-bar.service';

@Component({
  selector: 'dialog-quiz',
  templateUrl:'./reserve-sell-confirm.component.html',
  styles: [
    `
.break {
    word-wrap: break-word;

}

#left {
    display: inline flex;
}

#right {
    display: inline flex;
}
    `
  ]
})
export class ReserveSellConfirmComponent implements OnInit {
  entities: CustomerGridDto[];
  entities$: Observable<CustomerGridDto[]>;

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  // @Input() public first: string;
  title: string;
  messageBody: string;
  btn1: string;
  btn2: string;

  constructor(
    private _DialogRef: MatDialogRef<ReserveSellConfirmComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private _SnackBar: MsgOperation,
    private _http: HttpClient,
    private _route: ActivatedRoute,
  ) {
    this.title = this.data.title;
    this.messageBody = this.data.messageBody;
    this.btn1 = this.data.btn1;
    this.btn2 = this.data.btn2;
  }

  clickedYes(yes: string) {
    this._DialogRef.close(yes);
  }
  clickedNo(no: string) {
    this._DialogRef.close(no);
  }




  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.gridListOptsGHelper.searchQueryHendler(term, 'customers/GetAllCustomersPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null));

    // let viewDto: BudgetServiceGridListDto;
    // this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {

    //   this.entities = [];

    //   x.forEach((xy: BudgetServiceDto) => {
    //     viewDto = new BudgetServiceGridListDto();
    //     viewDto.name = xy.customer.name
    //     viewDto.dataDescription = xy.dataDescription;
    //     viewDto.entryDate = this.datePipe.transform(xy.entryDate, 'Date');
    //     viewDto.isPresentVisuallyDescription = xy.isPresentVisuallyDescription
    //     viewDto.isRemote = xy.isRemote ? 'Sim' : 'Não';
    //     viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
    //     this.entities.push(viewDto);
    //   })
    //   console.log(this.entities)
    //   this.entities$ = of(this.entities)
    // })

  }

  getEntityEvent(entity: any) {
    // entity: EquipamentGridDto

    const entityToSend: CustomerDto = entity.entity.entityComplete;

    // const dialogRef = this.dialog.open(ReserveSellListComponent, {

    //   data:entityToSend
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });

    // const companyId = JSON.parse(localStorage.getItem('companyId'));
    // this._router.navigateByUrl(`side-nav/bench-budget-service/open-service/${serviceId}`);
  }

  // cssColumns: string[] = ['width: 150px;', 'width: 70px;', 'width: 80px;', 'max-width: 150px;', '', '', 'max-width: 50px;']
  cssColumns: string[] = ['width: 150px;','width: 150px;' ]

  headers: string[] = ['Cliente', 'Tipo'];
  // headers: string[] = ['', 'Equipamento', 'Fabricante', 'Segmento', 'Modelo', 'Descrição', 'Disponivel'];

  @Input() fieldsInEnglish: string[] = ['name', 'customerType'];
  // @Input() fieldsInEnglish: string[] = ['name', 'manufacturer', 'segment', 'model', 'description', 'length'];




  lengthBs: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.gridListOptsGHelper.getAllEntitiesPaged('customers/GetAllCustomersPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null))


    this.gridListOptsGHelper.entities$.subscribe((x: CustomerDto[]) => {

      let viewDto = new CustomerGridDto;
      this.entities = [];

      x.forEach((xy: CustomerDto) => {
        viewDto = new CustomerGridDto();
        // viewDto.productId = xy.id;
        viewDto.name = xy.name;
        viewDto.customerType = xy.customerType === TypeCustomerEnumDto.PF ? 'Jurídica':'Física';
        this.entities.push(viewDto);

      })

      this.entities$ = of(this.entities)
    })

    this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('customersLength')

    this.lengthBs = this.gridListOptsGHelper.length;

    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

}
