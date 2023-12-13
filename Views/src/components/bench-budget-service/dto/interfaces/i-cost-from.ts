
export interface ICostFrom {
  [key: string]: number;
}

export class CostFrom {
  costsTypes: ICostFrom = {
    // 'Valor fixo Contrato': 0,
    'Combustível/Custos': 0,
    'Apps (Uber, 99 etc...)': 1,
    'Transporte Público': 2,
    'MotoBoy': 3,
    'Novo Valor': 4,
    'Sem custo': 5,
  }
}
