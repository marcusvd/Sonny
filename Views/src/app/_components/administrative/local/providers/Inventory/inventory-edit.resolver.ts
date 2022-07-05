import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryDto } from "./dto/category-dto";
import { CategoryInventoryCrudService } from "./services/inventory-create.service";



@Injectable()

export class InventoryEditResolver implements Resolve<CategoryDto> {

  constructor(private _CrudCategoryInventory: CategoryInventoryCrudService)
   { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any | Observable<CategoryDto[]> | Promise<CategoryDto> {

    let categories:Observable<CategoryDto[]>;
    categories = this._CrudCategoryInventory.loadAll$<CategoryDto>();





    return categories
  }


}
