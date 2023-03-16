import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/components/Authentication/services/authentication.service';

@Component({
  selector: 'first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  constructor(private _auth: AuthenticationService) { }


  authLogin(){

  }


  ngOnInit(): void {
  }

}
