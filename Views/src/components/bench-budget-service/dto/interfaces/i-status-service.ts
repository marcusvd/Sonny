
export interface IStatusService {
  [key: string]: number;
}
export class StatusService {
  statusService: IStatusService = {
    'Em teste': 0,
    'Aguardando peça': 1,
    'Em processo': 2,
    'Falar com o cliente': 3,
    'Avaliando': 4,
    'Finalizado': 5,
    'Aguardando autorização': 6,
  }
}
