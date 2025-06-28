
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialog as MatDialog } from '@angular/material/dialog';
import { MatPaginator as MatPaginator,PageEvent as PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';
import { GridListCommonHelper } from '../../grid-list-common/helpers/grid-list-common-helper';
import { IEntityGridAction } from '../../grid-list-common/interface/entity-grid-action';
import { MonthsDto } from '../../months-select/months-dto';
import { IList } from './ilist';

@Component({
  selector: 'list',
  template: `
  `
})

export class List extends BaseForm implements IList, AfterViewInit {

  pageSize: number = 20;

  backEndUrl: string = 'need to be override at the main class.';

  addUrlRoute: string = 'need to be override at the main class.';
  viewUrlRoute: string = 'need to be override at the main class.';
  viewListUrlRoute: string = 'need to be override at the main class.';
  editUrlRoute: string = 'need to be override at the main class.';
  entities: any[] = [];
  entities$: Observable<any[]>;


  // monthsString: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

 override months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

  constructor(
    protected _dialog: MatDialog,
    // protected _router: Router,
    protected _actRoute: ActivatedRoute,
    public gridListCommonHelper: GridListCommonHelper,
    @Inject('headers') public headers: string[] = [],
    @Inject('headers') public fieldsInEnglish: string[] = [],

    @Inject('_listServices') protected _listServices: any,
  ) {super()}

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

  startIndex = 0;
  endIndex = 0;
  onPageChangeFront(event: PageEvent) {
    this.paginatorAbove.pageIndex = event.pageIndex;
    this.paginatorBelow.pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = event.pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.startIndex = startIndex;
    this.endIndex = endIndex;

    if (event.previousPageIndex < event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    else if (event.previousPageIndex > event.pageIndex)
      this.entities$ = of(this.entities.slice(startIndex, endIndex));

    if (this.termSearched)
      this.entities$ = of(this.searchField(this.entities, this.termSearched));

    if (this.filterCheckBoxSelected)
      this.filter(this.filterCheckBoxSelected, this.entities, startIndex, endIndex, 'expires', 'wasPaid')

  }

  onSelectedMonth(entities: any[], selectedMonth: number, field:string) {
    let result = null;

    if (selectedMonth != -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x[field]).getFullYear()
        && new Date(x[field]).getMonth() == selectedMonth)

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize))
    }

    if (selectedMonth == -1) {

      result = entities.filter(x =>
        this.currentDate.getFullYear() == new Date(x[field]).getFullYear())

      this.gridListCommonHelper.lengthPaginator.next(result.length)

      const ordered = this.arrayOrderByDate(result, field)

      result = of(ordered.slice(0, this.pageSize));
    }
    return result;
  }

  current(entities: any[], currentPage: number, pageSize: number, field: string, withPagination: boolean) {
    let result: any[] = null;

    if (withPagination) {
      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field]).getFullYear()
        && new Date(x[field]).getMonth() == this.currentDate.getMonth())
      return of(result);
    }
    else {
      result = entities.filter(x => this.currentDate.getFullYear() == new Date(x[field]).getFullYear()
        && new Date(x[field]).getMonth() == this.currentDate.getMonth()

      ).slice(currentPage, pageSize)
    }
    return of(result)
  }

  getEntity($event: IEntityGridAction, itemWillDeleted?: string) {

    if ($event.action == 'visibility')
      this.view(this.viewUrlRoute, $event.entity.id);

    if ($event.action == 'visibility-dialog')
      this.viewDialog(this.viewUrlRoute, $event.entity);

    if ($event.action == 'edit')
      this.edit(this.editUrlRoute, $event.entity.id);

    if ($event.action == 'delete')
      this.delete($event.entity, itemWillDeleted);

    if ($event.action == 'format_list_numbered')
      this.viewList(this.viewListUrlRoute, $event.entity.id);

    console.log($event)
  }

  isdescending = true;
  orderByFrontEnd(entities$: Observable<any[]>, field: any) {
    this.isdescending = !this.isdescending;

    const entityFieldProperty = Object.keys(field)[0];
    const valueType = typeof (Object.values(field)[0]);


    if (valueType === 'string') {
      if (this.isdescending)
        return entities$.pipe(map(h => h.sort((x, y) => x[entityFieldProperty].localeCompare(y[entityFieldProperty]))));
      else
        return entities$.pipe(map(h => h.sort((x, y) => y[entityFieldProperty].localeCompare(x[entityFieldProperty]))));
    }

    if (valueType === 'number') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending) {
          const numberX: number = this.removeNonNumericAndConvertToNumber(x[entityFieldProperty]);
          const numberY: number = this.removeNonNumericAndConvertToNumber(y[entityFieldProperty]);
          return numberX - numberY;
        }
        else {
          const numberX: number = this.removeNonNumericAndConvertToNumber(x[entityFieldProperty]);
          const numberY: number = this.removeNonNumericAndConvertToNumber(y[entityFieldProperty]);
          return numberY - numberX;
        }
      })))
    }

    if (valueType === 'object') {
      return entities$.pipe(map(h => h.sort((x, y) => {
        if (this.isdescending)
          return new Date(x[entityFieldProperty]).getTime() - new Date(y[entityFieldProperty]).getTime();
        else
          return new Date(y[entityFieldProperty]).getTime() - new Date(x[entityFieldProperty]).getTime();
      })))
    }
    return null;
  }

  arrayOrderByDate(entities: any[], field: string): any[] {
    return entities.sort((a, b) => new Date(a[field]).getTime() - new Date(b[field]).getTime());
  }

  termSearched: string = null;
  searchField(entities: any[], term: string): any[] {
    const entitiesToFilter = entities;

    let result: any[] = [];

    result = entitiesToFilter.filter(entity =>
      Object.values(entity).some((value: any) => {
        return typeof value === 'string' && value.toLowerCase().replace('.', '').replace(',', '').includes(term.toLowerCase())
      }
      ));

    return result;
  }

  add(): void {
    // this._router.navigateByUrl(this.addUrlRoute)
  }

  filterCheckBoxSelected: string = null;
  filter(selected: string, entities: any[], currentPage: number, pageSize: number, fieldDateExpires:string, fieldDateWasPaid:string) {

    let result = null;

    if (selected == 'expired') {
      result = entities.filter(x => this.currentDateWithoutHours > new Date(x[fieldDateExpires]).setHours(0, 0, 0, 0) && new Date(x[fieldDateWasPaid]).getFullYear() == this.minValue.getFullYear());
      this.entities$ = of(result.slice(currentPage, pageSize));
    }

    if (selected == 'pending') {
      result = entities.filter(x => this.minValue.getFullYear() == new Date(x[fieldDateWasPaid]).getFullYear() && this.currentDateWithoutHours < new Date(x[fieldDateExpires]).setHours(0, 0, 0, 0));
      this.entities$ = of(result.slice(currentPage, pageSize));
    }

    if (selected == 'paid') {
      result = entities.filter(x => this.minValue.getFullYear() != new Date(x[fieldDateWasPaid]).getFullYear());
      this.entities$ = of(result.slice(currentPage, pageSize));
    }
    if (currentPage <= 0)
      this?.gridListCommonHelper?.lengthPaginator?.next(result.length)
  }

  view(url: string, id: number): void {
    // this._router.navigateByUrl(`${url}/${id}`)
  }

  edit(url: string, id: number): void {
    // this._router.navigateByUrl(`${url}/${id}`)
  }

  viewList(url: string, id: number): void {
    // this._router.navigateByUrl(`${url}/${id}`)
  }

  viewDialog(url: string, entity: any) {
    console.log(entity)
    this.callRoute(url, entity);
  }

  delete(entity: any, itemWillDeleted: string) {

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

  callRoute(url: string, entity: any) {

    const objectRoute: NavigationExtras = {
      state: {
        entity
      }
    };

    // this._router.navigate([url], objectRoute);
  }

}
