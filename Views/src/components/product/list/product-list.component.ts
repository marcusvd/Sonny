import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';


import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ProductListService } from './services/product-list.service';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { MatPaginator } from '@angular/material/paginator';
import { ProductDto } from '../dtos/product-dto';
import { EquipamentGridDto } from '../dtos/equipament-grid-dto';




@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']

})
export class ProductListComponent extends BaseForm implements OnInit {


  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: EquipamentGridDto[];
  entities$: Observable<EquipamentGridDto[]>;
  btnsDisabled: boolean = true;
  cssColumns: string[] = ['width: 150px;', 'width: 70px;', 'width: 80px;', 'max-width: 150px;', '', '', 'max-width: 50px;']

  headers: string[] = ['', 'Equipamento', 'Fabricante', 'Segmento', 'Modelo', 'Descrição', 'Disponivel'];

  @Input() fieldsInEnglish: string[] = ['name', 'manufacturer', 'segment', 'model', 'description', 'length'];

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productListService: ProductListService,
    public dialog: MatDialog,
  ) { super() }

  lengthBs: number = 0;
  pageSize: number = 20;

  ngOnInit(): void {

    this._productListService.loadById$<string>("products/autoRemoveReserve", localStorage.getItem('companyId'))
      .subscribe();

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

        if (xy.quantities.length <= 0)
          viewDto.btnDisabled = true;
        else
          viewDto.btnDisabled = false;

        viewDto.length = xy.quantities.length;
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

    this.entities$ = of(this.entities.filter(
      x=> x.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      x.model.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      x.manufacturer.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      x.segment.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())))

  }

  getEntityEvent(entity: any) {

    const productId: number = entity.productId;

    this._router.navigateByUrl(`/side-nav/product-dash/reserve-sell-product/${productId}`);
  }


}
