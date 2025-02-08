import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'title-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './title-details.component.html',
  styleUrls: ['./title-details.component.scss']
})
export class TitleDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
