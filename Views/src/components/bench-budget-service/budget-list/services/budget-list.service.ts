import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BackEndService } from 'src/shared/services/back-end/backend.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetListService extends BackEndService<number>{

  constructor(override _http: HttpClient) {
    super(_http,environment._BACK_END_ROOT_URL)
  }

}
