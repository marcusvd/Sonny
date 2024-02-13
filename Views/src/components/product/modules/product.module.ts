import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/shared/modules/shared.module";
import { ProductRoutingModule } from "./product.routing.module";
import { ProductDashComponent } from "../components/dash/product-dash.component";
import { RouterModule } from "@angular/router";
import { ProductCreateService } from "../components/add/services/product-create.service";
import { ManufacturerEquipamentNameComponent } from "../components/add/manufacturer-equipament-name/manufacturer-equipament-name.component";
import { EquipamentCreateService, ManufacturerCreateService, SegmentCreateService } from "../components/add/services/equipament-manufacturer-create.service";
import { SearchGModule } from "src/shared/components/search-g/modules/search-g.module";
import { ProductListComponent } from "../components/list/product-list.component";
import { ProductListService } from "../components/list/services/product-list.service";
import { ProductCreateComponent } from "../components/add/product-create.component";
import { ReserveSellListComponent } from "../components/reserve-sell-list/reserve-sell-list.component";
import { PtBrCurrencyPipe } from "src/shared/pipes/pt-br-currency.pipe";
import { ReserveSellConfirmComponent } from "../components/reserve-sell-list/reserve-sell-confirm.component";
import { AddResolver, LengthProductResolver, LengthQuantitiesProductResolver } from "../resolvers/product.resolver";
import { ProductReserveSellService } from "../components/reserve-sell-list/services/product-reserve-sell.service";
import { HardwareIncludedComponent } from "../components/reserve-sell-list/hardware-included.component";
import { ItemHardwareLinkedComponent } from "../components/add/item-hardware-linked/item-hardware-linked.component";



@NgModule({
  declarations: [
    ProductCreateComponent,
    ItemHardwareLinkedComponent,
    //
    ManufacturerEquipamentNameComponent,
    //
    ProductDashComponent,
    ProductListComponent,
    HardwareIncludedComponent,
    ReserveSellListComponent,
    ReserveSellConfirmComponent,


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
    AddResolver,
    LengthProductResolver,
    LengthQuantitiesProductResolver,
    ProductReserveSellService,
    ProductCreateService,
    ProductListService,
    EquipamentCreateService,
    ManufacturerCreateService,
    SegmentCreateService,
    PtBrCurrencyPipe

  ]
})

export class ProductModule { }
