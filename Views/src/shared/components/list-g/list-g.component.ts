import { Component, Input, OnInit } from '@angular/core';
import { ListGDataService } from './data/list-g-data.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { FieldInputGComponent } from 'src/components/stock-product/product/common-components/fields-input/field-input-g/field-input-g.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'list-g',
  standalone: true,
  templateUrl: './list-g.component.html',
  imports: [
    CommonModule,
    MatCardModule,
    FieldInputGComponent,
    MatIconModule,
    MatButtonModule
  ],
  styleUrls: ['./list-g.component.css']
})
export class ListGComponent implements OnInit {

  @Input() headersLabel: string[] = [];
  @Input() headersFields: string[] = [];
  @Input() fields: string[] = [];
  @Input('entities') entities$: Observable<any[]>;
  @Input() matIcons: [key: string] = null;

  constructor(
    // private _listGDataService: ListGDataService,
    private _http: HttpClient
  ) { }

  ngOnInit(): void {
    //  this._listGDataService.loadAll$('https://fakestoreapi.com/products').subscribe(x => console.log(x));
    // this.entities$ = this._http.get('https://fakestoreapi.com/products');

  }



  // headers: any[] = ['id','title','category', 'description', 'price'];
  // headers: any[] = ['Código','Titulo','Categoria', 'Descrição', 'Preço'];
  // entities$: Observable<any>;

 

  itemsBodyCut:string[]=['title','description'];
}


interface ProductHeader {

  id:string;

  title:string;

  category:string;
  
  description:string;
    
  price:string;

}
interface ProductBody {

  id:string;

  title:string;

  category:string;
  
  description:string;
    
  price:string;

}