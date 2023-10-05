import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'grid-list-opts',
  templateUrl: './grid-list-opts.component.html',
  styleUrls: ['./grid-list-opts.component.css']
})
export class GridListOptsComponent implements OnInit {

  ths: string[] = ['','Remoto', 'Aberto', 'Cliente', 'Defeitos', 'Visual', 'Acessos']
  tds: any[] = [{
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }, {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }
  , {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }
  , {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }
  , {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }
  , {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }
  , {
    remote: 'Sim', date:
      '03/10/2023',
    customer: 'Total Textilddddfffffffffffffffffffffffffffffffff',
    problem: 'Teclas estão desconfiguradas e não consegue imprimir nada.',
    visual: 'Cpu preta com prata quebrado na quina parte inferior esquerda gabinete de 2 baias.',
    access: 'Número anydesk: 154.521.451 Usuário:User Senha:123'
  }

]

  constructor() { }

  evenOdd(n: number) {
    if (n % 2 == 0) return 'tr_0';
    return 'tr_1';
  }

  ngOnInit(): void {
  }

}
