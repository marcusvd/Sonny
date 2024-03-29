import { HttpClient, HttpParams } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { BackEndService } from "src/shared/services/back-end/backend.service";

export class GridListCommonHelper extends BackEndService<any> {

  entitiesBehaviorSubject = new BehaviorSubject<any[]>([]);
  searchItensFound = new BehaviorSubject<number>(0);

  entities$ = this.entitiesBehaviorSubject.asObservable();

  pageSize: number = 5;

  constructor(
    override _http: HttpClient,
    private _route: ActivatedRoute
  ) {
    super(_http, environment.backEndDoor)

  }


  paramsTo(pageIndex: number, pgSize: number, predicate?:number) {
    let params = new HttpParams();
    params = params.append('pgnumber', pageIndex);
    params = params.append('pgsize', pgSize);
    params = params.append('predicate', predicate ?? JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', this.queryField.value ?? '');
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

  getAllEntitiesPaged(backEndUrl: string, params: HttpParams) {
    this.loadAllPaged$<any[]>(backEndUrl, params)
      .subscribe((entities: any) => {
        this.entitiesBehaviorSubject.next(entities.body);
      })
  }

  queryField = new FormControl();


  searchQueryHendler($event: FormControl, backEndUrl: string, params: HttpParams) {
    this.queryField = $event;
    this.queryField.valueChanges.pipe(
      map(x => x.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.loadAllPaged$<any[]>(backEndUrl, params)),
    ).subscribe(
      (x:any) => {
        console.log(x.body)
        this.entitiesBehaviorSubject.next(x.body);
        this.searchItensFound.next(x.body.length);
      }
    );
  }

}

