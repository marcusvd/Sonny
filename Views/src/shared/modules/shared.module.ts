import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";



import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { WebcamModule } from 'ngx-webcam';
import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { SideNavComponent } from 'src/shared/components/side-nav/side-nav.component';
import { NavBackDirective } from 'src/shared/directives/nav-back.directive';
import { BackButtonComponent } from 'src/shared/components/back-button/back-button.component';
import { MaterialModule } from "./material.module";
import { SharedRoutingModule } from "../routes/shared.routing.module";
import { DeleteModalComponent } from "../components/delete-modal/delete-modal.component";
import { DeleteCrudService } from "../components/delete-modal/services/delete_crud.service";
import { TypePaymentCreateComponent } from 'src/components/administrative/local/financial/components/type-payment/type-payment-create/type-payment-create.component';
import { CheckingAccountComponent } from "src/components/administrative/local/financial/components/checking-account/cheking-account.component";
import { MsgOperation } from "../services/messages/snack-bar.service";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { TableGModule } from "../components/table-g/modules/table-g.module";
import { AddressModule } from "../components/address/modules/address.module";
import { ContactModule } from "../components/contact/modules/contact.module";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
// import { AddressModule } from "../components/address/modules/address.module";


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    NavbarComponent,
     SideNavComponent,
     NavBackDirective,
    //  ContactComponent,
     BackButtonComponent,
     DeleteModalComponent,
     ConfirmModalComponent,
     TypePaymentCreateComponent,
     CheckingAccountComponent,



    ],
    imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    WebcamModule,
    ReactiveFormsModule,
    RouterModule,
    SharedRoutingModule,
    MaterialModule,
    TableGModule,
    AddressModule,
    ContactModule,


  ],
  exports: [
    WebcamModule,
    RouterModule,
    NavbarComponent,
    SideNavComponent,
    NavBackDirective,
    ContactComponent,
    BackButtonComponent,
    SharedRoutingModule,
    DeleteModalComponent,
    ConfirmModalComponent,
    TypePaymentCreateComponent,
    CheckingAccountComponent,
    MaterialModule,
    NgxMaskModule,
    TableGModule,
    AddressModule,
    ContactModule
  ],
  providers: [
    ValidatorsService,
    DeleteCrudService,
    MsgOperation,


  ]

})


export class SharedModule {

}
