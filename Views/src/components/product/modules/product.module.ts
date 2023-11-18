import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { ProductRoutingModule } from "./product.routing.module";
import { ProductDashComponent } from "../dash/product-dash.component";
import { RouterModule } from "@angular/router";
import { ProductResolver } from "../resolvers/product.resolver";
import { ProductCreateService } from "../add/services/product-create.service";
import { ManufacturerEquipamentNameComponent } from "../add/manufacturer-equipament-name/manufacturer-equipament-name.component";
import { EquipamentCreateService, ManufacturerCreateService, SegmentCreateService } from "../add/services/equipament-manufacturer-create.service";
import { SearchGModule } from "src/shared/components/search-g/modules/search-g.module";
import { ProductListComponent } from "../list/product-list.component";
import { ProductListService } from "../list/services/product-list.service";
import { ProductCreateComponent } from "../add/product-create.component";
import { ReserveSellListComponent } from "../reserve-sell-list/reserve-sell-list.component";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { ReserveSellChecksComponent } from "../reserve-sell-list/reserve-sell-checks.component";
import { ReserveSellConfirmComponent } from "../reserve-sell-list/reserve-sell-confirm.component";



@NgModule({
  declarations: [
    ProductCreateComponent,
    ManufacturerEquipamentNameComponent,
    ProductDashComponent,
    ProductListComponent,
    ReserveSellListComponent,
    ReserveSellConfirmComponent

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
    ProductResolver,
    ProductCreateService,
    ProductListService,
    EquipamentCreateService,
    ManufacturerCreateService,
    SegmentCreateService,
    PtBrCurrencyPipe

  ]
})

export class ProductModule { }
