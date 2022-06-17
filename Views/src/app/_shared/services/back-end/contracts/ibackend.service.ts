import { Observable } from "rxjs";

export interface IBackEndService<T, ID> {

  add$<T>(record: T): Observable<T>

  loadAll$<T>(): Observable<T[]>;

  loadById$<T>(id:number): Observable<T>;

  loadByIdIncluded$<T>(id: number): Observable<T>

  update$<T>(record: T): Observable<T>;

  remove$<T>(ID: T):  Observable<T>;

  delete$<T>(APIURL: string ,ID: T):  Observable<T>;

}
