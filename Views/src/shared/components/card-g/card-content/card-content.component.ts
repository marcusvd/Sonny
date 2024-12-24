import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentInterface } from './content-interface';

@Component({
  selector: 'card-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit{

  @Input() left: string;
  @Input() right: string;


  ngOnInit(): void {
  }

}
