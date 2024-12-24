import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'card-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './card-header.component.html',
  styleUrls: ['./card-header.component.css']
})
export class CardHeaderComponent implements OnInit {

  @Input() title: string;
  @Input() headerIcon: string;
  @Input() styleIcon:string;
  @Input() classIcon = {};
  @Input() textRightSideAbove: string;
  @Input() textRightSideBelow: string;

    constructor() { }

  ngOnInit(): void {
  }

}
