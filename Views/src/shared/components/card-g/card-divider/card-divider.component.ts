import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-divider.component.html',
  styleUrls: ['./card-divider.component.css']
})
export class CardDividerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
