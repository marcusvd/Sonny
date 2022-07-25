import { HttpClient } from "@angular/common/http";
import { Inject, Injectable, Input } from "@angular/core";
import { inject } from "@angular/core/testing";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";

import { environment } from "src/environments/environment";

@Injectable()
export class TableGenericListService<T> extends BackEndService<T, string> {


  constructor(override _Http: HttpClient) {

    super(_Http, '')

  }

  // loadAll() {
  //   this.getAllAsync$<T>().subscribe(() => {

  //   })
  // }






}
