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

import { ClientModule } from 'src/app/_components/administrative/client/modules/client.module';
import { TechnicianModule } from 'src/app/_components/administrative/client/technician/technician.module';
import { InventoryModule } from 'src/app/_components/administrative/local/providers/Inventory/inventory.module';
// import { SupplierModule } from 'src/app/_components/administrative/local/providers/supplier/supplier.module';

import { FinancialModule } from 'src/app/_components/administrative/local/financial/modules/financial.module';

import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';

import { MaterialModule } from 'src/app/_shared/modules/material.module';

import { SharedModule } from 'src/app/_shared/modules/shared.module';
//import { ClientCrudService } from './_components/administrative/client/services/client-create-crud.service';
import { OrderServicesModule } from './_components/administrative/local/services/modules/order-services.module';

import { PartnerRoutingModule } from './_components/administrative/local/out-sourced/services/partner.module.routing';
import { PartnerModule } from './_components/administrative/local/out-sourced/services/partner.module';
import { SupplierModule } from './_components/administrative/local/providers/supplier/supplier.module';
import { CollectDeliverListTableAllModule } from './_components/administrative/local/out-sourced/collect-deliver-list-table-all/modules/collect-deliver-list-table-all.module';
import { CollectDeliverCreateModule } from './_components/administrative/local/out-sourced/collect-deliver-create/modules/collect-deliver-create.module';
import { EletronicRepairModule } from './_components/administrative/local/out-sourced/eletronic-repair/modules/eletronic-repair.module';
import { AddressModule } from './_shared/components/address/modules/address.module';





@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    //Angular
    PartnerRoutingModule,
    EletronicRepairModule,
    OrderServicesModule,
    AddressModule,
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
    CollectDeliverListTableAllModule,
    CollectDeliverCreateModule,
     SupplierModule,
    PartnerModule,
    FinancialModule,
    MaterialModule,
    SharedModule,
    ClientModule,
    TechnicianModule,

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
