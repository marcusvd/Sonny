import { HttpClient, HttpParams } from "@angular/common/http";
import { ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
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
    params = params.append('term', this.queryField.value);
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

  // loadEntitiesWithParams(backEndUrl: string, params: HttpParams) {
  //   this.loadAllPaged$<any[]>(backEndUrl, params).subscribe((response: any) => {
  //     this.entitiesBehaviorSubject.next(response.body);
  //   })
  // }

  getAllEntitiesPaged(backEndUrl:string, params: HttpParams = this.paramsTo()) {
    this.loadAllPaged$<any[]>(backEndUrl, params)
      .subscribe((entities: any) => {
        this.entitiesBehaviorSubject.next(entities.body);
      })
  }

  queryField = new FormControl();
  outputFieldSearchHelper($event: FormControl, backEndUrl:string) {
    this.queryField = $event;
    let value = this.queryField.value;
    if (value && (value = value.trim() != '')) {
      this.loadAllPaged$<any[]>(backEndUrl, this.paramsTo());

      this.loadAllPaged$<any[]>(backEndUrl, this.paramsTo()).subscribe(x => {
        this.entitiesBehaviorSubject.next(x.body);
      })
    }
  }

  searchQueryHendler(backEndUrl:string){
    this.queryField.valueChanges.pipe(
      map(x => x.trim()),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(() => this.loadAllPaged$<any[]>(backEndUrl, this.paramsTo())),
      tap(value => {
        this.entitiesBehaviorSubject.next(value.body);
      })
    ).subscribe(
      () => {
        if (this.queryField.value === '') {
          this.loadAllPaged$<any[]>(backEndUrl, this.paramsTo())
        }
      }
    );
  }

}

