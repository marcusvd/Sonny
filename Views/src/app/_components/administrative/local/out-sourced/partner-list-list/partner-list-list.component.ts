import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { PartnerDto } from 'src/app/_components/administrative/local/out-sourced/dto/partner-dto';
import { DeleteModalComponent } from 'src/app/_shared/components/delete-modal/delete-modal.component';
import { environment } from 'src/environments/environment';
import { PartnerDetailsComponent } from 'src/app/_components/administrative/local/out-sourced/partner-details/partner-details.component';
import { PartnerListService } from 'src/app/_components/administrative/local/out-sourced/services/partner-list.service';

@Component({
  selector: 'partner-list-list',
  templateUrl: './partner-list-list.component.html',
  styleUrls: ['./partner-list-list.component.css']
})
export class PartnerListListComponent implements OnInit, OnDestroy {

  private
  private readonly _API_URL_PARTNER: string = `${environment._PARTNER}`
  // private allProvider: Promise<PartnerDto[]>;
  public _partners: PartnerDto[] = [];
  public _partner: PartnerDto;
  // private _partnersFiltered: PartnerDto[] = [];
  // private _searchField: string;
  private _showHideEdit: boolean;
  private _ToDestroy: Subscription;

  constructor(
    private _Crud: PartnerListService,
    private _Dialog: MatDialog,

  ) { }


  _showScreen(): boolean {
    return this._showHideEdit != true ? this._showHideEdit = false : this._showHideEdit = true;
  }


  details(id: number) {
    this._Crud.loadById$<any>(id).subscribe((_partner: PartnerDto) => {
      const dialogRef = this._Dialog.open(PartnerDetailsComponent, {
        width: '400px',
        height: '400px',
        data: _partner
      });
      dialogRef.disableClose = true;
    })
  }


  remove(record: PartnerDto) {
    const dialogRef = this._Dialog.open(DeleteModalComponent, {
      // width: '300px',
      // height: '300px',
      data: { record, urlApi: environment._PARTNER }
    })
    dialogRef.disableClose = true;
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe(() => {

        this.getAll();
      });
  }


  getAll() {
    this._ToDestroy = this._Crud.loadAll$<PartnerDto>().subscribe((_partners: PartnerDto[]) => {
      this._partners = _partners;
       })
  }

  ngOnInit(): void {
    this.getAll();
  }
  ngOnDestroy(): void {
    this._ToDestroy.unsubscribe();
  }


}
