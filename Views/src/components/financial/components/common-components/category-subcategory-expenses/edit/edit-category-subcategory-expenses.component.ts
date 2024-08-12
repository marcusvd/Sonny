import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { CategorySubcategoryExpensesSelectAddComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select-add/components/category-subcategory-expenses-select-add.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { CategoryExpensesDto } from '../../../month-fixed-expenses/dto/category-expenses-dto';
import { SubcategoryExpensesDto } from '../../../month-fixed-expenses/dto/subcategory-expenses-dto';
import { CategorySubcategoryExpensesService } from '../services/category-subcategory-expenses.service';

@Component({
  selector: 'edit-category-subcategory-expenses',
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule,
    TitleComponent,
    SubTitleComponent,
    BtnGComponent,
    CategorySubcategoryExpensesSelectAddComponent

  ],
  templateUrl: './edit-category-subcategory-expenses.component.html',
  styleUrls: ['./edit-category-subcategory-expenses.component.css']
})
export class EditCategorySubcategoryExpensesComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
    private _service: CategorySubcategoryExpensesService
  ) {
    super(_breakpointObserver);
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  screenFieldPosition: string = 'column';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'

            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'


            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'

            break;
          }
        }
      }
    })


  }

  editCheck(edit: MatCheckbox) {
    const id = this.formMain.get('subcategoriesExpenses').get('0').get('categoryExpensesId').value;
    if (edit.checked) {
      this.fillersExpenses.pipe(
        map((x: CategoryExpensesDto[]) => {
          x.forEach(Xid => {
            if (Xid.id == id)
              this.formLoadEditCategory(Xid);
          })

          // return x.find(Xid => Xid.id == this.formMain.get('categoryExpensesId').value).subcategoriesExpenses
        }),
      ).subscribe();
    }
    else
      this.formLoadEditCat.reset();
  }

  selectedCategoryExpensesId(id: number) {

    this.getSubcategories.clear();
    this.getSubcategories.reset();
    // entity.name = entity.name.toUpperCase();
    //this.formLoad(entity);


    const selected = this.fillersExpenses.pipe(
      map((x: CategoryExpensesDto[]) => {
        // x.forEach(Xid => {

        //   if (Xid.id == id) {
        //     this.formLoadEditCategory(Xid);
        //   }

        // })
        return x.find(Xid => Xid.id == id).subcategoriesExpenses
      }),
    ).subscribe(
      x => {
        this.subcategoryFormLoaded(x);
      });
  }

  back() {
    window.history.back();
  }

  formLoad(x?: CategoryExpensesDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name || '', [Validators.required, Validators.maxLength(30)]],
      companyId: [x?.companyId || this.companyId, []],
      subcategoriesExpenses: this._fb.array([]),
      deleted: [false, []],
    })
    this.subcategoryFormLoaded(x?.subcategoriesExpenses);
  }
  formLoadEditCat: FormGroup;
  formLoadEditCategory(x?: CategoryExpensesDto) {
    this.formLoadEditCat = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      name: [x?.name.toUpperCase() || '', [Validators.required, Validators.maxLength(30)]],
    })
  }

  subcategoryFormLoaded(x?: SubcategoryExpensesDto[]) {
    x?.forEach(y => {
      this.getSubcategories.push(
        this._fb.group(
          {
            id: [y?.id || 0, [Validators.required]],
            name: [y?.name || '', [Validators.required, Validators.maxLength(30)]],
            categoryExpensesId: [y?.categoryExpensesId || 0, []],
            deleted: [y?.deleted || false, []],
          }
        )
      )
    });
  }

  get getSubcategories() {
    return <FormArray>this.formMain.get('subcategoriesExpenses')
  }
  subcategoryFormLoad() {
    return this._fb.group({
      id: [0, [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      categoryExpensesId: [0, []],
      deleted: [false, []],
    })
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
    if (this.getSubcategories.length == 0)
      this.formMain.controls['name'].setErrors({ requiredSubcategory: true })
    else
      this.formMain.controls['name'].setErrors(null);
  }

  save() {
    this.validationSubcategory();
    console.log(this.formMain.controls)
    if (this.alertSave(this.formMain))
      this._service.save(this.formMain);
  }

  requiredSubcategory() {
    return this.formMain?.get('name')?.hasError('requiredSubcategory')
      ? `${'Subcategoria' + ' Preenchimento obrigatório.'}` : ''
  }
  fillersExpenses = new Observable<CategoryExpensesDto[]>();
  newCat() {
    const newCategory = new CategoryExpensesDto();
    newCategory.id = 0;
    newCategory.name = "INSERIR -- (NOVA CATEGORIA)";
    return newCategory;

  }

  ngOnInit(): void {
    this.formLoad();
    this.formLoadEditCategory();
    // this._service.getFillers().subscribe((x: CategoryExpensesDto[]) => {
    //   this.formLoad(x);
    // })

    this.screen();

    // this.fillersExpenses = this._service.getFillers()
    this.fillersExpenses = this._service.getFillers().pipe(
      map(x => [...x, this.newCat()])
    )
    // this.addSubcategories();
  }
}
