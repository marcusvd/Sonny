import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";



import { SharedModule } from "src/shared/modules/shared.module";
import { StockListService } from "../services/stock-list.service";
import { StockCreateResolver } from "../components/stock-create/resolvers/stock-create.resolver";
import { StockRoutingModule } from "./stock.routing.module";
import { StockListComponent } from "../components/stock-list/stock-list.component";
import { StockCreateComponent } from "../components/stock-create/stock-create.component";
import { StockDashComponent } from "../components/stock-dash/stock-dash.component";
import { StockCreateService } from "../components/stock-create/services/stock-create.service";
import { StockListResolver } from "../components/stock-list/resolver/stock-list.resolver";
import { TableGGridStockService } from "../components/table-data/table-g-grid-stock.service";


@NgModule({
  declarations: [
    StockCreateComponent,
    StockListComponent,
    StockDashComponent
  ],
  imports: [
    //ANGULAR
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    //MY IMPORTS
   SharedModule,


    StockRoutingModule,
  ],
  exports: [

  ],
  providers: [
    StockListResolver,
    TableGGridStockService,
    StockCreateResolver,
    StockCreateService,
    // StockListService,
    // StockListComponent
  ]
})

export class StockModule { }
