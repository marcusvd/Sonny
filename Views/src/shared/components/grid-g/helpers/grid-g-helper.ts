import { HttpClient, HttpParams } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

export class GridGHelper extends BackEndService<any> {


  entitiesBehaviorSubject = new BehaviorSubject<any[]>([]);

  entities$ = this.entitiesBehaviorSubject.asObservable();

  constructor(
    override _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    super(_http, environment.backEndDoor)
  }

  paramsTo(pageIndex: number = 1, pageSize: number = 10) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pageSize);
    params = params.append('companyid', JSON.parse(localStorage.getItem('companyId')));
    // params = params.append('term', this.queryField.value);
    return params;
  }

  entitiesBehaviorSubjectNext(entities: any[]) {
    this.entitiesBehaviorSubject.next(entities);
  }

  length: number = 0;
  getLengthEntitiesFromBackEnd(lengthEntityName: string) {
    this._route.data.subscribe({
      next: (item: any) => {
        this.length = item.loaded[lengthEntityName];
      }
    });
  }

  getAllEntitiesPaged(backEndUrl:string) {
    this.loadAllPaged$<any[]>(backEndUrl, this.paramsTo())
      .subscribe((entities: any) => {
        this.entitiesBehaviorSubject.next(entities.body);
      })
  }


}

