import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';
import { ValidatorsService } from 'src/shared/helpers/validators.service';
import { SideNavComponent } from 'src/shared/components/side-nav/side-nav.component';
import { NavBackDirective } from 'src/shared/directives/nav-back.directive';
import { BackButtonComponent } from 'src/shared/components/back-button/back-button.component';
import { MaterialModule } from "./material.module";

import { DeleteModalComponent } from "../components/delete-modal/delete-modal.component";
import { DeleteCrudService } from "../components/delete-modal/services/delete_crud.service";
import { MsgOperation } from "../services/messages/snack-bar.service";
import { ConfirmModalComponent } from "src/shared/components/confirm-modal/confirm-modal.component";

import { IConfig, NgxMaskModule } from "ngx-mask";
import { SharedRoutingModule } from "../routes/shared.routing.module";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PaginatedTableGComponent } from "../components/table-g/component/paginated-table-g.component";
import { SearchTableGComponent } from "../components/table-g/component/search-table-g.component";
import { AddressComponent } from "../components/address/component/address.component";
import { ContactComponent } from "../components/contact/component/contact.component";
import { ContactService } from "../components/contact/services/contact.service";
import { AddressService } from "../components/address/services/address.service";


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR');


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};



@NgModule({
  declarations: [
    NavbarComponent,
    SideNavComponent,
    NavBackDirective,
    BackButtonComponent,
    DeleteModalComponent,
    ConfirmModalComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    ContactComponent

  ],

  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    //MY IMPORTS
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
     NgxMaskModule.forRoot(maskConfigFunction),
  ],

  exports: [
    NavbarComponent,
    SideNavComponent,
    NavBackDirective,
    BackButtonComponent,
    DeleteModalComponent,
    ConfirmModalComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    ContactComponent,
    MaterialModule,

    CurrencyMaskModule,
    NgxMaskModule,

  ],

  providers: [
    ValidatorsService,
    DeleteCrudService,
    MsgOperation,
    AddressService,
    ContactService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
