import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { DevicesListComponent } from '../technician/infra/devices/devices-list/devices-list.component'
import { take } from 'rxjs/internal/operators/take';

import { environment } from 'src/environments/environment';
//import { ClientCrudService } from '../services/client-create-crud.service';
import { ClientDto } from 'src/app/_components/administrative/client/dto/client-dto';
import { ClientListService } from '../services/client-list.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers: []

})


export class ClientListComponent implements OnInit {

  clients: ClientDto[] = [];
  arsToSearch: string;

  private readonly _API_URL_CLIENT: string = `${environment._CLIENTS}`

  constructor(
    private _Dialog: MatDialog,
    private _Http: HttpClient,
    private _ClientListServices: ClientListService,
  ) {

  }



  ClientLstSrv() {
    this._ClientListServices.getAllCliAsync();
  }



  ngOnInit(): void {
    this.ClientLstSrv();
    this.clients = this._ClientListServices.Clients;
  }




}
