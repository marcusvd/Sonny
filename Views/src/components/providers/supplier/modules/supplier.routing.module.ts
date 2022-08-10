import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierDto } from "src/components/providers/supplier/dto/supplier-dto";
import { SupplierCreateComponent } from "src/components/providers/supplier/components/supplier-create/supplier-create.component";
//import { SupplierDetailsComponent } from "src/components/providers/supplier/supplier-details/supplier-details.component";
import { SupplierEditComponent } from "src/components/providers/supplier/components/supplier-edit/supplier-edit.component";
import { SupplierListComponent } from "src/components/providers/supplier/components/supplier-list/supplier-list.component";
import { SupplierEditResolver } from 'src/components/providers/supplier/resolvers/supplier-edit.resolver';

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
