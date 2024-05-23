import { AddressDto } from "src/shared/components/address/dtos/address-dto";
import { ContactDto } from "src/shared/components/contact/dtos/contact-dto";
import { CompanyDto } from "src/shared/entities-dtos/company-dto";

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
