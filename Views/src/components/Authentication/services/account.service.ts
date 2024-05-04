
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';
import { MyUser } from '../dto/my-user';

@Injectable({
  providedIn: 'root'
})

export class AccountService extends BackEndService<MyUser> {

  constructor(
    override _http: HttpClient,
  ) {
    super(_http, environment._ACCOUNT)
  }

  getUserByName(url: string, name: string) {
    return this.loadByName$<MyUser>(url, name);
  }

}
