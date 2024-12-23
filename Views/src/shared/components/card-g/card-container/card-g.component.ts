import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDividerComponent } from '../card-divider/card-divider.component';
import { CardContentComponent } from '../card-content/card-content.component';
import { CardHeaderComponent } from '../card-header/card-header.component';
import { CardFooterComponent } from '../card-footer/card-footer.component';

@Component({
  selector: 'card-g',
  standalone: true,
  imports: [
    CommonModule,
    CardHeaderComponent,
    CardDividerComponent,
    CardContentComponent,
    CardFooterComponent,
  ],
  templateUrl: './card-g.component.html',
  styleUrls: ['./card-g.component.css']
})
export class CardGComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}