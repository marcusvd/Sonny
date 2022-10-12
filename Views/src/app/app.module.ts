import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorHandler } from './http-error-handler.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRoutingModule } from 'src/app/app.routing.module';
import { ClientModule } from 'src/components/client/modules/client.module';
import { TechnicianModule } from 'src/components/client/technician/technician.module';
import { InventoryModule } from 'src/components/providers/Inventory/modules/inventory.module';
import { FinancialModule } from 'src/components/financial/modules/financial.module';
import { MatGridListModule} from '@angular/material/grid-list';
import { MaterialModule } from 'src/shared/modules/material.module';
import { SharedModule } from 'src/shared/modules/shared.module';
import { OrderServicesModule } from '../components/services-provision/modules/order-services.module';
import { PartnerModule } from '../components/partner/modules/partner.module';
import { CollectDeliverListTableAllModule } from '../components/out-sourced/collect-deliver-list-table-all/modules/collect-deliver-list-table-all.module';
import { CollectDeliverCreateModule } from '../components/out-sourced/collect-deliver-create/modules/collect-deliver-create.module';
import { EletronicRepairModule } from '../components/out-sourced/eletronic-repair/modules/eletronic-repair.module';
import { SupplierModule } from 'src/components/providers/supplier/modules/supplier.module';
import { WebcamModule } from 'ngx-webcam';
import { BudgetBenchServicesModule } from 'src/components/services-provision/modules/budget-bench.services.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //Angular
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    //MY IMPORTS
    MatGridListModule,//just works fine here
    SharedModule,
    MaterialModule,
    InventoryModule,
    CollectDeliverListTableAllModule,
    CollectDeliverCreateModule,
    PartnerModule,
    FinancialModule,
    ClientModule,
    TechnicianModule,
    SupplierModule,
    EletronicRepairModule,
    OrderServicesModule,
    BudgetBenchServicesModule,
    //OUTSOURCED
    WebcamModule,
  ],

  exports: [

  ],

  providers: [
    HttpErrorHandler,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


