import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';




import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryExpensesDto } from 'src/components/financial/components/month-fixed-expenses/dto/category-expenses-dto';
import { SubcategoryExpensesDto } from 'src/components/financial/components/month-fixed-expenses/dto/subcategory-expenses-dto';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BaseForm } from 'src/shared/components/inheritance/forms/base-form';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';




@Component({
  selector: 'select-category-subcategory-expenses-add',
  templateUrl: './category-subcategory-expenses-select-add.component.html',
  styleUrls: ['./category-subcategory-expenses-select-add.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgFor,
    BtnGComponent
  ],
  providers: [
    CategoryExpensesService,
  ]

})

export class CategorySubcategoryExpensesSelectAddComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver,
    private _fillersService: CategoryExpensesService,
    private _fb: FormBuilder
  ) { super(_breakpointObserver) }

  @Input() override formMain: FormGroup
  @Input() formCtrlNameCategory: string = 'categoryExpensesId';
  @Input() formCtrlNameSubcategory: string = 'subcategoryExpensesId';

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  fillersExpenses = new Observable<CategoryExpensesDto[]>();
  subcategoriesExpenses = new Observable<SubcategoryExpensesDto[]>();
  newSubcategoriesExpenses: boolean = true;

  screenFieldPosition: string;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })
  }

  selectedCategoryExpensesId(id: number) {

    if (id === 0) {
      this.newSubcategoriesExpenses = false;
      this.formMain.get('id').setValue(0);
      this.formMain.get('name').setValue('NOVA CATEGORIA AQUI!');
    }
    else {
      this.newSubcategoriesExpenses = true;

      const selected = this.fillersExpenses.pipe(
        map((x: CategoryExpensesDto[]) => {
          return x.find(Xid => Xid.id == id).subcategoriesExpenses
        }),
      )
      this.subcategoriesExpenses = selected;
    }
  }

  formLoad() {
    return this.formMain = this._fb.group({
      id: [0, [Validators.required]],
      name: [null || '', [Validators.required, Validators.maxLength(30)]],
      companyId: [this.companyId, []],
      subcategoriesExpenses: this._fb.array([]),
      deleted: [false, []],
    })
  }

  subcategoryFormLoad() {
    return this._fb.group({
      id: [0, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      categoryExpensesId: [0, []],
      deleted: [false, []],
    })

  }

  formLoaded() {
    return this.subForm = this._fb.group({
      categoryExpensesId: [0, [Validators.required]],
      subcategoryExpensesId: [0, [Validators.required]],
    })
  }


  get getSubcategories() {
    return <FormArray>this.formMain.get('subcategoriesExpenses')
  }

  addSubcategories() {
    this.getSubcategories.push(this.subcategoryFormLoad());
    this.validationSubcategory();
  }

  removeSubcategory(index: number) {
    this.getSubcategories.removeAt(index);
    this.validationSubcategory();
  }

  validationSubcategory() {
    // if (this.getSubcategories.length == 0)
    //   this.formMain.controls['name'].setErrors({ requiredSubcategory: true })
    // else
    //   this.formMain.controls['name'].setErrors(null);
  }

  requiredSubcategory() {
    return this.formMain?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }

  newCat() {
    const newCategory = new CategoryExpensesDto();
    newCategory.id = 0;
    newCategory.name = "INSERIR -- (NOVA CATEGORIA)";
    return newCategory;

  }

  ngOnInit(): void {
    this.formLoad();
    this.formLoaded();
    this.screen();
    this.fillersExpenses = this._fillersService.getFillers().pipe(
      map(x => [...x, this.newCat()])
    )
  }

}
