import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'authentication-router',
  templateUrl: './authentication-router.component.html',
  styleUrls: ['./authentication-router.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class AuthenticationRouterComponent  {

  constructor() {

  }

}
