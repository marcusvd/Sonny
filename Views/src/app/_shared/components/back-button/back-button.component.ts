import { Component, OnInit } from '@angular/core';
import { NavBackService } from '../../services/navigation/nav-back.service';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor(public buttonBack: NavBackService) { }

  ngOnInit(): void {

  }

}
