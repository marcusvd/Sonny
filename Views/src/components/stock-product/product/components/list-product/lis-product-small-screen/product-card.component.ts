import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHeaderComponent } from 'src/shared/components/card-g/card-header/card-header.component';
import { CardContentComponent } from 'src/shared/components/card-g/card-content/card-content.component';
import { CardFooterComponent } from 'src/shared/components/card-g/card-footer/card-footer.component';


@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    CommonModule,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
