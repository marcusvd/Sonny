import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierDto } from "src/app/_components/administrative/local/providers/supplier/dto/supplier-dto";
import { SupplierCreateComponent } from "src/app/_components/administrative/local/providers/supplier/supplier-create/supplier-create.component";
//import { SupplierDetailsComponent } from "src/app/_components/administrative/local/providers/supplier/supplier-details/supplier-details.component";
import { SupplierEditComponent } from "src/app/_components/administrative/local/providers/supplier/supplier-edit/supplier-edit.component";
import { SupplierListComponent } from "src/app/_components/administrative/local/providers/supplier/supplier-list/supplier-list.component";
import { SupplierEditResolver } from 'src/app/_components/administrative/local/providers/supplier/supplier-edit.resolver';

const routeSupplier: Routes = [


  { path: 'suppliercreate', component: SupplierCreateComponent },
  { path: 'supplier/edit/:id', component: SupplierEditComponent, resolve: { supedit: SupplierEditResolver } },
 // { path: ':id', component: SupplierDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routeSupplier)],
  exports: [RouterModule]
})

export class SupplierRoutingModule {

}
