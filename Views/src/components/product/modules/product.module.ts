import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { ProductRoutingModule } from "./product.routing.module";
import { ProductDashComponent } from "../dash/product-dash.component";
import { RouterModule } from "@angular/router";
import { ProductCreateResolver } from "../resolvers/product-create.resolver";
import { ProductCreateService } from "../add/services/product-create.service";
import { ManufacturerEquipamentNameComponent } from "../add/manufacturer-equipament-name/manufacturer-equipament-name.component";
import { EquipamentCreateService, ManufacturerCreateService } from "../add/services/equipament-manufacturer-create.service";
import { SearchGModule } from "src/shared/components/search-g/modules/search-g.module";
import { ProductListComponent } from "../list/product-list.component";
import { ProductListService } from "../list/services/product-list.service";
import { ProductCreateComponent } from "../add/product-create.component";



@NgModule({
  declarations: [
    ProductCreateComponent,
    ManufacturerEquipamentNameComponent,
    ProductDashComponent,
    ProductListComponent
  ],
  imports: [
    //Angular
    //Angular
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    SearchGModule,
    //My
    SharedModule,

    ProductRoutingModule,
  ],
  exports: [

  ],
  providers: [
    ProductCreateResolver,
    ProductCreateService,
    ProductListService,
    EquipamentCreateService,
    ManufacturerCreateService,

  ]
})

export class ProductModule { }
