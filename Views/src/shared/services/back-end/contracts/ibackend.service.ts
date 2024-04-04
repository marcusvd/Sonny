import { HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IBackEndService<T> {

  add$<T>(record: T, url: string): Observable<T>;
  addRange$<T>(record: T[], url: string): Observable<T>;
  updateRange$<T>(record: T[], url: string): Observable<T>;
  delete$<T>(url?: string, id?: number): Observable<T>;
  loadByName$<T>(url: string, name: string): Observable<T>;
  loadById$<T>(url: string, id: string): Observable<T>;
  loadAll$<T>(url: string): Observable<T[]>;
  loadAllPaged$<T>(url: string, params: HttpParams): Observable<HttpResponse<T>>

}
