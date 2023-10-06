import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { CollectDeliverCreateService } from 'src/components/out-sourced/collect-deliver/collect-deliver-create/services/collect-deliver-create.service';
import { PaginatorDto } from 'src/shared/components/paginator/paginator-dto';


@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, AfterViewInit {


  displayedColumnsInput: string[] = ['id', 'name'];
  displayedColumnsUserShows: string[] = ['Código', 'Nome'];

  //pagination
  pageIndex: number; //@Input()
  length: number; //@Input()
  pageSize: number; //@Input()

  pageSizeOptionsInput = [] = [5, 10, 20]

  dataSourceInput: MatTableDataSource<any>;
  // dataSourceInput = new MatTableDataSource<any>(null);

  // dataSourceInput: CustomerDto[] = [];
  paginator: PaginatorDto;

  constructor(
    private _cdService: CollectDeliverCreateService,
    // private _tableGService: TableGService
  ) { }

  ngOnInit(): void {
    // this.getAllCustomersPaginated(1, 10);
  }
  // @ViewChild(MatSort) sortVC: MatSort;
  ngAfterViewInit() {
    // this.dataSourceInput.sort = this.sortVC;
  }

  getAllCustomersPaginated(pgNumber: number, pgSize: number) {

    this._cdService.GetAllCustomersPaginated(pgNumber, pgSize).subscribe((response: HttpResponse<CustomerDto[]>) => {

      const hedersPagination = JSON.parse(response.headers.get('pagination')) as PaginatorDto;

      this.pageIndex = hedersPagination.currentPg - 1;
      this.pageSize = hedersPagination.pgSize;
      this.length = hedersPagination.totalCount;

      this.dataSourceInput = new MatTableDataSource<any>(response.body)

    })
  }

  changePage($event: any) {

    const pageIndex = $event.pageIndex + 1;
    console.log($event)
    //, $event.pgSize
    this.getAllCustomersPaginated(pageIndex, $event.pageSize);
    // console.log($event.currentPg, $event.pgSize)
  }


  sort($event: Sort) {
    const evt: Sort = $event;
    console.log(evt)
    // this._tableGService.sortData(evt, this.dataSourceInput);
    console.log($event)
  }

  titlesHeader: string[] = ['', 'Remoto', 'Aberto', 'Cliente', 'Defeitos', 'Visual', 'Acessos'];

  @Input() fieldsInEnglish: string[] = ['remote', 'date', 'customer', 'problem', 'visual', 'access'];

  entities: any[] = [{
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






}
