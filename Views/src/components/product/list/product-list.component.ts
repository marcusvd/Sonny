import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ProductListService } from './services/product-list.service';
import { HttpClient } from '@angular/common/http';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { BudgetServiceGridListDto } from 'src/components/bench-budget-service/dto/budget-service-grid-list-dto';
import { StatusService } from 'src/components/bench-budget-service/dto/interfaces/i-status-service';
import { BudgetServiceDto } from 'src/components/bench-budget-service/dto/budget-service-dto';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EquipamentDto } from '../dtos/equipament-dto';
import { ProductDto } from '../dtos/product-dto';
import { EquipamentGridDto } from '../dtos/equipament-grid-dto';
import { MatDialog } from '@angular/material/dialog';
import { ReserveSellListComponent } from '../reserve-sell-list/reserve-sell-list.component';



@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent extends BaseForm implements OnInit {


  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: EquipamentGridDto[];
  entities$: Observable<EquipamentGridDto[]>;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
    // private datePipe: PtBrDataPipe

  ) { super() }

  lengthBs: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.gridListOptsGHelper.getAllEntitiesPaged('products/GetAllProductsPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null))


    this.gridListOptsGHelper.entities$.subscribe((x: ProductDto[]) => {

      let viewDto = new EquipamentGridDto;
      this.entities = [];

      x.forEach((xy: ProductDto) => {
        viewDto = new EquipamentGridDto();
        viewDto.productId = xy.id;
        viewDto.description = xy.equipament.description;
        viewDto.manufacturer = xy.equipament.manufacturer;
        viewDto.model = xy.equipament.model;
        viewDto.name = xy.equipament.name;
        viewDto.segment = xy.equipament.segment;
        viewDto.length = xy.quantities.length;
        // viewDto.entityComplete = xy
        this.entities.push(viewDto);

      })

      this.entities$ = of(this.entities)
    })

    this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('lengthProduct')

    this.lengthBs = this.gridListOptsGHelper.length;

    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

  @ViewChild('pgBs') pagination: MatPaginator
  ngAfterViewInit() {

    this.pagination.page
      .pipe(
        tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('products/GetAllPagedAsync', this.gridListOptsGHelper.paramsTo(this.pagination.pageIndex + 1, this.pagination.pageSize, null)))
      ).subscribe();
  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.gridListOptsGHelper.searchQueryHendler(term, 'products/GetAllPagedAsync', this.gridListOptsGHelper.paramsTo(1, this.pageSize, null));

    this.gridListOptsGHelper.entities$.subscribe((x: ProductDto[]) => {

      let viewDto = new EquipamentGridDto;
      this.entities = [];

      x.forEach((xy: ProductDto) => {
        viewDto = new EquipamentGridDto();
        viewDto.description = xy.equipament.description
        viewDto.manufacturer = xy.equipament.manufacturer
        viewDto.model = xy.equipament.model
        viewDto.name = xy.equipament.name
        viewDto.segment = xy.equipament.segment
        viewDto.length = xy.quantities.length

        this.entities.push(viewDto);
      })


      this.entities$ = of(this.entities)
    })

  }

  getEntityEvent(entity: any) {
    console.log(entity)
    const productId: number = entity.productId;
    //  entity: EquipamentGridDto

    //   const entityToSend:ProductDto = entity.entity.entityComplete;

    //   const dialogRef = this.dialog.open(ReserveSellListComponent, {

    //     data:entityToSend
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
      //     console.log(`Dialog result: ${result}`);
      //   });

      const companyId = JSON.parse(localStorage.getItem('companyId'));

    this._router.navigateByUrl(`/side-nav/product-dash/reserve-sell-product/${productId}`);
  }

  cssColumns: string[] = ['width: 150px;', 'width: 70px;', 'width: 80px;', 'max-width: 150px;', '', '', 'max-width: 50px;']

  headers: string[] = ['', 'Equipamento', 'Fabricante', 'Segmento', 'Modelo', 'Descrição', 'Disponivel'];

  @Input() fieldsInEnglish: string[] = ['name', 'manufacturer', 'segment', 'model', 'description', 'length'];
}
