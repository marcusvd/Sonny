import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { MaterialModule } from "src/shared/modules/material.module";
import { TableCollectDeliverContainerComponent } from "../component/table-collect-deliver-container.component";
import { TableCollectDeliverComponent } from "../component/table-collect-deliver.component";
import { RadioOptionDisplayNameHandlePipe } from "../pipes/radio-option-display-name-handle.pipe";



@NgModule({
    declarations: [
        TableCollectDeliverComponent,
        TableCollectDeliverContainerComponent,
        RadioOptionDisplayNameHandlePipe
      ],
      exports: [
      TableCollectDeliverComponent,
      TableCollectDeliverContainerComponent,
    ],
    providers: [],
    imports: [
        MaterialModule,
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

    ]
})

export class TableCollectDeliverModule {

}
