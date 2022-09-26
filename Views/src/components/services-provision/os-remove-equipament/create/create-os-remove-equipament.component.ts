import { Component, OnInit, ViewChild } from '@angular/core';

import { OsEquipamentRemoveServicesService } from '../services/os-equipament_remove-services.service';


@Component({
  selector: 'create-os-remove-equipament',
  templateUrl: './create-os-remove-equipament.component.html',
  styleUrls: ['./create-os-remove-equipament.component.css']
})
export class CreateOsRemoveEquipament implements OnInit {



  constructor(
    private _OsEquipamentRemoveServicesService: OsEquipamentRemoveServicesService,
  ) { }

  save() {
    this._OsEquipamentRemoveServicesService.save();
  }

  get startDate() {
    return this._OsEquipamentRemoveServicesService.startDate
  }
  get formMain() {
    return this._OsEquipamentRemoveServicesService.formMain
  }

  print($event: any) {
    this._OsEquipamentRemoveServicesService.print($event.checked);
  }



  ngOnInit(): void {
    this._OsEquipamentRemoveServicesService._formLoad();

  }

}
