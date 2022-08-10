import { ImgPathDto } from "./img-path-dto";


export class NetworkDevicesDto {
    id: number;
    equipament: string;
    images: ImgPathDto[];
    manufacturer: string;
    model: string;
    user: string;
    physicalLocation:string;
    password: string;
    sn: string;
    ip: string;
    mac: string;
    door: string;
    apps: string;
    connectivity: string;
    notes: string;
    toSeach:string;
  }
