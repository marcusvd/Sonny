import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { InventoryDto } from 'src/app/_components/administrative/local/providers/Inventory/dto/inventory-dto';
import { environment } from 'src/environments/environment';
import { InventoryCreateService} from '../services/inventory-create.service';
import { DataSource } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})

export class InventoryListComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  test = false;

  private readonly _API_URL: string = `${environment._INVENTORIES}`

  public _inventories: InventoryDto[] = [];

  public _inventorysFiltered: any[] = [];
  public _searchField: string;
  public _showHideEdit: boolean;
  public _inventoriesFiltered: InventoryDto[] = [];
  private _loadAll$: Subscription;
  public isNewBool: boolean;

  constructor(
    // private _InventoryService: InventoryService,
    private _Crud: InventoryCreateService,
    private _ActivedRoute: ActivatedRoute
  ) { }


  loadAll(): Observable<InventoryDto[]> {

    this._loadAll$ = this._Crud.loadAll$<InventoryDto>().subscribe(
      (_inventories: InventoryDto[]) => {
        // this.isNew()

      });
    return null;
  }

  datasource() {
    const data = new BehaviorSubject<InventoryDto[]>(this._inventories)
    return data;


  }

  loadAllV2() {
    this._ActivedRoute.data.subscribe((loaded: { FullLoaded: InventoryDto[] }) => {
      this._inventories = loaded.FullLoaded;

      //this._inventoriesFiltered = _inventories;

    })
  }





  displayedColumns: string[] = [
    'id',
    'subcategory',
    'saleprice',
    'isnew',
    'istested',
    'supplier',
    'warranty',
    'today',
    'sn',
    'manufactorer',
    'model',
    'generation',
    'capacity',
    'speed',
  ]


























  disconnect() { }

  /*

    _isNew(entity: InventoryDto) {
      return entity.isnew === true ? true : false;
    }
    _isTested(entity: InventoryDto) {
      //console.log('DEU BAUMMMMMASAS',entity)
      return entity.istested === true ? true : false;
    }

    _testing(){
      this.test = !this.test;
    }

    get filterList(): string {
      return this._searchField;
    }

    set filterList(value: string) {
      this._searchField = value;
      this._inventoriesFiltered = this.filterList ? this.filterSearchList(this.filterList) : this._inventories;
    }

    filterSearchList(fiteredBy: string): InventoryDto[] {
      fiteredBy = fiteredBy.toLocaleLowerCase();
      return this._inventories.filter(
        str => str.subcategory.name.toLocaleLowerCase().indexOf(fiteredBy) !== -1 || str.model.toLocaleLowerCase().indexOf(fiteredBy) !== -1
      );
    }



    _showScreen(): boolean {
      return this._showHideEdit != true ? this._showHideEdit = false : this._showHideEdit = true;
    }


    loadAll() {

      this._loadAll$ = this._Crud.loadAll$<InventoryDto>().subscribe(
        (_inventories: InventoryDto[]) => {
          // this.isNew()
          this._inventories = _inventories;
          this._inventoriesFiltered = _inventories;

        });

    }

    ngOnDestroy(): void {
      this._loadAll$.unsubscribe();
    }


    */









  ngOnInit(): void {
    //  this.loadAll().subscribe();
    this.loadAllV2();
    //this.connect().subscribe((item) => console.log(item));
  }



}



