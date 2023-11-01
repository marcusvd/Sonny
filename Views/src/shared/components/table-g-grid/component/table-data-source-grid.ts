import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { TableGGridService } from "../services/table-g-grid.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { catchError, debounceTime, distinctUntilChanged, finalize, map, switchMap } from "rxjs/operators";
import { FormControl } from "@angular/forms";


export class TableDataSource implements DataSource<any> {

  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  searchItensFound = new BehaviorSubject<number>(0);

  loading$ = this.loadingSubject.asObservable();

  constructor(private _tableGGridService: TableGGridService) { }

  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEntities(backEndUrl: string, params: HttpParams) {
    this._tableGGridService.loadAllPaged$<any[]>(backEndUrl, params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: any) => {
        this.entitiesSubject.next(response.body);
      })
  }
  loadEntities$(backEndUrl: string, params: HttpParams) {
    return this._tableGGridService.loadAllPaged$<any[]>(backEndUrl, params);
  }

  paramsTo(pgnumber: number = 1, pgsize: number = 10, term: string = '') {
    let params = new HttpParams();
    params = params.append('pgnumber', pgnumber);
    params = params.append('pgsize', pgsize);
    params = params.append('predicate', JSON.parse(localStorage.getItem('companyId')));
    params = params.append('term', term);
    return params;
  }

  set dataBase(entities: any[]) {
    this.entitiesSubject.next(entities);
  }
  get dataBase() {
    return this.entitiesSubject.value;
  }

}
