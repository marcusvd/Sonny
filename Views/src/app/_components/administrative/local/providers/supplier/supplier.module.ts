import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SupplierCreateComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-create/supplier-create.component';
import { SupplierListComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-list/supplier-list.component';
//import { SupplierDetailsComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-details/supplier-details.component';
import { SupplierEditComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-edit/supplier-edit.component'
import { SupplierDeleteComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-delete/supplier-delete.component';
import { SupplierRoutingModule } from "./supplier.routing.module";
import { SupplierEditResolver } from 'src/app/_components/administrative/local/providers/supplier/supplier-edit.resolver';
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { Search } from "src/app/_shared/services/navigation/search";
import { SupplierCrudService, TypePaymentCrudService } from "./services/supplier-crud.service";



@NgModule({
  declarations: [
    SupplierCreateComponent,
    SupplierListComponent,
    //SupplierDetailsComponent,
    SupplierEditComponent,
    SupplierDeleteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //My
    MaterialModule,
    SharedModule,
    SupplierRoutingModule

  ],
  exports: [SupplierCreateComponent],

  providers:[
    SupplierEditResolver,
    Search,
    SupplierCrudService,
    TypePaymentCrudService
  ]
})


export class SupplierModule {

}
