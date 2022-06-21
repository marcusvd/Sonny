import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { PartnerDto } from "src/app/_components/administrative/local/out-sourced/dto/partner-dto";
import { DeleteModalComponent } from "src/app/_shared/components/delete-modal/delete-modal.component";
import { BackEndService } from "src/app/_shared/services/back-end/backend.service";
import { environment } from "src/environments/environment";
import { PartnerDetailsComponent } from "../partner-details/partner-details.component";

@Injectable()

export class PartnerSupplierListService extends BackEndService<PartnerDto, number>{
  constructor(
    private _Dialog: MatDialog,
    protected _Http: HttpClient

  ) {
    super(_Http, environment._PARTNER)
  }


  // private allProvider: Promise<PartnerDto[]>;
  private _partners: PartnerDto[] = [];
  get partners(){
    return this._partners;
  }
  private _partner: PartnerDto;
  // private _partnersFiltered: PartnerDto[] = [];
  // private _searchField: string;
  // private _showHideEdit: boolean;
  // private _ToDestroy: Subscription;


  // _showScreen(): boolean {
  //   return this._showHideEdit != true ? this._showHideEdit = false : this._showHideEdit = true;
  // }


  // details(id: number) {
  //   this._Crud.loadById$<any>(id).subscribe((_partner: PartnerDto) => {
  //     const dialogRef = this._Dialog.open(PartnerDetailsComponent, {
  //       width: '400px',
  //       height: '400px',
  //       data: _partner
  //     });
  //     dialogRef.disableClose = true;
  //   })
  // }


  // remove(record: PartnerDto) {
  //   const dialogRef = this._Dialog.open(DeleteModalComponent, {
  //     // width: '300px',
  //     // height: '300px',
  //     data: { record, urlApi: environment._PARTNER }
  //   })
  //   dialogRef.disableClose = true;
  //   dialogRef.afterClosed()

  //     .subscribe(() => {

  //       this.getAll();
  //     });
  // }


  getAll() {
    // this._ToDestroy = this._Crud.loadAll$<PartnerDto>().subscribe((partners: PartnerDto[]) => {
    // })

    this.loadAll$<PartnerDto>().subscribe(
      ((P: PartnerDto[]) => {
        this._partner
        this._partners = P;
      }),
      (Error: any) => { console.log(Error) },
      // ()=>{console.log('complete')},
    )



  }























}
