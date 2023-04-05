import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IBackEndService<T, ID> {

  add$<T>(record: T, url:string): Observable<T>
  // update$<T>(record: T): Observable<T>;
  // remove$<T>(id: T): Observable<T>;
  delete$<T>(url?: string, id?: number): Observable<T>;

  loadByName$<T>(url:string, name: string): Observable<T>;
  loadAll$<T>(url:string): Observable<T[]>;

  // loadAllPagedIncluded$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T[]>>

  // loadAllPaged$<T>(pgNumber?: number, pgSize?: number, term?: string): Observable<HttpResponse<T>>;

  // loadById$<T>(id: number): Observable<T>;

  // loadByIdIncluded$<T>(id: number): Observable<T>

  // loadAllPagedC$<T>(pgNumber?: number, pgSize?: number, term?: string);

}
