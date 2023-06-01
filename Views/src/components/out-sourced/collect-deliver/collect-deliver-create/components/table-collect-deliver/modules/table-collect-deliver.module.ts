import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MaterialModule } from "src/shared/modules/material.module";
import { TableCollectDeliverComponent } from "../component/table-collect-deliver.component";
import { TableCollectDeliverContainerComponent } from "../component/table-collect-deliver-container.component";
import { RadioButtonGModule } from "src/shared/components/radio-button-g/modules/radio-button-g.module";


@NgModule({
    declarations: [
        TableCollectDeliverComponent,
        TableCollectDeliverContainerComponent
      ],
      exports: [
      TableCollectDeliverComponent,
      TableCollectDeliverContainerComponent
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

export class TableCollectDeliverModule {

}
