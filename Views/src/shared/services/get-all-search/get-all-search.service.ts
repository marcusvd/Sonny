import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class GetAllSearchService {
  constructor() {

  }





  // private getAll$: Observable<Client[]>;
  // private subGetAll: Subscription
  // args(param: string) {
  //   this.arsToSearch = param.toLocaleLowerCase();
  //   this.GetAll()
  // }


  // GetAll(): void {

  //   this.getAll$ = this._CliService.getAll$();
  //   this.subGetAll = this.getAll$
  //     .subscribe(
  //       (resultGetCli: Client[]) => {
  //         this._clients = resultGetCli;
  //         this._Search._entities = resultGetCli;
  //         this._Search._filteredEntity = resultGetCli;

  //         if (this.arsToSearch.length != 0) {
  //           this._Search._filteredEntity = resultGetCli
  //           .filter(client => client.toSeach.toLocaleLowerCase().indexOf(this.arsToSearch) !== -1);
  //         }



  //         console.log(this.arsToSearch)
  //         //    this.FilteredArray = resultGetCli;
  //         //console.log(resultGetCli);
  //       }, error => {
  //         //  //console.log(error);
  //       }
  //     )

  // }






}


