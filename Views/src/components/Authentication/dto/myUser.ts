import { AddressDto } from "src/shared/dtos/address-dto";
import { CompanyDto } from "src/shared/dtos/company-dto";
import { ContactDto } from "src/shared/dtos/contact-dto";

export class MyUser {

  id: number;
  userName: string;
  imgProfile: string;
  email: string;
  password: string;
  confirmPassword: string;
  passwordChanged:boolean;
  companyId:number;
  company:CompanyDto;
  address:AddressDto;
  contact:ContactDto;
  // rememberMe:boolean;
  twoFactorEnabled:boolean;
  //Auth return
  token: string;
  action: string;
  authenticated: boolean;
  expiration: Date;

}
