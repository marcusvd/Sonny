import { ClientDto } from "src/app/_components/administrative/client/dto/client-dto";


export class CollectEquipamentDto {
  id: number;
  start: Date;
  status: string;
  user: string;
  clients: ClientDto;
  model: string;
  equipamentdescription: string;
  userconsiderations: string;
  foundederrors: string;
  appliedsolutions: string;
  end: Date;
}
