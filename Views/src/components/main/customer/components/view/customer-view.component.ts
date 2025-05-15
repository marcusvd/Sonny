
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';

// import { MatCardModule as MatCardModule } from '@angular/material/card';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Observable } from 'rxjs/internal/Observable';


// import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';

// import { SubTitleItemComponent } from 'src/shared/components/sub-title-item/sub-title-item.component';
// import { TitleComponent } from 'src/shared/components/title/default-title/title.component';
// import { CnpjCpfPipe } from 'src/shared/pipes/cnpj-cpf.pipe';
// import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
// import { CustomerDto } from '../commons-components/dtos/customer-dto';
// import { CustomerDetailDto } from '../view/dto/customer-view.dto';
// import { CustomerListService } from '../list/services/customer-list.service';


// @Component({
//   selector: 'customer-view',
//   standalone: true,
//   templateUrl: './customer-view.component.html',
//   styleUrls: ['./customer-view.component.css'],
//   imports: [
//     CommonModule,
//     MatCardModule,

//     CnpjCpfPipe,
//     PtBrCurrencyPipe,
//     TitleComponent,
//     SubTitleItemComponent,
//     BtnGComponent
//   ],
//   providers: [
//     CustomerListService
//   ]
// })
// export class CustomerViewComponent extends BaseForm implements OnInit {
//   constructor(
//     private _customerServices: CustomerListService,
//     private _actRouter: ActivatedRoute,
//     private _router: Router,

//   ) { super() }

//   // labelHeaders: string[] = ['Identificação', 'Localização', 'Custo', 'Contatos'];
//   // list: CustomerDetailDto[] = [];

//   // childEntities: { [key: string]: string } =
//   //   { 'additionalCosts': 'Custos Adicionais', 'physicallyMovingCosts': 'Custos deslocamento', 'address': 'Endereço', 'contact': 'Contatos' };

//   // subChildEntities: { [key: string]: string } =
//   //   { 'socialMedias': 'Redes sociais' };

//   customer: CustomerDto;


//   stylePerItem: string = 'width: 500px;';

//   getEntityId(id: number) {
//     const customer: Observable<CustomerDto> = this._customerServices.loadById$('Customers/GetCustomerByIdAllIncluded', id.toString());

//     customer.subscribe(x => {
//       this.customer = x
//     });

//   }


//   edit() {
//     this._router.navigateByUrl('/side-nav/edit/' + this.customer.id)
//   }

//   // generalInfo = new CustomerDetailDto();




//   // mainEntity = (obj: any, title: string) => {

//   //   const main: any = {};

//   //   main.entityName = title;
//   //   main.entityFields = [];

//   //   for (const [key, value] of Object.entries(obj)) {
//   //     if (typeof value !== 'object') {
//   //       if (key !== 'id' && key != 'userId' && key != 'companyId' && key != 'deleted') {
//   //         const fields: ItemsDetailInterface = { keyField: key, valueField: value.toString() };
//   //         main.entityFields.push(fields);
//   //       }
//   //     }
//   //   }

//   //   this.list.push(main);

//   // }




//   // supplyItemsGrid = (customer: CustomerDto, customerDetail: CustomerDetailDto[]) => {

//   //   const items: CustomerDetailDto = new CustomerDetailDto();

//   //   Object.assign(items, {

//   //     entityName: customer.address.ToString(),

//   //     name: {
//   //       key: customer.name,
//   //       styleCell: 'width:100%;',

//   //     },

//   //     assured: {
//   //       key: customer.assured,
//   //       styleCell: 'width:100%;',
//   //     },

//   //     responsible: {
//   //       key: customer.responsible,
//   //       styleCell: 'width:100%;',
//   //     }
//   //   })

//   //   customerDetail.push(items);

//   //   return customerDetail;

//   // }


//   ngOnInit(): void {

//     const id = this._actRouter.snapshot.params['id'];

//     this.getEntityId(id);
//     // for(const [key, value] of Object.entries(this.list)) {
//     //     console.log(key, value);
//     //   }

//   }

// }
