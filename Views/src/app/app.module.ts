import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HttpErrorHandler } from './http-error-handler.service';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//routes
import { SharedRoutingModule } from 'src/app/_shared/routes/shared.routing.module';
import { AppRoutingModule } from 'src/app/app.routing.module';
import { PartnerRoutingModule } from './_components/administrative/local/out-sourced/partner.module.routing';
import { ClientModule } from 'src/app/_components/administrative/client/client.module';
import { TechnicianModule } from 'src/app/_components/administrative/client/technician/technician.module';
import { InventoryModule } from 'src/app/_components/administrative/local/providers/Inventory/inventory.module';
import { SupplierModule } from 'src/app/_components/administrative/local/providers/supplier/supplier.module';
import { PartnerModule } from 'src/app/_components/administrative/local/out-sourced/partner.module';
import { FinancialModule } from 'src/app/_components/administrative/local/financial/modules/financial.module';

import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';

import { MaterialModule } from 'src/app/_shared/modules/material.module';

import { SharedModule } from 'src/app/_shared/modules/shared.module';
//import { ClientCrudService } from './_components/administrative/client/services/client-create-crud.service';
import { OrderServicesModule } from './_components/administrative/local/services/modules/order-services.module';
import { RecordsModule } from './_components/administrative/local/records/modules/records.module';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //Angular
    PartnerRoutingModule,
    RecordsModule,
    OrderServicesModule,

    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //below, just works fine here
    MatGridListModule,

    //My
    InventoryModule,
    SupplierModule,
    PartnerModule,
    FinancialModule,
    MaterialModule,
    SharedModule,
    ClientModule,
    TechnicianModule,
    RecordsModule,
    //
    AppRoutingModule,
  ],

  exports: [
    MaterialModule,
    SharedModule,

  ],

  providers: [
    HttpErrorHandler,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
