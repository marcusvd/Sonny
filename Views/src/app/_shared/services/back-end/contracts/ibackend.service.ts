import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IBackEndService<T, ID> {

  add$<T>(record: T): Observable<T>
  update$<T>(record: T): Observable<T>;
  remove$<T>(ID: T):  Observable<T>;
  delete$<T>(APIURL: string ,ID: T):  Observable<T>;


  loadAll$<T>(): Observable<T[]>;

  loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string):Observable<HttpResponse<T[]>>

  loadAllPaged$<T>(pgNumber?: number, pgSize?: number, term?: string):Observable<HttpResponse<T>>;

  loadById$<T>(id:number): Observable<T>;

  loadByIdIncluded$<T>(id: number): Observable<T>


}
