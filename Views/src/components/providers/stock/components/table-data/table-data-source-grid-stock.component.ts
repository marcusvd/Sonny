import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { TableGGridService } from "src/shared/components/table-g-grid/services/table-g-grid.service";



export class TableDataSourceStock implements DataSource<any> {

  private entitiesSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private _tableGGridService: TableGGridService) { }

  connect(collectionViewer: CollectionViewer): Observable<readonly any[]> {
    return this.entitiesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.entitiesSubject.complete();
    this.loadingSubject.complete();
  }

  loadEntities(url:string, params:HttpParams) {
    this._tableGGridService.loadAllPaged$<any[]>(url, params)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((response: any) => {
        this.entitiesSubject.next(response.body);
      })
  }

  set dataBase(entities: any[]) {
    this.entitiesSubject.next(entities);
  }
  get dataBase() {
    return this.entitiesSubject.value;
  }



}
