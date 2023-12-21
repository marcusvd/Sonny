
export interface IRepairStatusEnum {
  [key: string]: number;
}

export class RepairStatusEnum {
  repairStatus: IRepairStatusEnum = {
    // 'Valor fixo Contrato': 0,
    'Resolvido': 0,
    'Não autorizado': 1,
    'Sem solução': 2,
    'Aguardando cliente': 3,
    'Em processo': 4,
  }
}
