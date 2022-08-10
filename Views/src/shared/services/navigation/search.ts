import { Injectable } from "@angular/core";


// @Injectable({
//   providedIn: 'root'
// })

export class Search<T> {

  constructor() {
  }
  public _filteredEntity: any[]
  public _entities: any[]

  public _word: string;

  get filterList(): string {
    return this._word;
  }

  set filterList(value: string) {
    this._word = value;
    this._filteredEntity = this.filterList ? this.filterSearchList(this.filterList) : this._entities;
  }

  filterSearchList(fiteredBy: string): T[] {
    fiteredBy = fiteredBy.toLocaleLowerCase();
    return this._entities.filter(
      str => str.toSeach.toLocaleLowerCase().indexOf(fiteredBy) !== -1
      //|| str.resp.toLocaleLowerCase().indexOf(fiteredBy) !== -1
    );
  }




}
