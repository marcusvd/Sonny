import { CompanyDto } from "src/shared/components/table-g/dtos/company-dto";

export class MyUser {

  id: number;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company:CompanyDto;
  rememberMe:boolean;
  twoFactorEnabled:boolean;
  //Auth return
  token: string;
  action: string;
  authenticated: boolean;
  expiration: Date;

}
