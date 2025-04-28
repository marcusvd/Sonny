import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "./material.module";
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { IConfig, NgxMaskModule } from "ngx-mask";
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ContactDetailsComponent } from "../components/contact-details/component/contact-details.component";
import { ContactV2Service } from "../components/contact/services/contact-v2.service";
import { InsideNavComponent } from "../components/inside-nav/inside-nav.component";
import { TabGModule } from "../components/tab-g/modules/tab-g.module";
import { TreeGModule } from "../components/tree-g/modules/tree-g.module";
import { UserIsAuthenticatedGuard } from "../guards/user-is-authenticatedGuard";
import { SharedRoutingModule } from "./shared.routing.module";
import { FormErrorPanelComponent } from "../components/form-error-panel/form-error-panel.component";
import { RadioButtonGModule } from "../components/radio-button-g/modules/radio-button-g.module";

registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "center",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};

@NgModule({
  declarations: [
    ContactDetailsComponent,
    InsideNavComponent,
    FormErrorPanelComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    // NgxMaskModule.forRoot(maskConfigFunction),
    TabGModule,
    TreeGModule,
    RadioButtonGModule,
  ],

  exports: [
    InsideNavComponent,
    FormErrorPanelComponent,
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    NgxMaskModule,
    TabGModule,
    TreeGModule,
    RadioButtonGModule
  ],

  providers: [
    ContactV2Service,
    UserIsAuthenticatedGuard,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
