import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { WebcamImage, WebcamInitError } from 'ngx-webcam';
// import { Observable } from 'rxjs/internal/Observable';
// import { Subject } from 'rxjs/internal/Subject';
import { Cam } from './camPrincipal';


@Component({
  selector: 'cam',
  templateUrl: './cam.component.html',
  styleUrls: ['./cam.component.css'],
  providers:[Cam]
})
export class CamComponent implements OnInit {

  constructor(
    public _Cam: Cam,
  ) { }



  ngOnInit(): void {

  }

}
