import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { PaginatedTableG } from "../component/paginated-table-g.component";
import { SearchTableG } from "../component/search-table-g.component";
import { MaterialModule } from "src/app/_shared/modules/material.module";

@NgModule({
  declarations: [
    SearchTableG,
    PaginatedTableG
  ],
  imports: [
     MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SearchTableG,
    PaginatedTableG
  ],
  providers: [

  ]

})

export class TableGModule {

}
