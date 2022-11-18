import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Cam } from 'src/shared/useful/cam/camPrincipal';
import { Helpers } from 'src/shared/helpers/global-helpers';
import { tap, take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
//import { ClientCrudService } from '../../../../services/client-create-crud.service';
import { ClientDto } from 'src/components/client/dto/client-dto';

import { NetworkDevicesDto } from 'src/components/client/technician/infra/dto/network-devices-dto';
import { DevicesCrudService } from '../../../services/devices-crud.service';

@Component({
  selector: 'devices-create',
  templateUrl: './devices-create.component.html',
  styleUrls: ['./devices-create.component.css'],
  providers: [Cam, {
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class DevicesCreateComponent implements OnInit {


  private readonly _API_URL_CLIENT: string = `${environment._CUSTOMERS}`



  public secondFormGroup: FormGroup;
  public _devicesForm: FormGroup;
  // public _ClientID: number;
  // public _netDev: NetworkDevices;
  // @Input() _client: Client;

  constructor(
    public _Fb: FormBuilder,
    public _Cam: Cam,
    public _Helpers: Helpers,
    private _Crud: DevicesCrudService,
    private _ActivatedRoute: ActivatedRoute,
    // public _ClientService: ClientService,
    private Snack: MatSnackBar
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
      toSearch: ['', []],
      //   clientId: [this._client.id, [Validators.required]]
    })
  }


  btnSaveDisable(): boolean {
    return this._devicesForm.valid ? true : false;
  }

  save() {
    let _netDev: NetworkDevicesDto = new NetworkDevicesDto();
    let _idClient: number;
    this._ActivatedRoute.params.subscribe(_id =>  {
      _idClient = _id['id'];
    })

    // let _netWorkDevices: NetworkDevices[] = new Array<NetworkDevices>();
    _netDev = Object.assign(this._devicesForm.value);
    _netDev.toSeach  = this._devicesForm.value.equipament + ' ' + this._devicesForm.value.manufacturer

    this._Crud.loadById$(_idClient).subscribe((record: any) => {
      this.Snack.open(`${_netDev.equipament}, salvo com êxito.`);
        this._Crud.putDevices(this._API_URL_CLIENT,this._Helpers._files, record, _netDev)
          .pipe(take(1))
          .subscribe((item: ClientDto) => {
            //console.log(item);
          }, error => {
            console.log(error);
          });
        this._Helpers._files = [];
        // this.data = null;
        _netDev = null;
    })
    //_netDev.images = path;
    // _netWorkDevices.push();
    //this.data.netWorkDevices.push(_netDev);
    // this._ClientService.post(this.data).subscribe(console.log);

    // this._ClientService.upload(this._Helpers._files).subscribe(console.log);

    // this._ClientService.upload(this._Helpers._files).subscribe();
    // console.log(this._Helpers._files);



    //////////////


    // isso aqui dentro







    /////////////////////


    // this._ClientService.put(this._Helpers._files, this.data).subscribe((item: Client) => {
    //   console.log(item);
    // }, error => {
    //   console.log(error);
    // });




  }


  ngOnInit(): void {
    //console.log('ID MANUAL',this._client.id);
    // this._ClientID = this.data;
    this.Validation();
    this._Cam._imgStringUrl = new Array<string>();
    this._Helpers._files = new Array<File>();
  }




}
