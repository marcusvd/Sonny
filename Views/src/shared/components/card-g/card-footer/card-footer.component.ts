import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnGComponent } from '../../btn-g/btn-g.component';

@Component({
  selector: 'card-footer',
  standalone: true,
  imports: [
    CommonModule,
    BtnGComponent
  ]
    ,
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {

  @Input() footer = '';

  constructor() { }

  ngOnInit(): void {
  }

}
