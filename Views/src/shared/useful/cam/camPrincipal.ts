import { Injectable } from "@angular/core";
import { WebcamImage, WebcamInitError } from "ngx-webcam";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { Helpers } from "src/shared/helpers/global-helpers";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})

export class Cam {

  //Used to hide icon for to a snappn
  public enableDisable: boolean;

  //#region properties and fields
  public camActNow: boolean = false;

  constructor(
    private _Helpers: Helpers
  ) { }

  //#endregion

  //#region Methods
  public camActNowMtd(): void {
    this.camActNow = !this.camActNow
  }
  //#endregion


  /////////////////////////////////////////////////////////////////////////////////////////////////

  //#region Properties nd Fields
  public _imgDynamic: string;
  public _imgStringUrl: string[] = [];


  // toggle webcam on/off
  //imagem published here
  public webcamImage: WebcamImage;
  public showWebcam = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  //// latest snapshot
  ////public webcamImage: WebcamImage = null;
  //// webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  //File Upload to api

  public _Api: string = environment._RESOURCES
  //Entities


  //#endregion

  //#region WEBCAM Native Methods with a little bit modifield
  public triggerSnapshot(source: string, clientId: number): void {
    //File from WebCam
    this.trigger.next();
    if (source === 'cam') {
      //create Obj type FILE with blob OBJ.
      if (this.webcamImage) {
        //ADD blob to array string
        this._imgStringUrl.push(this.webcamImage.imageAsDataUrl);
        //Convert blob to file
        this._Helpers._files.push(new File([this._Helpers.dataURItoBlob(this.webcamImage.imageAsDataUrl)],
        this._Helpers.generateFileName() + '|' + clientId.toString(),
         { type: "image/jpg", lastModified: new Date().getTime() }));
      }
    }


  }
  //createdByMe
  public statusCam() {

    let control: boolean = false;
    let video: boolean = this.showWebcam;
    let sShot: WebcamImage = this.webcamImage;

    //this.showWebcam == true ? true : false;

    control = video === false && sShot == null ? false : true;
    // if(video == false){
    //    if(this.webcamImage == null)
    //   {
    //       control = false;
    //   }
    // }

    return control;

    //  this.enableDisable = status
  }

  buttonName(): string {
    return this.showWebcam ? 'Desligar' : 'Ligar';
  }

  // by Me

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    //this.webcamImage = null;
    // this._LocalHelpersCam.webcamImage = null;
    //console.log(this.showWebcam) when I click this becomes to a true
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    //  // true => move forward through devices
    //  // false => move backwards through devices
    //  // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
  }
  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
  capture() {
    return this.webcamImage.imageAsDataUrl ? true : false;
  }
  buttons(): boolean {
    return this.showWebcam ? true : false;
  }
  //#endregion







}
