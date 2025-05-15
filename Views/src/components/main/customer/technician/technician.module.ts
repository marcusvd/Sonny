import { NgModule } from "@angular/core";

// import { DevicesCreateComponent } from 'src/components/client/technician/infra/devices/devices-create/devices-create.component';
// import { DevicesListComponent } from 'src/components/client/technician/infra/devices/devices-list/devices-list.component';
// import { DevicesPanelComponent } from 'src/components/client/technician/infra/devices/devices-panel/devices-panel.component';
// import { DevicesDeleteComponent } from 'src/components/client/technician/infra/devices/devices-delete/devices-delete.component';
// import { DevicesEditComponent } from 'src/components/client/technician/infra/devices/devices-edit/devices-edit.component';
// import { DashDeviceComponent } from 'src/components/client/technician/infra/devices/dash-device/dash-device.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/shared/modules/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DevicesCrudService } from "./services/devices-crud.service";


@NgModule({
  declarations:[
    // DevicesCreateComponent,
    // DevicesListComponent,
    // DevicesPanelComponent,
    // DevicesDeleteComponent,
    // DevicesEditComponent,
    // DashDeviceComponent,
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    //My
    SharedModule,
    //

  ],
  exports:[],
  providers:[DevicesCrudService]
})

export class TechnicianModule{
}
