import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.css']
})
export class CardFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
