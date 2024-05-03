import { MyUser } from "src/components/authentication/dto/my-user";
import { RepairDto } from "./repair-dto";

export class ServiceDto
{
    id:number;
    userId:number;
    user:MyUser;
    comments:string;
    isAuthorized:Date;
    finished:Date;
    repairs:RepairDto[];
}
