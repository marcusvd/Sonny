import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SupplierCreateComponent } from 'src/components/providers/supplier/components/supplier-create/supplier-create.component';
import { SupplierListComponent } from 'src/components/providers/supplier/components/supplier-list/supplier-list.component';
//import { SupplierDetailsComponent } from 'src/components/providers/supplier/supplier-details/supplier-details.component';
import { SupplierEditComponent } from 'src/components/providers/supplier/components/supplier-edit/supplier-edit.component'
import { SupplierDeleteComponent } from 'src/components/providers/supplier/components/supplier-delete/supplier-delete.component';
import { SupplierRoutingModule } from "./supplier.routing.module";
import { SupplierEditResolver } from 'src/components/providers/supplier/resolvers/supplier-edit.resolver';
import { MaterialModule } from "src/shared/modules/material.module";
import { SharedModule } from "src/shared/modules/shared.module";
import { Search } from "src/shared/services/navigation/search";
import { SupplierCrudService, TypePaymentCrudService } from "../services/supplier-crud.service";



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
