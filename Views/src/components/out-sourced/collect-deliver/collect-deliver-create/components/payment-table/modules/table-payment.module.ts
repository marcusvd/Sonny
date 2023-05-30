import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { MaterialModule } from "src/shared/modules/material.module";
import { TablePaymentComponent } from "../component/table-payment.component";
import { TablePaymentContainerComponent } from "../component/table-payment-container.component";
import { RadioButtonGModule } from "src/shared/components/radio-button-g/modules/radio-button-g.module";



@NgModule({
    declarations: [
      TablePaymentComponent,
      TablePaymentContainerComponent
    ],
    exports: [
      TablePaymentComponent,
      TablePaymentContainerComponent
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

export class TablePaymentModule {

}
