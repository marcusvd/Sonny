import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TableGGridComponent } from "../component/table-g-grid.component";
import { MaterialModule } from "../../../modules/material.module";




@NgModule({
  declarations: [
    // TableGGridComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [
    // TableGGridComponent,
  ],
  providers: []

})

export class TableGGridModule {

}
