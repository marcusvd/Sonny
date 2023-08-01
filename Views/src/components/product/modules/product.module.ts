import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



import { SharedModule } from "src/shared/modules/shared.module";
import { ProductCreateResolver } from "../product-create/resolvers/product-create.resolver";
import { ProductCreateService } from "../product-create/services/product-create.service";
import { TableGGridProductCreateService } from "../product-create/table-data/table-g-grid-product-create.service";
import { ProductRoutingModule } from "./product.routing.module";



@NgModule({
  declarations: [

  ],
  imports: [
    //ANGULAR
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    //MY IMPORTS
   SharedModule,


   ProductRoutingModule,
  ],
  exports: [

  ],
  providers: [

    TableGGridProductCreateService,
    ProductCreateResolver,
    ProductCreateService,
    // StockListService,
    // StockListComponent
  ]
})

export class ProductModule { }
