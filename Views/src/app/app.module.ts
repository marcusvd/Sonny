import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// below function get cnpj customer create partner create etc...
import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyPaginatorIntl as MatPaginatorIntl } from '@angular/material/legacy-paginator';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { FinancialModule } from 'src/components/financial/modules/financial.module';
import { CustomerModule } from 'src/components/main/customer/modules/customer.module';
import { TechnicianModule } from 'src/components/main/customer/technician/technician.module';
import { ProfilesModule } from 'src/components/profile/modules/profiles.module';
import { CustomMatPaginatorIntl } from 'src/shared/custom-mat-paginator-intl';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { PartnerModule } from '../components/main/partner/modules/partner.module';

import { AppComponent } from './app.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { OutsourcedRoutingModule } from 'src/components/out-sourced/modules/out-sourced.routing';
import { StockProductRoutingModule } from 'src/components/stock-product/modules/stock-product.routing.module';
import { provideRouter, ROUTES, withPreloading } from '@angular/router';



@NgModule({ declarations: [
        AppComponent,
    ],
    exports: [],
    bootstrap: [AppComponent], imports: [
        //Angular
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        AppRoutingModule,
        //just works fine here
        MatGridListModule,
        //MY IMPORTS
        SharedModule,
        MaterialModule,
        //MY IMPORTS Features
        ProfilesModule,
        //Main
        PartnerModule,
        CustomerModule,
        TechnicianModule,
        FinancialModule,
        //OUTSOURCED
        OutsourcedRoutingModule,
        //StockProduct
        StockProductRoutingModule], providers: [
        HttpErrorHandler,
        { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
        provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
    ] })
export class AppModule { }


