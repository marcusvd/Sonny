import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import * as diacritics from 'diacritics';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { GridListCommonHelper } from '../../grid-list-common/helpers/grid-list-common-helper';
import { IEntityGridAction } from '../../grid-list-common/interface/entity-grid-action';
import { IList } from './ilist';

@Component({
  selector: 'list',
  template: `

  `
})


export class List extends BaseForm implements IList, AfterViewInit{
 
  pageSize: number = 20;
  backEndUrl: string = 'need to be override at the main class.';

  minValue = new Date('0001-01-01T00:00:00');
  currentDate = new Date();

  addUrlRoute: string = 'need to be override at the main class.';
  viewUrlRoute: string = 'need to be override at the main class.';
  editUrlRoute: string = 'need to be override at the main class.';

  entities: any[] = [];
  entities$: Observable<any[]>;


  constructor(
    protected _dialog: MatDialog,
    protected _router: Router,
    protected _actRoute: ActivatedRoute,
    public gridListCommonHelper: GridListCommonHelper,
    @Inject('headers') public headers: string[] = [],
    @Inject('headers') public fieldsInEnglish: string[] = [],
    override _breakpointObserver: BreakpointObserver,
    @Inject('_listServices') protected _listServices: any,
  ) {
    super(_breakpointObserver)

  }

  @ViewChild('paginatorAbove') paginatorAbove: MatPaginator
  @ViewChild('paginatorBelow') paginatorBelow: MatPaginator

  ngAfterViewInit(): void {
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.paginatorAbove.page
        .pipe(
          tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorAbove.pageIndex + 1, this.paginatorAbove.pageSize, null, null, {}))
          )).subscribe();

      this.paginatorBelow.page
        .pipe(
          tap(() => this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(this.paginatorBelow.pageIndex + 1, this.paginatorBelow.pageSize, null, null, {}))
          )).subscribe();
    }
  }

   onPageChange($event: PageEvent) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.onPageChangeBack($event);
    else
      this.onPageChangeFront($event);
  }

  onPageChangeBack($event: PageEvent) {
    this.paginatorAbove.pageIndex = $event.pageIndex;
    this.paginatorBelow.pageIndex = $event.pageIndex;
  }

  onPageChangeFront(event: PageEvent) {
    this.paginatorAbove.pageIndex = event.pageIndex;
    this.paginatorBelow.pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;

    if (event.previousPageIndex < event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    else if (event.previousPageIndex > event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));
  }

  getEntity($event: IEntityGridAction, itemWillDeleted:string) {
    if ($event.action == 'visibility')
      this.view(this.viewUrlRoute, $event.entity.id);

    if ($event.action == 'edit')
      this.edit(this.editUrlRoute, $event.entity.id);

    if ($event.action == 'delete')
      this.delete($event.entity, itemWillDeleted);
  }

  add(): void {
    this._router.navigateByUrl(this.addUrlRoute)
  }

  view(url: string, id: number): void {
    this._router.navigateByUrl(`${url}/${id}`)
  }

  edit(url: string, id: number): void {
    this._router.navigateByUrl(`${url}/${id}`)
  }

  delete(entity: any, itemWillDeleted:string) {

    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: entity.id, btn1: 'Cancelar', btn2: 'Confirmar', messageBody: `Tem certeza que deseja deletar o item `, itemToBeDelete: `${entity[itemWillDeleted]}` },
      autoFocus: true,
      hasBackdrop: false,
      disableClose: true,
      panelClass: 'delete-dialog-class',

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.id != null) {
        const deleteFake = this._listServices.deleteFakeDisable(result.id);
        this.entities = this.entities.filter(y => y.id != result.id);

        this.entities$ = this.entities$.pipe(
          map(x => x.filter(y => y.id != result.id))
        )
      }

    })
  }

  removeNonNumericAndConvertToNumber(str: string):number {
    return +str.replace(/\D/g, '');
  }

  removeAccentsSpecialCharacters(value: string):string {
    const noAccents = diacritics.remove(value);//remove accents
    return noAccents.replace(/[^\w\s]/gi, ''); //remove special characters
  }

}
