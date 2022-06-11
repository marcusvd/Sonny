import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { MsgOperation } from "src/app/_shared/services/messages/snack-bar.service";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClientListService extends BackEndService<ClientDto, number> {

  Clients: ClientDto[];

  constructor(
    protected _Http: HttpClient,
    private _Route: Router,
    private _SnackBar: MsgOperation
  ) {
    super(_Http, environment._CLIENTS);
  }

  getAllCliAsync() {
    this.loadAll$().subscribe({
      next: (clients: ClientDto[]) => {
        this.Clients = [];
        this.Clients = clients;

      }
    }), error => {
      console.log(error);
    }
  }

  getCliAsyncById(id: number) : Observable<ClientDto> {

   return this.loadById$<ClientDto>(id);

  }
}
