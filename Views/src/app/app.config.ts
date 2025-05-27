import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withJsonpSupport } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { IConfig, NgxMaskModule } from "ngx-mask";
import { UserIsAuthenticatedGuard } from 'src/shared/guards/user-is-authenticatedGuard';
import { CustomMatPaginatorIntl } from '../shared/components/list-g/list/custom-mat-paginator-intl.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR');

const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: true,
  };
};

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "center",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideAnimationsAsync(),
    provideHttpClient(withJsonpSupport()),
    importProvidersFrom(NgxMaskModule.forRoot(maskConfigFunction)),
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    UserIsAuthenticatedGuard,
    provideNativeDateAdapter(),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]
};
