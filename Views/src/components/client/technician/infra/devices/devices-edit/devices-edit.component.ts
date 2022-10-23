import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { Cam } from 'src/shared/useful/cam/camPrincipal';
import { Helpers } from 'src/shared/helpers/global-helpers';
// import { DevicesServices } from 'src/services/devices/devices.services';
import { ImgPathDto } from 'src/components/client/technician/infra/dto/img-path-dto';
// import { ClientService } from 'src/services/client/client.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
//import { ClientCrudService } from '../../../../services/client-create-crud.service';
import { ClientDto } from 'src/components/client/dto/client-dto';
import { NetworkDevicesDto } from '../../dto/network-devices-dto';





@Component({
  selector: 'app-devices-edit',
  templateUrl: './devices-edit.component.html',
  styleUrls: ['./devices-edit.component.css'],
  providers: [ {
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class DevicesEditComponent implements OnInit {
  public secondFormGroup: FormGroup;
  public _devicesForm: FormGroup;
  private readonly _API_URL_DEVNETWORK: string = `${environment._DEVNETWORK}`
  private readonly _API_URL_CLIENTS: string = `${environment._CLIENTS}`
  private readonly _API_URL_RESOURCES: string = `${environment._RESOURCES}`
  private path: ImgPathDto[] = new Array<ImgPathDto>();
  // @Input() _client: Client;

  constructor(

    public _Fb: FormBuilder,
    public _Cam: Cam,
    public _Helpers: Helpers,
  //  private _Crud: ClientCrudService,
    private _ActivatedRoute: ActivatedRoute
    // public _ClientService: ClientService,
  ) { }

  removinItem(img: number) {
    this._Cam._imgStringUrl.splice(img, 1);
    if (this.cleaningArrayOfFiles) {
      this._Helpers._files = [];
    }
  }
  //helper of method above.
  cleaningArrayOfFiles(): boolean {
    return this._Cam._imgStringUrl.length <= 0 ? true : false;
  }

  btnFile(): boolean {
    return this._Cam.showWebcam ? true : false;
  }
  btnFotoDisable(): boolean {
    if (this._Cam._imgStringUrl.length >= 4) {
      return true;
    }
    else {
      return false;
    }
  }

  Validation() {
    return this._devicesForm = this._Fb.group({
      equipament: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      images: this._Fb.array([]),
      manufacturer: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      model: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      user: ['', [Validators.minLength(2), Validators.maxLength(150)]],
      physicalLocation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      password: ['', [Validators.maxLength(30)]],
      sn: ['', [Validators.minLength(2), Validators.maxLength(100)]],
      ip: ['', [Validators.minLength(7), Validators.maxLength(15)]],
      mac: ['', [Validators.minLength(12), Validators.maxLength(20)]],
      door: ['', [Validators.minLength(2), Validators.maxLength(10)]],
      apps: ['', [Validators.minLength(2), Validators.maxLength(100)]],
      connectivity: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      notes: ['', [Validators.minLength(2), Validators.maxLength(2000)]],
    })
  }


  btnSaveDisable(): boolean {
    return this._devicesForm.valid ? true : false;
  }
  load(entity: NetworkDevicesDto[]) {
    //Just  load and show img in the screen
    this._Cam._imgStringUrl = [];
    let arrayOfImg: string[] =[];


    let dev: any = entity;
    dev.images.forEach((item) => { arrayOfImg.push(`${this._API_URL_RESOURCES}/${item.img}`) });
    this._Cam._imgStringUrl = arrayOfImg;
    //
    if (this._Cam._imgStringUrl.length > -1) {

      this._Cam._imgStringUrl.forEach((item) => {
        const Img: ImgPathDto = new ImgPathDto();
        Img.img = `${item}`.replace(' ', '');
        this.path.push(Img);
      })

    } else { }

    let _netDev: NetworkDevicesDto;

    this._devicesForm.patchValue({
      id: dev.id,
      equipament: dev.equipament,
      images: this.path,
      manufacturer: dev.manufacturer,
      model: dev.model,
      user: dev.user,
      physicalLocation: dev.physicalLocation,
      password: dev.password,
      sn: dev.sn,
      ip: dev.ip,
      mac: dev.mac,
      door: dev.door,
      apps: dev.apps,
      connectivity: dev.connectivity,
      notes: dev.notes,
    });
    _netDev = new NetworkDevicesDto();
    _netDev = this._devicesForm.value;
    this._devicesForm.patchValue(_netDev);
  }

  save() {
    //Just  load and show img in the screen
    let dev = this._devicesForm.value;

    // dev.images.forEach((item) => { arrayOfImg.push(this._apiUrl + item.img) });
    // this._Cam._imgStringUrl = arrayOfImg;
    // ///
    //let path: ImgPath[] = new Array<ImgPath>();
    // if (this._Cam._imgStringUrl.length > -1) {
      this.path = [];
       this._Cam._imgStringUrl.forEach((item) => {
         const Img: ImgPathDto = new ImgPathDto();
         Img.img = `${item}`.replace(' ', '');
         this.path.push(Img);
       })

      dev.images = this.path;
      // dev.id = this.data.netWorkDevice.id;
      console.log(dev);
  //   } else { }


   }



  Oldsave() {
    // NetWorkDevice one
    let _netWorkDevice: NetworkDevicesDto = new NetworkDevicesDto();
    // NetworkDevices many
    let _NetworkDevices: NetworkDevicesDto[] = new Array<NetworkDevicesDto>();
    //imgs
    let path: ImgPathDto[] = [];

    //_netWorkDevice = Object.assign(this._devicesForm.value);

    if (this._Cam._imgStringUrl != null) {
      this._Cam._imgStringUrl.forEach((item) => {
        const Img: ImgPathDto = new ImgPathDto();
        Img.img = `${item}`.replace(' ', '');
        path.push(Img);
      })
    }
    _netWorkDevice = Object.assign(this._devicesForm.value);
    console.log(_netWorkDevice);
    // this._devicesForm.value.images = path;
    // this._devicesForm.value.id = this.data.netWorkDevice.id;

    // if (this.data.NetworkDevices.length > -1) {
    //   this.data.NetworkDevices.forEach((item, i) => {
    //     if(item.id == _netWorkDevice.id){
    //       this.data.NetworkDevices[i] =_netWorkDevice;
    //     }
    //   })
    // }




    //  this._ClientService.put(this.data.id, this.data).subscribe((item: Client) => {
    //    console.log(item);
    //  }, error => {
    //    console.log(error);
    //  });


  }
  ngOnInit(): void {

    // this._ActivatedRoute.params.subscribe(_id => {
    //   this._Crud.loadById$<ClientDto>(_id['id']).subscribe(client  =>{
    //  //   this.load$(client.netWorkDevices);
    //   })
    // })


    this.Validation();


    //perfect
    // this.Validation();
    // this._Cam._imgStringUrl = new Array<string>();
    // let arrayOfImg: string[] = new Array<string>();
    // this.data.images.forEach((item) => { arrayOfImg.push(this._apiUrl+item.img) });
    // this._Cam._imgStringUrl = arrayOfImg;
    // this._devicesForm.patchValue(this.data);

  }






}
