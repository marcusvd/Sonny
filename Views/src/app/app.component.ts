import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyUser } from 'src/components/authentication/dto/myUser';
import { AuthenticationService } from 'src/components/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private _router: Router,
    private _auth: AuthenticationService,
  ) { }

  ngOnInit(): void {
   // this._router.navigateByUrl('/login');
    // if (this._auth.currentUser?.authenticated) {
    //   this._router.navigateByUrl('/side-nav');
    // }
    // else{
    //   this._router.navigateByUrl('/side-nav/first');
    // }


    //  // localStorage.getItem()


    //   if(this.getLocalStorage()){
    //
    //   }
    //   else{

    //   }
    // }

    // getLocalStorage():boolean{

    //   const auth:MyUser = JSON.parse(localStorage.getItem('myUser'));

    //   return auth.authenticated;
  }


  title = 'Views';

}
