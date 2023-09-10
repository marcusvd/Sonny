import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";


import { MaterialModule } from "src/shared/modules/material.module";
import { ConfirmationPanelComponent } from "../confirmation-panel.component";
import { DisplayNameHandlePipe } from "../pipes/display-name-handle.pipe";
import { ConfirmationPanelDisplayHandlePipe } from "../pipes/confirmation-panel-display-handle.pipe";
import { SharedModule } from "../../../../../../../shared/modules/shared.module";

@NgModule({
    declarations: [
        ConfirmationPanelComponent,
        DisplayNameHandlePipe,
        ConfirmationPanelDisplayHandlePipe
    ],
    exports: [
        ConfirmationPanelComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule
    ]
})

export class ConfirmationPanelModule {

}
