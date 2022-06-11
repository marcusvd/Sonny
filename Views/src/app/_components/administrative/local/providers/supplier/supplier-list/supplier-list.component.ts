import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SupplierDeleteComponent } from '../supplier-delete/supplier-delete.component';
import { SupplierEditComponent } from 'src/app/_components/administrative/local/providers/supplier/supplier-edit/supplier-edit.component'
import { SupplierDto } from 'src/app/_components/administrative/local/providers/supplier/dto/supplier-dto';
import { Search } from 'src/app/_shared/services/navigation/search';
import { SupplierCrudService } from '../services/supplier-crud.service';
import { Subscriber } from 'rxjs';
import { DeleteModalComponent } from 'src/app/_shared/components/delete-modal/delete-modal.component';
import { ValidatorsService } from 'src/app/_shared/helpers/validators.service';
import { ContactValidatorsService } from 'src/app/_shared/components/contact/services/contact-validators.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css'],
  providers: [Search]
})
export class SupplierListComponent implements OnInit {

  // public allProvider: Promise<Supplier[]>;
  public _supliers: SupplierDto[] = [];
  public _supplier: SupplierDto;
  private readonly _API_URL_SUPPLIER: string = `${environment._SUPPLIER}`
  // public _providersFiltered: Supplier[] = [];
  // public _searchField: string;
  public _showHideEdit: boolean;

  constructor(
    // private _SupplierService: SupplierService,
    private _Dialog: MatDialog,
    private _Crud: SupplierCrudService,
    private _Router: Router,
    private _ValidationMsg: ValidatorsService,
    public _CntValService: ContactValidatorsService,

  ) { }


  clean(): void {
    // this._ValidationMsg.cleanAfters(['contact', ''], this._CntValService._cntForm)
    // this._ValidationMsg.cleanAfters(['addresss', ''], this._ValidationMsg._addressForm)
  }

  // get filterList(): string {
  //   return this._searchField;
  // }

  // set filterList(value: string) {
  //   this._searchField = value;
  //   this._providersFiltered = this.filterList ? this.filterSearchList(this.filterList) : this._providers;
  // }



  // filterSearchList(fiteredBy: string): Supplier[] {
  //   fiteredBy = fiteredBy.toLocaleLowerCase();
  //   return this._providers.filter(
  //     str => str.seller.toLocaleLowerCase().indexOf(fiteredBy) !== -1 || str.name.toLocaleLowerCase().indexOf(fiteredBy) !== -1
  //   );

  // }

  edit(id: number) {
    this._Router.navigate(['supplier', 'edit', id]);
    //this._Router.navigateByUrl(`${{id}}/edit`);
  }

  _showScreen(): boolean {


    return this._showHideEdit != true ? this._showHideEdit = false : this._showHideEdit = true;


    // if(this._showHideEdit){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    // return this._showHideEdit == false ? true : false;
  }

  remove(record: SupplierDto) {
    const dialogRef = this._Dialog.open(DeleteModalComponent, {
      // width: '300px',
      // height: '300px',
      data: { record, urlApi: environment._SUPPLIER }
    })
    dialogRef.disableClose = true;
    dialogRef.afterClosed()
     .pipe(take(1))
      .subscribe(() => this.getAll());
  }

  details(id: number) {
    this._supplier = new SupplierDto();
    // this._supplier = this._providers.find(_id => _id.id == id);
    // console.log(this._supplier)
    // this._Crud.loadById$(id).subscribe((_supplier: any) => {
    //   const dialogRef = this._Dialog.open(SupplierDetailsComponent, {
    //     width: '400px',
    //     height: '400px',
    //     data: _supplier
    //   });
    //   dialogRef.disableClose = true;
    // })
  }

  getAll() {
    this._Crud.loadAll$<SupplierDto>().subscribe((item: SupplierDto[]) => {
      this._supliers = item;
    });
  }


  //
  ngOnInit(): void {
    this.getAll();


  }

}
