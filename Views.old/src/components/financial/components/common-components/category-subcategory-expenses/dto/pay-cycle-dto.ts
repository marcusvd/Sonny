
export class PayCycleDto {
    id: number;
    name: string;
}


export class PayCycleArray {
   static payCycle: PayCycleDto[] = [{ id: 1, name: 'Mensal' }, { id: 2, name: 'Anual' }, { id: 3, name: 'Variável' }, { id: 4, name: 'Empréstimo/Financiamento' }, { id: 5, name: 'Crtão de crédito' }]
}

