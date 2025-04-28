import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { environment } from 'src/environments/environment';
//import { ClientCrudService } from '../../../../services/client-create-crud.service';

@Component({
    selector: 'devices-delete',
    templateUrl: './devices-delete.component.html',
    styleUrls: ['./devices-delete.component.css'],
    standalone: false
})
export class DevicesDeleteComponent implements OnInit {
  // private readonly _API_URL: string = `${environment._DEVNETWORK}`

  // private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`


  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any,
  //  private _Crud: ClientCrudService,
    //  private _Client: ClientService,
    // private _Crud: DevicesServices,
  ) { }

  ngOnInit(): void {
  }

  del() {
 //   this._Crud.delete$(this.data.netWorkDevice, this._API_URL).subscribe(console.log);
  }

}
