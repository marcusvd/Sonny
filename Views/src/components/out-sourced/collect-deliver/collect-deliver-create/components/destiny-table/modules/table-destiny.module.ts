import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RadioButtonGModule } from "src/shared/components/radio-button-g/modules/radio-button-g.module";

import { MaterialModule } from "src/shared/modules/material.module";

import { TableDestinyComponent } from "../component/table-destiny.component";
import { TableDestinyContainerComponent } from "../component/table-destiny-container.component";

@NgModule({
    declarations: [
        TableDestinyComponent,
        TableDestinyContainerComponent
      ],
      exports: [
        TableDestinyComponent,
        TableDestinyContainerComponent

    ],
    providers: [],
    imports: [
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RadioButtonGModule
    ]
})

export class TableDestinyModule {

}
