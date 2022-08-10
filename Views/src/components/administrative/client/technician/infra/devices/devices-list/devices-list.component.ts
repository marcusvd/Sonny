import { Component, Inject, Input, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';


import { ClientDto } from 'src/components/administrative/client/dto/client-dto';
import { NetworkDevicesDto } from 'src/components/administrative/client/technician/infra/dto/network-devices-dto';

// import { ClientService } from 'src/services/client/client.service';

import { Search } from 'src/shared/services/navigation/search';


import { environment } from 'src/environments/environment';
//import { ClientCrudService } from '../../../../services/client-create-crud.service';
import { DevicesCreateComponent } from '../devices-create/devices-create.component';
import { DevicesDeleteComponent } from '../devices-delete/devices-delete.component';
import { DevicesEditComponent } from '../devices-edit/devices-edit.component';

@Component({
  selector: 'app-devices-list',
  templateUrl: './devices-list.component.html',
  styleUrls: ['./devices-list.component.css']
})
export class DevicesListComponent implements OnInit, OnChanges {

  private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`

  public _allClients: ClientDto[] = new Array<ClientDto>();
  public _clients: ClientDto =new ClientDto();

  private _Id: number;
  // public _SearchDevices: HelperSearch<NetWorkDevices>

  //test

  constructor(

    // @Inject(MAT_DIALOG_DATA) private data: Client,
    private _Dialog: MatDialog,
    // public _CliService: ClientService,
  //  private _Crud: ClientCrudService,
    private _Route: Router,
    private _ActivatedRoute: ActivatedRoute,

    ) { }



  addNewDevice() {
//client: Client
    const dialogRef = this._Dialog.open(DevicesCreateComponent, {
      width: '800px',
      height: '800px',
       data: this._Id,
    });

    //const dialogConfig = new MatDialogConfig();
    //disable closing window when clicking outside screen.(click)="openDialogEdit(client.id)"
    dialogRef.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(item => {
        // this.getDevs();
        this.getClientById();
        // console.log('subscribe of addNewDevice when is closed', item);
      })
    //   location.reload();

  }

  editNewDevice(client: ClientDto, id: number) {
    const cli: NetworkDevicesDto = client.netWorkDevices.find(_id => _id.id == id);

    const dialogRef = this._Dialog.open(DevicesEditComponent, {
      width: '800px',
      height: '800px',
      data: {
        id: client.id,
        name: client.name,
        cnpj: client.cnpj,
        responsible: client.responsible,
        comments: client.comments,
        assured: client.assured,
        clienttype: client.clientType,
        payment: client.payment,
        addressid: client.addressid,
        address: client.address,
        contactid: client.contactid,
        contact: client.contact,
        netWorkDevices: client.netWorkDevices,
        netWorkDevice: cli
        // netDevId: id
      }

    });
    const dialogConfig = new MatDialogConfig();
    //disable closing window when clicking outside screen.(click)="openDialogEdit(client.id)"
    dialogRef.disableClose = true;
    dialogConfig.autoFocus = true;


  }

  deleteDevice(id: number) {
    //get id and sending by template html
    const dialogRef = this._Dialog.open(DevicesDeleteComponent, {
      width: '450px',
      data: {
        // id: client.id,
        // name: client.name,
        // cnpj: client.cnpj,
        // responsible: client.responsible,
        // comments: client.comments,
        // assured: client.assured,
        // clienttype: client.clienttype,
        // payment: client.payment,
        // addressid: client.addressid,
        // address: client.address,
        // contactid: client.contactid,
        // contact: client.contact,
        // netWorkDevices: client.netWorkDevices,
        netWorkDevice: id
      }

    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(item => {
        // this.getDevs();
        console.log('Retornado', item);
      })



  }

  navLinks(routes: string) {
    // this._clientById = this._client.find(_id => _id.id == id);
    // localStorage.setItem('id', client.id.toLocaleString())
    this._Route.navigate([routes]);
  }


  //  getDevs(Client: Client): Client {
  //    // const client = this.data;
  //    return Client;
  //  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getDevs();
    console.log('CHANGES', changes);
  }

getClientById(){
  this._ActivatedRoute.params.subscribe(_id => {
    this._Id = _id['id'];
    // this._Crud.loadById$(_id['id']).subscribe(
    //   (_CLI: ClientDto) => {
    //     this._clients = _CLI;
    //     this._Search._filteredEntity = _CLI.netWorkDevices;
    //     this._Search._entities = _CLI.netWorkDevices;
    //     // console.log(this._clients)
    //   });
  })

}



  ngOnInit() {

    this.getClientById();
  }

}
